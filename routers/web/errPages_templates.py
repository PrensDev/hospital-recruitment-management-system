# Import Packagaes
from fastapi import Request
from fastapi.templating import Jinja2Templates


# Templates
templates = Jinja2Templates(directory = "templates")


# Templates Path
TEMPLATES_PATH = "/pages/errors/"


# 404 Page Not Found
def page_not_found(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "404.html", {
        "request": req,
        "page_title": "404 Page Not Found"
    })