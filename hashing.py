from fastapi import Depends
from passlib.context import CryptContext
import jwt

TOKEN_SECRET = "TokenSecret"

pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Hash():
    def encrypt(password: str):
        return pwd_cxt.hash(password)

    def verify(plain: str, hashed: str):
        return pwd_cxt.verify(plain, hashed)

class Token():
    def generate(data):
        try:
            access_token = jwt.encode(data, TOKEN_SECRET)
            return {
                "access_token": access_token,
                "token_type": "Bearer"
            }
        except Exception as e:
            print(e)