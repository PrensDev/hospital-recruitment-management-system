# Import Packages
from typing import List
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from database import get_db
from oauth2 import get_user, authorized
from schemas import user_schemas as user, recruiter_schemas as recruiter
from datetime import date
from sqlalchemy import or_
from models import *


# Router Instance
router = APIRouter(
    prefix = "/api/recruiter",
    tags = ["Recruiter API"]
)


# Priviledge User
AUTHORIZED_USER = "Recruiter"


# User Information
@router.get("/info", response_model = user.ShowUser)
def get_user_info(
    db: Session = Depends(get_db), 
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            user_info = db.query(User).filter(User.user_id == user_data.user_id).first()
            if not user_info:
                raise HTTPException(status_code = 404, detail = {"message": "User does not exists"})
            else:
                return user_info
    except Exception as e:
        print(e)


# ====================================================================
# REQUISITIONS/MANPOWER REQUESTS
# ====================================================================


# Requisition Not Found Response
REQUISITION_NOT_FOUND_RESPONSE = {"message": "Requisition not found"}


# Get All Approved Requisitions
@router.get("/requisitions", response_model = List[recruiter.ShowManpowerRequest])
def get_all_approved_requisitions(
    db: Session = Depends(get_db), 
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(Requisition).filter(or_(
                Requisition.request_status == "Approved",
                Requisition.request_status == "Completed"
            )).all()
    except Exception as e:
        print(e)


# Requisition Analytics
@router.get("/requisitions/analytics")
def requisition_analytics(
    db: Session = Depends(get_db), 
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            query = db.query(Requisition)
            approved_request = query.filter(or_(
                Requisition.request_status == "Approved",
                Requisition.request_status == "Completed"
            )).count()
            with_job_post = query.join(JobPost).filter(or_(
                Requisition.request_status == "Approved",
                Requisition.request_status == "Completed"
            )).filter(JobPost.requisition_id == Requisition.requisition_id).count()
            return {
                "approved_requests": approved_request,
                "with_job_post": with_job_post
            }
    except Exception as e:
        print(e)


# Get One Approved Requisition
@router.get("/requisitions/{requisition_id}", response_model = recruiter.ShowManpowerRequest)
def get_one_approved_requisitions(
    requisition_id,
    db: Session = Depends(get_db), 
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            requisition = db.query(Requisition).filter(
                Requisition.requisition_id == requisition_id,
                or_(
                    Requisition.request_status == "Approved",
                    Requisition.request_status == "Completed"
                )
            ).first()
            if not requisition:
                raise HTTPException(status_code = 404, detail = REQUISITION_NOT_FOUND_RESPONSE)
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
@router.get("/job-posts", response_model = List[recruiter.ShowJobPost])
def get_all_job_posts(
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(JobPost).filter(JobPost.posted_by == user_data.user_id).all()
    except Exception as e:
        print(e)


# Job Posts Analytics
@router.get("/job-posts/analytics")
async def job_posts_analytics(
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            query = db.query(JobPost)
            total = query.count()
            on_going = query.filter(or_(
                JobPost.expiration_date >= date.today(), 
                JobPost.expiration_date == None
            )).count()
            ended = query.filter(JobPost.expiration_date < date.today()).count()
            return {
                "total": total,
                "on_going": on_going,
                "ended": ended
        }
    except Exception as e:
        print(e)   


# Get One Job Posts
@router.get("/job-posts/{job_post_id}", response_model = recruiter.ShowJobPost)
async def get_one_job_post(
    job_post_id,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        authorized(user_data, AUTHORIZED_USER)
        job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
        if not job_post:
            raise HTTPException(status_code = 404, detail = JOB_POST_NOT_FOUND_RESPONSE)
        else:
            return job_post
    except Exception as e:
        print(e)


# Post Vacant Job
@router.post("/job-posts", status_code = 201)
async def post_vacant_job(
    req: recruiter.CreateJobPost,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
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
            return {"message": "A new job post is successfully added"}
    except Exception as e:
        print(e)


# Update Job Post
@router.put("/job-posts/{job_post_id}")
async def update_job_post(
    job_post_id: str,
    req: recruiter.UpdateJobPost,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
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
@router.get("/applicants", response_model = List[recruiter.ShowApplicant])
async def get_all_applicants(
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(Applicant).all()
    except Exception as e:
        print(e)


# Applicants Analytics
@router.get("/applicants/analytics")
async def applicants_analytics(
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            query = db.query(Applicant)

            total = query.count()
            for_evaluation = query.filter(Applicant.status == "For evaluation").count()
            for_screening = query.filter(Applicant.status == "For screening").count()
            for_interview = query.filter(Applicant.status == "For interview").count()
            hired = query.filter(Applicant.status == "Hired").count()
            
            rejected_from_evaluation = query.filter(Applicant.status == "Rejected from evaluation").count()
            rejected_from_screening = query.filter(Applicant.status == "Rejected from screening").count()
            rejected_from_interview = query.filter(Applicant.status == "Rejected from interview").count()
            total_rejected = rejected_from_evaluation + rejected_from_screening + rejected_from_interview
            
            return {
                "total": total,
                "for_evaluation": for_evaluation,
                "for_screening": for_screening,
                "for_interview": for_interview,
                "hired": hired,
                "rejected": {
                    "total": total_rejected,
                    "from_evaluation": rejected_from_evaluation,
                    "from_screening": rejected_from_screening,
                    "from_interview": rejected_from_interview
                }
            }
    except Exception as e:
        print(e)


# Get One Applicant
@router.get("/applicants/{applicant_id}", response_model = recruiter.ShowApplicant)
async def get_one_applicant(
    applicant_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            applicant = db.query(Applicant).filter(Applicant.applicant_id == applicant_id).first()
            if not applicant:
                raise HTTPException(status_code = 404, detail = APPLICANT_NOT_FOUND_RESPONSE)
            else:
                return applicant
    except Exception as e:
        print(e)


# Evaluate Applicant Status
@router.put("/applicants/{applicant_id}", status_code = 202)
async def evaluate_applicant(
    applicant_id: str,
    req: recruiter.ApplicantEvaluation,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            applicant = db.query(Applicant).filter(Applicant.applicant_id == applicant_id)
            if not applicant.first():
                raise HTTPException(status_code = 404, detail = APPLICANT_NOT_FOUND_RESPONSE)
            else:

                # For Screening
                if req.status == "For screening":
                    applicant.update({
                        "evaluated_by": user_data.user_id,
                        "evaluated_at": text('NOW()'),
                        "status": req.status
                    })
                    db.commit()
                    return {"message": "An applicant is evaluated and ready for screening"}

                # Rejected from Evaluation
                elif req.status == "Rejected from evaluation":
                    applicant.update({
                        "rejected_by": user_data.user_id,
                        "rejected_at": text('NOW()'),
                        "status": req.status,
                        "remarks": req.remarks
                    })
                    db.commit()
                    return {"message": "An applicant is rejected from evaluation"}
    except Exception as e:
        print(e)



# Get All Applicants Per Job
@router.get("/job-posts/{job_post_id}/applicants", response_model = List[recruiter.ShowApplicant])
async def get_all_applicants_per_job(
    job_post_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(Applicant).filter(Applicant.job_post_id == job_post_id).all()
    except Exception as e:
        print(e)


# Applicants Per Job Analytics
@router.get("/job-posts/{job_post_id}/applicants/analytics")
async def applicants_per_job_analytics(
    job_post_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            query = db.query(Applicant)
            
            # Total Applicants
            total = query.filter(Applicant.job_post_id == job_post_id).count()

            # For Evaluation
            for_evaluation = query.filter(
                Applicant.status == "For evaluation",
                Applicant.job_post_id == job_post_id
            ).count()

            # For Screening
            for_screening = query.filter(
                Applicant.status == "For screening",
                Applicant.job_post_id == job_post_id
            ).count()

            # For Interview
            for_interview = query.filter(
                Applicant.status == "For interview",
                Applicant.job_post_id == job_post_id
            ).count()
            
            # Hired
            hired = query.filter(
                Applicant.status == "Hired",
                Applicant.job_post_id == job_post_id
            ).count()
            
            # Rejected From Evaluation
            rejected_from_evaluation = query.filter(
                Applicant.status == "Rejected from evaluation",
                Applicant.job_post_id == job_post_id
            ).count()

            # Rejected From Screening
            rejected_from_screening = query.filter(
                Applicant.status == "Rejected from screening",
                Applicant.job_post_id == job_post_id
            ).count()

            # Rejected From Interview
            rejected_from_intreview = query.filter(
                Applicant.status == "Rejected from interview",
                Applicant.job_post_id == job_post_id
            ).count()

            # Total Rejected
            total_rejected = rejected_from_evaluation + rejected_from_screening + rejected_from_intreview
            
            return {
                "total": total,
                "for_evaluation": for_evaluation,
                "for_screening": for_screening,
                "for_interview": for_interview,
                "hired": hired,
                "rejected": {
                    "total": total_rejected,
                    "from_evaluation": rejected_from_evaluation,
                    "from_screening": rejected_from_screening,
                    "from_interview": rejected_from_intreview
                }
            }
    except Exception as e:
        print(e)


# Get All Applicants Per (For evaluation)
@router.get("/job-posts/{job_post_id}/applicants/for-evaluation", response_model = List[recruiter.ShowApplicant])
async def for_evaluation_applicants(
    job_post_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(Applicant).filter(
                Applicant.job_post_id == job_post_id,
                Applicant.status == 'For evaluation'
            ).all()
    except Exception as e:
        print(e)


# Get All Applicants Per Job (Evaluated)
@router.get("/job-posts/{job_post_id}/applicants/evaluated", response_model = List[recruiter.ShowApplicant])
async def evaluated_applicants(
    job_post_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(Applicant).filter(
                Applicant.job_post_id == job_post_id,
                or_(
                    Applicant.status == 'For screening',
                    Applicant.status == 'Rejected from screening',
                    Applicant.status == 'For interview',
                    Applicant.status == 'Rejected from interview',
                    Applicant.status == 'Hired'
                )
            ).all()
    except Exception as e:
        print(e)


# Get All Applicants Per Job (Rejected)
@router.get("/job-posts/{job_post_id}/applicants/rejected", response_model = List[recruiter.ShowApplicant])
async def rejected_applicants(
    job_post_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(Applicant).filter(
                Applicant.job_post_id == job_post_id,
                Applicant.status == 'Rejected from evaluation'
            ).all()
    except Exception as e:
        print(e)