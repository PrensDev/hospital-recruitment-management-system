# Import Package
from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from modules.human_resource.recruitment_management.schemas.user_schemas import ShowPosition
from modules.human_resource.recruitment_management.schemas.recruiter_schemas import ShowJobCategory


# Manpower Request
class ManpowerRequest(BaseModel):
    vacant_position: ShowPosition
    employment_type: str
    request_nature: str
    staffs_needed: int
    min_monthly_salary: Optional[float]
    max_monthly_salary: Optional[float]

    class Config():
        orm_mode = True


# Show Job Post For Applicants
class ShowJobPost(BaseModel):
    salary_is_visible: bool
    job_categorized_as: ShowJobCategory
    content: str
    expiration_date: Optional[datetime]
    job_post_id: str
    views: int
    manpower_request: ManpowerRequest
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True


# Search
class Search(BaseModel):
    query: str


# Applicants Schema
class Applicant(BaseModel):
    job_post_id: str
    first_name: str
    middle_name: Optional[str]
    last_name: str
    suffix_name: Optional[str]
    contact_number: str
    email: str
    resume: str