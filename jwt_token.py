# Import Packages
from fastapi.exceptions import HTTPException
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import schemas

# Constants
SECRET_KEY = "09wfjhb30wfbjwfb2w0wef30ekjhwefhj3kt0afowwehffdfgdfg049"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 12400


# Generate Token
def generate_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm = ALGORITHM)


# Verify Token
def verify_token(token: str):
    credentials_exception = HTTPException(
        status_code = 401,
        detail = "Invalid credentials",
        headers = {"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        user_type: str = payload.get("user_type")
        if user_id == None and user_type == None:
            raise credentials_exception
        else:
            return schemas.TokenData(
                user_id = user_id,
                user_type = user_type
            )
    except JWTError:
        raise credentials_exception