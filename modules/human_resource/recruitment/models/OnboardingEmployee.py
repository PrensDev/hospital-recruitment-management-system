# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship

# Onboarding Employee Model
class OnboardingEmployee(Base):
    __tablename__ = "onboarding_employees"

    # ==================================================================================
    # Columns
    # ==================================================================================

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
    # Relationship (From other tables/models)
    # ==================================================================================

    # From Position
    onboarding_employee_position = relationship(
        "Position",
        back_populates = "onboarding_employees"
    )

    # From Employee
    onboarding_employee_signed_by = relationship(
        "Employee",
        back_populates = "signed_onboarding_employees",
        foreign_keys = "OnboardingEmployee.signed_by"
    )
    onboarding_employee_updated_by = relationship(
        "Employee",
        back_populates = "updated_onboarding_employees",
        foreign_keys = "OnboardingEmployee.updated_by"
    )

    # ==================================================================================
    # Relationship (To other tables/models)
    # ==================================================================================

    # To OnboardingEmployeeTask
    onboarding_employee_tasks = relationship(
        "OnboardingEmployeeTask",
        back_populates = "onboarding_employee"
    )

