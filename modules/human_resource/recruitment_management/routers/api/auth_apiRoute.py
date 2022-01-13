# Import Packages
from jwt_token import generate_token
from fastapi import APIRouter, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
from hashing import Hash
from modules.human_resource.recruitment_management.models import *


# Router Instance
router = APIRouter(
    prefix = "/api/auth",
    tags = ["Authentication API"]
)


# Login
@router.post("/login")
def login(res: Response, req: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    
    # Get user information
    user = db.query(User).filter(User.email == req.username).first()

    # Check if user is existing in database
    if not user:
        return { "login_status": "Failed", "message": "User does not exist" }

    # Check is user password is matched in database
    matched = Hash.verify(req.password, user.password)
    if not matched:
        return { "login_status": "Failed", "message": "Incorrect Credentials" }
    
    # If no error, setup cookies and access tokens for giving user previledge
    user_type = user.user_type
    token_data = { "user_id": user.user_id, "user_type": user_type }
    access_token = generate_token(data = token_data)
    res.set_cookie(key = "access_token", value = access_token, httponly = True)
    res.set_cookie(key = "user_type", value = user_type, httponly = True)
    return { "access_token": access_token, "token_type": "bearer" }


# Logout
@router.get("/logout")
def logout(res: Response):
    res.delete_cookie("access_token")
    res.delete_cookie("user_type")
    return { "logout_status": "Success", "message": "Log out is successful" }