# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship


# User Role Model
class UserRole(Base):
    __tablename__ = "user_role"
    
    # ==================================================================================
    # Relationship (From other tables/models)
    # ==================================================================================

    user_role_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    user_id = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = False
    )
    role_id = Column(
        String(36),
        ForeignKey("roles.role_id"),
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
    
    # From User
    account_info = relationship(
        "User",
        back_populates = "user_roles"
    )

    # From Role
    role_info = relationship(
        "Role",
        back_populates = "user_roles"
    )