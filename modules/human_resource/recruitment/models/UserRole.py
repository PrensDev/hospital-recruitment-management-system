# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship


# User Role Model
class UserRole(Base):
    __tablename__ = "user_roles"
    
    # ==================================================================================
    # Relationship (From other tables/models)
    # ==================================================================================

    id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    user_id = Column(
        String(36),
        ForeignKey("internal_users.id"),
        nullable = False
    )
    role_id = Column(
        String(36),
        ForeignKey("roles.id"),
        nullable = False
    )


    # ==================================================================================
    # Relationship (From other tables/models)
    # ==================================================================================
    
    # From User
    user = relationship(
        "InternalUser",
        back_populates = "roles"
    )

    # From Role
    role = relationship(
        "Role",
        back_populates = "users"
    )