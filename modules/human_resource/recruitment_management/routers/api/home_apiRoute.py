# Import Packages
from typing import List, Optional
from fastapi import APIRouter, Depends, UploadFile, File
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from database import get_db
from modules.human_resource.recruitment_management.schemas import career_schemas as careers
from datetime import date
from sqlalchemy import or_
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from dotenv import dotenv_values
from modules.human_resource.recruitment_management.models import *
import shutil
import uuid

# Router Instance
router = APIRouter(
    prefix = "/api/home",
    tags = ["Home API"]
)


# Dotenv
env = dotenv_values(".env")


# Mail Configuration
# mail_config = ConnectionConfig(
#     MAIL_USERNAME = env['MAIL_EMAIL'],
#     MAIL_PASSWORD = env['MAIL_PASSWORD'],
#     MAIL_FROM = env['MAIL_EMAIL'],
#     MAIL_PORT = 587,
#     MAIL_SERVER = env['MAIL_SERVER'],
#     MAIL_TLS = True,
#     MAIL_SSL = False,
#     USE_CREDENTIALS = True
# )


FETCH_ROW = 10;


# ====================================================================
# JOB POSTS
# ====================================================================


# Job Post Not Found Response
JOB_POST_NOT_FOUND_RESPONSE = {"message": "Job Post not found"}


# Get All Job Posts
@router.get("/job-posts", response_model = List[careers.ShowJobPost])
async def get_all_job_posts(page: Optional[int] = None, db: Session = Depends(get_db)):
    try:
        query = db.query(JobPost).filter(or_(
            JobPost.expiration_date > date.today(), 
            JobPost.expiration_date == None
        )).order_by(JobPost.created_at.desc())

        return query.limit(FETCH_ROW).offset(FETCH_ROW * (page - 1)).all()
    except Exception as e:
        print(e)


# Job Post Analytics
@router.get("/job-posts/analytics")
async def job_posts_analytics(db: Session = Depends(get_db)):
    try:
        total = db.query(JobPost).filter(or_(
            JobPost.expiration_date > date.today(), 
            JobPost.expiration_date == None
        )).order_by(JobPost.created_at.desc()).count()

        return {"total": total}
    except Exception as e:
        print(e)


# Search Job Post
@router.post("/job-posts/search", status_code=202, response_model=List[careers.ShowJobPost])
async def search_job_post(page: Optional[int], req: careers.Search, db: Session = Depends(get_db)):
    try:
        return db.query(JobPost).join(Requisition).join(Position).filter(
                Position.name.contains(req.query)
            ).limit(FETCH_ROW).offset(FETCH_ROW * (page - 1)).all()
    except Exception as e:
        print(e)


# Search Job Post Analytics
@router.post("/job-posts/search/analytics", status_code=202)
async def search_job_post_analytics(req: careers.Search, db: Session = Depends(get_db)):
    try:
        total = db.query(JobPost).join(Requisition).join(Position).filter(Position.name.contains(req.query)).count()
        return {"total": total}
    except Exception as e:
        print(e)


# Get One Job Post
@router.get("/job-posts/{job_post_id}", response_model=careers.ShowJobPost)
async def get_one_job_post(job_post_id: str, db: Session = Depends(get_db)):
    try:
        job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
        if not job_post:
            return HTTPException(status_code=404, detail=JOB_POST_NOT_FOUND_RESPONSE)
        else:
            return job_post
    except Exception as e:
        print(e)


# ====================================================================
# APPLICATION
# ====================================================================


# Upload Resume
@router.post("/upload/resume", status_code=202)
async def upload_resume(file: UploadFile = File(...)):
    try:
        orig_filename = f"{file.filename}"
        file_extension = orig_filename.split('.')[-1]
        new_filename = uuid.uuid4().hex
        file_location = f"static/app/files/resumes/{new_filename}.{file_extension}"
        with open(file_location, "wb") as fileObj:
            shutil.copyfileobj(file.file, fileObj)
        return {
            "original_file": orig_filename,
            "new_file": f"{new_filename}.{file_extension}"
        }
    except Exception as e:
        print(e)
    finally:
        file.file.close()


#  Apply for a job
@router.post("/apply", status_code=202)
async def apply(req: careers.Applicant, db: Session = Depends(get_db)):
    try:
        new_applicant = Applicant(
            job_post_id = req.job_post_id,
            first_name = req.first_name,
            middle_name = req.middle_name,
            last_name = req.last_name,
            suffix_name = req.suffix_name,
            contact_number = req.contact_number,
            email = req.email,
            resume = req.resume
        )
        db.add(new_applicant)
        db.commit()
        db.refresh(new_applicant)

        # messageBody = f"""
        #     <html>
        #     <body>
        #         <h1>Hello {new_applicant.first_name}!</h1>
        #         <p>We would like to inform you that your application is submitted successfully and it is now ready for evaluation. For some updates, please check your email regularly.</p>
        #         <p>Thank you!</p>

        #         <br>
        #         <br>
                
        #         <p style="color: red">This message is auto-generated by the Homies Recruitment Management System. Please, DO NOT REPLY.</p>
        #     </body>
        #     </html>
        # """

        # message = MessageSchema(
        #     subject = "Homies Job Application",
        #     recipients = [req.email],
        #     body = messageBody,
        #     subtype = "html"
        # )

        # fm = FastMail(mail_config)

        # await fm.send_message(message)

        return {"message": "A new applicant has been added"}
    except Exception as e:
        print(e)