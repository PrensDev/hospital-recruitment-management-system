# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship

# Onboarding Tasks Model
class OnboardingTask(Base):
    __tablename__ = "onboarding_tasks"

    # ==================================================================================
    # Columns
    # ==================================================================================

    onboarding_task_id = Column(
        String(36),
        primary_key = True,
        default = text('UUID()')
    )
    title = Column(
        String(255),
        nullable = False
    )
    description = Column(
        Text,
        nullable = False
    )
    task_type = Column(
        String(255),
        nullable = False
    )
    is_general = Column(
        Boolean,
        nullable = False,
        default = False
    )
    sub_department_id = Column(
        String(36),
        ForeignKey("sub_departments.sub_department_id"),
        nullable = False
    )
    added_by = Column(
        String(36),
        ForeignKey("employees.employee_id"),
        nullable = False
    )
    updated_by = Column(
        String(36),
        ForeignKey("employees.employee_id"),
        nullable = True
    )
    is_deleted = Column(
        Boolean,
        nullable = False,
        default = False
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
    # Relationship (From other tables/column)
    # ==================================================================================

    # From SubDepartment
    for_sub_department = relationship(
        "SubDepartment",
        back_populates = "onboarding_tasks"
    )

    # Employee
    onboarding_task_added_by = relationship(
        "Employee",
        back_populates = "added_onboarding_tasks",
        foreign_keys = "OnboardingTask.added_by"
    )
    onboarding_task_updated_by = relationship(
        "Employee",
        back_populates = "updated_onboarding_tasks",
        foreign_keys = "OnboardingTask.updated_by"
    )

    # ==================================================================================
    # Relationship (To other tables/column)
    # ==================================================================================

    # To OnboardingEmployeeTask
    assigned_tasks = relationship(
        "OnboardingEmployeeTask",
        back_populates = "onboarding_task"
    )

