# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship

# Sub Department Model
class SubDepartment(Base):
    __tablename__ = "sub_departments"

    # ==================================================================================
    # Columns
    # ==================================================================================

    sub_department_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
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
        Text,
        nullable = False
    )
    location = Column(
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

    # From department
    main_department = relationship(
        "Department",
        back_populates = "sub_departments"
    )

    # ==================================================================================
    # Relationship (From other tables/models)
    # ==================================================================================

    # To Position
    positions = relationship(
        "Position", 
        back_populates = "sub_department"
    )

    # To OnboardingTask
    onboarding_tasks = relationship(
        "OnboardingTask",
        back_populates = "for_sub_department"
    )