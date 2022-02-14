# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship

# Requisition Model
class ManpowerRequest(Base):
    __tablename__ = "manpower_requests"

    # ==================================================================================
    # Columns
    # ==================================================================================

    manpower_request_id = Column(
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
        ForeignKey("employees.employee_id"),
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
        ForeignKey("employees.employee_id"),
        nullable = True
    )
    signed_at = Column(
        DateTime,
        nullable = True
    )
    reviewed_by = Column(
        String(36),
        ForeignKey("employees.employee_id"),
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
    # Relationship (From other tables/models)
    # ==================================================================================

    # From Employee
    manpower_request_requested_by = relationship(
        "Employee",
        back_populates = "requested_manpower_requests",
        foreign_keys = "ManpowerRequest.requested_by"
    )
    manpower_request_reviewed_by = relationship(
        "Employee",
        back_populates = "reviewed_manpower_requests",
        foreign_keys = "ManpowerRequest.reviewed_by"
    )
    manpower_request_signed_by = relationship(
        "Employee",
        back_populates = "signed_manpower_requests",
        foreign_keys = "ManpowerRequest.signed_by"
    )
    manpower_request_rejected_by = relationship(
        "Employee",
        back_populates = "rejected_manpower_requests",
        foreign_keys = "ManpowerRequest.rejected_by"
    )

    # From Employment Type
    employment_type = relationship(
        "EmployeeType",
        back_populates="manpower_requests",
    )

    # From EmploymentType
    employment_type = relationship(
        "EmploymentType",
        back_populates = "manpower_requests"
    )

    # From Position
    vacant_position = relationship(
        "Position",
        back_populates = "manpower_requests"
    )

    # ==================================================================================
    # Relationship (To other tables/models)
    # ==================================================================================

    # To JobPost
    job_post = relationship(
        "JobPost",
        back_populates = "manpower_request",
        uselist = False
    )
