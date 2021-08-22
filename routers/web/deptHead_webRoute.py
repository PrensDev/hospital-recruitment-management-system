# Import Packages
from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from routers.web import errPages_templates as errTemplate
from jwt_token import get_token
import schemas

# Router
router = APIRouter(
    prefix = "/d",
    tags = ["Department Head Web Routes"]
)

# Templates
templates = Jinja2Templates(directory = "templates")

# Constants
TEMPLATES_PATH = "/pages/department_head/"
AUTHORIZED_USER = "Department Head"

# ===========================================================
# WEB ROUTES
# ===========================================================

# Test
@router.get("/test-web", response_class=HTMLResponse)
async def test_web(req: Request, user_data: dict = Depends(get_token)):
    if user_data["user_type"] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "test.html", {
            "request": req
        })
    else:
        return errTemplate.page_not_found(req)


# Department Head Dashboard
@router.get("", response_class=HTMLResponse)
async def dashboard(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "dashboard.html", {
            "request": req,
            "page_title": user_data['user_type'],
            "sub_title": "Department Head manages all employees assigned in each departments",
            "active_navlink": "Dashboard"
        })
    else:
        return errTemplate.page_not_found(req)


# Manpower Requests
@router.get("/manpower-requests", response_class=HTMLResponse)
async def dashboard(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "manpower_requests.html", {
            "request": req,
            "page_title": "Manpower Requests",
            "sub_title": "Manpower Requests to manage requests for employees",
            "active_navlink": "Manpower Requests"
        })
    else:
        return errTemplate.page_not_found(req)


# Add Manpower Request
@router.get("/add-manpower-request", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "add_manpower_request.html", {
        "request": req,
        "page_title": "Add Manpower Request",
        "sub_title": "Add Manpower Request to request employees",
        "active_navlink": "Manpower Requests"
    })


# Hired Applicants
@router.get("/hired-applicants", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "hired_applicants.html", {
        "request": req,
        "page_title": "Hired Applicants",
        "sub_title": "Hired Applicants to manage new hired employees",
        "active_navlink": "Hired Applicants"
    })


# Onboarding Employees
@router.get("/onboarding-employees", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "onboarding_employees.html", {
        "request": req,
        "page_title": "Onboarding Employees",
        "sub_title": "Onboarding Employees to manage new employees on board",
        "active_navlink": "Onboarding Employees"
    })


# General Tasks
@router.get("/general-tasks", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "general_tasks.html", {
        "request": req,
        "page_title": "General Tasks",
        "sub_title": "General Tasks to manage employees tasks and monitor performances",
        "active_navlink": "General Tasks"
    })