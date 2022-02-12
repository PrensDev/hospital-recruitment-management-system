# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship

# Interviewee Model
class Interviewee(Base):
    __tablename__ = "interviewees"

    # ==================================================================================
    # Columns
    # ==================================================================================

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

    # ==================================================================================
    # Relationships (From other tables/models)
    # ==================================================================================

    # From Applicant
    applicant_info = relationship(
        "Applicant",
        back_populates = "interviewee_info"
    )

    # From InterviewSchedule
    interview_schedule = relationship(
        "InterviewSchedule",
        back_populates = "interviewees"
    )
    
    # ==================================================================================
    # Relationships (To other tables/models)
    # ==================================================================================

    # To InterviewScore
    interview_scores = relationship(
        "InterviewScore",
        back_populates = "score_for"
    )
