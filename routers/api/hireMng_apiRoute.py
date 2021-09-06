# Import Packages
from typing import List
from fastapi import APIRouter, Depends, Request
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from database import get_db
from oauth2 import get_user, check_priviledge
from schemas import db_schemas
from datetime import date
from sqlalchemy import or_

import models


# Models
User                = models.User
Requisition         = models.Requisition
JobPost             = models.JobPost
Applicant           = models.Applicant
Interviewee         = models.Interviewee
InterviewQuestion   = models.InterviewQuestion
InterviewSchedule   = models.InterviewSchedule


# Router Instance
router = APIRouter(
    prefix = "/api/hiring-manager",
    tags = ["Hiring Manager API"]
)


# Priviledge User
AUTHORIZED_USER = "Hiring Manager"


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


# Get All Requisitions
@router.get("/requisitions", response_model = List[db_schemas.ShowManpowerRequest])
async def get_all_requisitions(
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(Requisition).all()
    except Exception as e:
        print(e)


# Requisition Analytics
@router.get("/requisitions/analytics")
async def requisition_analytics(
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        query = db.query(Requisition)
        total = query.count()
        for_review_count = query.filter(Requisition.request_status == "For Review").count()
        approved = query.filter(Requisition.request_status == "Approved").count()
        rejected = query.filter(Requisition.request_status == "Rejected").count()
        return {
            "total": total,
            "for_review": for_review_count,
            "approved": approved,
            "rejected": rejected
        }
    except Exception as e:
        print(e)


# Get One Requisition
@router.get("/requisitions/{requisition_id}", response_model = db_schemas.ShowManpowerRequest)
async def get_one_requisition(
    requisition_id: str, 
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


# Update Requisition
@router.put("/requisitions/{requisition_id}")
async def update_requisition(
    requisition_id: str, 
    req: db_schemas.ManpowerRequestStatus,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        requisition = db.query(Requisition).filter(Requisition.requisition_id == requisition_id)
        if not requisition.first():
            raise HTTPException(status_code = 404, detail = REQUISITION_NOT_FOUND_RESPONSE)
        else:
            requisition.update({
                "request_status": req.request_status,
                "remarks": req.remarks,
                "reviewed_by": user_data.user_id,
                "reviewed_at": req.reviewed_at
            })
            db.commit()
            return {"message": "A man power request has been updated"}
    except Exception as e:
        print(e)


# ====================================================================
# JOB POSTS
# ====================================================================


# Job Post Not Found Response
JOB_POST_NOT_FOUND_RESPONSE = {"message": "Job Post Not Found"}


# Job Posts
@router.get("/job-posts", response_model=List[db_schemas.ShowJobPost])
async def get_all_job_posts(
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        job_posts = db.query(JobPost).all()
        return job_posts
    except Exception as e:
        print(e)


# Job Posts Analytics
@router.get("/job-posts/analytics")
async def job_posts_analytics(
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
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
@router.get("/job-posts/{job_post_id}", response_model = db_schemas.ShowJobPost)
async def get_one_job_post(
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


# ====================================================================
# APPLICANTS
# ====================================================================

# Applicants Not Found Response
APPLICANT_NOT_FOUND_RESPONSE = {"message": "Applicant Not Found"}


# Get All Applicants Per Job
@router.get("/job-posts/{job_post_id}/applicants", response_model = List[db_schemas.ShowApplicantInfo])
async def get_all_applicants_per_job(
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
async def get_one_applicant(
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


# Get One Interviewee
@router.get("/interviewee/{applicant_id}", response_model = db_schemas.ShowIntervieweeInfo)
async def get_one_applicant(
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


# ====================================================================
# APPLICANTS PER JOB
# ====================================================================


# Applicants Per Job Analytics
@router.get("/job-posts/{job_post_id}/applicants/analytics")
async def applicants_per_job_analytics(
    job_post_id,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        query = db.query(Applicant)
        total = query.filter(Applicant.job_post_id == job_post_id).count()
        for_evaluation = query.filter(
            Applicant.status == "For evaluation",
            Applicant.job_post_id == job_post_id
        ).count()
        for_screening = query.filter(
            Applicant.status == "For screening",
            Applicant.job_post_id == job_post_id
        ).count()
        for_interview = query.filter(
            Applicant.status == "For interview",
            Applicant.job_post_id == job_post_id
        ).count()
        rejected_from_evalution = query.filter(
            Applicant.status == "Rejected from evaluation",
            Applicant.job_post_id == job_post_id
        ).count()
        rejected_from_screening = query.filter(
            Applicant.status == "Rejected from screening",
            Applicant.job_post_id == job_post_id
        ).count()
        rejected_from_intreview = query.filter(
            Applicant.status == "Rejected from interview",
            Applicant.job_post_id == job_post_id
        ).count()
        hired = query.filter(
            Applicant.status == "Hired",
            Applicant.job_post_id == job_post_id
        ).count()
        total_rejected = rejected_from_evalution + rejected_from_screening + rejected_from_intreview
        return {
            "total": total,
            "for_evaluation": for_evaluation,
            "for_screening": for_screening,
            "for_interview": for_interview,
            "hired": hired,
            "rejected": {
                "total": total_rejected,
                "from_evaluation": rejected_from_evalution,
                "from_screening": rejected_from_screening,
                "from_interview": rejected_from_intreview
            }
        }
    except Exception as e:
        print(e)


# Get All Applicants Per Job (For Screening)
@router.get("/job-posts/{job_post_id}/applicants/for-screening", response_model = List[db_schemas.ShowApplicantInfo])
async def evaluated_applicants(
    job_post_id,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(Applicant).filter(
            Applicant.job_post_id == job_post_id,
            Applicant.status == 'For screening'
        ).all()
    except Exception as e:
        print(e)


# Get All Applicants Per Job (For Interview)
@router.get("/job-posts/{job_post_id}/applicants/for-interview", response_model = List[db_schemas.ShowIntervieweeInfo])
async def evaluated_applicants(
    job_post_id,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(Applicant).filter(
            Applicant.job_post_id == job_post_id,
            Applicant.status == 'For interview'
        ).all()
    except Exception as e:
        print(e)


# Get All Applicants Per Job (Hired)
@router.get("/job-posts/{job_post_id}/applicants/hired", response_model = List[db_schemas.ShowApplicantInfo])
async def evaluated_applicants(
    job_post_id,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(Applicant).filter(
            Applicant.job_post_id == job_post_id,
            Applicant.status == 'Hired'
        ).all()
    except Exception as e:
        print(e)


# Get All Applicants Per Job (Rejected)
@router.get("/job-posts/{job_post_id}/applicants/rejected", response_model = List[db_schemas.ShowApplicantInfo])
async def evaluated_applicants(
    job_post_id,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        return db.query(Applicant).filter(
            Applicant.job_post_id == job_post_id,
            or_(
                Applicant.status == 'Rejected from screening',
                Applicant.status == 'Rejected from interview'
            )
        ).all()
    except Exception as e:
        print(e)


# Screen Applicant
@router.put("/applicants/{applicant_id}/screen", status_code = 202)
async def update_applicant_status(
    applicant_id,
    req: db_schemas.ApplicantScreening,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        applicant = db.query(Applicant).filter(Applicant.applicant_id == applicant_id)
        if not applicant.first():
            raise HTTPException(status_code = 404, detail = APPLICANT_NOT_FOUND_RESPONSE)
        else:
            applicant.update({
                "screened_by": user_data.user_id,
                "screened_at": req.screened_at,
                "status": req.status,
                "remarks": req.remarks
            })
            db.commit()
            return {"message": "Update success"}
    except Exception as e:
        print(e)


# ====================================================================
# INTERVIEW
# ====================================================================


# Interview Question Not Found Response
INTERVIEW_QUESTION_NOT_FOUND_RESPONSE = {"message": "Interview Question not found"}


# Interview Schedules Per Job
@router.get("/job-posts/{job_post_id}/interview-schedules")
async def get_interview_schedules_per_job_post(
    job_post_id: str,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        job_post = db.query(JobPost).filter(
            JobPost.job_post_id == job_post_id).first()
        if not job_post:
            raise HTTPException(status_code=404, detail = JOB_POST_NOT_FOUND_RESPONSE)
        else:
            interview_schedules = db.query(InterviewSchedule).filter(
                InterviewSchedule.job_post_id == job_post_id,
                InterviewSchedule.set_by == user_data.user_id
            ).all()
            return interview_schedules
    except Exception as e:
        print(e)


# Create Interview Question
@router.post("/interview-questions", status_code = 201)
async def create_interview_question(
    req: db_schemas.CreateInterviewQuestion,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        new_interview_question = InterviewQuestion(
            question = req.question,
            type = req.type,
            added_by = user_data.user_id,
            updated_by = user_data.user_id
        )
        db.add(new_interview_question)
        db.commit()
        db.refresh(new_interview_question)
        return {
            "data": new_interview_question,
            "message": "A new interview question has been created"
        }
    except Exception as e:
        print(e)


# Get All General Interview Questions
@router.get("/interview-questions/general", response_model = List[db_schemas.ShowInterviewQuestion])
async def get_all_general_interview_questions(
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        general_questions = db.query(InterviewQuestion).filter(InterviewQuestion.type == "General").all()
        return general_questions
    except Exception as e:
        print(e)


# Get One Interview Question
@router.get("/interview-questions/{interview_question_id}", response_model = db_schemas.ShowInterviewQuestion)
async def get_one_interview_question(
    interview_question_id: str,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        interview_question = db.query(InterviewQuestion).filter(InterviewQuestion.interview_question_id == interview_question_id).first()
        if not interview_question:
            raise HTTPException(status_code = 404, detail = INTERVIEW_QUESTION_NOT_FOUND_RESPONSE)
        else:
            return interview_question
    except Exception as e:
        print(e)


# Create Interview Schedule
@router.post("/interview-schedule", status_code = 201)
async def create_interview_schedule(
    req: db_schemas.CreateInterviewSchedule,
    db: Session = Depends(get_db),
    user_data: db_schemas.User = Depends(get_user)
):
    try:
        check_priviledge(user_data, AUTHORIZED_USER)
        new_interview_schedule = InterviewSchedule(
            job_post_id = req.job_post_id,
            scheduled_date = req.scheduled_date,
            start_session = req.start_session,
            end_session = req.end_session,
            set_by = user_data.user_id
        )
        db.add(new_interview_schedule)
        db.commit()
        db.refresh(new_interview_schedule)
        interview_schedule_id = (new_interview_schedule.interview_schedule_id)
        for a in req.interviewees:
            new_interviewee = Interviewee(
                applicant_id = a.applicant_id,
                interview_schedule_id = interview_schedule_id
            )
            db.add(new_interviewee)
            db.commit()
            db.refresh(new_interviewee)
        return {"message": "Interview schedule is successfully created"}
    except Exception as e:
        print(e)