# Import Package
from database import Base
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from sqlalchemy.sql.expression import update


# Department Schema
class Department(BaseModel):
    name: str
    description: str


# Show Department Schema
class ShowDepartment(Department):
    department_id: str

    class Config():
        orm_mode = True


# Position Schema
class Position(BaseModel):
    name: str
    description: str


# Show Position Schema
class ShowPosition(Position):
    position_id: str
    department: ShowDepartment

    class Config():
        orm_mode = True


# User Schema
class User(BaseModel):
    first_name: str
    middle_name: str
    last_name: str
    suffix_name: str
    position_id: str
    email: str
    password: str
    user_type: str


# Login
class Login(BaseModel):
    email: str
    password: str


# User Info
class UserInfo(BaseModel):
    first_name: str
    middle_name: str
    last_name: str
    suffix_name: str
    email: str
    position: ShowPosition

    class Config():
        orm_mode = True


# Token Data
class TokenData(BaseModel):
    user_id: str
    user_type: str


# ManPowerRequest Schema
class CreateManpowerRequest(BaseModel):
    position_id: str
    employment_type: str
    request_nature: str
    staffs_needed: int
    min_monthly_salary: Optional[float]
    max_monthly_salary: Optional[float]
    content: str
    deadline: Optional[datetime]


# Show Manpower Request
class ShowManpowerRequest(BaseModel):
    requisition_id: str
    manpower_request_by: UserInfo
    vacant_position: ShowPosition
    employment_type: str
    request_nature: str
    staffs_needed: int
    min_monthly_salary: Optional[float]
    max_monthly_salary: Optional[float]
    content: str
    request_status: str
    deadline: Optional[datetime]
    manpower_request_reviewed_by: Optional[UserInfo]
    reviewed_at: Optional[datetime]
    completed_at: Optional[datetime]
    remarks: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True


# Show Department Positions Schema
class ShowDepartmentPosition(BaseModel):
    department_id: str
    name: str
    description: str
    created_at: datetime
    updated_at: Optional[datetime]
    department_positions: List

    class Config():
        orm_mode = True


# Manpower Request Status
class ManpowerRequestStatus(BaseModel):
    request_status: str
    remarks: Optional[str]
    reviewed_at: datetime


# Job Post Schema
class JobPost(BaseModel):
    requisition_id: str
    salary_is_visible: bool
    content: str
    expiration_date: Optional[datetime]