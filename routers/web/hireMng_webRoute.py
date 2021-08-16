# Import Packages
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

# Router
router = APIRouter(
    prefix = "/h",
    tags = ["Hiring Manager Web Routes"]
)

# Templates
templates = Jinja2Templates(directory = "templates")

# Templates Path
TEMPLATES_PATH = "/pages/hiring_manager/"


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