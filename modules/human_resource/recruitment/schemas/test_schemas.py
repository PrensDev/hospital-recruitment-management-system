# Import Package
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from modules.human_resource.recruitment.schemas.main_schemas import *


class CreateDepartment(BaseModel):
    name: str
    description: str


class CreateSubDepartment(BaseModel):
    department_id: str
    name: str
    descripiton: str