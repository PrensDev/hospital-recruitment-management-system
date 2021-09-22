# Import Package
from datetime import datetime, date, time
from typing import List, Optional
from pydantic import BaseModel


# Show Department Positions Schema
class ShowDepartmentPosition(BaseModel):
    position_id: str
    name: str
    description: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config():
        orm_mode = True


# Create Manpower Request
class CreateManpowerRequest(BaseModel):
    position_id: str
    employment_type: str
    request_nature: str
    staffs_needed: int
    min_monthly_salary: Optional[float]
    max_monthly_salary: Optional[float]
    content: str
    deadline: Optional[datetime]