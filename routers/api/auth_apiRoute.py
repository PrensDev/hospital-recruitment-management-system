# Import Packages
from jwt_token import generate_token
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
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
def login(req: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    try:
        user = db.query(models.User).filter(models.User.email == req.username).first()
        if user:
            matched = Hash.verify(req.password, user.password)
            if matched:
                token_data = {
                    "user_id": user.user_id,
                    "user_type": user.user_type
                }
                return {
                    "access_token": generate_token(data = token_data),
                    "token_type": "Bearer"
                }
            else:
                return {"msg": "Invalid password"}
        else:
            return {"msg": "User does not exist"}
    except Exception as e:
        print(e)