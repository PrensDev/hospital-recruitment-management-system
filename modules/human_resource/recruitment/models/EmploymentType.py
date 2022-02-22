# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship

# Employment Type Model
class EmploymentType(Base):
    __tablename__ = "employment_types"

    # ==================================================================================
    # Column
    # ==================================================================================

    employment_type_id = Column(
        String(36),
        primary_key=True,
        default=text('UUID()')
    )
    name = Column(
        String(255),
        nullable = False
    )
    description = Column(
        Text,
        nullable = False,
    )
    is_active = Column(
        Boolean,
        default = True,
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
    # Relationship (To other tables/models)
    # ==================================================================================

    # To ManpoweRequest
    manpower_requests = relationship(
        "ManpowerRequest",
        back_populates = "employment_type"
    )

    # To Employee
    employees = relationship(
        "Employee",
        back_populates = "employment_type"
    )

