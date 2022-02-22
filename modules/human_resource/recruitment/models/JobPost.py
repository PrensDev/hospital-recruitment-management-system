# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship

# Job Post Model
class JobPost(Base):
    __tablename__ = "job_posts"

    # ==================================================================================
    # Columns
    # ==================================================================================

    job_post_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    manpower_request_id = Column(
        String(36),
        ForeignKey("manpower_requests.manpower_request_id"),
        nullable = False
    )
    is_salary_visible = Column(
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
        ForeignKey("employees.employee_id"),
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

    # ==================================================================================
    # Relationship (From other tables/models)
    # ==================================================================================

    # From ManpowerRequest
    manpower_request = relationship(
        "ManpowerRequest",
        back_populates = "job_post"
    )

    # From Employee
    job_post_posted_by = relationship(
        "Employee",
        back_populates = "created_job_posts"
    )

    # From JobCategory
    job_category = relationship(
        "JobCategory",
        back_populates = "job_posts",
    )

    # ==================================================================================
    # Relationship (To other tables/models)
    # ==================================================================================

    # To Applicants
    applicants = relationship(
        "Applicant",
        back_populates = "applied_job"
    )

    # To Interview Schedule
    interview_schedules = relationship(
        "InterviewSchedule",
        back_populates = "schedule_for"
    )

