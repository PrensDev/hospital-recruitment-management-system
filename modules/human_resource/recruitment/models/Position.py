# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship

# Position Model
class Position(Base):
    __tablename__ = "positions"

    # ==================================================================================
    # Columns
    # ==================================================================================

    position_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()'),
    )
    sub_department_id = Column(
        String(36),
        ForeignKey("sub_departments.sub_department_id"),
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

    # ==================================================================================
    # Relationship (From other tables/models)
    # ==================================================================================

    # From SubDepartment
    sub_department = relationship(
        "SubDepartment",
        back_populates = "positions"
    )

    # ==================================================================================
    # Relationship (To other tables/models)
    # ==================================================================================

    # To Employee
    employees = relationship(
        "Employee",
        back_populates = "position"
    )

    # To ManpowerRequest
    manpower_requests = relationship(
        "ManpowerRequest",
        back_populates = "position"
    )

    # To OnboardingEmployee
    onboarding_employees = relationship(
        "OnboardingEmployee",
        back_populates = "onboarding_employee_position"
    )