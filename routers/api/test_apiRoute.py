# Import Packages
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from hashing import Hash
from database import get_db
from schemas import db_schemas

import models


# Router Instance
router = APIRouter(
    prefix = "/test",
    tags = ["Test API"]
)


# =========================================================================
# DEPARTMENTS
# =========================================================================


# Create Department
@router.post("/departments", status_code = 201)
def create_department(req: db_schemas.Department, db: Session = Depends(get_db)):
    try:
        new_department = models.Department(
            name = req.name,
            description = req.description
        )
        db.add(new_department)
        db.commit()
        db.refresh(new_department)
        return {
            "data": new_department,
            "msg": "A new department has been added"
        }
    except Exception as e:
        return {"error": e}


# Get all departments
@router.get("/departments")
def get_all_departments(db: Session = Depends(get_db)):
    try:
        return db.query(models.Department).all()
    except Exception as e:
        print(e)

# Get one departments
@router.get("/departments/{department_id}")
def get_one_departments(department_id, db: Session = Depends(get_db)):
    return db.query(models.Department).filter(models.Department.department_id == department_id).first()


# =========================================================================
# POSITION
# =========================================================================

# Create Position Per Department
@router.post("/departments/{department_id}/positions")
def create_position(department_id, req: db_schemas.Position, db: Session = Depends(get_db)):
    try:
        new_position = models.Position(
            department_id = department_id,
            name = req.name,
            description = req.description
        )
        db.add(new_position)
        db.commit()
        db.refresh(new_position)
        return {
            "data": new_position,
            "msg": "A new position has been added"
        }
    except Exception as e:
        return {"error": e}

# Get All Department Position
@router.get("/departments/{department_id}/positions", response_model = db_schemas.ShowDepartmentPosition)
def get_all_department_positions(department_id: str, db: Session = Depends(get_db)):
    try:
        return db.query(models.Department).filter(models.Department.department_id == department_id).first()
    except Exception as e:
        print(e)

# Get All Positions
@router.get("/positions")
def get_all_positions(db: Session = Depends(get_db)):
    return db.query(models.Position).all()


# =========================================================================
# USER
# =========================================================================


# Create User
@router.post("/users", status_code = 201)
def create_user(req: db_schemas.User, db: Session = Depends(get_db)):
    try:
        new_user = models.User(
            first_name = req.first_name, 
            middle_name = req.middle_name, 
            last_name = req.last_name, 
            suffix_name = req.suffix_name, 
            position_id = req.position_id,
            email = req.email, 
            password = Hash.encrypt(req.password),
            user_type = req.user_type
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {
            "data": new_user,
            "msg": "A new user has been added"
        }
    except Exception as e:
        return {"error": e}


# Get All Users
@router.get("/users")
def get_all_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()