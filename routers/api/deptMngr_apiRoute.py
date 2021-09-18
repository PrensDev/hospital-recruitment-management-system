# Import Packages
from sqlalchemy.orm.base import state_str
from sqlalchemy.sql.expression import or_
from routers.api.hireMng_apiRoute import APPLICANT_NOT_FOUND_RESPONSE
from typing import List, Text
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from database import get_db
from oauth2 import get_user, check_priviledge
from schemas import db_schemas

import models


# Models
User                    = models.User
Position                = models.Position
Requisition             = models.Requisition
Department              = models.Department
JobPost                 = models.JobPost
Applicant               = models.Applicant
OnboardingTask          = models.OnboardingTask
OnboardingEmployee      = models.OnboardingEmployee
OnboardingEmployeeTask  = models.OnboardingEmployeeTask

# Router Instance
router = APIRouter(
    prefix = "/api/department-manager",
    tags = ["Department Manager API"]
)


# Priviledge User
AUTHORIZED_USER = "Department Manager"


# User Information
@router.get("/info", response_model = db_schemas.UserInfo)
def get_user_info(
    db: Session = Depends(get_db), 
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        user_info = db.query(User).filter(User.user_id == user_data.user_id)
        if not user_info.first():
            return "User does not exist"
        else:
            return user_info.first()
    except Exception as e:
        print(e)


# ====================================================================
# REQUISITIONS/MANPOWER REQUESTS
# ====================================================================


# Requisition/Manpower Request Not Found Response
REQUISITION_NOT_FOUND_RESPONSE = {"message": "Manpower request was not found"}


# Create Manpower Request
@router.post("/requisitions", status_code = 201)
async def create_manpower_request(
    req: db_schemas.CreateManpowerRequest,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        new_requisition = Requisition(
            requested_by = user_data.user_id,
            position_id = req.position_id,
            employment_type = req.employment_type,
            request_nature = req.request_nature,
            staffs_needed = req.staffs_needed,
            min_monthly_salary = req.min_monthly_salary,
            max_monthly_salary = req.max_monthly_salary,
            content = req.content,
            request_status = "For Review",
            deadline = req.deadline
        )
        db.add(new_requisition)
        db.commit()
        db.refresh(new_requisition)
        return {
            "data": new_requisition,
            "message": "A manpower request has been submitted successfully"
        }
    except Exception as e:
        print(e)


# Get All Manpower Request
@router.get("/requisitions", response_model = List[db_schemas.ShowManpowerRequest])
async def get_all_requisitions(
    db: Session = Depends(get_db), 
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(Requisition).filter(Requisition.requested_by == user_data.user_id).all()
    except Exception as e:
        print(e)


# Manpower Request Analytics
@router.get("/requisitions/analytics")
async def requisition_analytics(
    db: Session = Depends(get_db), 
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        query = db.query(Requisition)

        total = query.filter(Requisition.requested_by == user_data.user_id).count()
        
        for_review_count = query.filter(
            Requisition.request_status == "For Review",
            Requisition.requested_by == user_data.user_id
        ).count()
        
        approved = query.filter(
            Requisition.request_status == "Approved",
            Requisition.requested_by == user_data.user_id
        ).count()
        
        rejected = query.filter(
            Requisition.request_status == "Rejected",
            Requisition.requested_by == user_data.user_id
        ).count()
        
        completed = query.filter(
            Requisition.request_status == "Completed",
            Requisition.requested_by == user_data.user_id
        ).count()
        
        return {
            "total": total,
            "for_review": for_review_count,
            "approved": approved,
            "rejected": rejected,
            "completed": completed
        }
    except Exception as e:
        print(e)


# Requisitions and Hired Applicants
@router.get("/requisitions/hired-applicants", response_model=List[db_schemas.ManpowerRequestsWithHiredApplicants])
async def get_all_requisitions_and_hired_applicants(
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(Requisition).filter(Requisition.requested_by == user_data.user_id).join(JobPost).filter(JobPost.requisition_id == Requisition.requisition_id).join(Applicant).filter(Applicant.job_post_id == JobPost.job_post_id, Applicant.status == "Hired").all()
    except Exception as e:
        print(e)


# Hired Applicants Per Request
@router.get("/requisitions/hired-applicants/{requisition_id}")
async def get_all_applicants_per_request(
    requisition_id: str,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        requisition = db.query(Requisition).filter(Requisition.requisition_id == requisition_id).first()
        if not requisition:
            raise HTTPException(status_code=404, detail = REQUISITION_NOT_FOUND_RESPONSE)
        else:
            return db.query(Applicant).filter(
                or_(
                    Applicant.status == "Hired",
                    Applicant.status == "Onboarding"
                )
            ).join(JobPost).filter(JobPost.job_post_id == Applicant.job_post_id).join(Requisition).filter(Requisition.requisition_id == requisition_id).all()
    except Exception as e:
        print(e)


# Get One Manpower Request
@router.get("/requisitions/{requisition_id}", response_model = db_schemas.ShowManpowerRequest)
async def get_one_requisition(
    requisition_id: str,
    db: Session = Depends(get_db), 
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        requisition = db.query(Requisition).filter(Requisition.requisition_id == requisition_id).first()
        if not requisition:
            return REQUISITION_NOT_FOUND_RESPONSE
        else:
            return requisition
    except Exception as e:
        print(e)


# Update Manpower Request
@router.put("/requisitions/{requisition_id}", status_code = 202)
async def update_requisition(
    requisition_id: str,
    req: db_schemas.CreateManpowerRequest,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        requisition = db.query(Requisition).filter(Requisition.requisition_id == requisition_id)
        if not requisition.first():
            raise HTTPException(status_code = 404, detail = REQUISITION_NOT_FOUND_RESPONSE) 
        else:
            requisition.update(req.dict())
            db.commit()
            return {"message": "A requisition has been updated"}
    except Exception as e:
        print(e)


# Delete Manpower Request
@router.delete("/requisitions/{requisition_id}")
async def delete_requisition(
    requisition_id: str,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        requisition = db.query(Requisition).filter(Requisition.requisition_id == requisition_id)
        if not requisition.first():
            raise HTTPException(status_code = 404, detail = REQUISITION_NOT_FOUND_RESPONSE) 
        else:
            requisition.delete(synchronize_session = False)
            db.commit()
            return {"message": "A requisition is successfully deleted"}
    except Exception as e:
        print(e) 


# ====================================================================
# DEPARTMENT POSITIONS
# ====================================================================


# Department Positions
@router.get("/department/positions", response_model = db_schemas.ShowDepartmentPosition)
async def department_positions(
    db: Session = Depends(get_db), 
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
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
                    return user_department
    except Exception as e:
        print(e)


# ====================================================================
#  APPLICANTS
# ====================================================================


# Get One Hired Applicant
@router.get("/hired-applicants/{applicant_id}")
async def get_one_hired_applicant(
    applicant_id: str,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        applicant = db.query(Applicant).filter(
            Applicant.applicant_id == applicant_id,
            Applicant.status == "Hired"
        ).first()
        if not applicant:
            raise HTTPException(status_code=404, detail = APPLICANT_NOT_FOUND_RESPONSE)
        else:
            job_post = db.query(JobPost).filter(JobPost.job_post_id == applicant.job_post_id).first()
            manpower_request = db.query(Requisition).filter(Requisition.requisition_id == job_post.requisition_id).first()
            position = db.query(Position).filter(Position.position_id == manpower_request.position_id).first()
            return {
                "applicant": applicant,
                "position": position
            }
    except Exception as e:
        print(e)


# Change Applicant Status
@router.put("/applicants/{applicant_id}")
async def change_applicant_status(
    applicant_id: str,
    req: db_schemas.ChangeApplicantStatus,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        applicant = db.query(Applicant).filter(Applicant.applicant_id == applicant_id)
        if not applicant.first():
            raise HTTPException(status_code=404, detail=APPLICANT_NOT_FOUND_RESPONSE)
        else:
            applicant.update(req.dict())
            db.commit()
            return {"message": "Applicant status has been updated"}
    except Exception as e:
        print(e)


# ====================================================================
# ONBOARDING TASKS
# ====================================================================


# Onboarding Task Not Found Response
ONBOARDING_TASK_NOT_FOUND = {"message": "Onboarding Task not found"}


# Add Onboarding task
@router.post("/onboarding-tasks")
async def add_onboarding_task(
    req: db_schemas.CreateOnboardingTask,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
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
                    new_onboarding_task = OnboardingTask(
                        title = req.title,
                        description = req.description,
                        task_type = req.task_type,
                        department_id = department_id,
                        added_by = user_data.user_id,
                        updated_by = user_data.user_id
                    )
                    db.add(new_onboarding_task)
                    db.commit()
                    db.refresh(new_onboarding_task)
                    return {
                        "data": new_onboarding_task,
                        "message": "New onbaording task"
                    }
    except Exception as e:
        print(e)


# Get All General Onboarding Tasks
@router.get("/onboarding-tasks/general", response_model=List[db_schemas.ShowOnboardingTask])
async def get_all_general_onboarding_tasks(
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
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
                    return db.query(OnboardingTask).filter(OnboardingTask.department_id == department_id, OnboardingTask.task_type == "General").all()
    except Exception as e:
        print(e)

# Get One General Onboarding Task
@router.get("/onboarding-tasks/{onboarding_task_id}", response_model=db_schemas.ShowOnboardingTask)
async def get_one_onboarding_task(
    onboarding_task_id: str,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
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
                    onboarding_task = db.query(OnboardingTask).filter(
                        OnboardingTask.department_id == department_id, 
                        OnboardingTask.task_type == "General", 
                        OnboardingTask.onboarding_task_id == onboarding_task_id
                    ).first()
                    if not onboarding_task:
                        raise HTTPException(status_code=404, detail=ONBOARDING_TASK_NOT_FOUND)
                    else:
                        return onboarding_task
    except Exception as e:
        print(e)



# ====================================================================
# ONBOARDING EMPLOYEE
# ====================================================================


# Onboarding employee not found
ONBOARDING_EMPLOYEE_NOT_FOUND = {"message": "Onboarding employee not found"}


# Add onboarding employees
@router.post("/onboarding-employees")
async def add_onboarding_employee(
    req: db_schemas.CreateOnboardingEmployee,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        new_onboarding_employment = OnboardingEmployee(
            first_name = req.first_name,
            middle_name = req.middle_name,
            last_name = req.last_name,
            suffix_name = req.suffix_name,
            contact_number = req.contact_number,
            email = req.email,
            position_id = req.position_id,
            employment_start_date = req.employment_start_date,
            added_by = user_data.user_id,
            updated_by = user_data.user_id
        )
        db.add(new_onboarding_employment)
        db.commit()
        db.refresh(new_onboarding_employment)
        return {
            "data": new_onboarding_employment,
            "message": "A new onboarding employee has been created"
        }
    except Exception as e:
        print(e)


# Get All Onboarding Employees
@router.get("/onboarding-employees", response_model=List[db_schemas.OnboardingEmployeeInfo])
async def get_all_onboarding_employees(
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
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
                    return db.query(OnboardingEmployee).join(Position).filter(Position.position_id == OnboardingEmployee.position_id).join(Department).filter(Department.department_id == user_department.department_id).all()
    except Exception as e:
        print(e)


# Onboarding Employees Analytics
@router.get("/onboarding-employees/analytics")
async def onboarding_employees_analytics(
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
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
                    total = db.query(OnboardingEmployee).join(Position).filter(Position.position_id == OnboardingEmployee.position_id).join(Department).filter(Department.department_id == user_department.department_id).count()
                    return {"total": total}
    except Exception as e:
        print(e)


# Get One Onboarding Employees
@router.get("/onboarding-employees/{onboarding_employee_id}", response_model=db_schemas.OnboardingEmployeeInfo)
async def get_one_onboarding_employee(
    onboarding_employee_id: str,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        user_info = db.query(User).filter(User.user_id == user_data.user_id).first()
        if not user_info:
            raise HTTPException(status_code=404, detail="User does not exist")
        else:
            onboarding_employee = db.query(OnboardingEmployee).filter(OnboardingEmployee.onboarding_employee_id == onboarding_employee_id).first()
            if not onboarding_employee:
                raise HTTPException(status_code=404, detail=ONBOARDING_EMPLOYEE_NOT_FOUND)
            else:
                return onboarding_employee
    except Exception as e:
        print(e)


# ====================================================================
# ONBOARDING TASKS
# ====================================================================


# Onboarding Employee Task not found
ONBOARDING_EMPLOYEE_TASK_NOT_FOUND = {"message": "Onboarding Employee Task not found"}


# Add Onboarding Employee Task
@router.post("/onboarding-employees/{onboarding_employee_id}/onboarding-tasks")
async def add_employee_onboarding_task(
    onboarding_employee_id: str,
    req: db_schemas.CreateOnboardingEmployeeTask,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        onboarding_employee = db.query(OnboardingEmployee).filter(OnboardingEmployee.onboarding_employee_id == onboarding_employee_id).first()
        if not onboarding_employee:
            raise HTTPException(status_code = 404, detail=ONBOARDING_EMPLOYEE_NOT_FOUND)
        else:
            new_onboarding_employee_task = OnboardingEmployeeTask(
                onboarding_employee_id = onboarding_employee_id,
                onboarding_task_id = req.onboarding_task_id,
                start_at = req.start_at,
                end_at = req.end_at,
                assigned_by = user_data.user_id,
                status = "On Going"
            )
            db.add(new_onboarding_employee_task)
            db.commit()
            db.refresh(new_onboarding_employee_task)
            return {
                "data": new_onboarding_employee_task,
                "message": "New onboarding task is added"
            }
    except Exception as e:
        print(e)


# Get All Onabording Employee Task
@router.get("/onboarding-employees/{onboarding_employee_id}/onboarding-tasks", response_model=List[db_schemas.ShowOnboardingEmployeeTask])
async def get_all_onboarding_employee_tasks(
    onboarding_employee_id: str,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        onboarding_employee = db.query(OnboardingEmployee).filter(OnboardingEmployee.onboarding_employee_id == onboarding_employee_id).first()
        if not onboarding_employee:
            raise HTTPException(status_code = 404, detail=ONBOARDING_EMPLOYEE_NOT_FOUND)
        else:
            return db.query(OnboardingEmployeeTask).filter(OnboardingEmployeeTask.onboarding_employee_id == onboarding_employee_id).all()
    except Exception as e:
        print(e)


# Get One Onboarding Employee Task
@router.get("/onboarding-employee-tasks/{onboarding_employee_task_id}", response_model=db_schemas.ShowOnboardingEmployeeTask)
async def get_one_onboarding_employee_tasks(
    onboarding_employee_task_id: str,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        onboarding_employee_task = db.query(OnboardingEmployeeTask).filter(OnboardingEmployeeTask.onboarding_employee_task_id == onboarding_employee_task_id).first()
        if not onboarding_employee_task:
            raise HTTPException(status_code=404, detail=ONBOARDING_EMPLOYEE_TASK_NOT_FOUND)
        else:
            return onboarding_employee_task
    except Exception as e:
        print(e)


# Update Onboarding Employee Task Status
@router.put("/onboarding-employee-tasks/{onboarding_employee_task_id}")
async def update_onboarding_employee_task_status(
    onboarding_employee_task_id: str,
    req: db_schemas.UpdatedOnboardingEmployeeTaskStatus,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        onboarding_task = db.query(OnboardingEmployeeTask).filter(OnboardingEmployeeTask.onboarding_employee_task_id == onboarding_employee_task_id)
        if not onboarding_task.first():
            raise HTTPException(status_code=404, detail=ONBOARDING_EMPLOYEE_TASK_NOT_FOUND)
        else:
            onboarding_task.update(req.dict())
            db.commit()
            return {"message": "An onboarding employee task has been updated"}
    except Exception as e:
        print(e)