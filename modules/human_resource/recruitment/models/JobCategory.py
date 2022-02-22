# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship


# Job Category Model
class JobCategory(Base):
    __tablename__ = "job_categories"

    # ==================================================================================
    # Columns
    # ==================================================================================

    job_category_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    name = Column(
        String(36),
        nullable = False
    )
    description = Column(
        Text,
        nullable = False
    )
    is_removed = Column(
        Boolean,
        nullable = False,
        default = False
    )
    created_by = Column(
        String(36),
        ForeignKey("employees.employee_id"),
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
    # Relationships (From other tables/models)
    # ==================================================================================

    # From Employee
    job_category_created_by = relationship(
        "Employee",
        back_populates = "created_job_categories",
    )

    # ==================================================================================
    # Relationships (To other tables/models)
    # ==================================================================================

    job_posts = relationship(
        "JobPost",
        back_populates = "job_category"
    )
