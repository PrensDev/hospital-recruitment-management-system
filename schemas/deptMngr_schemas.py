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


# Show Job Post For Applicant Info
class ShowJobPostForApplicantInfo(BaseModel):
    job_post_id: str
    manpower_request: ShowManpowerRequest
    job_posted_by: ShowUser
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True


# Applicant
class Applicant(BaseModel):
    applicant_id: str
    first_name: str
    middle_name: Optional[str]
    last_name: str
    suffix_name: Optional[str]
    contact_number: str
    email: str
    resume: str

    class Config():
        orm_mode = True


# Show Applicant
class ShowApplicant(Applicant):
    status: str
    evaluation_done_by: Optional[ShowUser]
    evaluated_at: Optional[datetime]
    screening_done_by: Optional[ShowUser]
    screened_at: Optional[datetime]
    hired_at: Optional[datetime]
    hiring_done_by: Optional[ShowUser]
    rejection_done_by: Optional[ShowUser]
    rejected_at: Optional[datetime]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True


# OnboardingEmployee
class OnboardingEmployee(BaseModel):
    onboarding_employee_id: str
    first_name: str
    middle_name: Optional[str]
    last_name: str
    suffix_name: Optional[str]
    onboarding_employee_position: ShowPosition
    contact_number: str
    email: str
    employment_contract: str
    employment_start_date: Optional[date]
    onboarding_employee_signed_by: ShowUser
    created_at: datetime
    updated_at: Optional[datetime]


# Show Hired Applicant
class ShowHiredApplicant(OnboardingEmployee):
    class Config():
        orm_mode = True


# Create Onboarding Tasks
class CreateOnboardingTask(BaseModel):
    title: str
    description: str
    task_type: str


# Department Schema
class Department(BaseModel):
    name: str
    description: str


# Show Department Schema
class ShowDepartment(Department):
    department_id: str

    class Config():
        orm_mode = True


# Show Onboarding Tasks
class ShowOnboardingTask(BaseModel):
    onboarding_task_id: str
    title: str
    description: str
    task_type: str
    onboarding_task_for_department: ShowDepartment
    onboarding_task_added_by: ShowUser
    onboarding_task_updated_by: Optional[ShowUser]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True
