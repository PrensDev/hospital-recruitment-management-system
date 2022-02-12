# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship

# Interview Question Model
class InterviewQuestion(Base):
    __tablename__ = "interview_questions"

    # ==================================================================================
    # Columns
    # ==================================================================================

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
        ForeignKey("employees.employee_id"),
        nullable = False
    )
    updated_by = Column(
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

    # From Employee
    interview_question_added_by = relationship(
        "Employee",
        back_populates = "added_interview_questions",
        foreign_keys = "InterviewQuestion.added_by"
    )
    interview_question_updated_by = relationship(
        "Employee",
        back_populates = "updated_interview_questions",
        foreign_keys = "InterviewQuestion.updated_by"
    )

    # ==================================================================================
    # Relationships (To other tables/columns)
    # ==================================================================================
    
    # To InterviewScore
    interview_scores = relationship(
        "InterviewScore",
        back_populates = "interview_question"
    )
