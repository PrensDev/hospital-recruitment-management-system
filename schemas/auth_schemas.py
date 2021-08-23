# Import Package
from pydantic import BaseModel


# Token Data
class TokenData(BaseModel):
    user_id: str
    user_type: str