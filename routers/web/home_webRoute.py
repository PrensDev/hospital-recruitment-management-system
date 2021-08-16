# Import Packages
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates


# Router
router = APIRouter()


# Templates
templates = Jinja2Templates(directory = "templates")


# Index
@router.get("/login", response_class=HTMLResponse, tags = ["Login"])
async def index(req: Request):
    return templates.TemplateResponse("pages/auth/login.html", {
        "request": req,
        "page_title": "Login"
    })
