# Import Package
from datetime import datetime, date, time
from typing import List, Optional
from pydantic import BaseModel
from database import Base
from modules.human_resource.recruitment_management.schemas.user_schemas import ShowUser, ShowPosition


# Manpower Request
class ManpowerRequest(BaseModel):
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


# Job Post
class JobPost(BaseModel):
    job_post_id: str
    job_posted_by: ShowUser
    content: str
    salary_is_visible: bool
    expiration_date: Optional[datetime]
    views: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True


# Applicant
class Applicant(BaseModel):
    first_name: str
    middle_name: Optional[str]
    last_name: str
    suffix_name: Optional[str]
    contact_number: str
    email: str
    resume: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True


# Show Job Post
class ShowJobPost(JobPost):
    manpower_request: ManpowerRequest
    applicants: List[Optional[Applicant]]

    class Config():
        orm_mode = True


# Show Manpower Request
class ShowManpowerRequest(ManpowerRequest):
    job_post: List[Optional[JobPost]]

    class Config():
        orm_mode = True


# Create Job Post
class CreateJobPost(BaseModel):
    requisition_id: str
    salary_is_visible: bool
    content: str
    expiration_date: Optional[datetime]


# Update Job Post(BaseModel):
class UpdateJobPost(BaseModel):
    salary_is_visible: bool
    content: str
    expiration_date: Optional[datetime]


# Show Applicant
class ShowApplicant(Applicant):
    applicant_id: str
    applied_job: ShowJobPost
    status: str
    evaluation_done_by: Optional[ShowUser]
    evaluated_at: Optional[datetime]
    screening_done_by: Optional[ShowUser]
    screened_at: Optional[datetime]
    hired_at: Optional[datetime]
    hiring_done_by: Optional[ShowUser]
    rejection_done_by: Optional[ShowUser]
    rejected_at: Optional[datetime]
    remarks: Optional[str]

    class Config():
        orm_mode = True


# Applicant Evaluation
class ApplicantEvaluation(BaseModel):
    status: str
    remarks: Optional[str]