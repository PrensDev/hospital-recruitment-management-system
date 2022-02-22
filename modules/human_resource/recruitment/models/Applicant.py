# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship


# Applicants Model
class Applicant(Base):
    __tablename__ = "applicants"

    # ==================================================================================
    # Columns
    # ==================================================================================

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
        ForeignKey("employees.employee_id"),
        nullable = True
    )
    evaluated_at = Column(
        DateTime,
        nullable = True
    )
    screened_by = Column(
        String(36),
        ForeignKey("employees.employee_id"),
        nullable = True
    )
    screened_at = Column(
        DateTime,
        nullable = True
    )
    hired_by = Column(
        String(36),
        ForeignKey("employees.employee_id"),
        nullable = True  
    )
    hired_at = Column(
        String(36),
        nullable = True
    )
    rejected_by = Column(
        String(36),
        ForeignKey("employees.employee_id"),
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

    # ==================================================================================
    # Relationships (From other tables/models)
    # ==================================================================================

    # From JobPost
    applied_job = relationship(
        "JobPost",
        back_populates = "applicants"
    )
    
    # From Employee
    applicant_evaluated_by = relationship(
        "Employee",
        back_populates = "evaluated_applicants",
        foreign_keys = "Applicant.evaluated_by"
    )
    applicant_screened_by = relationship(
        "Employee",
        back_populates = "screened_applicants",
        foreign_keys = "Applicant.screened_by"
    )
    applicant_hired_by = relationship(
        "Employee",
        back_populates = "hired_applicants",
        foreign_keys = "Applicant.hired_by"
    )
    applicant_rejected_by = relationship(
        "Employee",
        back_populates = "rejected_applicants",
        foreign_keys = "Applicant.rejected_by"
    )

    # ==================================================================================
    # Relationships (To other tables/models)
    # ==================================================================================

    # To Interviewee
    interviewee_info = relationship(
        "Interviewee",
        back_populates = "applicant_info",
        uselist = False
    )