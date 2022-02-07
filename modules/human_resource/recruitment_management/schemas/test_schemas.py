# Import Package
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

# Position Schema
class Position(BaseModel):
    name: str
    description: str

# Show Position For Department
class ShowPositionForDepartment(Position):
    position_id: str

    class Config():
        orm_mode = True

# Show Department Positions Schema
class ShowDepartmentPosition(BaseModel):
    department_id: str
    name: str
    description: str
    created_at: datetime
    updated_at: Optional[datetime]
    department_positions: List[ShowPositionForDepartment]

    class Config():
        orm_mode = True


# User Schema
class User(BaseModel):
    first_name: str
    middle_name: Optional[str]
    last_name: str
    suffix_name: Optional[str]
    position_id: str
    email: str
    password: str
    user_type: str



# Create Employment Type
class CreateEmploymentType(BaseModel):
    name: str
    description: str