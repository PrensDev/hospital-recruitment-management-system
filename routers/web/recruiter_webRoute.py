# Import Packages
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

# Router
router = APIRouter(
    prefix = "/r",
    tags = ["Recruiter Web Routes"]
)

# Templates
templates = Jinja2Templates(directory = "templates")

# Templates Path
TEMPLATES_PATH = "/pages/recruiter/"


# ===========================================================
# WEB ROUTES
# ===========================================================

# Department Head Dashboard
@router.get("", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "dashboard.html", {
        "request": req,
        "page_title": "Dashboard",
        "active_navlink": "Dashboard"
    })

# Manpower Requests
@router.get("/manpower-requests", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "manpower_requests.html", {
        "request": req,
        "page_title": "Manpower Requests",
        "active_navlink": "Manpower Requests"
    })

# Job Posts
@router.get("/job-posts", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "job_posts.html", {
        "request": req,
        "page_title": "Job Posts",
        "active_navlink": "Job Posts"
    })

# Applicants
@router.get("/applicants", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "applicants.html", {
        "request": req,
        "page_title": "Applicants",
        "active_navlink": "Applicants"
    })