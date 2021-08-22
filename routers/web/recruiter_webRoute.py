# Import Packages
from routers.api.deptHead_apiRoute import AUTHORIZED_USER
from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from routers.web import errPages_templates as errTemplate
from jwt_token import get_token


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
async def dashboard(req: Request, user_data: dict = Depends(get_token)):
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
async def dashboard(req: Request, user_data: dict = Depends(get_token)):
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
async def dashboard(req: Request, user_data: dict = Depends(get_token)):
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
@router.get("/add-job-post", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "add_job_post.html", {
        "request": req,
        "page_title": "Create Job Post",
        "sub_title": "Create Job Post to advertise available jobs",
        "active_navlink": "Job Posts"
    })

# Applicants
@router.get("/applicants", response_class=HTMLResponse)
async def dashboard(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "applicants.html", {
            "request": req,
            "page_title": "Applicants",
            "sub_title": "Applicants to manage potential candidates",
            "active_navlink": "Applicants"
        })
    else:
        return errTemplate.page_not_found(req)