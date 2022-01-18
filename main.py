# Import Packages
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

# To create tables
# from modules.human_resource.recruitment_management import models
# from database import engine
# models.Base.metadata.create_all(bind=engine)


# App Instance
app = FastAPI()


# Mount static folder
app.mount('/static', StaticFiles(directory='static'), name='static')



# Import Submodules
from modules.human_resource.recruitment_management.app import app as recruitment_management

# Mount Submodules
app.mount('/', recruitment_management)