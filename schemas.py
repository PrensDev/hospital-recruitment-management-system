# Import Package
from typing import List
from pydantic import BaseModel


# User Schema
class User(BaseModel):
    first_name: str
    middle_name: str
    last_name: str
    suffix_name: str
    email: str
    password: str
    user_type: str