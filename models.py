# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.sql.sqltypes import String, DateTime
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
    position = relationship("Position", back_populates = "roled_by_following")


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
    roled_by_following = relationship("User", back_populates = "position")
    department = relationship("Department", back_populates = "department_positions")


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
# class Requisition(Base):
#     __tablename__ = "requisitions"

#     # Requisition Columns
#     requisition_id = Column(
#         String(36),
#         primary_key = True,
#         default = text('UUID()')
#     )
