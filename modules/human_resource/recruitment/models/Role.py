# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship

# Role Model
class Role(Base):
    __tablename__ = "roles"

    # ==================================================================================
    # Columns
    # ==================================================================================

    role_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    name = Column(
        String(36),
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
    # Relationships (To other tables/models)
    # ==================================================================================

    # To UserRole
    user_roles = relationship(
        "UserRole",
        back_populates = "role_info"
    )