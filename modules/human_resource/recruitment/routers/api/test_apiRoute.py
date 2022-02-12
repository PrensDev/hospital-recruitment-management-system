# Import Packages
from typing import List
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from hashing import Hash
from database import get_db

# Import Models and Schemas
from modules.human_resource.recruitment.models._base import *
from modules.human_resource.recruitment.schemas \
    import test_schemas as test, user_schemas as user


# Router Instance
router = APIRouter(
    prefix = "/test",
    tags = ["Test API"]
)


# =========================================================================
# DEPARTMENTS
# =========================================================================


# Department not found response
DEPARTMENT_NOT_FOUND_RESPONSE = {"message": "Department Not Found"}


# Create Department
@router.post("/departments", status_code = 201)
def create_department(req: test.CreateDepartment, db: Session = Depends(get_db)):
    try:
        new_department = Department(**req.dict())
        db.add(new_department)
        db.commit()
        db.refresh(new_department)
        return {
            "data": new_department,
            "msg": "A new department has been added"
        }
    except Exception as e:
        print(e)


# Get all departments
@router.get("/departments", response_model = List[test.ShowDepartment])
def get_all_departments(db: Session = Depends(get_db)):
    try:
        return db.query(Department).all()
    except Exception as e:
        print(e)


# Get one departments
@router.get("/departments/{department_id}", response_model = test.ShowDepartment)
def get_one_departments(department_id, db: Session = Depends(get_db)):
    try:
        department = db.query(Department).filter(Department.department_id == department_id).first()
        if not department:
            raise HTTPException(status_code = 404, detail = DEPARTMENT_NOT_FOUND_RESPONSE)
        else:
            return department
    except Exception as e:
        print(e)


# =========================================================================
# SUB DEPARTMENTS
# =========================================================================


SUB_DEPARTMENT_NOT_FOUND_RESPONSE = {"message": "Sub-department Not Found"}



# =========================================================================
# POSITION
# =========================================================================


# # Create Position Per Department
# @router.post("/departments/{department_id}/positions")
# def create_position(department_id, req: user.CreatePosition, db: Session = Depends(get_db)):
#     try:
#         department = db.query(Department).filter(Department.department_id == department_id).first()
#         if not department:
#             raise HTTPException(status_code = 404, detail = DEPARTMENT_NOT_FOUND_RESPONSE)
#         else:
#             new_position = Position(department_id = department_id, **req.dict())
#             db.add(new_position)
#             db.commit()
#             db.refresh(new_position)
#             return {
#                 "data": new_position,
#                 "msg": "A new position has been added"
#             }
#     except Exception as e:
#         return {"error": e}


# # Get All Department Position
# @router.get("/departments/{department_id}/positions", response_model = test.ShowDepartmentPosition)
# def get_all_department_positions(department_id: str, db: Session = Depends(get_db)):
#     try:
#         return db.query(Department).filter(Department.department_id == department_id).first()
#     except Exception as e:
#         print(e)


# # Get All Positions
# @router.get("/positions", response_model = List[user.ShowPosition])
# def get_all_positions(db: Session = Depends(get_db)):
#     try:
#         return db.query(Position).all()
#     except Exception as e:
#         print(e)


# # =========================================================================
# # EMPLOYMENT TYPE
# # =========================================================================

# @router.post("/employment-types")
# def create_employment_type(req: test.CreateEmploymentType, db: Session = Depends(get_db)):
#     try:
#         new_employment_type = EmploymentType(**req.dict())
#         db.add(new_employment_type)
#         db.commit()
#         db.refresh(new_employment_type)
#         return {"data": new_employment_type, "msg": "A new employment type has been added"}
#     except Exception as e:
#         print(e)


# @router.get("/employment-types")
# def get_employment_types(db: Session = Depends(get_db)):
#     try:
#         return db.query(EmploymentType).all()
#     except Exception as e:
#         print(e)


# # =========================================================================
# # USER
# # =========================================================================


# # Create User
# @router.post("/users", status_code = 201)
# def create_user(req: test.User, db: Session = Depends(get_db)):
#     try:
#         req.password = Hash.encrypt(req.password)
#         new_user = User(**req.dict())
#         db.add(new_user)
#         db.commit()
#         db.refresh(new_user)
#         return {"data": new_user, "msg": "A new user has been added"}
#     except Exception as e:
#         print(e)


# # Get All Users
# @router.get("/users", response_model = List[user.ShowUser])
# def get_all_users(db: Session = Depends(get_db)):
    # try:
    #     return db.query(User).all()
    # except Exception as e:
    #     print(e)