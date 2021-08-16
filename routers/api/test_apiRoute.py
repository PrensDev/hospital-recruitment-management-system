# Import Packages
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from hashing import Hash
from database import get_db
import schemas, models


# Router Instance
router = APIRouter(
    prefix = "/test",
    tags = ["Test"]
)


# Create User
@router.post('/users', status_code = 201)
def create_user(req: schemas.User, db: Session = Depends(get_db)):
    new_user = models.User(
        first_name = req.first_name, 
        middle_name = req.middle_name, 
        last_name = req.last_name, 
        suffix_name = req.suffix_name, 
        position_id = req.position_id,
        email = req.email, 
        password = Hash.encrypt(req.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# Get All Users
@router.get('/users')
def get_one_user(id, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == id).first()
    if not user:
        raise HTTPException(status_code = 404, detail = f"User not found")
    else:
        return user