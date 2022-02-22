# Import Packages
from typing import Optional
from fastapi import APIRouter, Request, Depends
from fastapi.responses import RedirectResponse
from fastapi.responses import HTMLResponse
from jwt_token import get_token
from sqlalchemy.orm import Session
from database import get_db


# Import submodule files
from modules.human_resource.recruitment.models._base import *


# Import Templates
from modules.home.routers.web._template import templates
from modules.human_resource.recruitment.routers.web import errPages_templates as errTemplate


# Router
router = APIRouter(
    prefix = "/home",
    tags = ["Home Web Routes"]
)


# Templates Path
TEMPLATES_PATH = "/pages/"


# Main Dashboard
@router.get("", response_class=HTMLResponse)
def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data:
        return templates.TemplateResponse(TEMPLATES_PATH + "main_dashboard.html", {
            "request": req,
            "page_title": "Main Dashboard",
            "sub_title": "Manage your tasks and activities here using this dashboard",
            "active_navlink": "Main Dashboard"
        })
    else:
        return errTemplate.page_not_found(req)