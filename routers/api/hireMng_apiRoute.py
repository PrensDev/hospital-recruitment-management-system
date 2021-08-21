# Import Packages
from typing import List
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from database import get_db
from oauth2 import get_user, check_priviledge
import schemas, models


# Models
User_model = models.User


# Router Instance
router = APIRouter(
    prefix = "/api/hiring-manager",
    tags = ["Hiring Manager API"]
)


# Priviledge User
AUTHORIZED_USER = "Hiring Manager"


# User Information
@router.get("/info", response_model = schemas.UserInfo)
def get_user_info(
    db: Session = Depends(get_db), 
    user_data: schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        user_info = db.query(models.User).filter(models.User.user_id == user_data.user_id)
        if not user_info.first():
            return "User does not exist"
        else:
            return user_info.first()
    except Exception as e:
        print(e)


# ====================================================================
# REQUISITIONS/MANPOWER REQUESTS
# ====================================================================


# Requisition Not Found Response
REQUISITION_NOT_FOUND_RESPONSE = {"message": "Requisition not found"}


# Get All Requisitions
@router.get("/requisitions", response_model = List[schemas.ShowManpowerRequest])
def get_all_requisitions(
    db: Session = Depends(get_db),
    user_data: schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(models.Requisition).all()
    except Exception as e:
        print(e)


# Get One Requisition
@router.get("/requisitions/{requisition_id}", response_model = schemas.ShowManpowerRequest)
def get_one_requisition(
    requisition_id: str, 
    db: Session = Depends(get_db),
    user_data: schemas.User = Depends(get_user)

):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(models.Requisition).filter(models.Requisition.requisition_id == requisition_id).first()
    except Exception as e:
        print(e)


# Update Requisition
@router.put("/requisitions/{requisition_id}")
def update_requisition(
    requisition_id: str, 
    req: schemas.ManpowerRequestStatus,
    db: Session = Depends(get_db),
    user_data: schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        requisition = db.query(models.Requisition).filter(models.Requisition.requisition_id == requisition_id)
        if not requisition.first():
            raise HTTPException(status_code = 404, detail = REQUISITION_NOT_FOUND_RESPONSE)
        else:
            requisition.update({
                "request_status": req.request_status,
                "remarks": req.remarks,
                "reviewed_by": user_data.user_id,
                "reviewed_at": req.reviewed_at
            })
            db.commit()
            return {"message": "A man power request has been updated"}
    except Exception as e:
        print(e)