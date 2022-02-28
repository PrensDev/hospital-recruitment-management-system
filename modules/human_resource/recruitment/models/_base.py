from database import Base

# Import Models
from modules.human_resource.recruitment.models.Applicant import Applicant
from modules.human_resource.recruitment.models.Department import Department
from modules.human_resource.recruitment.models.Employee import Employee
from modules.human_resource.recruitment.models.EmploymentType import EmploymentType
from modules.human_resource.recruitment.models.InterviewQuestion import InterviewQuestion
from modules.human_resource.recruitment.models.InterviewSchedule import InterviewSchedule
from modules.human_resource.recruitment.models.InterviewScore import InterviewScore
from modules.human_resource.recruitment.models.Interviewee import Interviewee
from modules.human_resource.recruitment.models.JobCategory import JobCategory
from modules.human_resource.recruitment.models.JobPost import JobPost
from modules.human_resource.recruitment.models.ManpowerRequest import ManpowerRequest
from modules.human_resource.recruitment.models.OnboardingEmployee import OnboardingEmployee
from modules.human_resource.recruitment.models.OnboardingEmployeeTask import OnboardingEmployeeTask
from modules.human_resource.recruitment.models.OnboardingTask import OnboardingTask
from modules.human_resource.recruitment.models.Position import Position
from modules.human_resource.recruitment.models.Role import Role
from modules.human_resource.recruitment.models.SubDepartment import SubDepartment
from modules.human_resource.recruitment.models.InternalUser import InternalUser
from modules.human_resource.recruitment.models.UserRole import UserRole

# Import Packages
from database import Base
from sqlalchemy import text
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.sql.sqltypes import String, Integer, DateTime, Float, Text, Boolean, Date, Time
from sqlalchemy.orm import relationship

class PublicUser(Base):
    __tablename__ = 'public_users'

    id = Column(String(36), primary_key=True, default=text('UUID()'))
    email = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=text('NOW()'))
    updated_at = Column(DateTime, onupdate=text('NOW()'))
    is_blacklist = Column(Boolean, default=text('0'))

    profile = relationship('PublicProfile', back_populates='public_user', uselist=False)


class PublicProfile(Base):
    __tablename__ = 'public_profiles'

    id = Column(String(36), primary_key=True, nullable=False, default=text('UUID()'))
    user_id = Column(String(36), ForeignKey('public_users.id'), nullable=True)
    first_name = Column(String(255), nullable=False)
    middle_name = Column(String(255), nullable=True)
    last_name = Column(String(255), nullable=False)
    suffix_name = Column(String(255), nullable=True)
    birth_date = Column(Date, nullable=False)
    gender = Column(String(255), nullable=False)
    house_street = Column(String(255), nullable=False)
    barangay = Column(String(255), nullable=False)
    municipality = Column(String(255), nullable=False)
    province = Column(String(255), nullable=False)
    region = Column(String(255), nullable=False)
    contact_number = Column(String(255), nullable=False)
    image = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    full_address = Column(String(255), nullable=False)

    public_user = relationship('PublicUser', back_populates='profile')
