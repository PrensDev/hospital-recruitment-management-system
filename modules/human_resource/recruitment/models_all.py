# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.sql.sqltypes import String, Integer, DateTime, Float, Text, Boolean, Date, Time
from sqlalchemy.orm import relationship


# Department Model
class Department(Base):
    __tablename__ = "departments"

    # Columns
    department_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    name = Column(
        String(255),
        nullable = False
    )
    description = Column(
        String(255),
        nullable = False
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships (To other tables)
    sub_departments = relationship(
        "Position",
        back_populates = "department"
    )


# Employee Model
class Employee(Base):
    __tablename__ = "employees"

    # Columns
    employee_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    first_name = Column(
        String(255),
        nullable = False
    )
    middle_name = Column(
        String(255),
        nullable =  True
    )
    last_name = Column(
        String(255),
        nullable = False
    )
    extension_name = Column(
        String(255),
        nullable = True
    )
    contact_number = Column(
        String(255),
        nullable = False
    )
    employee_type_id = Column(
        String(255),
        nullable = False
    )
    status = Column(
        String(255),
        nullable = True
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationship (From other tables)
    employee_type = relationship(
        "EmployeeType",
        back_populates = "employees"
    )

    # Relationships (To other tables)
    user_credentials = relationship(
        "User",
        back_populates = "User.user_information"
    )
    requested_manpower_requests = relationship(
        "ManpowerRequest", 
        back_populates = "manpower_request_by",
        foreign_keys = "ManpowerRequest.requested_by"
    )
    signed_manpower_requests = relationship(
        "ManpowerRequest",
        back_populates = "manpower_request_signed_by",
        foreign_keys = "ManpowerRequest.signed_by"
    )
    reviewed_manpower_requests = relationship(
        "ManpowerRequest",
        back_populates = "manpower_request_reviewed_by",
        foreign_keys = "ManpowerRequest.reviewed_by"
    )
    rejected_manpower_requests = relationship(
        "ManpowerRequest",
        back_populates = "manpower_request_rejected_by",
        foreign_keys = "ManpowerRequest.rejected_by"
    )
    created_job_posts = relationship(
        "JobPost",
        back_populates = "job_post_created_by"
    )
    created_job_categories = relationship(
        "JobCategory",
        back_populates = "job_category_created_by"
    )
    evaluated_applicants = relationship(
        "Applicant",
        back_populates = "applicant_evaluated_by",
        foreign_keys = "Applicant.evaluated_by"
    )
    screened_applicants = relationship(
        "Applicant",
        back_populates = "applicant_screened_by",
        foreign_keys = "Applicant.screened_by"
    )
    hired_applicants = relationship(
        "Applicant",
        back_populates = "applicant_hired_by",
        foreign_keys = "Applicant.hired_by"
    )
    rejected_applicants = relationship(
        "Applicant",
        back_populates = "applicant_rejected_by",
        foreign_keys = "Applicant.rejected_by"
    )
    set_schedules = relationship(
        "InterviewSchedule",
        back_populates = "schedule_set_by" 
    )
    set_scores = relationship(
        "InterviewScore",
        back_populates = "score_set_by"
    )
    added_interview_questions = relationship(
        "InterviewQuestion",
        back_populates = "interview_question_added_by",
        foreign_keys = "InterviewQuestion.added_by"
    )
    updated_interview_questions = relationship(
        "InterviewQuestion",
        back_populates = "interview_question_updated_by",
        foreign_keys = "InterviewQuestion.updated_by"
    )
    signed_onboarding_employees = relationship(
        "OnboardingEmployee",
        back_populates = "onboarding_employee_signed_by",
        foreign_keys = "OnboardingEmployee.signed_by"
    )
    updated_onboarding_employees = relationship(
        "OnboardingEmployee",
        back_populates = "onboarding_employee_updated_by",
        foreign_keys = "OnboardingEmployee.updated_by"
    )
    added_onboarding_tasks = relationship(
        "OnboardingTask",
        back_populates = "onboarding_task_added_by",
        foreign_keys = "OnboardingTask.added_by"
    )
    updated_onboarding_tasks = relationship(
        "OnboardingTask",
        back_populates = "onboarding_task_updated_by",
        foreign_keys = "OnboardingTask.updated_by"
    )
    assigned_onboarding_employee_tasks = relationship(
        "OnboardingEmployeeTask",
        back_populates = "onboarding_employee_task_assigned_by",
        foreign_keys = "OnboardingEmployeeTask.assigned_by"
    )
    completed_onboarding_employee_tasks = relationship(
        "OnboardingEmployeeTask",
        back_populates = "onboarding_employee_task_completed_by",
        foreign_keys = "OnboardingEmployeeTask.completed_by"
    )


# Role Model
class Role(Base):
    __tablename__ = "roles"

    # Columns
    role_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    name = Column(
        String(255),
        nullable = False
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationship (To other tables)
    roled_by_users = relationship(
        "UserRole",
        back_populates = "UserRole.role"
    )


# User Role Model
class UserRole(Base):
    __tablename__ = "user_role"
    
    # Columns
    user_role_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )



# User Model
class User(Base):
    __tablename__ = "users"

    # User Columns
    user_id = Column(
        String(36),
        primary_key = True, 
        default = text('UUID()'),
    )
    position_id = Column(
        String(36),
        ForeignKey("positions.position_id"),
        nullable = False
    )
    employee_id = Column(
        String(36),
        ForeignKey("employees.employee_id")
    )
    username = Column(
        String(255),
        unique = True,
        nullable = False
    )
    password = Column(
        String(255),
        nullable = False
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    position = relationship(
        "Position", 
        back_populates = "roled_by_following",
    )


# Positions Model
class Position(Base):
    __tablename__ = "positions"

    # Position Columns
    position_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()'),
    )
    department_id = Column(
        String(36),
        ForeignKey("departments.department_id"),
        nullable = False
    )
    name = Column(
        String(255),
        nullable = False
    )
    description = Column(
        String(255),
        nullable = False
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    roled_by_following = relationship(
        "User", 
        back_populates = "position"
    )
    department = relationship(
        "Department", 
        back_populates = "department_positions"
    )
    vacancy_requests = relationship(
        "Requisition",
        back_populates = "vacant_position"
    )
    onboarding_employees = relationship(
        "OnboardingEmployee",
        back_populates = "onboarding_employee_position"
    )


# Employment Type Model
class EmploymentType(Base):
    __tablename__ = "employment_types"

    # Columns
    employment_type_id = Column(
        String(36),
        primary_key=True,
        default=text('UUID()')
    )
    name = Column(
        String(255),
        nullable=False
    )
    description = Column(
        Text,
        nullable=False,
    )
    is_active = Column(
        Boolean,
        default=True,
        nullable=False
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable=False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    manpower_requests = relationship(
        "Requisition",
        back_populates = "manpower_request_employment_type"
    )


# Requisition Model
class Requisition(Base):
    __tablename__ = "requisitions"

    # Requisition Columns
    requisition_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    requisition_no = Column(
        String(255),
        unique = True,
        nullable = False
    )
    requested_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = False
    )
    position_id = Column(
        String(36),
        ForeignKey("positions.position_id"),
        nullable = False
    )
    employment_type_id = Column(
        String(255),
        ForeignKey("employment_types.employment_type_id"),
        nullable = False
    )
    request_nature = Column(
        String(255),
        default = "For Review",
        nullable = False
    )
    staffs_needed = Column(
        Integer,
        nullable = False
    )
    min_monthly_salary = Column(
        Float,
        nullable = True
    )
    max_monthly_salary = Column(
        Float,
        nullable = True
    )
    content = Column(
        Text,
        nullable = False
    )
    request_status = Column(
        String(255),
        nullable = False
    )
    deadline = Column(
        DateTime,
        nullable = True
    )
    signed_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = True
    )
    signed_at = Column(
        DateTime,
        nullable = True
    )
    reviewed_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = True
    )
    reviewed_at = Column(
        DateTime,
        nullable = True
    )
    completed_at = Column(
        DateTime,
        nullable = True
    )
    rejected_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = True
    )
    rejected_at = Column(
        DateTime,
        nullable = True
    )
    remarks = Column(
        Text,
        nullable = True
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    manpower_request_by = relationship(
        "User",
        back_populates = "manpower_requests",
        foreign_keys = "Requisition.requested_by"
    )
    manpower_request_reviewed_by = relationship(
        "User",
        back_populates = "reviewed_manpower_requests",
        foreign_keys = "Requisition.reviewed_by"
    )
    manpower_request_signed_by = relationship(
        "User",
        back_populates = "signed_manpower_requests",
        foreign_keys = "Requisition.signed_by"
    )
    manpower_request_rejected_by = relationship(
        "User",
        back_populates = "rejected_manpower_requests",
        foreign_keys = "Requisition.rejected_by"
    )
    manpower_request_employment_type = relationship(
        "EmploymentType",
        back_populates="manpower_requests",
    )
    vacant_position = relationship(
        "Position",
        back_populates = "vacancy_requests"
    )
    job_post = relationship(
        "JobPost",
        back_populates = "manpower_request"
    )


# Job Post Model
class JobPost(Base):
    __tablename__ = "job_posts"

    # Columns
    job_post_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    requisition_id = Column(
        String(36),
        ForeignKey("requisitions.requisition_id"),
        nullable = False
    )
    salary_is_visible = Column(
        Boolean,
        nullable = False,
        default = False
    )
    content = Column(
        Text,
        nullable = False
    )
    expiration_date = Column(
        DateTime,
        nullable = True
    )
    job_category_id = Column(
        String(36),
        ForeignKey("job_categories.job_category_id"),
        nullable = False
    )
    posted_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = False
    )
    views = Column(
        Integer,
        nullable = False,
        default = 0
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    manpower_request = relationship(
        "Requisition",
        back_populates = "job_post"
    )
    job_posted_by = relationship(
        "User",
        back_populates = "job_posts"
    )
    applicants = relationship(
        "Applicant",
        back_populates = "applied_job"
    )
    job_post_interview_schedules = relationship(
        "InterviewSchedule",
        back_populates = "schedule_for"
    )
    job_categorized_as = relationship(
        "JobCategory",
        back_populates = "job_posts",
    )


# Job Categories Model
class JobCategory(Base):
    __tablename__ = "job_categories"

    # Columns
    job_category_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    name = Column(
        String(36),
        nullable = False
    )
    description = Column(
        Text,
        nullable = False
    )
    is_removed = Column(
        Boolean,
        nullable = False,
        default = False
    )
    created_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = False
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    job_posts = relationship(
        "JobPost",
        back_populates = "job_categorized_as"
    )
    job_category_created_by = relationship(
        "User",
        back_populates = "job_categories",
    )


# Applicants Model
class Applicant(Base):
    __tablename__ = "applicants"

    # Columns
    applicant_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    job_post_id = Column(
        String(36),
        ForeignKey("job_posts.job_post_id"),
        nullable = False
    )
    first_name = Column(
        String(255),
        nullable = False
    )
    middle_name = Column(
        String(255),
        nullable = True
    )
    last_name = Column(
        String(255),
        nullable = False
    )
    suffix_name = Column(
        String(255),
        nullable = True
    )
    resume = Column(
        String(255),
        nullable = False,
        unique = True
    )
    contact_number = Column(
        String(255),
        nullable = False
    )
    email = Column(
        String(255),
        nullable = False
    )
    status = Column(
        String(255),
        nullable = False,
        default = "For evaluation"
    )
    evaluated_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = True
    )
    evaluated_at = Column(
        DateTime,
        nullable = True
    )
    screened_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = True
    )
    screened_at = Column(
        DateTime,
        nullable = True
    )
    hired_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = True  
    )
    hired_at = Column(
        String(36),
        nullable = True
    )
    rejected_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = True
    )
    rejected_at = Column(
        DateTime,
        nullable = True
    )
    remarks = Column(
        Text,
        nullable = True
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    applied_job = relationship(
        "JobPost",
        back_populates = "applicants"
    )
    interviewee_info = relationship(
        "Interviewee",
        back_populates = "applicant_info"
    )
    evaluation_done_by = relationship(
        "User",
        back_populates = "evaluated_applicants",
        foreign_keys = "Applicant.evaluated_by"
    )
    screening_done_by = relationship(
        "User",
        back_populates = "screened_applicants",
        foreign_keys = "Applicant.screened_by"
    )
    hiring_done_by = relationship(
        "User",
        back_populates = "hired_applicants",
        foreign_keys = "Applicant.hired_by"
    )
    rejection_done_by = relationship(
        "User",
        back_populates = "rejected_applicants",
        foreign_keys = "Applicant.rejected_by"
    )


# Interviewee Model
class Interviewee(Base):
    __tablename__ = "interviewees"

    # Columns
    interviewee_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    applicant_id = Column(
        String(36),
        ForeignKey("applicants.applicant_id"),
        nullable = False
    )
    interview_schedule_id = Column(
        String(36),
        ForeignKey("interview_schedules.interview_schedule_id"),
        nullable = True
    )
    is_interviewed = Column(
        Boolean,
        nullable = True
    )
    interviewed_at = Column(
        DateTime,
        nullable = True
    )
    remarks = Column(
        Text,
        nullable = True
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationhips
    applicant_info = relationship(
        "Applicant",
        back_populates = "interviewee_info"
    )
    interviewee_schedule = relationship(
        "InterviewSchedule",
        back_populates = "interviewees"
    )
    interviewee_score = relationship(
        "InterviewScore",
        back_populates = "score_of"
    )


# Interview Schedule Model
class InterviewSchedule(Base):
    __tablename__ = "interview_schedules"

    # Columns
    interview_schedule_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    job_post_id = Column(
        String(36),
        ForeignKey("job_posts.job_post_id"),
        nullable = False
    )
    scheduled_date = Column(
        Date,
        nullable = False
    )
    start_session = Column(
        Time,
        nullable = False
    )
    end_session = Column(
        Time,
        nullable = False
    )
    set_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = True
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    schedule_for = relationship(
        "JobPost",
        back_populates = "job_post_interview_schedules"
    )
    interviewees = relationship(
        "Interviewee",
        back_populates = "interviewee_schedule"
    )
    set_by_hiring_manager = relationship(
        "User",
        back_populates = "set_schedules"
    )


# Interview Score Model
class InterviewScore(Base):
    __tablename__ = "interview_scores"

    # Columns
    interview_score_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    interviewee_id = Column(
        String(36),
        ForeignKey("interviewees.interviewee_id"),
        nullable = False
    )
    interview_question_id = Column(
        String(36),
        ForeignKey("interview_questions.interview_question_id")
    )
    score = Column(
        Float,
        nullable = True
    )
    scored_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = True
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    interview_question = relationship(
        "InterviewQuestion",
        back_populates = "interview_score"
    )
    scored_by_hiring_manager = relationship(
        "User",
        back_populates = "set_scores"
    )
    score_of = relationship(
        "Interviewee",
        back_populates = "interviewee_score"
    )


# Interview Question Model
class InterviewQuestion(Base):
    __tablename__ = "interview_questions"

    # Columns
    interview_question_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    question = Column(
        String(255),
        nullable = False
    )
    type = Column(
        String(255),
        nullable = False
    )
    added_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = False
    )
    updated_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = True
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationship
    interview_score = relationship(
        "InterviewScore",
        back_populates = "interview_question"
    )
    interview_question_added_by = relationship(
        "User",
        back_populates = "added_interview_questions",
        foreign_keys = "InterviewQuestion.added_by"
    )
    interview_question_updated_by = relationship(
        "User",
        back_populates = "updated_interview_questions",
        foreign_keys = "InterviewQuestion.updated_by"
    )


# Onboarding Employees Model
class OnboardingEmployee(Base):
    __tablename__ = "onboarding_employees"

    # Columns
    onboarding_employee_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    first_name = Column(
        String(255),
        nullable = False
    )
    middle_name = Column(
        String(255),
        nullable = True
    )
    last_name = Column(
        String(255),
        nullable = False
    )
    suffix_name = Column(
        String(255),
        nullable = True
    )
    contact_number = Column(
        String(255),
        nullable = False
    )
    email = Column(
        String(255),
        nullable = False
    )
    position_id = Column(
        String(36),
        ForeignKey("positions.position_id"),
        nullable = False
    )
    employment_start_date = Column(
        Date,
        nullable = True
    )
    employment_contract = Column(
        String(255),
        unique = True,
        nullable = False
    )
    status = Column(
        String(255),
        nullable = False
    )
    signed_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = False
    )
    updated_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = True
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    onboarding_employee_position = relationship(
        "Position",
        back_populates = "onboarding_employees"
    )
    onboarding_employee_signed_by = relationship(
        "User",
        back_populates = "signed_onboarding_employees",
        foreign_keys = "OnboardingEmployee.signed_by"
    )
    onboarding_employee_updated_by = relationship(
        "User",
        back_populates = "updated_onboarding_employees",
        foreign_keys = "OnboardingEmployee.updated_by"
    )
    onboarding_employee_tasks = relationship(
        "OnboardingEmployeeTask",
        back_populates = "onboarding_employee"
    )


