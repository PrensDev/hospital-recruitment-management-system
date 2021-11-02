# Import Packages
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


# Manpower Requests
@router.get("/manpower-requests/{requisition_id}/hired-applicants", response_class=HTMLResponse)
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
            return templates.TemplateResponse(TEMPLATES_PATH + "hired_applicants_per_request.html", {
                "request": req,
                "page_title": "Hired Applicants",
                "sub_title": "Hired Applicants to manage new hired employees",
                "active_navlink": "Hired Applicants"
            })
    else:
        return await errTemplate.page_not_found(req)


# Add Manpower Request
@router.get("/add-manpower-request", response_class=HTMLResponse)
async def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "add_manpower_request.html", {
            "request": req,
            "page_title": "Create Manpower Request",
            "sub_title": "Create manpower request here using this form",
            "active_navlink": "Manpower Requests"
        })
    else:
        return await errTemplate.page_not_found(req)


# Edit Manpower Request
@router.get("/edit-manpower-request/{requisition_id}", response_class=HTMLResponse)
async def render(
    requisition_id: str, 
    req: Request, 
    db: Session = Depends(get_db), 
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        if not requisition_id:
            return await errTemplate.page_not_found(req)
        else:
            requisition = db.query(Requisition).filter(
                Requisition.requisition_id == requisition_id,
                Requisition.request_status == 'For signature'
            ).first()
            if not requisition:
                return await errTemplate.page_not_found(req)
            else:
                return templates.TemplateResponse(TEMPLATES_PATH + "edit_manpower_request.html", {
                    "request": req,
                    "page_title": "Edit Manpower Request",
                    "sub_title": "Edit your manpower request here",
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
        return templates.TemplateResponse(TEMPLATES_PATH + "hired_applicants.html", {
            "request": req,
            "page_title": "Hired Applicants",
            "sub_title": "Hired Applicants to manage new hired employees",
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


# Add Onboarding Employee Details
@router.get("/onboard-employee/{onboarding_employee_id}", response_class=HTMLResponse)
async def render(
    onboarding_employee_id: str, 
    req: Request, 
    db: Session = Depends(get_db), 
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        if not onboarding_employee_id:
            return await errTemplate.page_not_found(req)
        else:
            user_department = db.query(Department).join(Position).filter(Department.department_id == Position.department_id).join(User).filter(User.user_id == user_data['user_id'], User.position_id == Position.position_id).first()
            onboarding_employee = db.query(OnboardingEmployee).filter(
                OnboardingEmployee.onboarding_employee_id == onboarding_employee_id
            ).join(Position).filter(
                OnboardingEmployee.position_id == Position.position_id
            ).join(Department).filter(
                Position.department_id == Department.department_id, 
                Department.department_id ==  user_department.department_id
            ).first()
            if not onboarding_employee:
                return await errTemplate.page_not_found(req)
            else:
                return templates.TemplateResponse(TEMPLATES_PATH + "onboard_employee.html", {
                    "request": req,
                    "page_title": "Onboard new employee",
                    "sub_title": "Review details and update tasks to on board new employee",
                    "active_navlink": "Onboarding Employees"
                })
    else:
        return await errTemplate.page_not_found(req)


# ===========================================================
# GENERAL TASKS
# ===========================================================


# General Tasks
@router.get("/general-tasks", response_class=HTMLResponse)
async def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return RedirectResponse("/dm/general-tasks/for-new-employees")
    else:
        return await errTemplate.page_not_found(req)


# General Tasks for new employees
@router.get("/general-tasks/for-new-employees", response_class=HTMLResponse)
async def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "pages/general_tasks/for_new_employees.html", {
            "request": req,
            "page_title": "General Onboarding Tasks",
            "sub_title": "Manage your general onboarding tasks here",
            "active_navlink": "General Tasks",
            'active_menu': "For new employees"
        })
    else:
        return await errTemplate.page_not_found(req)


# General Tasks for the team
@router.get("/general-tasks/for-the-team", response_class=HTMLResponse)
async def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "pages/general_tasks/for_team.html", {
            "request": req,
            "page_title": "General On-boarding Tasks",
            "sub_title": "General On-boarding Tasks to manage employees tasks and monitor performances",
            "active_navlink": "General Tasks",
            'active_menu': "For the team"
        })
    else:
        return await errTemplate.page_not_found(req)


# General Tasks for department head
@router.get("/general-tasks/my-tasks", response_class=HTMLResponse)
async def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "pages/general_tasks/for_department_manager.html", {
            "request": req,
            "page_title": "General Onboarding Tasks",
            "sub_title": "General Onboarding Tasks to manage employees tasks and monitor performances",
            "active_navlink": "General Tasks",
            'active_menu': "For department manager"
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
        user_department = db.query(Department).join(Position).filter(Department.department_id == Position.department_id).join(User).filter(User.user_id == user_data['user_id'], User.position_id == Position.position_id).first()
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