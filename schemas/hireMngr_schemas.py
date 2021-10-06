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

    class Config():
        orm_mode = True


# Manpower Request Approval
class ManpowerRequestApproval(BaseModel):
    request_status: str
    remarks: Optional[str]


# Applicant
class Applicant(BaseModel):
    applicant_id: str

    class Config():
        orm_mode = True


# Show Job Post
class ShowJobPost(BaseModel):
    job_post_id: str
    manpower_request: ShowManpowerRequest
    salary_is_visible: bool
    content: str
    expiration_date: Optional[datetime]
    applicants: Optional[List[Applicant]]
    job_posted_by: ShowUser
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True



# Show Applicant
class ShowApplicant(Applicant):
    applicant_id: str
    applied_job: ShowJobPost
    status: str
    evaluation_done_by: Optional[ShowUser]
    evaluated_at: Optional[datetime]
    screening_done_by: Optional[ShowUser]
    screened_at: Optional[datetime]
    rejected_by: Optional[ShowUser]
    rejected_at: Optional[datetime]

    class Config():
        orm_mode = True