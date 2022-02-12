# Import Package
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel


class Department(BaseModel):
    department_id: str
    name: str
    description: str
    created_at: datetime
    updated_at: Optional[datetime]


class SubDeparment(BaseModel):
    sub_department_id: str
    name: str
    description: str
    location: str
    created_at: datetime
    updated_at: Optional[datetime]


class Position(BaseModel):
    position_id: str
    name: str
    description: str
    created_at: datetime
    updated_at: Optional[datetime]


class ShowPosition(Position):
    class Config():
        orm_mode = True


class ShowSubDepartment(SubDeparment):
    positions: List[Optional[ShowPosition]]
    
    class Config():
        orm_mode = True


class ShowDepartment(Department):
    sub_departments: List[Optional[ShowSubDepartment]]

    class Config():
        orm_mode = True