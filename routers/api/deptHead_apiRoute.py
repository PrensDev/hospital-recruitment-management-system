# Import Packages
from sqlalchemy.sql.expression import or_
from typing import List
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session
from database import get_db
from oauth2 import authorized, get_user
from schemas import db_schemas, user_schemas as user, deptHead_schemas as deptHead
from models import User, Position, Requisition, Department, JobPost, Applicant, OnboardingTask, OnboardingEmployee, OnboardingEmployeeTask


# Router Instance
router = APIRouter(
    prefix = "/api/department-head",
    tags = ["Department Head API"]
)


# Priviledge User
AUTHORIZED_USER = "Department Head"


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
                return "User does not exist"
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
async def get_all_requisitions(
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


# Requisition Analytics
@router.get("/requisitions/analytics")
async def requisition_analytics(
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

                # Rejected for signing
                rejected_for_signing = query.filter(Requisition.request_status == "Rejected for signing").count()

                # Rejected for approval
                rejected_for_approval = query.filter(Requisition.request_status == "Rejected for approval").count()

                # Completed
                completed = query.filter(Requisition.request_status == "Completed").count()

                return {
                    "total": total,
                    "for_signature": for_signature,
                    "for_approval": for_approval,
                    "completed": completed,
                    "rejected": {
                        "for_signing": rejected_for_signing,
                        "for_approval": rejected_for_approval
                    }
                }
    except Exception as e:
        print(e)



# Get One Manpower Request
@router.get("/requisitions/{requisition_id}", response_model = deptHead.ShowManpowerRequest)
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


# Sign Manpower Request
@router.put("/requisitions/{requisition_id}/sign", status_code = 202)
async def sign_requisition(
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