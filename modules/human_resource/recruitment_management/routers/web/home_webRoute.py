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
    
    # Return to login page if no access token
    if not req.cookies.get('access_token'):
        return templates.TemplateResponse("pages/auth/login.html", {
            "request": req,
            "page_title": "Login"
        })

    # Redirect if has access token
    return RedirectResponse("/redirect")


# User Redirect
@router.get("/redirect")
def redirect(req: Request, user_data: dict = Depends(get_token)):
    paths = {
        "Department Head": "/dh",
        "Department Manager": "/dm",
        "Hiring Manager": "/h",
        "Recruiter": "/r"
    }

    if not user_data["user_type"] in paths:
        return errTemplate.page_not_found(req)

    return RedirectResponse(paths[user_data["user_type"]])


# ===========================================================
# HOME
# ===========================================================


# Home Page
@router.get("/")
def home(req: Request, page: Optional[int] = None):
    return templates.TemplateResponse("pages/home/index.html", {
        "request": req,
        "page_title": "HoMIES - Hospital Management System"
    })


# ===========================================================
# CAREERS/JOB POSTS
# ===========================================================


# Careers
@router.get("/careers")
def careers(
    req: Request, 
    searchQuery: Optional[str] = None,
    jobCategory: Optional[str] = None,
    employmentType: Optional[str] = None,
    page: Optional[int] = 1
):

    # Check if page is not valid
    if not page or page <= 0:
        return errTemplate.page_not_found(req)

    # If query is declared
    if searchQuery:

        # If job category is declared
        if jobCategory:
            print("Job Category:", jobCategory)

        # If employment type is declared
        if employmentType:
            print("Employment Type:", employmentType)

        return templates.TemplateResponse("pages/home/search_result.html", {
            "request": req,
            "page_title": "Search Result for \"" + searchQuery + "\"",
            "active_navlink": "Careers"
        })

    # If query is not declared
    else:
        return templates.TemplateResponse("pages/home/careers.html", {
            "request": req,
            "page_title": "Careers",
            "page_subtitle": "Discover job opportunities here",
            "active_navlink": "Careers"
        })


# Search Job
@router.get("/careers/search")
def search(
    req: Request, 
    query: Optional[str] = None, 
    jobCategory: Optional[str] = None,
    employmentType: Optional[str] = None,
    page: Optional[int] = 1
):  
    
    if not query:
        return RedirectResponse("/careers")

    # If job category is declared
    if jobCategory:
        print("Job Category:", jobCategory)

    # If employment type is declared
    if employmentType:
        print("Employment Type:", employmentType)

    # If no error, return template response
    return templates.TemplateResponse("pages/home/search_result.html", {
        "request": req,
        "page_title": "Search Result for \"" + query + "\"",
        "active_navlink": "Careers"
    })


# Available Job Details
@router.get("/careers/{job_post_id}")
def available_job_details(job_post_id: str, req: Request, db: Session = Depends(get_db)):
    
    # Check if job_post_id is existing in database
    if not db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first():
        return errTemplate.page_not_found(req)
    
    # If no error, return template response
    return templates.TemplateResponse("pages/home/available_job_details.html", {
        "request": req,
        "page_title": "Available Job Details",
        "active_navlink": "Careers"
    })
