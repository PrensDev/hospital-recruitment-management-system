# Import Packages
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from database import engine

# Import Routers
from routers.api import test_apiRoute, auth_apiRoute
from routers.web import home_webRoute, deptHead_webRoute, hireMng_webRoute, recruiter_webRoute

# Import Models
import models


# App Instance
app = FastAPI()


# Model Migration
models.Base.metadata.create_all(engine)


# API Routers
app.include_router(test_apiRoute.router)
# app.include_router(auth_apiRoute.router)


# Mount static folder
app.mount('/static', StaticFiles(directory='static'), name='static')


# Web Routers
app.include_router(home_webRoute.router)
app.include_router(deptHead_webRoute.router)
app.include_router(hireMng_webRoute.router)
app.include_router(recruiter_webRoute.router)