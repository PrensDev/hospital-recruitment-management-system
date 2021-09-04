# Import Packages
from database import get_db
from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
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
    prefix = "/h",
    tags = ["Hiring Manager Web Routes"]
)

# Templates
templates = Jinja2Templates(directory = "templates")

# Templates Path
TEMPLATES_PATH = "/pages/hiring_manager/"
AUTHORIZED_USER = "Hiring Manager"


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
            "sub_title": "Hiring Manager manages all selected applicants",
            "active_navlink": "Dashboard"
        })
    else:
        return errTemplate.page_not_found(req)



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
        return errTemplate.page_not_found(req)


# ===========================================================
# JOB POSTS
# ===========================================================


# Job Posts
@router.get("/job-posts", response_class=HTMLResponse)
async def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "job_posts.html", {
            "request": req,
            "page_title": "Job Posts",
            "sub_title": "Manage applicants per job post here",
            "active_navlink": "Job Posts"
        })
    else:
        return errTemplate.page_not_found(req)


# ===========================================================
# APPLICANTS
# ===========================================================


# Applicants
@router.get("/applicants", response_class=HTMLResponse)
async def render(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "applicants.html", {
            "request": req,
            "page_title": "Applicants",
            "sub_title": "Applicants to manage potential candidates",
            "active_navlink": "Applicants"
        })    
    else:
        return errTemplate.page_not_found(req)


# Applicants Per Job Post
@router.get("/job-posts/{job_post_id}/applicants", response_class=HTMLResponse)
async def render(
    job_post_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        if not job_post_id:
            return errTemplate.page_not_found(req)
        else:
            job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
            if not job_post:
                return errTemplate.page_not_found(req)
            else:
                return RedirectResponse(f"/h/job-posts/{job_post_id}/applicants/for-screening")
    else:
        return errTemplate.page_not_found(req)


# Applicants Per Job Post (For Screening)
@router.get("/job-posts/{job_post_id}/applicants/for-screening", response_class=HTMLResponse)
async def render(
    job_post_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        if not job_post_id:
            return errTemplate.page_not_found(req)
        else:
            job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
            if not job_post:
                return errTemplate.page_not_found(req)
            else:
                return templates.TemplateResponse(TEMPLATES_PATH + "pages/applicants_per_job/for_screening.html", {
                    "request": req,
                    "page_title": "Applicants - For Screening",
                    "sub_title": "Applicants to manage potential candidates",
                    "active_navlink": "Applicants",
                    "job_post_id": f"{job_post_id}"
                })
    else:
        return errTemplate.page_not_found(req)


# Applicants Per Job Post (For Interview)
@router.get("/job-posts/{job_post_id}/applicants/for-interview", response_class=HTMLResponse)
async def render(
    job_post_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        if not job_post_id:
            return errTemplate.page_not_found(req)
        else:
            job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
            if not job_post:
                return errTemplate.page_not_found(req)
            else:
                return templates.TemplateResponse(TEMPLATES_PATH + "pages/applicants_per_job/for_interview.html", {
                    "request": req,
                    "page_title": "Applicants - For Interview",
                    "sub_title": "Applicants to manage potential candidates",
                    "active_navlink": "Applicants",
                    "job_post_id": f"{job_post_id}"
                })
    else:
        return errTemplate.page_not_found(req)


# Applicants Per Job Post (Hired)
@router.get("/job-posts/{job_post_id}/applicants/hired", response_class=HTMLResponse)
async def render(
    job_post_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        if not job_post_id:
            return errTemplate.page_not_found(req)
        else:
            job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
            if not job_post:
                return errTemplate.page_not_found(req)
            else:
                return templates.TemplateResponse(TEMPLATES_PATH + "pages/applicants_per_job/hired.html", {
                    "request": req,
                    "page_title": "Applicants - Hired Applicants",
                    "sub_title": "Applicants to manage potential candidates",
                    "active_navlink": "Applicants",
                    "job_post_id": f"{job_post_id}"
                })
    else:
        return errTemplate.page_not_found(req)


# Applicants Per Job Post (Rejected)
@router.get("/job-posts/{job_post_id}/applicants/rejected", response_class=HTMLResponse)
async def render(
    job_post_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        if not job_post_id:
            return errTemplate.page_not_found(req)
        else:
            job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
            if not job_post:
                return errTemplate.page_not_found(req)
            else:
                return templates.TemplateResponse(TEMPLATES_PATH + "pages/applicants_per_job/rejected.html", {
                    "request": req,
                    "page_title": "Applicants - Rejected Applicants",
                    "sub_title": "Applicants to manage potential candidates",
                    "active_navlink": "Applicants",
                    "job_post_id": f"{job_post_id}"
                })
    else:
        return errTemplate.page_not_found(req)


# ===========================================================
# INTERVIEW QUESTIONS
# ===========================================================

# Interview Questions
@router.get("/interview-questions", response_class=HTMLResponse)
async def render(
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "interview_questions.html", {
            "request": req,
            "page_title": "Interview Questions",
            "sub_title": "Manage general interview questions here for all applicants",
            "active_navlink": "Interview Questions",
        })
    else:
        return errTemplate.page_not_found(req)
