# Import Packages
from routers.api.recruiter_apiRoute import JOB_POST_NOT_FOUND_RESPONSE
from typing import List
from fastapi import APIRouter, Depends, Request
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import db_schemas
from datetime import date
from sqlalchemy import or_

import models

# Router Instance
router = APIRouter(
    prefix = "/api/home",
    tags = ["Home API"]
)

JobPost = models.JobPost
Requisition = models.Requisition
Position = models.Position
Applicant = models.Applicant


# ====================================================================
# JOB POSTS
# ====================================================================


# Job Post Not Found Response
JOB_POST_NOT_FOUND_RESPONSE = {"message": "Job Post not found"}


# Get All Job Posts
@router.get("/job-posts", response_model = List[db_schemas.ShowJobPostForApplicants])
def get_all_job_posts(db: Session = Depends(get_db)):
    try:
        return db.query(JobPost).filter(or_(
            JobPost.expiration_date > date.today(), 
            JobPost.expiration_date == None
        )).all()
    except Exception as e:
        print(e)


# Search Job Post
@router.post("/job-posts/search", response_model = List[db_schemas.ShowJobPostForApplicants])
def search_job_post(req: Request, db: Session = Depends(get_db)):
    try:
        print(req)
        # return db.query(JobPost).filter(Position.name.contains(query)).all()
    except Exception as e:
        print(e)


# Get One Job Post
@router.get("/job-posts/{job_post_id}", response_model = db_schemas.ShowJobPostForApplicants)
def get_one_job_post(job_post_id: str, db: Session = Depends(get_db)):
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


#  Apply for a job
@router.post("/apply")
def apply(req: db_schemas.Applicant, db: Session = Depends(get_db)):
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
        return {
            "data": new_applicant,
            "message": "A new applicant has been added"
        }
    except Exception as e:
        print(e)