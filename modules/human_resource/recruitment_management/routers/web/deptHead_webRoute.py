# Import Packages
from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from jwt_token import get_token
from sqlalchemy.orm import Session
from database import get_db

# Import Submodule files
from modules.human_resource.recruitment_management.routers.web import errPages_templates as errTemplate
from modules.human_resource.recruitment_management.models import *
from modules.human_resource.recruitment_management.routers.web._template import templates


# Router
router = APIRouter(
    prefix = "/dh",
    tags = ["Department Manager Web Routes"]
)


# Templates Path
TEMPLATES_PATH = "/pages/department_head/"


# Authorized User
AUTHORIZED_USER = "Department Head"


# ===========================================================
# WEB ROUTES
# ===========================================================


# Home Page
@router.get("", response_class=HTMLResponse)
async def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "index.html", {
            "request": req,
            "page_title": "Main Dashboard",
            "sub_title": "Manage your tasks and activities here using this dashboard",
            "active_navlink": "Main Dashboard"
        })
    else:
        return await errTemplate.page_not_found(req)


# Department Head Dashboard
@router.get("/dashboard", response_class=HTMLResponse)
async def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "dashboard.html", {
            "request": req,
            "page_title": "Dashboard",
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


# Manpower Request Details
@router.get("/manpower-requests/{requisition_id}", response_class=HTMLResponse)
async def render(
    requisition_id: str,
    req: Request, 
    db: Session = Depends(get_db), 
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        requisition = db.query(Requisition).filter(Requisition.requisition_id == requisition_id).first()
        if not requisition:
            return await errTemplate.page_not_found(req)
        else:
            return templates.TemplateResponse(TEMPLATES_PATH  + "view_manpower_request.html", {
                "request": req,
                "page_title": "Manpower Request Details",
                "sub_title": "View the details of manpower request here",
                "active_navlink": "Manpower Requests"
            })
    else:
        return await errTemplate.page_not_found(req)


# ===========================================================
# HIRED APPLICANTS
# ===========================================================


# Hired Applicants
@router.get("/hired-applicants", response_class=HTMLResponse)
async def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH  + "hired_applicants.html", {
            "request": req,
            "page_title": "Hired Applicants",
            "sub_title": "Hired Applicants",
            "active_navlink": "Hired Applicants"
        })
    else:
        return await errTemplate.page_not_found(req)


# ===========================================================
# ONBOARDING EMPLOYEES
# ===========================================================


# Onboarding Employees
@router.get("/onboarding-employees", response_class=HTMLResponse)
async def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "onboarding_employees.html", {
            "request": req,
            "page_title": "Onboarding Employees",
            "sub_title": "Onboarding Employees to manage new employees on board",
            "active_navlink": "Onboarding Employees"
        })
    else:
        return await errTemplate.page_not_found(req)


# ===========================================================
# ONBOARDING EMPLOYEE TASKS
# ===========================================================


# Onboarding Employee Tasks
@router.get("/onboarding-employees/{onboarding_employee_id}/onboarding-tasks", response_class=HTMLResponse)
async def render(
    onboarding_employee_id: str, 
    req: Request, 
    db: Session = Depends(get_db), 
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        user_department = db.query(Department).join(Position).filter(
                Department.department_id == Position.department_id
            ).join(User).filter(
                User.user_id == user_data['user_id'], 
                User.position_id == Position.position_id
            ).first()
        onboarding_employee = db.query(OnboardingEmployee).filter(
                OnboardingEmployee.onboarding_employee_id == onboarding_employee_id,
                OnboardingEmployee.status == "Onboarding",
            ).join(Position).filter(
                OnboardingEmployee.position_id == Position.position_id
            ).join(Department).filter(
                Position.department_id == Department.department_id, 
                Department.department_id ==  user_department.department_id
            ).first()
        if not onboarding_employee:
            return await errTemplate.page_not_found(req)
        else:
            return templates.TemplateResponse(TEMPLATES_PATH + "onboarding_employee_tasks.html", {
                "request": req,
                "page_title": "Onboarding Tasks",
                "sub_title": "Manage employee tasks and monitor performance",
                "active_navlink": "Onboarding Employees"
            })
    else:
        return await errTemplate.page_not_found(req)