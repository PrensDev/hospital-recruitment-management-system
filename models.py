# Import Packages
from sqlalchemy.sql.expression import null
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.sql.sqltypes import String, Integer, DateTime, Float, Text, Boolean
from sqlalchemy.orm import relationship


# User Model
class User(Base):
    __tablename__ = "users"

    # User Columns
    user_id = Column(
        String(36),
        primary_key = True, 
        default = text('UUID()'),
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
    suffix_name = Column(
        String(255),
        nullable = True
    )
    position_id = Column(
        String(36),
        ForeignKey("positions.position_id"),
        nullable = False
    )
    email = Column(
        String(255),
        unique = True,
        nullable = False
    )
    password = Column(
        String(255),
        nullable = False
    )
    user_type = Column(
        String(255),
        nullable = False
    )
    created_at = Column(
        DateTime,
        default = text('NOW()')
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
    manpower_requests = relationship(
        "Requisition", 
        back_populates = "manpower_request_by",
        foreign_keys = "Requisition.requested_by"
    )
    reviewed_manpower_requests = relationship(
        "Requisition",
        back_populates = "manpower_request_reviewed_by",
        foreign_keys = "Requisition.reviewed_by"
    )
    job_posts = relationship(
        "JobPost",
        back_populates = "job_posted_by"
    )
    evaluated_applicants = relationship(
        "Applicant",
        back_populates = "evaluation_done_by",
        foreign_keys = "Applicant.evaluated_by"
    )
    screened_applicants = relationship(
        "Applicant",
        back_populates = "screening_done_by",
        foreign_keys = "Applicant.screened_by"
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
        default = text('NOW()')
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


# Department Model
class Department(Base):
    __tablename__ = "departments"

    # Department Columns
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
        default = text('NOW()')
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationsips
    department_positions = relationship("Position", back_populates = "department")


# Requisition Model
class Requisition(Base):
    __tablename__ = "requisitions"

    # Requisition Columns
    requisition_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
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
    employment_type = Column(
        String(255),
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
    remarks = Column(
        Text,
        nullable = True
    )
    created_at = Column(
        DateTime,
        default = text('NOW()')
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
    vacant_position = relationship(
        "Position",
        back_populates = "vacancy_requests"
    )
    job_post = relationship(
        "JobPost",
        back_populates = "manpower_request"
    )


# Job Post
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
    posted_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = False
    )
    created_at = Column(
        DateTime,
        default = text('NOW()')
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


# Applicants
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
        ForeignKey("job_posts.job_post_id")
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
        nullable = False
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
    remarks = Column(
        Text,
        nullable = True
    )
    created_at = Column(
        DateTime,
        default = text('NOW()')
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
        back_populates = "interviewee_applicant"
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


# Interviewee
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
        default = text('NOW()')
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationhips
    interviewee_applicant = relationship(
        "Applicant",
        back_populates = "interviewee_info"
    )
    interview_schedule = relationship(
        "InterviewSchedule",
        back_populates = "interviewee"
    )


# Interview Schedule
class InterviewSchedule(Base):
    __tablename__ = "interview_schedules"

    # Columns
    interview_schedule_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    created_at = Column(
        DateTime,
        default = text('NOW()')
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    interviewee = relationship(
        "Interviewee",
        back_populates = "interview_schedule"
    )