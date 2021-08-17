# Import Package
from typing import List
from pydantic import BaseModel


# Department Schema
class Department(BaseModel):
    name: str
    description: str


# Position Schema
class Position(BaseModel):
    name: str
    description: str


# User Schema
class User(BaseModel):
    first_name: str
    middle_name: str
    last_name: str
    suffix_name: str
    position_id: str
    email: str
    password: str
    user_type: str


# Login
class Login(BaseModel):
    email: str
    password: str


# User Info
class UserInfo(BaseModel):
    first_name: str
    middle_name: str
    last_name: str
    suffix_name: str
    email: str

    class Config():
        orm_mode = True

class TokenData(BaseModel):
    user_id: str
    user_type: str