# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship

# Inteview Schedule Model
class InterviewSchedule(Base):
    __tablename__ = "interview_schedules"

    # ==================================================================================
    # Columns
    # ==================================================================================

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
        ForeignKey("employees.employee_id"),
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

    # ==================================================================================
    # Relationships (From other tables/columns)
    # ==================================================================================

    # From JobPost
    schedule_for = relationship(
        "JobPost",
        back_populates = "interview_schedules"
    )

    # From Employee
    interview_schedule_set_by = relationship(
        "Employee",
        back_populates = "set_interview_schedules"
    )

    # ==================================================================================
    # Relationships (To other tables/columns)
    # ==================================================================================

    # To Interviewees
    interviewees = relationship(
        "Interviewee",
        back_populates = "interview_schedule"
    )

