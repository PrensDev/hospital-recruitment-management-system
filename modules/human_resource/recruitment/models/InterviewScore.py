# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship

# Interview Score Model
class InterviewScore(Base):
    __tablename__ = "interview_scores"

    # ==================================================================================
    # Columns
    # ==================================================================================

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

    # From InterviewQuestion
    interview_question = relationship(
        "InterviewQuestion",
        back_populates = "interview_scores"
    )

    # From Employee
    interview_scored_by = relationship(
        "Employee",
        back_populates = "set_interview_scores"
    )

    # From Interviewee
    score_for = relationship(
        "Interviewee",
        back_populates = "interview_scores"
    )
