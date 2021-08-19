# Import Package
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from sqlalchemy.sql.expression import update


# Department Schema
class Department(BaseModel):
    name: str
    description: str


# Position Schema
class Position(BaseModel):
    name: str
    description: str

# Show Position Schema
class ShowPosition(Position):
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

    class Config():
        orm_mode = True


# Token Data
class TokenData(BaseModel):
    user_id: str
    user_type: str


# ManPowerRequest Schema
class CreateManpowerRequest(BaseModel):
    requested_by: str
    position_id: str
    employment_type: str
    request_nature: str
    staffs_needed: int
    min_monthly_salary: float
    max_monthly_salary: float
    content: str
    request_status: str
    deadline: datetime

# Show Manpower Request
class ShowManpowerRequest(BaseModel):
    requisition_id: str
    # manpower_request_by: List
    # vacant_position: List[ShowPosition]
    employment_type: str
    request_nature: str
    staffs_needed: int
    min_monthly_salary: float
    max_monthly_salary: float
    content: str
    request_status: str
    deadline: Optional[datetime]
    mapower_request_reviewed_by: Optional[List]
    reviewed_at: Optional[datetime]
    completed_at: Optional[datetime]
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