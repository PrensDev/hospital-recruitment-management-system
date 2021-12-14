# Import Packages
from typing import Optional
from fastapi import APIRouter, Request, Depends
from fastapi.responses import RedirectResponse
from fastapi.responses import HTMLResponse
from jwt_token import get_token
from sqlalchemy.orm import Session
from database import get_db

# Import submodule files
from modules.human_resource.recruitment_management.models import *
from modules.human_resource.recruitment_management.routers.api.home_apiRoute import JobPost
from modules.human_resource.recruitment_management.routers.web import errPages_templates as errTemplate
from modules.human_resource.recruitment_management.routers.web._template import templates


# Router
router = APIRouter(
    tags = ["Authentication Web Route"]
)


# Login
@router.get("/login", response_class=HTMLResponse)
def index(req: Request):
    try:
        access_token_cookie = req.cookies.get('access_token')
        if not access_token_cookie:
            return templates.TemplateResponse("pages/auth/login.html", {
                "request": req,
                "page_title": "Login"
            })
        else:
            return RedirectResponse("/redirect")
    except Exception as e:
        print(e)


# User Redirect
@router.get("/redirect")
def redirect(req: Request, user_data: dict = Depends(get_token)):
    if(user_data["user_type"] == "Department Head"):
        return RedirectResponse("/dh")
    elif(user_data["user_type"] == "Department Manager"):
        return RedirectResponse("/dm")
    elif(user_data["user_type"] == "Hiring Manager"):
        return RedirectResponse("/h")
    elif(user_data["user_type"] == "Recruiter"):
        return RedirectResponse("/r")
    else:
        return errTemplate.page_not_found(req)


# ===========================================================
# HOME
# ===========================================================


# Home Page
@router.get("/")
def careers(req: Request, page: Optional[int] = None):
    try:
        return templates.TemplateResponse("pages/home/index.html", {
            "request": req,
            "page_title": "HoMIES - Hospital Management System"
        })
    except Exception as e:
        print(e)


# ===========================================================
# CAREERS/JOB POSTS
# ===========================================================


# Careers
@router.get("/careers")
def careers(req: Request, page: Optional[int] = None):
    try:
        return templates.TemplateResponse("pages/home/careers.html", {
            "request": req,
            "page_title": "Careers",
            "page_subtitle": "Discover job opportunities here",
            "active_navlink": "Careers"
        })
    except Exception as e:
        print(e)


# Search Job
@router.get("/careers/search")
def search(req: Request, query: str, page: Optional[int] = 1):
    try:
        if not query:
            return errTemplate.page_not_found(req)
        else:
            return templates.TemplateResponse("pages/home/search_result.html", {
                "request": req,
                "page_title": "Search Result for \"" + query + "\"",
                "active_navlink": "Careers"
            })
    except Exception as e:
        print(e)


# Available Job Details
@router.get("/careers/{job_post_id}")
def available_job_details(job_post_id: str, req: Request, db: Session = Depends(get_db)):
    try:
        job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
        if not job_post:
            return errTemplate.page_not_found(req)
        else:
            return templates.TemplateResponse("pages/home/available_job_details.html", {
                "request": req,
                "page_title": "Available Job Details",
                "active_navlink": "Careers"
            })
    except Exception as e:
        print(e)
