# Import Packages
from typing import List
from urllib import response
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


# Get sub departments per department
@router.get("/departments/{department_id}/sub-departments", response_model = test.ShowDepartment)
def get_sub_departments_per_department(department_id, db: Session = Depends(get_db)):
    try:
        sub_departments = db.query(SubDepartment).join(Department).filter(Department.department_id == department_id).all()
        if not sub_departments:
            raise HTTPException(status_code = 404, detail = DEPARTMENT_NOT_FOUND_RESPONSE)
        else:
            return sub_departments
    except Exception as e:
        print(e)


# =========================================================================
# SUB DEPARTMENTS
# =========================================================================


# Sub Department Not Found Response
SUB_DEPARTMENT_NOT_FOUND_RESPONSE = {"message": "Sub-department Not Found"}


# Create Sub Department
@router.post("/sub-departments", status_code = 201)
def create_sub_department(req: test.CreateSubDepartment, db: Session = Depends(get_db)):
    try:
        new_sub_department = SubDepartment(**req.dict())
        db.add(new_sub_department)
        db.commit()
        db.refresh(new_sub_department)
        return {
            "data": new_sub_department,
            "msg": "A new sub-department has been added"
        }
    except Exception as e:
        print(e)


# Get All Sub Department
@router.get("/sub-departments", response_model = List[test.ShowSubDepartment])
def get_all_sub_departments(db: Session = Depends(get_db)):
    try:
        return db.query(SubDepartment).all()
    except Exception as e:
        print(e)


# Get One Sub Department
@router.get("/sub-departments/{sub_department_id}", response_model = test.ShowSubDepartment)
def get_all_sub_departments(sub_department_id: str, db: Session = Depends(get_db)):
    try:
        sub_department = db.query(SubDepartment).filter(SubDepartment.sub_department_id == sub_department_id).first()
        if not sub_department:
            raise HTTPException(status_code = 404, detail = SUB_DEPARTMENT_NOT_FOUND_RESPONSE)
        else:
            return sub_department
    except Exception as e:
        print(e)


# =========================================================================
# POSITION
# =========================================================================


# Create Position Per Department
@router.post("/positions")
def create_position(req: test.CreatePosition, db: Session = Depends(get_db)):
    try:
        new_position = Position(**req.dict())
        db.add(new_position)
        db.commit()
        db.refresh(new_position)
        return {
            "data": new_position,
            "msg": "A new position has been added"
        }
    except Exception as e:
        return {"error": e}


# Get All Positions
@router.get("/positions", response_model = List[test.ShowPosition])
def get_all_positions(db: Session = Depends(get_db)):
    try:
        return db.query(Position).all()
    except Exception as e:
        print(e)


# =========================================================================
# EMPLOYMENT TYPE
# =========================================================================

@router.post("/employment-types")
def create_employment_type(req: test.CreateEmploymentType, db: Session = Depends(get_db)):
    try:
        new_employment_type = EmploymentType(**req.dict())
        db.add(new_employment_type)
        db.commit()
        db.refresh(new_employment_type)
        return {"data": new_employment_type, "msg": "A new employment type has been added"}
    except Exception as e:
        print(e)


@router.get("/employment-types")
def get_employment_types(db: Session = Depends(get_db)):
    try:
        return db.query(EmploymentType).all()
    except Exception as e:
        print(e)


# =========================================================================
# ROLES
# =========================================================================


@router.post("/roles")
def create_role(req: test.CreateRole, db: Session = Depends(get_db)):
    try:
        new_role = Role(**req.dict())
        db.add(new_role)
        db.commit()
        db.refresh(new_role)
        return {"data": new_role, "msg": "A new role has been added"}
    except Exception as e:
        print(e)


@router.get("/roles", response_model = List[test.ShowRole])
def get_all_roles(db: Session = Depends(get_db)):
    try:
        return db.query(Role).all()
    except Exception as e:
        print(e)


# =========================================================================
# EMPLOYEES
# =========================================================================


@router.post('/employees')
def create_employee(req: test.CreateEmployee, db: Session = Depends(get_db)):
    try:
        new_employee = Employee(**req.dict())
        db.add(new_employee)
        db.commit()
        db.refresh(new_employee)
        return {"data": new_employee, "msg": "A new employee has been added"}
    except Exception as e:
        print(e)


@router.get('/employees', response_model = List[test.ShowEmployee])
def get_all_employees(db: Session = Depends(get_db)):
    try:
        return db.query(Employee).all()
    except Exception as e:
        print(e)


# =========================================================================
# USER
# =========================================================================


# Create User
@router.post("/users", status_code = 201)
def create_user(req: test.CreateUser, db: Session = Depends(get_db)):
    try:
        req.password = Hash.encrypt(req.password)
        new_user = User(**req.dict())
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"data": new_user, "msg": "A new user has been added"}
    except Exception as e:
        print(e)


# Get All Users
@router.get("/users", response_model = List[test.ShowUser])
def get_all_users(db: Session = Depends(get_db)):
    try:
        return db.query(User).all()
    except Exception as e:
        print(e)


# =========================================================================
# USER ROLE
# =========================================================================


@router.post('/user-role')
def create_user_role(req: test.CreateUserRole, db: Session = Depends(get_db)):
    try:
        new_user_role = UserRole(**req.dict())
        db.add(new_user_role)
        db.commit()
        db.refresh(new_user_role)
        return {"data": new_user_role, "msg": "A new user role has been added"}
    except Exception as e:
        print(e)

@router.get('/user-role', response_model = List[test.ShowUserRole])
def get_all_user_role(db: Session = Depends(get_db)):
    try:
        return db.query(UserRole).all()
    except Exception as e:
        print(e)