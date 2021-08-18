# Import Packages
from jwt_token import generate_token
from fastapi import APIRouter, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
from hashing import Hash

import schemas, models

# Router Instance
router = APIRouter(
    prefix = "/api/auth",
    tags = ["Authentication API"]
)


# Login
@router.post("/login")
def login(res: Response, req: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    try:
        user = db.query(models.User).filter(models.User.email == req.username).first()
        if user:
            matched = Hash.verify(req.password, user.password)
            if matched:
                user_id = user.user_id
                user_type = user.user_type
                token_data = {
                    "user_id": user_id,
                    "user_type": user_type
                }
                access_token = generate_token(data = token_data)
                res.set_cookie(
                    key = "user_id",
                    value = user_id,
                    httponly = True
                )
                res.set_cookie(
                    key = "user_type",
                    value = user_type,
                    httponly = True
                )
                res.set_cookie(
                    key = "access_token",
                    value = access_token,
                    httponly = True
                )
                return {
                    "access_token": access_token,
                    "token_type": "Bearer"
                }
            else:
                return {
                    "login_status": "Failed",
                    "message": "Invalid password"
                }
        else:
            return {
                "login_status": "Failed",
                "message": "User does not exist"
            }
    except Exception as e:
        print(e)