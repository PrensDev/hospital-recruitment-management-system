# Import Packages
from typing import List, Optional
from fastapi import APIRouter, Depends, UploadFile, File
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from database import get_db
from datetime import datetime
from sqlalchemy import or_
from dotenv import dotenv_values

# Import models and schemas
from modules.human_resource.recruitment_management.models import *
from modules.human_resource.recruitment_management.schemas import career_schemas as careers

# For file handling
import shutil, uuid

# From email sending
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


# Router Instance
router = APIRouter(
    prefix = "/api/home",
    tags = ["Home API"]
)


# Dotenv
env = dotenv_values(".env")


FETCH_ROW = 10


# ====================================================================
# JOB POSTS
# ====================================================================


# Job Post Not Found Response
JOB_POST_NOT_FOUND_RESPONSE = {"message": "Job Post not found"}


# Get All Job Posts
@router.get("/job-posts", response_model = List[careers.ShowJobPost])
def get_all_job_posts(page: Optional[int] = None, db: Session = Depends(get_db)):
    try:
        query = db.query(JobPost).filter(or_(
            JobPost.expiration_date > datetime.today(), 
            JobPost.expiration_date == None
        )).order_by(JobPost.created_at.desc())

        return query.limit(FETCH_ROW).offset(FETCH_ROW * (page - 1)).all()
    except Exception as e:
        print(e)


# Job Post Analytics
@router.get("/job-posts/analytics")
def job_posts_analytics(db: Session = Depends(get_db)):
    try:
        total = db.query(JobPost).filter(or_(
            JobPost.expiration_date > datetime.today(), 
            JobPost.expiration_date == None
        )).order_by(JobPost.created_at.desc()).count()

        return {"total": total}
    except Exception as e:
        print(e)


# Search Job Post
@router.post("/job-posts/search", status_code=202, response_model=List[careers.ShowJobPost])
def search_job_post(page: Optional[int], req: careers.Search, db: Session = Depends(get_db)):
    try:
        return db.query(JobPost).join(Requisition).join(Position).filter(
                Position.name.contains(req.query)
            ).limit(FETCH_ROW).offset(FETCH_ROW * (page - 1)).all()
    except Exception as e:
        print(e)


# Search Job Post Analytics
@router.post("/job-posts/search/analytics", status_code=202)
def search_job_post_analytics(req: careers.Search, db: Session = Depends(get_db)):
    try:
        total = db.query(JobPost).join(Requisition).join(Position).filter(Position.name.contains(req.query)).count()
        return {"total": total}
    except Exception as e:
        print(e)


# Get One Job Post
@router.get("/job-posts/{job_post_id}", response_model=careers.ShowJobPost)
def get_one_job_post(job_post_id: str, db: Session = Depends(get_db)):
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
def upload_resume(file: UploadFile = File(...)):
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

        position = db.query(Position).join(Requisition).filter(
                Requisition.position_id == Position.position_id
            ).join(JobPost).filter(
                JobPost.requisition_id == Requisition.requisition_id,
                JobPost.job_post_id == req.job_post_id
            ).first()

        db.add(new_applicant)
        db.commit()
        db.refresh(new_applicant)

        messageBody = f"""
            <h1 style="margin: 0">Job Application</h1>
            <h2>HoMIES - Recruitment Management System</h2>

            <br>
            
            <div>Good day! <b>{new_applicant.first_name}</b>,</div>

            <br>

            <p>Thank you for applying to the <b>{position.name}</b> position at Homies, Inc.</p>
            
            <p>I’d like to inform you that we received your application and resume for the <b>{position.name}</b> position. Our hiring team is currently reviewing all applications of applicants. If you are among qualified candidates, you will receive an email from one of our recruiters to schedule you for an interview. </p>
            <p>In any case, we will keep you updated on the status of your application. We will keep also all the information you submitted it utmost confidentiality.</p>
            <p>Thank you again, {new_applicant.first_name}!</p>

            <br>

            <div>Best Regards,</div>
            <div>HoMIES Recruitment Management Department</div>

            <br>
            <br>
            
            <p style="color: red">This message is auto-generated by the HoMIES Recruitment Management System. Please, DO NOT REPLY.</p>
        """

        message = MIMEMultipart()
        message['From'] = env['MAIL_EMAIL']
        message['To'] = req.email
        message['Subject'] = "HoMIES - Job Application"

        message.attach(MIMEText(messageBody, 'html'))

        SMTP_SERVER = smtplib.SMTP_SSL(env['MAIL_SERVER'], 465)
        SMTP_SERVER.login(env['MAIL_EMAIL'], env['MAIL_PASSWORD'])
        SMTP_SERVER.sendmail(env["MAIL_EMAIL"], [req.email], message.as_string())
        SMTP_SERVER.quit()

        return {"message": "A new applicant has been added"}
    except Exception as e:
        print(e)