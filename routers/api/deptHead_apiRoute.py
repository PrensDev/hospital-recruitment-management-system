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
    prefix = "/api/department_head",
    tags = ["Department Head API"]
)


# User Information
@router.get("/info", response_model = schemas.UserInfo)
def get_user_info(db: Session = Depends(get_db), user_data: schemas.User = Depends(get_user)):
    check_priviledge(user_data, "Department Head")
    user_info = db.query(User_model).filter(User_model.user_id == user_data.user_id)
    if not user_info.first():
        return "User does not exist"
    else:
        return user_info.first()
 