# Import Package
from datetime import datetime, date, time
from typing import List, Optional
from pydantic import BaseModel
from schemas.user_schemas import ShowUser, ShowPosition


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


# Sign Manpower Request
class SignManpowerRequest(BaseModel):
    request_status: str
    remarks: Optional[str]
    signed_by: Optional[str]
    signed_at: Optional[datetime]
    rejected_by: Optional[str]
    rejected_at: Optional[datetime]