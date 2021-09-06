# Import Package
from datetime import datetime, date, time
from typing import List, Optional
from pydantic import BaseModel


# Department Schema
class Department(BaseModel):
    name: str
    description: str


# Show Department Schema
class ShowDepartment(Department):
    department_id: str

    class Config():
        orm_mode = True


# Position Schema
class Position(BaseModel):
    name: str
    description: str


# Show Position Schema
class ShowPosition(Position):
    position_id: str
    department: ShowDepartment

    class Config():
        orm_mode = True


# Show Position For Department
class ShowPositionForDepartment(Position):
    position_id: str

    class Config():
        orm_mode = True


# User Schema
class User(BaseModel):
    first_name: str
    middle_name: Optional[str]
    last_name: str
    suffix_name: Optional[str]
    position_id: str
    email: str
    password: str
    user_type: str


# User Info
class UserInfo(BaseModel):
    first_name: str
    middle_name: Optional[str]
    last_name: str
    suffix_name: Optional[str]
    email: str
    position: ShowPosition

    class Config():
        orm_mode = True


# ManPowerRequest Schema
class CreateManpowerRequest(BaseModel):
    position_id: str
    employment_type: str
    request_nature: str
    staffs_needed: int
    min_monthly_salary: Optional[float]
    max_monthly_salary: Optional[float]
    content: str
    deadline: Optional[datetime]


# Manpower Request
class ManpowerRequest(BaseModel):
    requisition_id: str
    manpower_request_by: UserInfo
    vacant_position: ShowPosition
    employment_type: str
    request_nature: str
    staffs_needed: int
    min_monthly_salary: Optional[float]
    max_monthly_salary: Optional[float]
    content: str
    request_status: str
    deadline: Optional[datetime]
    manpower_request_reviewed_by: Optional[UserInfo]
    reviewed_at: Optional[datetime]
    completed_at: Optional[datetime]
    remarks: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True



# Manpower Request
class ManpowerRequestForApplicants(BaseModel):
    vacant_position: ShowPosition
    employment_type: str
    request_nature: str
    staffs_needed: int
    min_monthly_salary: Optional[float]
    max_monthly_salary: Optional[float]

    class Config():
        orm_mode = True


# Show Department Positions Schema
class ShowDepartmentPosition(BaseModel):
    department_id: str
    name: str
    description: str
    created_at: datetime
    updated_at: Optional[datetime]
    department_positions: List[ShowPositionForDepartment]

    class Config():
        orm_mode = True


# Manpower Request Status
class ManpowerRequestStatus(BaseModel):
    request_status: str
    remarks: Optional[str]
    reviewed_at: datetime


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


# Show Applicant Schema
class ShowApplicant(Applicant):
    applicant_id: str
    created_at: datetime
    updated_at: datetime

    class Config():
        orm_mode = True


# Job Post Schema
class JobPost(BaseModel):
    salary_is_visible: bool
    content: str
    expiration_date: Optional[datetime]


# Create Job Post Schema
class CreateJobPost(JobPost):
    requisition_id: str


# Show Job Post
class ShowJobPost(JobPost):
    job_post_id: str
    manpower_request: ManpowerRequest
    job_posted_by: UserInfo
    applicants: List[Optional[ShowApplicant]]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True


# Show Job Post For Applicant Info
class ShowJobPostForApplicantInfo(BaseModel):
    job_post_id: str
    manpower_request: ManpowerRequest
    job_posted_by: UserInfo
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True


# Show Applicant
class ShowApplicantInfo(ShowApplicant):
    applied_job: ShowJobPostForApplicantInfo
    status: str
    evaluation_done_by: Optional[UserInfo]
    screening_done_by: Optional[UserInfo]

    class Config():
        orm_mode = True


# Show Job Post For Applicants
class ShowJobPostForApplicants(JobPost):
    job_post_id: str
    manpower_request: ManpowerRequestForApplicants
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True


# Show Manpower Request
class ShowManpowerRequest(ManpowerRequest):
    job_post: List[Optional[ShowJobPost]]

    class Config():
        orm_mode = True


# Search
class Search(BaseModel):
    query: str


# Applicant Evaluation
class ApplicantEvaluation(BaseModel):
    evaluated_at: Optional[datetime]
    status: str
    remarks: Optional[str]


# Applicant Screening
class ApplicantScreening(BaseModel):
    screened_at: Optional[datetime]
    status: str
    remarks: Optional[str]


# Interviewee
class Interviewee(BaseModel):
    applicant_id: str


# Create Interview Question
class CreateInterviewQuestion(BaseModel):
    question: str
    type: str


# Show Interview Question
class ShowInterviewQuestion(BaseModel):
    interview_question_id: str
    question: str
    type: str
    interview_question_added_by: UserInfo
    interview_question_updated_by: UserInfo
    created_at: datetime
    updated_at: datetime

    class Config():
        orm_mode = True


# Interview Schedule
class InterviewSchedule(BaseModel):
    scheduled_date: date
    start_session: time
    end_session: time


# Create Interview Schedule
class CreateInterviewSchedule(BaseModel):
    scheduled_date: date
    start_session: time
    end_session: time
    interviewees: List[Interviewee]


# Interview Schedule Info
class InterviewScheduleInfo(InterviewSchedule):
    class Config():
        orm_mode = True


# Interview Question
class InterviewQuestion(BaseModel):
    question: str
    type: str


# Interview Question Info
class InterviewQuestionInfo(InterviewQuestion):
    class Config():
        orm_mode = True


# Interview Score
class IntervieweeScore(BaseModel):
    interview_question: InterviewQuestionInfo
    score: int
    scored_by_hiring_manager: UserInfo
    remarks: str

    class Config():
        orm_mode = True


# Interviewee Info
class IntervieweeInfo(BaseModel):
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
class ShowIntervieweeInfo(ShowApplicantInfo):
    interviewee_info: List[IntervieweeInfo]

    class Config():
        orm_mod =  True