# Import Package
from datetime import datetime, date, time
from typing import List, Optional
from pydantic import BaseModel
from schemas.user_schemas import ShowUser, ShowPosition


# Show Job Post
class JobPost(BaseModel):
    job_post_id: str
    job_posted_by: ShowUser
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True


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
    manpower_request_signed_by: Optional[ShowUser]
    manpower_request_reviewed_by: Optional[ShowUser]
    manpower_request_rejected_by: Optional[ShowUser]
    signed_at: Optional[datetime]
    reviewed_at: Optional[datetime]
    completed_at: Optional[datetime]
    rejected_at: Optional[datetime]
    remarks: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]
    job_post: List[Optional[JobPost]]

    class Config():
        orm_mode = True
