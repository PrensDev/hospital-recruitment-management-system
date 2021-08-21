# Import Packages
from sqlalchemy.sql.expression import null
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.sql.sqltypes import Date, String, Integer, DateTime, Float, Text
from sqlalchemy.orm import relationship


# User Model
class User(Base):
    __tablename__ = "users"

    # User Columns
    user_id = Column(
        String(36),
        primary_key = True, 
        default = text('UUID()'),
    )
    first_name = Column(
        String(255),
        nullable = False
    )
    middle_name = Column(
        String(255),
        nullable =  True
    )
    last_name = Column(
        String(255),
        nullable = False
    )
    suffix_name = Column(
        String(255),
        nullable = True
    )
    position_id = Column(
        String(36),
        ForeignKey("positions.position_id"),
        nullable = False
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
    user_type = Column(
        String(255),
        nullable = False
    )
    created_at = Column(
        DateTime,
        default = text('NOW()')
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    position = relationship(
        "Position", 
        back_populates = "roled_by_following",
    )
    manpower_requests = relationship(
        "Requisition", 
        back_populates = "manpower_request_by",
        foreign_keys = "Requisition.requested_by"
    )
    reviewed_manpower_requests = relationship(
        "Requisition",
        back_populates = "manpower_request_reviewed_by",
        foreign_keys = "Requisition.reviewed_by"
    )


# Positions Model
class Position(Base):
    __tablename__ = "positions"

    # Position Columns
    position_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()'),
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
        String(255),
        nullable = False
    )
    created_at = Column(
        DateTime,
        default = text('NOW()')
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    roled_by_following = relationship(
        "User", 
        back_populates = "position"
    )
    department = relationship(
        "Department", 
        back_populates = "department_positions"
    )
    vacancy_requests = relationship(
        "Requisition",
        back_populates = "vacant_position"
    )


# Department Model
class Department(Base):
    __tablename__ = "departments"

    # Department Columns
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
        default = text('NOW()')
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationsips
    department_positions = relationship("Position", back_populates = "department")


# Requisition Model
class Requisition(Base):
    __tablename__ = "requisitions"

    # Requisition Columns
    requisition_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    requested_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = False
    )
    position_id = Column(
        String(36),
        ForeignKey("positions.position_id"),
        nullable = False
    )
    employment_type = Column(
        String(255),
        nullable = False
    )
    request_nature = Column(
        String(255),
        default = "For Review",
        nullable = False
    )
    staffs_needed = Column(
        Integer,
        nullable = False
    )
    min_monthly_salary = Column(
        Float,
        nullable = True
    )
    max_monthly_salary = Column(
        Float,
        nullable = True
    )
    content = Column(
        Text,
        nullable = False
    )
    request_status = Column(
        String(255),
        nullable = False
    )
    deadline = Column(
        DateTime,
        nullable = True
    )
    reviewed_by = Column(
        String(36),
        ForeignKey("users.user_id"),
        nullable = True
    )
    reviewed_at = Column(
        DateTime,
        nullable = True
    )
    completed_at = Column(
        DateTime,
        nullable = True
    )
    created_at = Column(
        DateTime,
        default = text('NOW()')
    )
    updated_at = Column(
        DateTime,
        default = text('NOW()'),
        onupdate = text('NOW()')
    )

    # Relationships
    manpower_request_by = relationship(
        "User",
        back_populates = "manpower_requests",
        foreign_keys = "Requisition.requested_by"
    )
    manpower_request_reviewed_by = relationship(
        "User",
        back_populates = "reviewed_manpower_requests",
        foreign_keys = "Requisition.reviewed_by"
    )
    vacant_position = relationship(
        "Position",
        back_populates = "vacancy_requests"
    )