# =================================================================
# Import Packages
# =================================================================
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

# To create tables
# from modules.human_resource.recruitment.models import _base
# from database import engine
# _base.Base.metadata.create_all(bind=engine)


# App Instance
app = FastAPI()


# Mount static folder
app.mount('/static', StaticFiles(directory='static'), name='static')


# =================================================================
# Import Submodules
# =================================================================

# Human Resource
from modules.human_resource.recruitment.app import app as recruitment



# Mount Submodules
app.mount('/', recruitment)