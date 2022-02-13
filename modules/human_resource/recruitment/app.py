# Import Packages
from fastapi import FastAPI

# Import API Routers
from modules.human_resource.recruitment.routers.api \
    import test_apiRoute, auth_apiRoute, deptMngr_apiRoute, deptHead_apiRoute, hireMngr_apiRoute, recruiter_apiRoute, home_apiRoute

# Import Web Routers
from modules.human_resource.recruitment.routers.web \
    import home_webRoute, deptMngr_webRoute, deptHead_webRoute, hireMngr_webRoute, recruiter_webRoute


# App Instance
recruitment_app = FastAPI()


# API Routers
recruitment_app.include_router(test_apiRoute.router)
recruitment_app.include_router(home_apiRoute.router)
recruitment_app.include_router(auth_apiRoute.router)
recruitment_app.include_router(deptMngr_apiRoute.router)
recruitment_app.include_router(deptHead_apiRoute.router)
recruitment_app.include_router(hireMngr_apiRoute.router)
recruitment_app.include_router(recruiter_apiRoute.router)


# Web Routers
recruitment_app.include_router(home_webRoute.router)
recruitment_app.include_router(deptMngr_webRoute.router)
recruitment_app.include_router(deptHead_webRoute.router)
recruitment_app.include_router(hireMngr_webRoute.router)
recruitment_app.include_router(recruiter_webRoute.router)