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

    
    id = Column(
        String(36), 
        primary_key=True, 
        default=text('UUID()')
    )
    subsystem = Column(
        String(255), 
        nullable=False
    )
    name = Column(
        String(255), 
        nullable=False
    )
    redirect_url = Column(
        String(255), 
        nullable=False
    )

    # ==================================================================================
    # Relationships (To other tables/models)
    # ==================================================================================

    # To UserRole
    users = relationship(
        "UserRole",
        back_populates = "role"
    )