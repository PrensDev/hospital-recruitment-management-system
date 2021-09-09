# Import Packages
from typing import List
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from database import get_db
from oauth2 import get_user, check_priviledge
from schemas import db_schemas

import models


# Models
User        = models.User
Position    = models.Position
Requisition = models.Requisition
Department  = models.Department
JobPost     = models.JobPost
Applicant   = models.Applicant


# Router Instance
router = APIRouter(
    prefix = "/api/department-head",
    tags = ["Department Head API"]
)


# Priviledge User
AUTHORIZED_USER = "Department Head"


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
            return db.query(Applicant).filter(Applicant.status == "Hired").join(JobPost).filter(JobPost.job_post_id == Applicant.job_post_id).join(Requisition).filter(Requisition.requisition_id == requisition_id).all()
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
