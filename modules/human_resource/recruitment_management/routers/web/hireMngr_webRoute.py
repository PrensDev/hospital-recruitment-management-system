# Import Packages
from database import get_db
from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from jwt_token import get_token

# Import Submodules files
from modules.human_resource.recruitment_management.models import *
from modules.human_resource.recruitment_management.routers.web import errPages_templates as errTemplate
from modules.human_resource.recruitment_management.routers.web._template import templates


# Router
router = APIRouter(
    prefix = "/h",
    tags = ["Hiring Manager Web Routes"]
)


# Templates Path
TEMPLATES_PATH = "/pages/hiring_manager/"


# Authorized User
AUTHORIZED_USER = "Hiring Manager"


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
            "sub_title": "Hiring Manager manages all selected applicants",
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
            "sub_title": "Hiring Manager manages all selected applicants",
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


# View Manpower Requests
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
        return await errTemplate.page_not_found(req)


# Job Posts Details
@router.get("/job-posts/{job_post_id}", response_class=HTMLResponse)
async def render(
    job_post_id: str,
    req: Request, 
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
        if not job_post:
            return await errTemplate.page_not_found(req)
        else:
            return templates.TemplateResponse(TEMPLATES_PATH + "view_job_post.html", {
                "request": req,
                "page_title": "Job Posts",
                "sub_title": "Manage applicants per job post here",
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
                return RedirectResponse(f"/h/job-posts/{job_post_id}/applicants/for-screening")
    else:
        return await errTemplate.page_not_found(req)


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
            return await errTemplate.page_not_found(req)
        else:
            job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
            if not job_post:
                return await errTemplate.page_not_found(req)
            else:
                return templates.TemplateResponse(TEMPLATES_PATH + "pages/applicants_per_job/for_screening.html", {
                    "request": req,
                    "page_title": "Applicants - For Screening",
                    "sub_title": "Applicants to manage potential candidates",
                    "active_navlink": "Applicants",
                    "active_menu": "For screening",
                    "job_post_id": f"{job_post_id}"
                })
    else:
        return await errTemplate.page_not_found(req)


# Applicants Per Job Post (Interviewed)
@router.get("/job-posts/{job_post_id}/applicants/for-interview", response_class=HTMLResponse)
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
                return templates.TemplateResponse(TEMPLATES_PATH + "pages/applicants_per_job/for_interview.html", {
                    "request": req,
                    "page_title": "Applicants - For Interview",
                    "sub_title": "Applicants to manage potential candidates",
                    "active_navlink": "Applicants",
                    "active_menu": "For interview",
                    "job_post_id": f"{job_post_id}"
                })
    else:
        return await errTemplate.page_not_found(req)


# Applicants Per Job Post (For Interview)
@router.get("/job-posts/{job_post_id}/applicants/interviewed", response_class=HTMLResponse)
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
                return templates.TemplateResponse(TEMPLATES_PATH + "pages/applicants_per_job/interviewed.html", {
                    "request": req,
                    "page_title": "Applicants - Inteviewed",
                    "sub_title": "Applicants to manage potential candidates",
                    "active_navlink": "Applicants",
                    "active_menu": "Interviewed applicants",
                    "job_post_id": f"{job_post_id}"
                })
    else:
        return await errTemplate.page_not_found(req)


# Applicants Per Job Post (Create Interview Schedule)
@router.get("/job-posts/{job_post_id}/create-interview-schedule", response_class=HTMLResponse)
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
                return templates.TemplateResponse(TEMPLATES_PATH + "create_schedule.html", {
                    "request": req,
                    "page_title": "Create Interview Schedule",
                    "sub_title": "Create interview schedule here for applicants f",
                    "active_navlink": "Applicants",
                    "job_post_id": f"{job_post_id}"
                })
    else:
        return await errTemplate.page_not_found(req)



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
                return await errTemplate.page_not_found(req)
            else:
                return templates.TemplateResponse(TEMPLATES_PATH + "pages/applicants_per_job/hired.html", {
                    "request": req,
                    "page_title": "Applicants - Hired Applicants",
                    "sub_title": "Applicants to manage potential candidates",
                    "active_navlink": "Applicants",
                    "active_menu": "Hired applicants",
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
            return errTemplate.page_not_found(req)
        else:
            job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
            if not job_post:
                return await errTemplate.page_not_found(req)
            else:
                return templates.TemplateResponse(TEMPLATES_PATH + "pages/applicants_per_job/rejected.html", {
                    "request": req,
                    "page_title": "Applicants - Rejected Applicants",
                    "sub_title": "Applicants to manage potential candidates",
                    "active_navlink": "Applicants",
                    "active_menu": "Rejected applicants",
                    "job_post_id": f"{job_post_id}"
                })
    else:
        return await errTemplate.page_not_found(req)


# ===========================================================
# INTERVIEW SCHEDULES
# ===========================================================


# Interview Schedules
@router.get("/interview-schedules/{interview_schedule_id}", response_class=HTMLResponse)
async def render(
    interview_schedule_id: str,
    req: Request,
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        interview_schedule = db.query(InterviewSchedule).filter(InterviewSchedule.interview_schedule_id == interview_schedule_id).first()
        if not interview_schedule:
            return await errTemplate.page_not_found(req)
        else:
            return templates.TemplateResponse(TEMPLATES_PATH + "schedule_details.html", {
                "request": req,
                "page_title": "Interview Schedule Details",
                "sub_title": "Lorem ipsum dolor sit amet",
                "active_navlink": "Applicants"
            })
    else:
        return await errTemplate.page_not_found(req)


# ===========================================================
# INTERVIEW
# ===========================================================


# Interview Schedules
@router.get("/interview/{interviewee_id}", response_class=HTMLResponse)
async def render(
    interviewee_id: str,
    req: Request,
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_token)
):
    if user_data['user_type'] == AUTHORIZED_USER:
        interview_schedule = db.query(Interviewee).filter(Interviewee.interviewee_id == interviewee_id).first()
        if not interview_schedule:
            return await errTemplate.page_not_found(req)
        else:
            return templates.TemplateResponse(TEMPLATES_PATH + "interview_scoresheet.html", {
                "request": req,
                "page_title": "Interview Scoresheet",
                "sub_title": "Lorem ipsum dolor sit amet",
                "active_navlink": "Applicants"
            })
    else:
        return await errTemplate.page_not_found(req)



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
        return await errTemplate.page_not_found(req)
