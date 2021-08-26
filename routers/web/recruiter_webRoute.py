# Import Packages
from database import get_db
from routers.api.deptHead_apiRoute import AUTHORIZED_USER
from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from routers.web import errPages_templates as errTemplate
from sqlalchemy.orm import Session
from jwt_token import get_token
import models


# Models
Requisition = models.Requisition
JobPost = models.JobPost


# Router
router = APIRouter(
    prefix = "/r",
    tags = ["Recruiter Web Routes"]
)

# Templates
templates = Jinja2Templates(directory = "templates")

# Templates Path
TEMPLATES_PATH = "/pages/recruiter/"


# Auuthorized User
AUTHORIZED_USER = "Recruiter"


# ===========================================================
# WEB ROUTES
# ===========================================================


# Department Head Dashboard
@router.get("", response_class=HTMLResponse)
def dashboard(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "dashboard.html", {
            "request": req,
            "page_title": user_data['user_type'],
            "sub_title": "Recruiter manages all applicants to be selected",
            "active_navlink": "Dashboard"
        })
    else:
        return errTemplate.page_not_found(req)


# Manpower Requests
@router.get("/manpower-requests", response_class=HTMLResponse)
def dashboard(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "manpower_requests.html", {
            "request": req,
            "page_title": "Manpower Requests",
            "sub_title": "Manpower Requests to manage requests for employees",
            "active_navlink": "Manpower Requests"
        })
    else:
        return errTemplate.page_not_found(req)


# Job Posts
@router.get("/job-posts", response_class=HTMLResponse)
def dashboard(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "job_posts.html", {
            "request": req,
            "page_title": "Job Posts",
            "sub_title": "Job Posts to manage job posting",
            "active_navlink": "Job Posts"
        })
    else:
        return errTemplate.page_not_found(req)


# Create Job Post
@router.get("/add-job-post/{requisition_id}", response_class=HTMLResponse)
def dashboard(
    requisition_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if not requisition_id:
        return errTemplate.page_not_found(req)
    elif user_data['user_type'] == AUTHORIZED_USER:
        requisition = db.query(Requisition).filter(Requisition.requisition_id == requisition_id).first()
        if not requisition:
            return errTemplate.page_not_found(req)
        else:
            return templates.TemplateResponse(TEMPLATES_PATH + "add_job_post.html", {
                "request": req,
                "page_title": "Create Job Post",
                "sub_title": "Create Job Post to advertise available jobs",
                "active_navlink": "Job Posts"
            })
    else:
        return errTemplate.page_not_found(req)


# Edit Job Post
@router.get("/edit-job-post/{job_post_id}", response_class=HTMLResponse)
def dashboard(
    job_post_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if not job_post_id:
        return errTemplate.page_not_found(req)
    elif user_data['user_type'] == AUTHORIZED_USER:
        job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
        if not job_post:
            return errTemplate.page_not_found(req)
        else:
            return templates.TemplateResponse(TEMPLATES_PATH + "edit_job_post.html", {
                "request": req,
                "page_title": "Edit Job Post",
                "sub_title": "Edit your job post here",
                "active_navlink": "Job Posts"
            })
    else:
        return errTemplate.page_not_found(req)



# Applicants
@router.get("/applicants", response_class=HTMLResponse)
def dashboard(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "applicants.html", {
            "request": req,
            "page_title": "Applicants",
            "sub_title": "Applicants to manage potential candidates",
            "active_navlink": "Applicants"
        })
    else:
        return errTemplate.page_not_found(req)