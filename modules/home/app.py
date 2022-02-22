# Import Packages
from fastapi import FastAPI


# Import Web Routers
from modules.home.routers.web import main_webRoute


# App Instance
home_app = FastAPI()


# Web Routers
home_app.include_router(main_webRoute.router)