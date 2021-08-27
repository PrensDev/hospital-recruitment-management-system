# Import Packages
from typing import List
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from database import get_db
from oauth2 import get_user, check_priviledge
from schemas import db_schemas

import models


# Models
User            = models.User
Requisition     = models.Requisition
JobPost         = models.JobPost
Applicant       = models.Applicant


# Router Instance
router = APIRouter(
    prefix = "/api/recruiter",
    tags = ["Recruiter API"]
)


# Priviledge User
AUTHORIZED_USER = "Recruiter"


# User Information
@router.get("/info", response_model = db_schemas.UserInfo)
def get_user_info(
    db: Session = Depends(get_db), 
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        user_info = db.query(User).filter(User.user_id == user_data.user_id)
        if not user_info.first():
            return "User does not exist"
        else:
            return user_info.first()
    except Exception as e:
        print(e)


# ====================================================================
# REQUISITIONS/MANPOWER REQUESTS
# ====================================================================


# Requisition Not Found Response
REQUISITION_NOT_FOUND_RESPONSE = {"message": "Requisition not found"}


# Get All Approved Requisitions
@router.get("/requisitions", response_model = List[db_schemas.ShowManpowerRequest])
def get_all_approved_requisitions(
    db: Session = Depends(get_db), 
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(Requisition).filter(Requisition.request_status == "Approved").all()
    except Exception as e:
        print(e)


# Get One Approved Requisition
@router.get("/requisitions/{requisition_id}", response_model = db_schemas.ShowManpowerRequest)
def get_one_approved_requisitions(
    requisition_id,
    db: Session = Depends(get_db), 
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        requisition = db.query(Requisition).filter(Requisition.requisition_id == requisition_id).first()
        if not requisition:
            return REQUISITION_NOT_FOUND_RESPONSE
        else:
            return requisition
    except Exception as e:
        print(e)


# ====================================================================
# JOB POSTS
# ====================================================================


# Job Post Not Found Response
JOB_POST_NOT_FOUND_RESPONSE = {"message": "Job Post not found"}


# Get All Job Posts
@router.get("/job-posts", response_model = List[db_schemas.ShowJobPost])
def get_all_job_posts(
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(JobPost).filter(JobPost.posted_by == user_data.user_id).all()
    except Exception as e:
        print(e)


# Get One Job Posts
@router.get("/job-posts/{job_post_id}", response_model = db_schemas.ShowJobPost)
def get_one_job_post(
    job_post_id,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
        if not job_post:
            raise HTTPException(status_code = 404, detail = JOB_POST_NOT_FOUND_RESPONSE)
        else:
            return job_post
    except Exception as e:
        print(e)


# Post Vacant Job
@router.post("/job-posts", status_code = 201)
def post_vacant_job(
    req: db_schemas.CreateJobPost,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        new_job_post = JobPost(
            requisition_id = req.requisition_id,
            salary_is_visible = req.salary_is_visible,
            content = req.content,
            expiration_date = req.expiration_date,
            posted_by = user_data.user_id
        )
        db.add(new_job_post)
        db.commit()
        db.refresh(new_job_post)
        return {
            "data": new_job_post,
            "message": "A new job post is successfully added"
        }
    except Exception as e:
        print(e)


# Update Job Post
@router.put("/job-posts/{job_post_id}")
def update_job_post(
    job_post_id: str,
    req: db_schemas.JobPost,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id)
        if not job_post.first():
            raise HTTPException(status_code = 404, detail = JOB_POST_NOT_FOUND_RESPONSE)
        else:
            job_post.update(req.dict())
            db.commit()
            return {"message": "A job post is successfully updated"}
    except Exception as e:
        print(e)



# ====================================================================
# APPLICANTS
# ====================================================================


# Applicant Not Found Response
APPLICANT_NOT_FOUND_RESPONSE = {"message": "Applicant not found"}


# Get All Applicants
@router.get("/applicants", response_model = List[db_schemas.ShowApplicantInfo])
def get_all_applicants(
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(Applicant).all()
    except Exception as e:
        print(e)


# Get All Applicants Per Job
@router.get("/job-posts/{job_post_id}/applicants", response_model = List[db_schemas.ShowApplicantInfo])
def get_all_applicants_per_job(
    job_post_id,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(Applicant).filter(Applicant.job_post_id == job_post_id).all()
    except Exception as e:
        print(e)


# Get One Applicant
@router.get("/applicants/{applicant_id}", response_model = db_schemas.ShowApplicantInfo)
def get_one_applicant(
    applicant_id,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        applicant = db.query(Applicant).filter(Applicant.applicant_id == applicant_id).first()
        if not applicant:
            return APPLICANT_NOT_FOUND_RESPONSE
        else:
            return applicant
    except Exception as e:
        print(e)