# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship


# Department Model
class Department(Base):
    __tablename__ = "departments"

    # ==================================================================================
    # Columns
    # ==================================================================================

    department_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
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
    # Relationships (To other tables)
    # ==================================================================================

    # To SubDepartment
    sub_departments = relationship(
        "SubDepartment",
        back_populates = "main_department"
    )