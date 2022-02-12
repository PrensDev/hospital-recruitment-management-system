# Import Package
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from modules.human_resource.recruitment.schemas.main_schemas import *


class CreateDepartment(BaseModel):
    name: str
    description: str


class CreateSubDepartment(BaseModel):
    department_id: str
    name: str
    description: str
    location: str


class CreatePosition(BaseModel):
    sub_department_id: str
    name: str
    description: str


class CreateEmploymentType(BaseModel):
    name: str
    description: str


class CreateEmployee(Employee):
    position_id: str
    employment_type_id: str


class CreateRole(BaseModel):
    name: str


class CreateUser(User):
    employee_id: str


class CreateUserRole(BaseModel):
    user_id: str
    role_id: str