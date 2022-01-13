# Import Packages
from typing import Optional
from sqlalchemy.sql.elements import Null
from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from starlette.responses import RedirectResponse
from jwt_token import get_token
from sqlalchemy.orm import Session
from database import get_db

# Import Submodule Files
from modules.human_resource.recruitment_management.models import *
from modules.human_resource.recruitment_management.routers.web import errPages_templates as errTemplate
from modules.human_resource.recruitment_management.routers.web._template import templates


# Router
router = APIRouter(
    prefix = "/dm",
    tags = ["Department Manager Web Routes"]
)


# Templates Path
TEMPLATES_PATH = "/pages/department_manager/"


# Authorized User
AUTHORIZED_USER = "Department Manager"


# ===========================================================
# WEB ROUTES
# ===========================================================


# Department Head Dashboard
@router.get("", response_class=HTMLResponse)
def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "index.html", {
            "request": req,
            "page_title": "Main Dashboard",
            "sub_title": "Manage your tasks and activities here using this dashboard",
            "active_navlink": "Main Dashboard"
        })
    else:
        return errTemplate.page_not_found(req)


# Department Head Dashboard
@router.get("/dashboard", response_class=HTMLResponse)
def render(req: Request, user_data: dict = Depends(get_token)):

    # Check if user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)

    # If no error, return template response
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

    # Check if user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)

    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "manpower_requests.html", {
        "request": req,
        "page_title": "Manpower Requests",
        "sub_title": "Manpower Requests to manage requests for employees",
        "active_navlink": "Manpower Requests"
    })


# Manpower Request Details
@router.get("/manpower-requests/{requisition_id}", response_class=HTMLResponse)
def render(
    requisition_id: str,
    req: Request, 
    db: Session = Depends(get_db), 
    user_data: dict = Depends(get_token)
):
    # Check if user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)
    
    # Check if manpower request is not existing in database
    if not db.query(Requisition).filter(Requisition.requisition_id == requisition_id).first():
        return errTemplate.page_not_found(req)
    
    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH  + "view_manpower_request.html", {
        "request": req,
        "page_title": "Manpower Request Details",
        "sub_title": "View the details of manpower request here",
        "active_navlink": "Manpower Requests"
    })


# Manpower Requests
@router.get("/manpower-requests/{requisition_id}/hired-applicants", response_class=HTMLResponse)
def render(
    requisition_id: str,
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    # Check if user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)

    # Check if manpower request is not existing in databse
    if not db.query(Requisition).filter(Requisition.requisition_id == requisition_id).first():
        return errTemplate.page_not_found(req)
    
    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "hired_applicants_per_request.html", {
        "request": req,
        "page_title": "Hired Applicants",
        "sub_title": "Hired Applicants to manage new hired employees",
        "active_navlink": "Hired Applicants"
    })


# Manpower Request Report
@router.get("/manpower-requests/{requisition_id}/report", response_class=HTMLResponse)
def render(
    requisition_id: str,
    req: Request, 
    db: Session = Depends(get_db), 
    user_data: dict = Depends(get_token)
):
    # Check if user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)
    
    # Check if manpower request is not existing in the database
    if not db.query(Requisition).filter(Requisition.requisition_id == requisition_id).first():
        return errTemplate.page_not_found(req)
    
    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH  + "manpower_request_report.html", {
        "request": req,
        "page_title": "Manpower Requisition Report",
        "sub_title": "View the details of manpower request here",
        "active_navlink": "Manpower Requests"
    })


# Add Manpower Request
@router.get("/add-manpower-request", response_class=HTMLResponse)
def render(req: Request, user_data: dict = Depends(get_token)):

    # Check if user is not athorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)

    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "add_manpower_request.html", {
        "request": req,
        "page_title": "Create Manpower Request",
        "sub_title": "Create manpower request here using this form",
        "active_navlink": "Manpower Requests"
    })


