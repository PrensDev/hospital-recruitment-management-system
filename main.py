# Import Packages
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles


# App Instance
app = FastAPI()


# Mount static folder
app.mount('/static', StaticFiles(directory='static'), name='static')



# Import Submodules
from modules.human_resource.recruitment_management.app import app as recruitment_management

# Mount Submodules
app.mount('/human-resource/recruitment', recruitment_management)