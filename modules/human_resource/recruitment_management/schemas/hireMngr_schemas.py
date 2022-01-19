# Import Package
from datetime import datetime, date, time
from typing import List, Optional
from pydantic import BaseModel
from modules.human_resource.recruitment_management.schemas.user_schemas import ShowUser, ShowPosition


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
    first_name: str
    middle_name: Optional[str]
    last_name: str
    suffix_name: Optional[str]
    contact_number: str
    email: str
    resume: str
    status: str

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
    views: int
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
    hired_at: Optional[datetime]
    hiring_done_by: Optional[ShowUser]
    rejection_done_by: Optional[ShowUser]
    rejected_at: Optional[datetime]
    created_at: datetime
    updated_at: Optional[datetime]
    remarks: Optional[str]

    class Config():
        orm_mode = True


# Interviewee
class Interviewee(BaseModel):
    applicant_id: str



# Interview Schedule
class InterviewSchedule(BaseModel):
    scheduled_date: date
    start_session: time
    end_session: time


# Create Interview Schedule
class CreateInterviewSchedule(InterviewSchedule):
    job_post_id: str
    interviewees: List[Interviewee]


# Interview Schedule Info
class InterviewScheduleInfo(InterviewSchedule):
    schedule_for: ShowJobPost

    class Config():
        orm_mode = True


# Interview Question
class InterviewQuestion(BaseModel):
    question: str
    type: str

    class Config():
        orm_mode = True


# Interviewee Score
class IntervieweeScore(BaseModel):
    interview_question: InterviewQuestion
    score: float
    scored_by_hiring_manager: ShowUser

    class Config():
        orm_mode = True


# Create General Interviewee Score
class CreateGeneralIntervieweeScore(BaseModel):
    interview_question_id: str
    score: float


# Interviewee Info
class IntervieweeInfo(BaseModel):
    interviewee_id: str
    applicant_info: ShowApplicant
    interviewee_schedule: Optional[InterviewScheduleInfo]
    interviewee_score: List[Optional[IntervieweeScore]]
    is_interviewed: Optional[bool]
    interviewed_at: Optional[datetime]
    remarks: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config():
        orm_mode = True


# Show Interviewee Info
class ShowIntervieweeInfo(ShowApplicant):
    interviewee_info: List[IntervieweeInfo]

    class Config():
        orm_mod =  True


# Show Interview Schedule Info
class ShowInterviewScheduleInfo(InterviewScheduleInfo):
    interview_schedule_id: str
    interviewees: List[IntervieweeInfo]
    
    class Config():
        orm_mode = True


# Show Interview Question
class ShowInterviewQuestion(BaseModel):
    interview_question_id: str
    question: str
    type: str
    interview_question_added_by: ShowUser
    interview_question_updated_by: ShowUser
    created_at: datetime
    updated_at: datetime

    class Config():
        orm_mode = True


# Update Interview Question
class UpdateInterviewQuestion(BaseModel):
    question: str


# Create Interview Question
class CreateInterviewQuestion(BaseModel):
    question: str
    type: str


# Update Interviewee
class UpdateInterviewee(BaseModel):
    is_interviewed: Optional[bool]
    interviewed_at: Optional[datetime]
    remarks: Optional[str]


# Update Applicant Status
class UpdateApplicantStatus(BaseModel):
    status: str
    remarks: Optional[str]