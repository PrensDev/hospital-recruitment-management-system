# Import Packages
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


# Department Head Dashboard
@router.get("", response_class=HTMLResponse)
async def dashboard(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "dashboard.html", {
            "request": req,
            "page_title": "Dashboard",
            "sub_title": "Recruiter manages all applicants to be selected",
            "active_navlink": "Dashboard"
        })
    else:
        return await errTemplate.page_not_found(req)


# ===========================================================
# MANPOWWER REQUESTS
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
            return templates.TemplateResponse(TEMPLATES_PATH + "view_manpower_request.html", {
                "request": req,
                "page_title": "Manpower Request Details",
                "sub_title": "View the details of manpower request here",
                "active_navlink": "Manpower Requests"
            })
    else:
        return await errTemplate.page_not_found(req)



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
            "sub_title": "Job Posts to manage job posting",
            "active_navlink": "Job Posts"
        })
    else:
        return await errTemplate.page_not_found(req)


# Job Post Details
@router.get("/job-posts/{job_post_id}", response_class=HTMLResponse)
async def render(
    job_post_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
        if not job_post:
            return await errTemplate.page_not_found(req)
        else:
            return templates.TemplateResponse(TEMPLATES_PATH + "view_job_post.html", {
                "request": req,
                "page_title": "Job Post Details",
                "sub_title": "Job Posts to manage job posting",
                "active_navlink": "Job Posts"
            })
    else:
        return await errTemplate.page_not_found(req)


# Create Job Post
@router.get("/add-job-post/{requisition_id}", response_class=HTMLResponse)
async def render(
    requisition_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if not requisition_id:
        return await errTemplate.page_not_found(req)
    elif user_data['user_type'] == AUTHORIZED_USER:
        requisition = db.query(Requisition).filter(Requisition.requisition_id == requisition_id).first()
        if not requisition:
            return await errTemplate.page_not_found(req)
        else:
            return templates.TemplateResponse(TEMPLATES_PATH + "add_job_post.html", {
                "request": req,
                "page_title": "Create Job Post",
                "sub_title": "Create Job Post to advertise available jobs",
                "active_navlink": "Job Posts"
            })
    else:
        return await errTemplate.page_not_found(req)


# Edit Job Post
@router.get("/edit-job-post/{job_post_id}", response_class=HTMLResponse)
async def render(
    job_post_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if not job_post_id:
        return await errTemplate.page_not_found(req)
    elif user_data['user_type'] == AUTHORIZED_USER:
        job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
        if not job_post:
            return await errTemplate.page_not_found(req)
        else:
            return templates.TemplateResponse(TEMPLATES_PATH + "edit_job_post.html", {
                "request": req,
                "page_title": "Edit Job Post",
                "sub_title": "Edit your job post here",
                "active_navlink": "Job Posts"
            })
    else:
        return await errTemplate.page_not_found(req)


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
        return await errTemplate.page_not_found(req)


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
            return await errTemplate.page_not_found(req)
        else:
            job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
            if not job_post:
                return await errTemplate.page_not_found(req)
            else:
                return RedirectResponse(f"/r/job-posts/{job_post_id}/applicants/for-evaluation")
    else:
        return await errTemplate.page_not_found(req)


# Applicants Per Job Post (For evaluation)
@router.get("/job-posts/{job_post_id}/applicants/for-evaluation", response_class=HTMLResponse)
async def render(
    job_post_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        if not job_post_id:
            return await errTemplate.page_not_found(req)
        else:
            job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
            if not job_post:
                return await errTemplate.page_not_found(req)
            else:
                return templates.TemplateResponse(TEMPLATES_PATH + "pages/applicants_per_job/for_evaluation.html", {
                    "request": req,
                    "page_title": "Applicants - For evaluation",
                    "sub_title": "Applicants to manage potential candidates",
                    "active_navlink": "Applicants",
                    "active_menu": "For evaluation",
                    "job_post_id": f"{job_post_id}"
                })
    else:
        return await errTemplate.page_not_found(req)


# Applicants Per Job Post (Evaluated)
@router.get("/job-posts/{job_post_id}/applicants/evaluated", response_class=HTMLResponse)
async def render(
    job_post_id: str, 
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        if not job_post_id:
            return await errTemplate.page_not_found(req)
        else:
            job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
            if not job_post:
                return await errTemplate.page_not_found(req)
            else:
                return templates.TemplateResponse(TEMPLATES_PATH + "pages/applicants_per_job/evaluated.html", {
                    "request": req,
                    "page_title": "Applicants - For evaluation",
                    "sub_title": "Applicants to manage potential candidates",
                    "active_navlink": "Applicants",
                    "active_menu": "Evaluated",
                    "job_post_id": f"{job_post_id}"
                })
    else:
        return await errTemplate.page_not_found(req)


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
            return await errTemplate.page_not_found(req)
        else:
            job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
            if not job_post:
                return await errTemplate.page_not_found(req)
            else:
                return templates.TemplateResponse(TEMPLATES_PATH + "pages/applicants_per_job/rejected.html", {
                    "request": req,
                    "page_title": "Applicants - For evaluation",
                    "sub_title": "Applicants to manage potential candidates",
                    "active_navlink": "Applicants",
                    "active_menu": "Rejected",
                    "job_post_id": f"{job_post_id}"
                })
    else:
        return await errTemplate.page_not_found(req)

