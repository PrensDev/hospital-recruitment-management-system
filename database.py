# Import Packages
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# Constants
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root@localhost/hospital_db"


# Engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)


# Session Local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Base
Base = declarative_base()


# Get Database
def get_db():
    db = SessionLocal()
    try:
        yield db
    except:
        db.close()