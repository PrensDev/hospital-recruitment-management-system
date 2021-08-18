# Import Packages
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
    prefix = "/api/department-head",
    tags = ["Department Head API"]
)


# Priviledge User
AUTHORIZED_USER = "Department Head"


# User Information
@router.get("/info", response_model = schemas.UserInfo)
def get_user_info(db: Session = Depends(get_db), active_user: schemas.User = Depends(get_user)):
    try:
        # check_priviledge(user_data, AUTHORIZED_USER)
        user_info = db.query(User_model).filter(User_model.user_id == active_user.user_id)
        if not user_info.first():
            return "User does not exist"
        else:
            return user_info.first()
    except Exception as e:
        print(e)


# Create Manpower Request
@router.post("/requisitions", status_code = 201)
def create_manpower_request(
    req: schemas.CreateManpowerRequest,
    db: Session = Depends(get_db)
):
    try:
        new_requisition = models.Requisition(
            requested_by = req.requested_by,
            position_id = req.position_id,
            employment_type = req.employment_type,
            request_nature = req.request_nature,
            staffs_needed = req.staffs_needed,
            min_monthly_salary = req.min_monthly_salary,
            max_monthly_salary = req.max_monthly_salary,
            content = req.content,
            request_status = req.request_status,
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
@router.get("/requisitions/{user_id}")
def get_all_requisitions(
    user_id: str,
    db: Session = Depends(get_db), 
    # user_data: schemas.User = Depends(get_user)
):
    try:
        # check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(models.Requisition).filter(models.Requisition.requested_by == user_id).all()
    except Exception as e:
        print(e)


# Get One Manpower Request
@router.get("/requisitions/{requisition_id}")
def get_one_requisition(
    requisition_id: str,
    db: Session = Depends(get_db), 
    # user_data: schemas.User = Depends(get_user)
):
    try:
        # check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(models.Requisition).filter(models.Requisition.requisition_id == requisition_id).first()
    except Exception as e:
        print(e)