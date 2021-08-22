# Import Packages
from fastapi import APIRouter, Request, Depends
from fastapi.responses import RedirectResponse
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from routers.web import errPages_templates as errTemplate
from jwt_token import get_token


# Router
router = APIRouter(
    tags = ["Authentication Web Route"]
)


# Templates
templates = Jinja2Templates(directory = "templates")


# Index
@router.get("/login", response_class=HTMLResponse)
async def index(req: Request):
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
async def redirect(req: Request, user_data: dict = Depends(get_token)):
    if(user_data["user_type"] == "Department Head"):
        return RedirectResponse("/d")
    elif(user_data["user_type"] == "Hiring Manager"):
        return RedirectResponse("/h")
    elif(user_data["user_type"] == "Recruiter"):
        return RedirectResponse("/r")
    else:
        return errTemplate.page_not_found(req)
