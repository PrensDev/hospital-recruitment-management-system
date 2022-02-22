# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.sql.sqltypes import String, Integer, DateTime, Float, Text, Boolean, Date, Time
from sqlalchemy.orm import relationship

# User Model
class User(Base):
    __tablename__ = "users"

    # ==================================================================================
    # Columns
    # ==================================================================================

    user_id = Column(
        String(36),
        primary_key = True, 
        default = text('UUID()'),
    )
    employee_id = Column(
        String(36),
        ForeignKey("employees.employee_id"),
        default = text('UUID()')
    )
    email = Column(
        String(255),
        unique = True,
        nullable = False
    )
    password = Column(
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

    # From Employee
    employee_info = relationship(
        "Employee",
        back_populates = "user_credentials"
    )

    # ==================================================================================
    # Relationship (To other tables/models)
    # ==================================================================================

    # To UserRole
    user_roles = relationship(
        "UserRole", 
        back_populates = "account_info",
    )