# Edit Manpower Request
@router.get("/edit-manpower-request/{requisition_id}", response_class=HTMLResponse)
def render(
    requisition_id: str, 
    req: Request, 
    db: Session = Depends(get_db), 
    user_data: dict = Depends(get_token)
):
    # Check if user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)

    # Check if requisition_id is ot declared
    if not requisition_id:
        return errTemplate.page_not_found(req)
    
    # Check if requisition is not in database
    requisition = db.query(Requisition).filter(
        Requisition.requisition_id == requisition_id,
        Requisition.request_status == 'For signature'
    ).first()
    
    if not requisition:
        return errTemplate.page_not_found(req)
    
    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "edit_manpower_request.html", {
        "request": req,
        "page_title": "Edit Manpower Request",
        "sub_title": "Edit your manpower request here",
        "active_navlink": "Manpower Requests"
    })


# ===========================================================
# HIRED APPLICANTS
# ===========================================================


# Hired Applicants
@router.get("/hired-applicants", response_class=HTMLResponse)
def render(req: Request, user_data: dict = Depends(get_token)):
    
    # Check if user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)

    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "hired_applicants.html", {
        "request": req,
        "page_title": "Hired Applicants",
        "sub_title": "Hired Applicants to manage new hired employees",
        "active_navlink": "Hired Applicants"
    })


# ===========================================================
# ONBOARDING EMPLOYEES
# ===========================================================


# Onboarding Employees
@router.get("/onboarding-employees", response_class=HTMLResponse)
def render(req: Request, user_data: dict = Depends(get_token)):

    # Check if user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)
    
    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "onboarding_employees.html", {
        "request": req,
        "page_title": "Onboarding Employees",
        "sub_title": "Onboarding Employees to manage new employees on board",
        "active_navlink": "Onboarding Employees"
    })


# Add Onboarding Employee Details
@router.get("/onboard-employee/{onboarding_employee_id}", response_class=HTMLResponse)
def render(
    onboarding_employee_id: str, 
    req: Request, 
    db: Session = Depends(get_db), 
    user_data: dict = Depends(get_token)
):
    # Check if user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)
    
    # Chech if onboarding_employee_id is not declared
    if not onboarding_employee_id:
        return errTemplate.page_not_found(req)
    
    # Check if onboarding employee is existing in database
    user_department = db.query(Department).join(Position).filter(
        Department.department_id == Position.department_id
    ).join(User).filter(
        User.user_id == user_data['user_id'], 
        User.position_id == Position.position_id
    ).first()
    
    onboarding_employee = db.query(OnboardingEmployee).filter(
        OnboardingEmployee.onboarding_employee_id == onboarding_employee_id
    ).join(Position).filter(
        OnboardingEmployee.position_id == Position.position_id
    ).join(Department).filter(
        Position.department_id == Department.department_id, 
        Department.department_id ==  user_department.department_id
    ).first()
    
    if not onboarding_employee:
        return errTemplate.page_not_found(req)
    
    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "onboard_employee.html", {
        "request": req,
        "page_title": "Onboard new employee",
        "sub_title": "Review details and update tasks to on board new employee",
        "active_navlink": "Onboarding Employees"
    })


# ===========================================================
# GENERAL TASKS
# ===========================================================


# General Tasks
@router.get("/general-tasks", response_class=HTMLResponse)
def render(req: Request, menu: Optional[str] = None, user_data: dict = Depends(get_token)):
        
    # Check if user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)

    # Check if menu is not declared, redirect to appropriate page
    if not menu:
        return RedirectResponse("/dm/general-tasks?menu=for-new-employees")
    
    # Check if menu is valid
    if menu not in ["for-new-employees", "for-the-team", "my-tasks"]:
        return errTemplate.page_not_found(req)
    
    # If no error return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "general_tasks.html", {
        "request": req,
        "page_title": "General Onboarding Tasks",
        "sub_title": "Manage your general onboarding tasks here",
        "active_navlink": "General Tasks",
        'active_menu': menu
    })


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
    # Check if user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)

    # Check if onboarding employee is existing in database
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
    
    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "onboarding_employee_tasks.html", {
        "request": req,
        "page_title": "Onboarding Tasks",
        "sub_title": "Manage employee tasks and monitor performance",
        "active_navlink": "Onboarding Employees"
    })