# Import Packages
from jwt_token import generate_token
from fastapi import APIRouter, Depends, Response, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
from hashing import Hash
from pydantic import BaseModel

# Import Models
from modules.human_resource.recruitment.models._base import *
from modules.human_resource.recruitment.schemas.main_schemas import UserCredentials

# Router Instance
router = APIRouter(
    prefix = "/api/auth",
    tags = ["Authentication API"]
)

# Login
@router.post("/login")
def login(res: Response, req: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    
    # Get user information
    user_credentials = db.query(User).filter(User.email == req.username).join(Employee).join(UserRole).join(Role).first()

    # For Inavlid Login Details
    ACCESS_DENIED_MESSAGE = {
        "access": "Denied",
        "message": "Incorrect credentials"
    }

    # Check if user is existing in database
    if not user_credentials:
        raise HTTPException(
            status_code=401,
            detail=ACCESS_DENIED_MESSAGE,
            headers={"WWW-Authenticate": "Basic"},
        )


    # Check is user password is matched in database
    matched = Hash.verify(req.password, user_credentials.password)
    if not matched:
        raise HTTPException(
            status_code=401,
            detail=ACCESS_DENIED_MESSAGE,
            headers={"WWW-Authenticate": "Basic"},
        )

    # If no error, setup cookies and access tokens for giving user previledge
    
    # Get roles
    user_roles = user_credentials.user_roles
    roles = []
    for role in user_roles:
        roles.append(role.role_info.name)

    # Get Employee Info
    employee_info = user_credentials.employee_info

    # Setup token data
    token_data = { 
        "user_id": user_credentials.user_id, 
        "employee_id": employee_info.employee_id,
        "roles": roles
    }
    
    # Setup access token
    access_token = generate_token(data = token_data)
    res.set_cookie(
        key = "access_token", 
        value = access_token, 
        httponly = True
    )
    res.set_cookie(
        key = "roles", 
        value = roles, 
        httponly = True
    )
    return { 
        "access_token": access_token, 
        "token_type": "bearer" 
    }


# Logout
@router.get("/logout")
def logout(res: Response):
    res.delete_cookie("access_token")
    res.delete_cookie("user_type")
    return {
        "logout_status": "Success", 
        "message": "Log out is successful"
    }