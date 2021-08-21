# Import Packages
from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from routers.web import errPages_templates as errTemplate
from jwt_token import get_token

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
async def dashboard(req: Request, user_data: dict = Depends(get_token)):
    if user_data['user_type'] == AUTHORIZED_USER:
        return templates.TemplateResponse(TEMPLATES_PATH + "dashboard.html", {
            "request": req,
            "page_title": "Dashboard",
            "active_navlink": "Dashboard"
        })
    else:
        return errTemplate.page_not_found(req)

# Manpower Requests
@router.get("/manpower-requests", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "manpower_requests.html", {
        "request": req,
        "page_title": "Manpower Requests",
        "active_navlink": "Manpower Requests"
    })

# Applicants
@router.get("/applicants", response_class=HTMLResponse)
async def dashboard(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "applicants.html", {
        "request": req,
        "page_title": "Applicants",
        "active_navlink": "Applicants"
    })