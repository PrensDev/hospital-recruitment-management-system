# Import Package
from datetime import datetime, date, time
from typing import List, Optional
from pydantic import BaseModel
from schemas.user_schemas import ShowUser, ShowPosition


# Show Department Positions Schema
class ShowDepartmentPosition(BaseModel):
    position_id: str
    name: str
    description: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True


# Create Manpower Request
class CreateManpowerRequest(BaseModel):
    requisition_no: str
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
    requisition_no: str
    manpower_request_by: ShowUser
    vacant_position: ShowPosition
    employment_type: str
    request_nature: str
    staffs_needed: int
    min_monthly_salary: Optional[float]
    max_monthly_salary: Optional[float]
    content: str
    request_status: str
    deadline: Optional[datetime]
    manpower_request_reviewed_by: Optional[ShowUser]
    reviewed_at: Optional[datetime]
    completed_at: Optional[datetime]
    remarks: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True


# Update Manpower Request
class UpdateManpowerRequest(BaseModel):
    position_id: str
    employment_type: str
    request_nature: str
    staffs_needed: int
    min_monthly_salary: Optional[float]
    max_monthly_salary: Optional[float]
    content: str
    deadline: Optional[datetime]