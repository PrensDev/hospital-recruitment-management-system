# Import Packages
from routers.api.recruiter_apiRoute import JOB_POST_NOT_FOUND_RESPONSE
from typing import List
from fastapi import APIRouter, Depends, Request, UploadFile, File
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import db_schemas
from datetime import date
from sqlalchemy import or_
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from dotenv import dotenv_values
import shutil
import uuid
import models

# Router Instance
router = APIRouter(
    prefix = "/api/home",
    tags = ["Home API"]
)

# Models
JobPost = models.JobPost
Requisition = models.Requisition
Position = models.Position
Applicant = models.Applicant


# Dotenv
env = dotenv_values(".env")


# Mail Configuration
mail_config = ConnectionConfig(
    MAIL_USERNAME = env['MAIL_EMAIL'],
    MAIL_PASSWORD = env['MAIL_PASSWORD'],
    MAIL_FROM = env['MAIL_EMAIL'],
    MAIL_PORT = 587,
    MAIL_SERVER = env['MAIL_SERVER'],
    MAIL_TLS = True,
    MAIL_SSL = False,
    USE_CREDENTIALS = True
)


# ====================================================================
# JOB POSTS
# ====================================================================


# Job Post Not Found Response
JOB_POST_NOT_FOUND_RESPONSE = {"message": "Job Post not found"}


# Get All Job Posts
@router.get("/job-posts", response_model = List[db_schemas.ShowJobPostForApplicants])
async def get_all_job_posts(db: Session = Depends(get_db)):
    try:
        return db.query(JobPost).filter(or_(
            JobPost.expiration_date > date.today(), 
            JobPost.expiration_date == None
        )).order_by(JobPost.created_at.desc()).all()
    except Exception as e:
        print(e)


# Search Job Post
@router.post("/job-posts/search", response_model = List[db_schemas.ShowJobPostForApplicants])
async def search_job_post(req: db_schemas.Search, db: Session = Depends(get_db)):
    try:
        return db.query(JobPost).join(Requisition).join(Position).filter(Position.name.contains(req.query)).all()
    except Exception as e:
        print(e)


# Get One Job Post
@router.get("/job-posts/{job_post_id}", response_model = db_schemas.ShowJobPostForApplicants)
async def get_one_job_post(job_post_id: str, db: Session = Depends(get_db)):
    try:
        job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
        if not job_post:
            return HTTPException(status_code = 404, detail = JOB_POST_NOT_FOUND_RESPONSE)
        else:
            return job_post
    except Exception as e:
        print(e)


# ====================================================================
# APPLICATION
# ====================================================================


# Upload Resume
@router.post("/upload/resume")
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
@router.post("/apply")
async def apply(req: db_schemas.Applicant, db: Session = Depends(get_db)):
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
        #     <h1>Hello {req.first_name}!</h1>
        #     <div>This is a test mail from Hospital Management System</div>
        # """

        # message = MessageSchema(
        #     subject = "Job Application",
        #     recipients = [req.email],
        #     body = messageBody,
        #     subtype = "html"
        # )

        # fm = FastMail(mail_config)

        # await fm.send_message(message)

        return {
            "data": new_applicant,
            "message": "A new applicant has been added"
        }
    except Exception as e:
        print(e)