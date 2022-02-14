# Import Packages
from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from jwt_token import get_token
from sqlalchemy.orm import Session
from database import get_db

# Import Submodule files
from modules.human_resource.recruitment.models._base import *
from modules.human_resource.recruitment.routers.web \
    import errPages_templates as errTemplate
from modules.human_resource.recruitment.routers.web._template import templates


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
def render(req: Request, user_data: dict = Depends(get_token)):

    # Check if user is not authorized
    if AUTHORIZED_USER not in user_data['roles']:
        return errTemplate.page_not_found(req)
    
    # If authorized, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "index.html", {
        "request": req,
        "page_title": "Main Dashboard",
        "sub_title": "Manage your tasks and activities here using this dashboard",
        "active_navlink": "Main Dashboard"
    })


# Department Head Dashboard
@router.get("/dashboard", response_class=HTMLResponse)
def render(req: Request, user_data: dict = Depends(get_token)):

    # Check if user is not authorized
    if AUTHORIZED_USER not in user_data['roles']:
        return errTemplate.page_not_found(req)
    
    # If authorized, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "dashboard.html", {
        "request": req,
        "page_title": "Dashboard",
        "sub_title": "Manage your tasks and activities here using this dashboard",
        "active_navlink": "Dashboard"
    })


# ===========================================================
# MANPOWER REQUESTS
# ===========================================================


# Manpower Requests
@router.get("/manpower-requests", response_class=HTMLResponse)
def render(req: Request, user_data: dict = Depends(get_token)):

    # If user is not authorized
    if AUTHORIZED_USER not in user_data['roles']:
        return errTemplate.page_not_found(req)

    # If authorized, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "manpower_requests.html", {
        "request": req,
        "page_title": "Manpower Requests",
        "sub_title": "Manpower Requests to manage requests for employees",
        "active_navlink": "Manpower Requests"
    })


# Manpower Request Details
@router.get("/manpower-requests/{manpower_request_id}", response_class=HTMLResponse)
def render(
    manpower_request_id: str,
    req: Request, 
    db: Session = Depends(get_db), 
    user_data: dict = Depends(get_token)
):
    # If user is not authorized
    if AUTHORIZED_USER not in user_data['roles']:
        return errTemplate.page_not_found(req)
    
    # If manpower request not exist in database
    manpower_request = db.query(ManpowerRequest).filter(ManpowerRequest.manpower_request_id == manpower_request_id).first()
    if not manpower_request:
        return errTemplate.page_not_found(req)
    
    # If authorized and manpower request exist in database
    return templates.TemplateResponse(TEMPLATES_PATH  + "view_manpower_request.html", {
        "request": req,
        "page_title": "Manpower Request Details",
        "sub_title": "View the details of manpower request here",
        "active_navlink": "Manpower Requests"
    })


# ===========================================================
# HIRED APPLICANTS
# ===========================================================


# Hired Applicants
@router.get("/hired-applicants", response_class=HTMLResponse)
def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH  + "hired_applicants.html", {
            "request": req,
            "page_title": "Hired Applicants",
            "sub_title": "Hired Applicants",
            "active_navlink": "Hired Applicants"
        })
    else:
        return errTemplate.page_not_found(req)


# ===========================================================
# ONBOARDING EMPLOYEES
# ===========================================================


# Onboarding Employees
@router.get("/onboarding-employees", response_class=HTMLResponse)
def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "onboarding_employees.html", {
            "request": req,
            "page_title": "Onboarding Employees",
            "sub_title": "Onboarding Employees to manage new employees on board",
            "active_navlink": "Onboarding Employees"
        })
    else:
        return errTemplate.page_not_found(req)


# ===========================================================
# ONBOARDING EMPLOYEE TASKS
# ===========================================================


# Onboarding Employee Tasks
@router.get("/onboarding-employees/{onboarding_employee_id}/onboarding-tasks", response_class=HTMLResponse)
def render(
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
            return errTemplate.page_not_found(req)
        else:
            return templates.TemplateResponse(TEMPLATES_PATH + "onboarding_employee_tasks.html", {
                "request": req,
                "page_title": "Onboarding Tasks",
                "sub_title": "Manage employee tasks and monitor performance",
                "active_navlink": "Onboarding Employees"
            })
    else:
        return errTemplate.page_not_found(req)