# Import Packages
from typing import Optional
from database import get_db
from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from jwt_token import get_token

# Import Submodule Files
from modules.human_resource.recruitment_management.models import *
from modules.human_resource.recruitment_management.routers.web import errPages_templates as errTemplate
from modules.human_resource.recruitment_management.routers.web._template import templates


# Router
router = APIRouter(
    prefix = "/r",
    tags = ["Recruiter Web Routes"]
)


# Templates Path
TEMPLATES_PATH = "/pages/recruiter/"


# Authorized User
AUTHORIZED_USER = "Recruiter"


# ===========================================================
# WEB ROUTES
# ===========================================================


# Home
@router.get("", response_class=HTMLResponse)
def dashboard(req: Request, user_data: dict = Depends(get_token)):
    
    # Check if user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)
    
    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "index.html", {
        "request": req,
        "page_title": "Main Dashboard",
        "sub_title": "Recruiter manages all applicants to be selected",
        "active_navlink": "Main Dashboard"
    })


# Department Head Dashboard
@router.get("/dashboard", response_class=HTMLResponse)
def dashboard(req: Request, user_data: dict = Depends(get_token)):

    # Check if user is not authorzed
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)
    
    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "dashboard.html", {
        "request": req,
        "page_title": "Dashboard",
        "sub_title": "Recruiter manages all applicants to be selected",
        "active_navlink": "Dashboard"
    })


# ===========================================================
# MANPOWWER REQUESTS
# ===========================================================


# Manpower Requests
@router.get("/manpower-requests", response_class=HTMLResponse)
def render(req: Request, user_data: dict = Depends(get_token)):
    
    # Check if user is nt authorized
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
    # If user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)
    
    # Check if requisition_id is not declared
    if not requisition_id:
        return errTemplate.page_not_found(req)
    
    # Check if requisition_id is not existing in the database
    if not db.query(Requisition).filter(Requisition.requisition_id == requisition_id).first():
        return errTemplate.page_not_found(req)

    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "view_manpower_request.html", {
        "request": req,
        "page_title": "Manpower Request Details",
        "sub_title": "View the details of manpower request here",
        "active_navlink": "Manpower Requests"
    })



# ===========================================================
# JOB POSTS
# ===========================================================


# Job Posts
@router.get("/job-posts", response_class=HTMLResponse)
def render(req: Request, user_data: dict = Depends(get_token)):
    
    # Check if user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)
    
    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "job_posts.html", {
        "request": req,
        "page_title": "Job Posts",
        "sub_title": "Job Posts to manage job posting",
        "active_navlink": "Job Posts"
    })


# Job Post Details
@router.get("/job-posts/{job_post_id}", response_class=HTMLResponse)
def render(
    job_post_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    # Check if use is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)

    # Check if job_post_id is existing in database
    job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
    if not job_post:
        return errTemplate.page_not_found(req)
    
    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "view_job_post.html", {
        "request": req,
        "page_title": "Job Post Details",
        "sub_title": "Job Posts to manage job posting",
        "active_navlink": "Job Posts"
    })


# Create Job Post
@router.get("/add-job-post/{requisition_id}", response_class=HTMLResponse)
def render(
    requisition_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    # Check if use is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)
    
    # Check if requisision_id is declared
    if not requisition_id:
        return errTemplate.page_not_found(req)
    
    # Check if requisition_id is existing in database
    if not db.query(Requisition).filter(Requisition.requisition_id == requisition_id).first():
        return errTemplate.page_not_found(req)
    
    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "add_job_post.html", {
        "request": req,
        "page_title": "Create Job Post",
        "sub_title": "Create Job Post to advertise available jobs",
        "active_navlink": "Job Posts"
    })


# Edit Job Post
@router.get("/edit-job-post/{job_post_id}", response_class=HTMLResponse)
def render(
    job_post_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    # Check if user is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)
    
    # Check if job_post_id is not declared
    if not job_post_id:
        return errTemplate.page_not_found(req)
    
    # Check if job_post_id is existing
    job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
    if not job_post:
        return errTemplate.page_not_found(req)
    
    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "edit_job_post.html", {
        "request": req,
        "page_title": "Edit Job Post",
        "sub_title": "Edit your job post here",
        "active_navlink": "Job Posts"
    })

# ===========================================================
# APPLICANTS
# ===========================================================


# Applicants
@router.get("/applicants", response_class=HTMLResponse)
def render(req: Request, user_data: dict = Depends(get_token)):
    
    # Check if use is not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)

    # If no error return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "applicants.html", {
        "request": req,
        "page_title": "Applicants",
        "sub_title": "Applicants to manage potential candidates",
        "active_navlink": "Applicants"
    })


# Applicants Per Job Post
@router.get("/job-posts/{job_post_id}/applicants", response_class=HTMLResponse)
def render(
    job_post_id: str,
    req: Request, 
    menu: Optional[str] = None, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    # Check if not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)
    
    # Check if job post is not declared
    if not job_post_id:
        return errTemplate.page_not_found(req)

    # Check if job post is existing in the database
    job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
    if not job_post:
        return errTemplate.page_not_found(req)

    # Check if menu is not declared, redirect with default value
    if menu not in ['for-evaluation', 'evaluated', 'rejected']:
        return RedirectResponse(f"/r/job-posts/{job_post_id}/applicants?menu=for-evaluation")

    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "applicants_per_job.html", {
        "request": req,
        "page_title": "Applicants - For evaluation",
        "sub_title": "Applicants to manage potential candidates",
        "active_navlink": "Applicants",
        "active_menu": "For evaluation",
        "job_post_id": f"{job_post_id}"
    })


# ====================================================================
# Job Categories
# ====================================================================

# Applicants Per Job Post
@router.get("/job-categories", response_class=HTMLResponse)
def render(
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    # Check if not authorized
    if not user_data['user_type'] == AUTHORIZED_USER:
        return errTemplate.page_not_found(req)

    # If no error, return template response
    return templates.TemplateResponse(TEMPLATES_PATH + "job_categories.html", {
        "request": req,
        "page_title": "Job Categories",
        "sub_title": "Manage the list of job categories",
        "active_navlink": "Job Categories",
    })