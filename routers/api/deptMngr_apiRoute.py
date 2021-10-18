# Import Packages
from sqlalchemy.sql.expression import or_
from typing import List, Text
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from database import get_db
from oauth2 import authorized, get_user
from schemas import db_schemas, user_schemas as user, deptMngr_schemas as deptMngr
from models import *


# Router Instance
router = APIRouter(
    prefix = "/api/department-manager",
    tags = ["Department Manager API"]
)


# Priviledge User
AUTHORIZED_USER = "Department Manager"


# User Information
@router.get("/info", response_model = user.ShowUser)
async def get_user_info(
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


# Create Manpower Request
@router.post("/requisitions", status_code = 201)
async def create_manpower_request(
    req: deptMngr.CreateManpowerRequest,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            new_requisition = Requisition(
                **req.dict(),
                requested_by = user_data.user_id, 
                request_status = "For signature"
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
@router.get("/requisitions", response_model = List[deptMngr.ShowManpowerRequest])
async def get_all_requisitions(
    db: Session = Depends(get_db), 
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(Requisition).filter(Requisition.requested_by == user_data.user_id).all()
    except Exception as e:
        print(e)


# Manpower Request Analytics
@router.get("/requisitions/analytics")
async def requisition_analytics(
    db: Session = Depends(get_db), 
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            query = db.query(Requisition)

            # Total Count
            total = query.filter(Requisition.requested_by == user_data.user_id).count()
            
            # For signature
            for_signature = query.filter(
                Requisition.request_status == "For signature",
                Requisition.requested_by == user_data.user_id
            ).count()

            # For Review Count
            for_approval = query.filter(
                Requisition.request_status == "For approval",
                Requisition.requested_by == user_data.user_id
            ).count()
            
            # Approved
            approved = query.filter(
                Requisition.request_status == "Approved",
                Requisition.requested_by == user_data.user_id
            ).count()
            
            # Rejected
            rejected = query.filter(
                Requisition.request_status == "Rejected",
                Requisition.requested_by == user_data.user_id
            ).count()
            
            # Completed
            completed = query.filter(
                Requisition.request_status == "Completed",
                Requisition.requested_by == user_data.user_id
            ).count()
            
            return {
                "total": total,
                "for_signature": for_signature,
                "for_approval": for_approval,
                "approved": approved,
                "rejected": rejected,
                "completed": completed
            }
    except Exception as e:
        print(e)


# Get One Manpower Request
@router.get("/requisitions/{requisition_id}", response_model = deptMngr.ShowManpowerRequest)
async def get_one_requisition(
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


# Update Manpower Request
@router.put("/requisitions/{requisition_id}", status_code = 202)
async def update_requisition(
    requisition_id: str,
    req: deptMngr.UpdateManpowerRequest,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
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
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            requisition = db.query(Requisition).filter(
                Requisition.requisition_id == requisition_id,
                Requisition.requested_by == user_data.user_id
            )
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


# Department Not Found Response
DEPARTMENT_NOT_FOUND_RESPONSE = {"message": "Department not found"}


# Department Positions
@router.get("/department/positions", response_model = List[deptMngr.ShowDepartmentPosition])
async def department_positions(
    db: Session = Depends(get_db), 
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            department = db.query(Department).join(Position).filter(Department.department_id == Position.department_id).join(User).filter(User.user_id == user_data.user_id, User.position_id == Position.position_id).first()
            if not department:
                raise HTTPException(status_code=404, detail=DEPARTMENT_NOT_FOUND_RESPONSE)
            else:
                return db.query(Position).join(Department).filter(Department.department_id == department.department_id).all()
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
    req: deptMngr.CreateOnboardingTask,
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
                        new_onboarding_task = OnboardingTask(
                            **req.dict(),
                            department_id = department_id,
                            added_by = user_data.user_id,
                            updated_by = user_data.user_id
                        )
                        db.add(new_onboarding_task)
                        db.commit()
                        db.refresh(new_onboarding_task)
                        return {"message": "New onboarding task has been added"}
    except Exception as e:
        print(e)


# Get All General Onboarding Tasks
@router.get("/onboarding-tasks/general", response_model=List[deptMngr.ShowOnboardingTask])
async def get_all_general_onboarding_tasks(
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
                        return db.query(OnboardingTask).filter(
                            OnboardingTask.department_id == department_id,
                            OnboardingTask.is_general == True
                        ).all()
    except Exception as e:
        print(e)


# Get All General Onboarding Tasks for New Employees
@router.get("/onboarding-tasks/general/for-new-employees", response_model=List[deptMngr.ShowOnboardingTask])
async def get_all_general_onboarding_tasks(
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
                        return db.query(OnboardingTask).filter(
                            OnboardingTask.department_id == department_id, 
                            OnboardingTask.task_type == "For new employees",
                            OnboardingTask.is_general == True
                        ).all()
    except Exception as e:
        print(e)


# Get All General Onboarding Tasks for the Team
@router.get("/onboarding-tasks/general/for-the-team", response_model=List[deptMngr.ShowOnboardingTask])
async def get_all_general_onboarding_tasks(
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
                        return db.query(OnboardingTask).filter(
                            OnboardingTask.department_id == department_id, 
                            OnboardingTask.task_type == "For the team",
                            OnboardingTask.is_general == True
                        ).all()
    except Exception as e:
        print(e)


# Get All General Onboarding Tasks for Department Manager
@router.get("/onboarding-tasks/general/for-department-manager", response_model=List[deptMngr.ShowOnboardingTask])
async def get_all_general_onboarding_tasks(
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
                        return db.query(OnboardingTask).filter(
                            OnboardingTask.department_id == department_id, 
                            OnboardingTask.task_type == "For department manager",
                            OnboardingTask.is_general == True
                        ).all()
    except Exception as e:
        print(e)


# Get One General Onboarding Task
@router.get("/onboarding-tasks/{onboarding_task_id}", response_model=deptMngr.ShowOnboardingTask)
async def get_one_onboarding_task(
    onboarding_task_id: str,
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
# HIRED APPLICANTS
# ====================================================================


# Applicant not found response
APPLICANT_NOT_FOUND_RESPONSE = {"message": "Applicant not found"}


# Get all hired applicants
@router.get("/hired-applicants", response_model=List[deptMngr.ShowHiredApplicant])
async def get_all_hired_applicants(
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(OnboardingEmployee).filter(OnboardingEmployee.status == "Pending").all()
    except Exception as e:
        print(e)


# Get one hired applicant
@router.get("/hired-applicants/{onboarding_employee_id}", response_model=deptMngr.ShowHiredApplicant)
async def get_all_hired_applicants(
    onboarding_employee_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            onboarding_employee = db.query(OnboardingEmployee).filter(
                OnboardingEmployee.onboarding_employee_id == onboarding_employee_id,
                OnboardingEmployee.status == "Pending"
            ).first()
            if not onboarding_employee: 
                raise HTTPException(status_code=404, detail=APPLICANT_NOT_FOUND_RESPONSE)
            else:
                return onboarding_employee
    except Exception as e:
        print(e)


# ====================================================================
# ONBOARDING EMPLOYEE
# ====================================================================


# Onboarding employee not found
ONBOARDING_EMPLOYEE_NOT_FOUND = {"message": "Onboarding employee not found"}


# Get All Onboarding Employees
@router.get("/onboarding-employees", response_model=List[deptMngr.ShowOnboardingEmployee])
async def get_all_onboarding_employees(
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
async def onboarding_employees_analytics(
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
@router.get("/onboarding-employees/{onboarding_employee_id}", response_model=deptMngr.ShowOnboardingEmployee)
async def get_one_onboarding_employee(
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


# Update Onboarding Employee
@router.put("/onboarding-employees/{onboarding_employee_id}", status_code=202)
async def update_onboarding_employee(
    onboarding_employee_id: str,
    req: deptMngr.UpdateOnboardingEmployee,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            onboarding_employee = db.query(OnboardingEmployee).filter(OnboardingEmployee.onboarding_employee_id == onboarding_employee_id)
            if not onboarding_employee.first():
                raise HTTPException(status_code=404, detail=ONBOARDING_EMPLOYEE_NOT_FOUND)
            else:
                onboarding_employee.update(req.dict())
                db.commit()
                return {"An onboarding employee record is succesfully updated"}
    except Exception as e:
        print(e)


# ====================================================================
# ONBOARDING EMPLOYEE TASKS
# ====================================================================


# Onboarding Employee Task not found
ONBOARDING_EMPLOYEE_TASK_NOT_FOUND = {"message": "Onboarding Employee Task not found"}


# Add Onboarding Employee Task
@router.post("/onboarding-employees/{onboarding_employee_id}/onboarding-tasks")
async def add_employee_onboarding_task(
    onboarding_employee_id: str,
    req: db_schemas.CreateOnboardingEmployeeTask,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
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
                    status = "Pending"
                )
                db.add(new_onboarding_employee_task)
                db.commit()
                db.refresh(new_onboarding_employee_task)
                return {
                    "data": new_onboarding_employee_task,
                    "message": "New onboarding employee task is added"
                }
    except Exception as e:
        print(e)


# Get All Onboarding Employee Task
@router.get("/onboarding-employees/{onboarding_employee_id}/onboarding-tasks", response_model=List[deptMngr.ShowOnboardingEmployeeTask])
async def get_all_onboarding_employee_tasks(
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
@router.get("/onboarding-employee-tasks/{onboarding_employee_task_id}", response_model=deptMngr.ShowOnboardingEmployeeTask)
async def get_one_onboarding_employee_tasks(
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


# Update Onboarding Employee Task Status
@router.put("/onboarding-employee-tasks/{onboarding_employee_task_id}", status_code=202)
async def update_onboarding_employee_task_status(
    onboarding_employee_task_id: str,
    req: db_schemas.UpdatedOnboardingEmployeeTaskStatus,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            onboarding_task = db.query(OnboardingEmployeeTask).filter(OnboardingEmployeeTask.onboarding_employee_task_id == onboarding_employee_task_id)
            if not onboarding_task.first():
                raise HTTPException(status_code=404, detail=ONBOARDING_EMPLOYEE_TASK_NOT_FOUND)
            else:
                onboarding_task.update(req.dict())
                db.commit()
                return {"message": "An onboarding employee task has been updated"}
    except Exception as e:
        print(e)
