# Import Packages
from typing import Optional
from fastapi import APIRouter, Request, Cookie, Depends, Response
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
# from sessions import verifier, cookie, delete_session


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

# Test
# @router.get("/test-web", response_class=HTMLResponse, dependencies=[Depends(cookie)])
# async def test_web(req: Request, session_data: SessionData=Depends(verifier)):
#     print(session_data)
#     return templates.TemplateResponse(TEMPLATES_PATH + "test.html", {
#         "request": req,
#         "session_data": session_data
#     })
@router.get("/test-web", response_class=HTMLResponse)
async def test_web(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "test.html", {
        "request": req,
        "user_type": req.cookies.get('user_type'),
        "access_token": req.cookies.get('access_token')
    })


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

# Add Manpower Request
@router.get("/add-manpower-request", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "add_manpower_request.html", {
        "request": req,
        "page_title": "Add Manpower Request",
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