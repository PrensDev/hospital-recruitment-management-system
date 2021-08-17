# Import Packages
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

# Router
router = APIRouter(
    prefix = "/d",
    tags = ["Department Head Web Routes"]
)

# Templates
templates = Jinja2Templates(directory = "templates")

# Templates Path
TEMPLATES_PATH = "/pages/department_head/"


# ===========================================================
# WEB ROUTES
# ===========================================================

# Department Head Dashboard
@router.get("", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "dashboard.html", {
        "request": req,
        "page_title": "Dashboard",
        "active_navlink": "Dashboard"
    })

# Manpower Requests
@router.get("/manpower-requests", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "manpower_requests.html", {
        "request": req,
        "page_title": "Manpower Requests",
        "active_navlink": "Manpower Requests"
    })

# Hired Applicants
@router.get("/hired-applicants", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "hired_applicants.html", {
        "request": req,
        "page_title": "Hired Applicants",
        "active_navlink": "Hired Applicants"
    })

# Onboarding Employees
@router.get("/onboarding-employees", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "onboarding_employees.html", {
        "request": req,
        "page_title": "Onboarding Employees",
        "active_navlink": "Onboarding Employees"
    })

# General Tasks
@router.get("/general-tasks", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "general_tasks.html", {
        "request": req,
        "page_title": "General Tasks",
        "active_navlink": "General Tasks"
    })