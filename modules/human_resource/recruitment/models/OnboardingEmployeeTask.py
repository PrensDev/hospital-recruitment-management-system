# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import *
from sqlalchemy.sql.sqltypes import *
from sqlalchemy.orm import relationship

class OnboardingEmployeeTask(Base):
    __tablename__ = "onboarding_employee_task"
    
    # ==================================================================================
    # Columns
    # ==================================================================================

    onboarding_employee_task_id = Column(
        String(36),
        primary_key = True,
        default = text("UUID()")
    )
    onboarding_employee_id = Column(
        String(36),
        ForeignKey("onboarding_employees.onboarding_employee_id"),
        nullable = False
    )
    onboarding_task_id = Column(
        String(36),
        ForeignKey("onboarding_tasks.onboarding_task_id"),
        nullable = False
    )
    start_at = Column(
        DateTime,
        nullable = False
    )
    end_at = Column(
        DateTime,
        nullable = False
    )
    assigned_by = Column(
        String(36),
        ForeignKey("employees.employee_id"),
        nullable = False
    )
    status = Column(
        String(255),
        nullable = False
    )
    completed_at = Column(
        DateTime,
        nullable = True
    )
    completed_by = Column(
        String(36),
        ForeignKey("employees.employee_id"),
        nullable = True
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

    # From OnboardingEmployee
    onboarding_employee = relationship(
        "OnboardingEmployee",
        back_populates = "onboarding_employee_tasks"
    )

    # From OnboardingTask
    onboarding_task = relationship(
        "OnboardingTask",
        back_populates = "assigned_tasks"
    )
    
    # From Employee
    onboarding_employee_task_assigned_by = relationship(
        "Employee",
        back_populates = "assigned_onboarding_employee_tasks",
        foreign_keys = "OnboardingEmployeeTask.assigned_by"
    )
    onboarding_employee_task_completed_by = relationship(
        "Employee",
        back_populates = "completed_onboarding_employee_tasks",
        foreign_keys = "OnboardingEmployeeTask.completed_by"
    )
