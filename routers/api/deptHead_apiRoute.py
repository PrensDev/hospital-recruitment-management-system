# Import Packages
from sqlalchemy.sql.expression import or_
from typing import List, Text
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from database import get_db
from oauth2 import authorized, get_user
from schemas import db_schemas, user_schemas as user, deptMngr_schemas as deptMngr
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

