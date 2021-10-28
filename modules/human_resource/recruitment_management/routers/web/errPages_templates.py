# Import Packagaes
from fastapi import Request

# Import Submodule Files
from modules.human_resource.recruitment_management.routers.web._template import templates



# Templates Path
TEMPLATES_PATH = "/pages/errors/"


# 404 Page Not Found
async def page_not_found(req: Request):
    return templates.TemplateResponse(TEMPLATES_PATH + "404.html", {
        "request": req,
        "page_title": "404 Page Not Found"
    })