# Onboarding Tasks Model
class OnboardingTask(Base):
    __tablename__ = "onboarding_tasks"

    # Columns
    onboarding_task_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    title = Column(
        String(255),
        nullable = False
    )
    description = Column(
        Text,
        nullable = False
    )
    task_type = Column(
        String(255),
        nullable = False
    )
    is_general = Column(
        Boolean,
        nullable = False,
        default = False
    )
    department_id = Column(
        String(36),
        ForeignKey("departments.department_id"),
        nullable = False
    )
    added_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = False
    )
    updated_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = True
    )
    is_deleted = Column(
        Boolean,
        nullable = False,
        default = False
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    onboarding_task_for_department = relationship(
        "Department",
        back_populates = "department_onboarding_tasks"
    )
    onboarding_task_added_by = relationship(
        "User",
        back_populates = "added_onboarding_tasks",
        foreign_keys = "OnboardingTask.added_by"
    )
    onboarding_task_updated_by = relationship(
        "User",
        back_populates = "updated_onboarding_tasks",
        foreign_keys = "OnboardingTask.updated_by"
    )
    assigned_tasks = relationship(
        "OnboardingEmployeeTask",
        back_populates = "onboarding_task"
    )


# Onboarding Employee Task Model
class OnboardingEmployeeTask(Base):
    __tablename__ = "onboarding_employee_task"

    # Columns
    onboarding_employee_task_id = Column(
        String(36),
        primary_key = True,
        default = text("UUID()")
    )
    onboarding_employee_id = Column(
        String(36),
        ForeignKey("onboarding_employees.onboarding_employee_id"),
        nullable = False
    )
    onboarding_task_id = Column(
        String(36),
        ForeignKey("onboarding_tasks.onboarding_task_id"),
        nullable = False
    )
    start_at = Column(
        DateTime,
        nullable = False
    )
    end_at = Column(
        DateTime,
        nullable = False
    )
    assigned_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = False
    )
    status = Column(
        String(255),
        nullable = False
    )
    completed_at = Column(
        DateTime,
        nullable = True
    )
    completed_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = True
    )
    created_at = Column(
        DateTime,
        default = text('NOW()'),
        nullable = False
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationship
    onboarding_employee_task_assigned_by = relationship(
        "User",
        back_populates = "assigned_onboarding_employee_tasks",
        foreign_keys = "OnboardingEmployeeTask.assigned_by"
    )
    onboarding_employee = relationship(
        "OnboardingEmployee",
        back_populates = "onboarding_employee_tasks"
    )
    onboarding_task = relationship(
        "OnboardingTask",
        back_populates = "assigned_tasks"
    )
    onboarding_employee_task_completed_by = relationship(
        "User",
        back_populates = "completed_onboarding_employee_tasks",
        foreign_keys = "OnboardingEmployeeTask.completed_by"
    )
