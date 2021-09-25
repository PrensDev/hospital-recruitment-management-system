# Import Packages
from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from routers.web import errPages_templates as errTemplate
from jwt_token import get_token
from sqlalchemy.orm import Session
from database import get_db
import schemas, models


# Models
Requisition = models.Requisition


# Router
router = APIRouter(
    prefix = "/dh",
    tags = ["Department Manager Web Routes"]
)


# Templates
templates = Jinja2Templates(directory = "templates")


# Constants
TEMPLATES_PATH = "/pages/department_head/"
AUTHORIZED_USER = "Department Head"


# ===========================================================
# WEB ROUTES
# ===========================================================


# Department Head Dashboard
@router.get("", response_class=HTMLResponse)
async def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "dashboard.html", {
            "request": req,
            "page_title": user_data['user_type'],
            "sub_title": "Manage your tasks and activities here using this dashboard",
            "active_navlink": "Dashboard"
        })
    else:
        return await errTemplate.page_not_found(req)


# ===========================================================
# MANPOWER REQUESTS
# ===========================================================


# Manpower Requests
@router.get("/manpower-requests", response_class=HTMLResponse)
async def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "manpower_requests.html", {
            "request": req,
            "page_title": "Manpower Requests",
            "sub_title": "Manpower Requests to manage requests for employees",
            "active_navlink": "Manpower Requests"
        })
    else:
        return await errTemplate.page_not_found(req)

