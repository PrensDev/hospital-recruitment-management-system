# Import Packagaes
from fastapi import Request

# Import Templates
from modules.human_resource.recruitment.routers.web._template import templates



# Templates Path
TEMPLATES_PATH = "/pages/errors/"


# 404 Page Not Found
def page_not_found(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "404.html", {
        "request": req,
        "page_title": "404 Page Not Found"
    })