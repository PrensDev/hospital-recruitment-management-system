# Import Packages
from os import stat
from sqlalchemy.sql.expression import or_
from typing import List
from fastapi import APIRouter, Depends, UploadFile, File
from fastapi.exceptions import HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session
from database import get_db
from oauth2 import authorized, get_user

# Import Models and Schemas
from modules.human_resource.recruitment_management.schemas import user_schemas as user, deptHead_schemas as deptHead
from modules.human_resource.recruitment_management.models import *

# For file handling
import shutil, uuid


# Router Instance
router = APIRouter(
    prefix = "/api/department-head",
    tags = ["Department Head API"]
)


# Priviledge User
AUTHORIZED_USER = "Department Head"


# User Information
@router.get("/info", response_model = user.ShowUser)
def get_user_info(
    db: Session = Depends(get_db), 
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            user_info = db.query(User).filter(User.user_id == user_data.user_id).first()
            if not user_info:
                raise HTTPException(status_code = 404, detail = {"message": "User does not exist"})
            else:
                return user_info
    except Exception as e:
        print(e)


# ====================================================================
# REQUISITIONS/MANPOWER REQUESTS
# ====================================================================


# Requisition/Manpower Request Not Found Response
REQUISITION_NOT_FOUND_RESPONSE = {"message": "Manpower request was not found"}


# Get All Manpower Request
@router.get("/requisitions", response_model = List[deptHead.ShowManpowerRequest])
def get_all_requisitions(
    db: Session = Depends(get_db), 
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            user_department = db.query(Department).join(Position).filter(Department.department_id == Position.department_id).join(User).filter(User.user_id == user_data.user_id, Position.position_id == User.position_id).first()
            if not user_department:
                return HTTPException(status_code = 404, detail = {"message": "User department not found"})
            else:
                return db.query(Requisition).join(Position).filter(Position.position_id == Requisition.position_id).join(Department).filter(Department.department_id == user_department.department_id).all()
    except Exception as e:
        print(e)


# Manpower Request Analytics
@router.get("/requisitions/analytics")
def requisition_analytics(
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            user_department = db.query(Department).join(Position).filter(Department.department_id == Position.department_id).join(User).filter(User.user_id == user_data.user_id, Position.position_id == User.position_id).first()
            if not user_department:
                return HTTPException(status_code = 404, detail = {"message": "User department not found"})
            else:
                query = db.query(Requisition).join(Position).filter(Position.position_id == Requisition.position_id).join(Department).filter(Department.department_id == user_department.department_id)

                # total
                total = query.count()
                
                # For signature
                for_signature = query.filter(Requisition.request_status == "For signature").count()

                # For approval
                for_approval = query.filter(Requisition.request_status == "For approval").count()

                # Approved
                approved = query.filter(Requisition.request_status == "Approved").count()

                # Rejected for signing
                rejected_for_signing = query.filter(Requisition.request_status == "Rejected for signing").count()

                # Rejected for approval
                rejected_for_approval = query.filter(Requisition.request_status == "Rejected for approval").count()

                # Total Rejected
                total_rejected = rejected_for_signing + rejected_for_approval

                # Completed
                completed = query.filter(Requisition.request_status == "Completed").count()

                return {
                    "total": total,
                    "for_signature": for_signature,
                    "for_approval": for_approval,
                    "approved": approved,
                    "completed": completed,
                    "rejected": {
                        "total": total_rejected,
                        "for_signing": rejected_for_signing,
                        "for_approval": rejected_for_approval
                    }
                }
    except Exception as e:
        print(e)



# Get One Manpower Request
@router.get("/requisitions/{requisition_id}", response_model = deptHead.ShowManpowerRequest)
def get_one_requisition(
    requisition_id: str,
    db: Session = Depends(get_db), 
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            requisition = db.query(Requisition).filter(Requisition.requisition_id == requisition_id).first()
            if not requisition:
                return REQUISITION_NOT_FOUND_RESPONSE
            else:
                return requisition
    except Exception as e:
        print(e)


# Sign Manpower Request
@router.put("/requisitions/{requisition_id}/sign", status_code = 202)
def sign_requisition(
    requisition_id: str,
    req: deptHead.SignManpowerRequest,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            requisition = db.query(Requisition).filter(Requisition.requisition_id == requisition_id)
            if not requisition.first():
                return HTTPException(status_code=404, detail=REQUISITION_NOT_FOUND_RESPONSE)
            else:
                if req.request_status == "For approval":
                    requisition.update({
                        "request_status": req.request_status,
                        "signed_by": user_data.user_id,
                        "signed_at": text('NOW()')
                    })
                elif req.request_status == "Rejected for signing":
                    requisition.update({
                        "request_status": req.request_status,
                        "remarks": req.remarks,
                        "rejected_by": user_data.user_id,
                        "rejected_at": text('NOW()')
                    })
                db.commit()
                return {"message": "A manpower request has been signed"}
    except Exception as e:
        print(e)


# ====================================================================
# HIRED APPLICANTS
# ====================================================================


# Applicant Not Found Response
APPLICANT_NOT_FOUND_RESPONSE = {"message": "Applicant not found"}


# Get all hired applicants
@router.get("/hired-applicants", response_model=List[deptHead.ShowHiredApplicant])
def get_all_hired_applicants(
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            user_department = db.query(Department).join(Position).filter(Department.department_id == Position.department_id).join(User).filter(User.user_id == user_data.user_id, Position.position_id == User.position_id).first()
            return db.query(Applicant).filter(or_(
                Applicant.status == "Hired",
                Applicant.status == "Contract signed",
            )).join(JobPost).filter(
                Applicant.job_post_id == JobPost.job_post_id
            ).join(Requisition).filter(
                JobPost.requisition_id == Requisition.requisition_id
            ).join(Position).filter(
                Requisition.position_id == Position.position_id
            ).join(Department).filter(
                Position.department_id == Department.department_id, 
                Department.department_id ==  user_department.department_id
            ).all()
    except Exception as e:
        print(e)


# Get one hired applicant
@router.get("/hired-applicants/{applicant_id}", response_model=deptHead.ShowHiredApplicant)
def get_one_hired_applicant(
    applicant_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            user_department = db.query(Department).join(Position).filter(Department.department_id == Position.department_id).join(User).filter(User.user_id == user_data.user_id, Position.position_id == User.position_id).first()
            hired_applicant = db.query(Applicant).filter(
                Applicant.applicant_id == applicant_id,
                or_(
                    Applicant.status == "Hired",
                    Applicant.status == "Contract signed",
                )
            ).join(JobPost).filter(
                Applicant.job_post_id == JobPost.job_post_id
            ).join(Requisition).filter(
                JobPost.requisition_id == Requisition.requisition_id
            ).join(Position).filter(
                Requisition.position_id == Position.position_id
            ).join(Department).filter(
                Position.department_id == Department.department_id, 
                Department.department_id ==  user_department.department_id
            ).first()
            if not hired_applicant:
                raise HTTPException(status_code=404, detail=APPLICANT_NOT_FOUND_RESPONSE)
            else:
                return hired_applicant
    except Exception as e:
        print(e)


# Upload Signed Contract
@router.post("/upload/employment-contract", status_code=202)
def upload_employment_contract(
    file: UploadFile = File(...), 
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            orig_filename = f"{file.filename}"
            file_extension = orig_filename.split('.')[-1]
            new_filename = uuid.uuid4().hex
            file_location = f"static/app/files/employment_contracts/{new_filename}.{file_extension}"
            with open(file_location, "wb") as fileObj:
                shutil.copyfileobj(file.file, fileObj)
            return {
                "original_file": orig_filename,
                "new_file": f"{new_filename}.{file_extension}"
            }
    except Exception as e:
        print(e)
    finally:
        file.file.close()


# ====================================================================
# ONBOARDING EMPLOYEES
# ====================================================================

# Onboarding Employee Not Found Response
ONBOARDING_EMPLOYEE_NOT_FOUND = {"message": "Onboarding Employee not found"}

# Department Not Found Response
DEPARTMENT_NOT_FOUND_RESPONSE = {"message": "Department not found"}

# Add onboarding employee
@router.post("/onboarding-employees", status_code=202)
def add_onboarding_employee(
    req: deptHead.CreateOnboardingEmployee,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            applicantQuery = db.query(Applicant).filter(
                Applicant.applicant_id == req.applicant_id,
                Applicant.status == "Hired"
            )
            applicant = applicantQuery.first()
            if not applicant:
                raise HTTPException(status_code=404, detail = APPLICANT_NOT_FOUND_RESPONSE)
            else:

                # Trace and get position
                job_post = db.query(JobPost).filter(JobPost.job_post_id == applicant.job_post_id).first()
                manpower_request = db.query(Requisition).filter(Requisition.requisition_id == job_post.requisition_id).first()
                position = db.query(Position).filter(Position.position_id == manpower_request.position_id).first()
                
                # New onboarding employee
                new_onboarding_employee = OnboardingEmployee(
                    first_name = applicant.first_name,
                    middle_name = applicant.middle_name,
                    last_name = applicant.last_name,
                    suffix_name = applicant.suffix_name,
                    contact_number = applicant.contact_number,
                    email = applicant.email,
                    position_id = position.position_id,
                    employment_contract = req.employment_contract,
                    status = "Pending",
                    signed_by = user_data.user_id
                )

                # Update Applicant Status
                applicantQuery.update({"status": "Contract signed"})

                # Add new onboarding employee to database
                db.add(new_onboarding_employee)
                db.commit()
                db.refresh(new_onboarding_employee)
                return new_onboarding_employee
    except Exception as e:
        print(e)


# Get All Onboarding Employees
@router.get("/onboarding-employees", response_model=List[deptHead.ShowOnboardingEmployee])
def get_all_onboarding_employees(
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            user_info = db.query(User).filter(User.user_id == user_data.user_id).first()
            if not user_info:
                raise HTTPException(status_code=404, detail="User does not exist")
            else:
                position_id = user_info.position_id
                user_position = db.query(Position).filter(Position.position_id == position_id).first()
                if not user_position:
                    raise HTTPException(status_code=404, detail="Position does not exist")
                else:
                    department_id = user_position.department_id
                    user_department = db.query(Department).filter(Department.department_id == department_id).first()
                    if not user_department:
                        raise HTTPException(status_code=404, detail=DEPARTMENT_NOT_FOUND_RESPONSE)
                    else:
                        return db.query(OnboardingEmployee).filter(OnboardingEmployee.status == "Onboarding").join(Position).filter(Position.position_id == OnboardingEmployee.position_id).join(Department).filter(Department.department_id == user_department.department_id).all()
    except Exception as e:
        print(e)


# Onboarding Employees Analytics
@router.get("/onboarding-employees/analytics")
def onboarding_employees_analytics(
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            user_info = db.query(User).filter(User.user_id == user_data.user_id).first()
            if not user_info:
                raise HTTPException(status_code=404, detail="User does not exist")
            else:
                position_id = user_info.position_id
                user_position = db.query(Position).filter(Position.position_id == position_id).first()
                if not user_position:
                    raise HTTPException(status_code=404, detail="Position does not exist")
                else:
                    department_id = user_position.department_id
                    user_department = db.query(Department).filter(Department.department_id == department_id).first()
                    if not user_department:
                        raise HTTPException(status_code=404, detail="Deparment does not exist")
                    else:
                        total = db.query(OnboardingEmployee).filter(OnboardingEmployee.status == "Onboarding").join(Position).filter(Position.position_id == OnboardingEmployee.position_id).join(Department).filter(Department.department_id == user_department.department_id).count()
                        return {"total": total}
    except Exception as e:
        print(e)


# Get One Onboarding Employees
@router.get("/onboarding-employees/{onboarding_employee_id}", response_model=deptHead.ShowOnboardingEmployee)
def get_one_onboarding_employee(
    onboarding_employee_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            onboarding_employee = db.query(OnboardingEmployee).filter(OnboardingEmployee.onboarding_employee_id == onboarding_employee_id).first()
            if not onboarding_employee:
                raise HTTPException(status_code=404, detail=ONBOARDING_EMPLOYEE_NOT_FOUND)
            else:
                return onboarding_employee
    except Exception as e:
        print(e)


# ====================================================================
# ONBOARDING EMPLOYEE TASKS
# ====================================================================


# Onboarding Employee Task Not Found
ONBOARDING_EMPLOYEE_TASK_NOT_FOUND = {"message": "Onboarding Employee Task Not Found"}


# Get All Onboarding Employee Task
@router.get("/onboarding-employees/{onboarding_employee_id}/onboarding-tasks", response_model=List[deptHead.ShowOnboardingEmployeeTask])
def get_all_onboarding_employee_tasks(
    onboarding_employee_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            onboarding_employee = db.query(OnboardingEmployee).filter(OnboardingEmployee.onboarding_employee_id == onboarding_employee_id).first()
            if not onboarding_employee:
                raise HTTPException(status_code = 404, detail=ONBOARDING_EMPLOYEE_NOT_FOUND)
            else:
                return db.query(OnboardingEmployeeTask).filter(OnboardingEmployeeTask.onboarding_employee_id == onboarding_employee_id).all()
    except Exception as e:
        print(e)


# Get One Onboarding Employee Task
@router.get("/onboarding-employee-tasks/{onboarding_employee_task_id}", response_model=deptHead.ShowOnboardingEmployeeTask)
def get_one_onboarding_employee_tasks(
    onboarding_employee_task_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            onboarding_employee_task = db.query(OnboardingEmployeeTask).filter(OnboardingEmployeeTask.onboarding_employee_task_id == onboarding_employee_task_id).first()
            if not onboarding_employee_task:
                raise HTTPException(status_code=404, detail=ONBOARDING_EMPLOYEE_TASK_NOT_FOUND)
            else:
                return onboarding_employee_task
    except Exception as e:
        print(e)