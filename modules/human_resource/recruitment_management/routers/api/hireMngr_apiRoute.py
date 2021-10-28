# Import Packages
from typing import List
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session
from database import get_db
from oauth2 import get_user, authorized
from modules.human_resource.recruitment_management.schemas import user_schemas as user, hireMngr_schemas as hireMngr
from datetime import date
from sqlalchemy import or_
from modules.human_resource.recruitment_management.models import *


# Router Instance
router = APIRouter(
    prefix = "/api/hiring-manager",
    tags = ["Hiring Manager API"]
)


# Priviledge User
AUTHORIZED_USER = "Hiring Manager"


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


# Get All Requisitions
@router.get("/requisitions", response_model = List[hireMngr.ShowManpowerRequest])
async def get_all_requisitions(
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(Requisition).filter(or_(
                Requisition.request_status == "For approval",
                Requisition.request_status == "Approved",
                Requisition.request_status == "Rejected for approval",
                Requisition.request_status == "Completed"
            )).all()
    except Exception as e:
        print(e)


# Requisition Analytics
@router.get("/requisitions/analytics")
async def requisition_analytics(
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            query = db.query(Requisition)
            for_approval = query.filter(Requisition.request_status == "For approval").count()
            approved = query.filter(Requisition.request_status == "Approved").count()
            rejected = query.filter(Requisition.request_status == "Rejected for approval").count()
            total = for_approval + approved + rejected
            return {
                "total": total,
                "for_review": for_approval,
                "approved": approved,
                "rejected": rejected
            }
    except Exception as e:
        print(e)


# Get One Requisition
@router.get("/requisitions/{requisition_id}", response_model = hireMngr.ShowManpowerRequest)
async def get_one_requisition(
    requisition_id: str, 
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            requisition = db.query(Requisition).filter(
                Requisition.requisition_id == requisition_id,
                or_(
                    Requisition.request_status == "For approval",
                    Requisition.request_status == "Approved",
                    Requisition.request_status == "Rejected for approval",
                    Requisition.request_status == "Completed"
                )
            ).first()
            if not requisition:
                raise HTTPException(status_code=404, detail=REQUISITION_NOT_FOUND_RESPONSE)
            else:
                return requisition
    except Exception as e:
        print(e)


# Requisition Approval
@router.put("/requisitions/{requisition_id}")
async def requisition_approval(
    requisition_id: str, 
    req: hireMngr.ManpowerRequestApproval,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            requisition = db.query(Requisition).filter(Requisition.requisition_id == requisition_id)
            if not requisition.first():
                raise HTTPException(status_code = 404, detail = REQUISITION_NOT_FOUND_RESPONSE)
            else:
                if req.request_status == "Approved":
                    requisition.update({
                        "request_status": req.request_status,
                        "reviewed_by": user_data.user_id,
                        "reviewed_at": text('NOW()')
                    })
                elif req.request_status == "Rejected for approval":
                    requisition.update({
                        "request_status": req.request_status,
                        "remarks": req.remarks,
                        "rejected_by": user_data.user_id,
                        "rejected_at": text('NOW()')
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
@router.get("/job-posts", response_model=List[hireMngr.ShowJobPost])
async def get_all_job_posts(
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(JobPost).all()
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
@router.get("/job-posts/{job_post_id}", response_model = hireMngr.ShowJobPost)
async def get_one_job_post(
    job_post_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
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
@router.get("/job-posts/{job_post_id}/applicants", response_model = List[hireMngr.ShowApplicant])
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


# Get All Applicants
@router.get("/applicants", response_model=List[hireMngr.ShowApplicant])
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
@router.get("/applicants/{applicant_id}", response_model=hireMngr.ShowApplicant)
async def get_one_applicant(
    applicant_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            applicant = db.query(Applicant).filter(Applicant.applicant_id == applicant_id).first()
            if not applicant:
                raise HTTPException(status_code=404, detail=APPLICANT_NOT_FOUND_RESPONSE)
            else:
                return applicant
    except Exception as e:
        print(e)


# Get One Interviewee
@router.get("/applicants/{applicant_id}/interviewee-info", response_model = hireMngr.ShowIntervieweeInfo)
async def get_one_applicant(
    applicant_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            applicant = db.query(Applicant).filter(Applicant.applicant_id == applicant_id).first()
            if not applicant:
                raise HTTPException(status_code=404, detail=APPLICANT_NOT_FOUND_RESPONSE)
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
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
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
            ).outerjoin(Interviewee).filter(Interviewee.is_interviewed == None).count()

            interviewed = query.filter(
                Applicant.status == "For interview",
                Applicant.job_post_id == job_post_id
            ).join(Interviewee).filter(Interviewee.is_interviewed == True).count()

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
                Applicant.job_post_id == job_post_id,
                or_(
                    Applicant.status == "Hired",
                    Applicant.status == "Contract signed"
                )
            ).count()

            total_rejected = rejected_from_evalution + rejected_from_screening + rejected_from_intreview
            
            return {
                "total": total,
                "for_evaluation": for_evaluation,
                "for_screening": for_screening,
                "for_interview": for_interview,
                "interviewed": interviewed,
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
@router.get("/job-posts/{job_post_id}/applicants/for-screening", response_model=List[hireMngr.ShowApplicant])
async def evaluated_applicants(
    job_post_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(Applicant).filter(
                Applicant.job_post_id == job_post_id,
                Applicant.status == 'For screening'
            ).all()
    except Exception as e:
        print(e)


# Get All Applicants Per Job (For Interview)
@router.get("/job-posts/{job_post_id}/applicants/for-interview", response_model=List[hireMngr.ShowIntervieweeInfo])
async def evaluated_applicants(
    job_post_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(Applicant).filter(
                Applicant.job_post_id == job_post_id,
                Applicant.status == 'For interview'
            ).outerjoin(Interviewee).filter(Interviewee.is_interviewed == None).all()
    except Exception as e:
        print(e)


# Get All Applicants Per Job (Interviewed)
@router.get("/job-posts/{job_post_id}/applicants/interviewed", response_model=List[hireMngr.ShowIntervieweeInfo])
async def evaluated_applicants(
    job_post_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(Applicant).filter(
                Applicant.job_post_id == job_post_id,
                Applicant.status == 'For interview'
            ).join(Interviewee).filter(Interviewee.is_interviewed == True).all()
    except Exception as e:
        print(e)


# Get All Applicants Per Job (Hired)
@router.get("/job-posts/{job_post_id}/applicants/hired", response_model=List[hireMngr.ShowApplicant])
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
                    Applicant.status == 'Hired',
                    Applicant.status == 'Contract signed'
                )
            ).all()
    except Exception as e:
        print(e)


# Get All Applicants Per Job (Rejected)
@router.get("/job-posts/{job_post_id}/applicants/rejected", response_model=List[hireMngr.ShowApplicant])
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
                    Applicant.status == 'Rejected from screening',
                    Applicant.status == 'Rejected from interview'
                )
            ).all()
    except Exception as e:
        print(e)


# Screen Applicant
@router.put("/applicants/{applicant_id}/screen", status_code=202)
async def update_applicant_status(
    applicant_id: str,
    req: hireMngr.UpdateApplicantStatus,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            applicant = db.query(Applicant).filter(Applicant.applicant_id == applicant_id)
            if not applicant.first():
                raise HTTPException(status_code = 404, detail = APPLICANT_NOT_FOUND_RESPONSE)
            else:
                if req.status == "For interview":
                    applicant.update({
                        "screened_by": user_data.user_id,
                        "screened_at": text('NOW()'),
                        "status": req.status
                    })
                    db.commit()
                    return {"message": "An applicant is screened and ready for interiew"}
                elif req.status == "Rejected from screening":
                    applicant.update({
                        "rejected_by": user_data.user_id,
                        "rejected_at": text('NOW()'),
                        "status": req.status,
                        "remarks": req.remarks
                    })
                    db.commit()
                    return {"message": "An applicant is rejected from screening"}
    except Exception as e:
        print(e)


# Hire Applicant
@router.put("/applicants/{applicant_id}/hire", status_code=202)
async def update_applicant_status(
    applicant_id: str,
    req: hireMngr.UpdateApplicantStatus,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            applicant = db.query(Applicant).filter(Applicant.applicant_id == applicant_id)
            if not applicant.first():
                raise HTTPException(status_code = 404, detail = APPLICANT_NOT_FOUND_RESPONSE)
            else:
                if req.status == "Hired":
                    applicant.update({
                        "hired_by": user_data.user_id,
                        "hired_at": text('NOW()'),
                        "status": req.status
                    })
                    db.commit()
                    return {"message": "An applicant is successfully hired"}
                elif req.status == "Rejected from interview":
                    applicant.update({
                        "rejected_by": user_data.user_id,
                        "rejected_at": text('NOW()'),
                        "status": req.status,
                        "remarks": req.remarks
                    })
                    db.commit()
                    return {"message": "An applicant is rejected from interview"}
    except Exception as e:
        print(e)



# ====================================================================
# INTERVIEW
# ====================================================================


# Interviewee Not Found Response
INTERVIEWEE_NOT_FOUND_RESPONSE = {"message": "Interviewee not found"}

# Interview Question Not Found Response
INTERVIEW_QUESTION_NOT_FOUND_RESPONSE = {"message": "Interview Question not found"}

# Interview Schedule Not Found Response
INTERVIEW_SCHEDULE_NOT_FOUND_RESPONSE = {"message": "Interview Schedule not found"}


# Interview Schedules Per Job
@router.get("/job-posts/{job_post_id}/interview-schedules", response_model=List[hireMngr.ShowInterviewScheduleInfo])
async def get_interview_schedules_per_job_post(
    job_post_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            job_post = db.query(JobPost).filter(JobPost.job_post_id == job_post_id).first()
            if not job_post:
                raise HTTPException(status_code=404, detail=JOB_POST_NOT_FOUND_RESPONSE)
            else:
                interview_schedules = db.query(InterviewSchedule).filter(
                    InterviewSchedule.job_post_id == job_post_id,
                    InterviewSchedule.set_by == user_data.user_id
                ).all()
                return interview_schedules
    except Exception as e:
        print(e)


# Create Interview Question
@router.post("/interview-questions", status_code=201)
async def create_interview_question(
    req: hireMngr.CreateInterviewQuestion,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
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
@router.get("/interview-questions/general", response_model=List[hireMngr.ShowInterviewQuestion])
async def get_all_general_interview_questions(
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            return db.query(InterviewQuestion).filter(InterviewQuestion.type == "General").all()
    except Exception as e:
        print(e)


# Get One Interview Question
@router.get("/interview-questions/{interview_question_id}", response_model=hireMngr.ShowInterviewQuestion)
async def get_one_interview_question(
    interview_question_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            interview_question = db.query(InterviewQuestion).filter(InterviewQuestion.interview_question_id == interview_question_id).first()
            if not interview_question:
                raise HTTPException(status_code=404, detail=INTERVIEW_QUESTION_NOT_FOUND_RESPONSE)
            else:
                return interview_question
    except Exception as e:
        print(e)


# Update Interview Question
@router.put("/interview-question/{interview_question_id}", status_code=202)
async def update_interview_question(
    interview_question_id: str,
    req: hireMngr.UpdateInterviewQuestion,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            interview_question = db.query(InterviewQuestion).filter(InterviewQuestion.interview_question_id == interview_question_id)
            if not interview_question.first():
                raise HTTPException(status_code=404, detail=INTERVIEW_QUESTION_NOT_FOUND_RESPONSE)
            else:
                interview_question.update(req.dict())
                db.commit()
                return {"message": "An interview question is updated successfully"}
    except Exception as e:
        print(e)

# Create Interview Schedule
@router.post("/interview-schedule", status_code=201)
async def create_interview_schedule(
    req: hireMngr.CreateInterviewSchedule,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
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


# Get Interview Schedule and Applicants
@router.get("/interview-schedules/{interview_schedule_id}", response_model=hireMngr.ShowInterviewScheduleInfo)
async def interview_schedules_and_applicants(
    interview_schedule_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            interview_schedule = db.query(InterviewSchedule).filter(InterviewSchedule.interview_schedule_id == interview_schedule_id).first()
            if not interview_schedule:
                raise HTTPException(status_code=404, detail=INTERVIEW_SCHEDULE_NOT_FOUND_RESPONSE)
            else:
                return interview_schedule
    except Exception as e:
        print(e)


# Get Interviewees per Schedule
@router.get("/interview-schedules/{interview_schedule_id}/interviewees", response_model=List[hireMngr.IntervieweeInfo])
async def interviewees_per_schedule(
    interview_schedule_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            interview_schedule = db.query(InterviewSchedule).filter(InterviewSchedule.interview_schedule_id == interview_schedule_id).first()
            if not interview_schedule_id:
                raise HTTPException(status_code=404, detail=INTERVIEW_SCHEDULE_NOT_FOUND_RESPONSE)
            else:
                return interview_schedule.interviewees
    except Exception as e:
        print(e)


# Create General Interview Scores
@router.post("/interview-scores/{interviewee_id}", status_code=201)
async def create_general_interviewee_scores(
    interviewee_id: str,
    req: hireMngr.CreateGeneralIntervieweeScore,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            interviewee = db.query(Interviewee).filter(Interviewee.interviewee_id == interviewee_id).first()
            if not interviewee:
                raise HTTPException(status_code=404, detail=INTERVIEWEE_NOT_FOUND_RESPONSE)
            else:
                new_interview_score = InterviewScore(
                    interviewee_id = interviewee_id,
                    interview_question_id = req.interview_question_id,
                    score = req.score,
                    scored_by = user_data.user_id
                )
                db.add(new_interview_score)
                db.commit()
                db.refresh(new_interview_score)
                return {"message": "General Interview Scores are recorded"}
    except Exception as e:
        print(e)


# Get One Interviewee
@router.get("/interviewee/{interviewee_id}", response_model=hireMngr.IntervieweeInfo)
async def get_one_intervieweee(
    interviewee_id: str,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            interviewee = db.query(Interviewee).filter(Interviewee.interviewee_id == interviewee_id).first()
            if not interviewee:
                raise HTTPException(status_code=404, detail=INTERVIEWEE_NOT_FOUND_RESPONSE)
            else:
                return interviewee
    except Exception as e:
        print(e)


# Update Interviewee Status
@router.put("/interviewee/{interviewee_id}", status_code=202)
async def update_interviewee(
    interviewee_id: str,
    req: hireMngr.UpdateInterviewee,
    db: Session = Depends(get_db),
    user_data: user.UserData = Depends(get_user)
):
    try:
        if(authorized(user_data, AUTHORIZED_USER)):
            interviewee = db.query(Interviewee).filter(Interviewee.interviewee_id == interviewee_id)
            if not interviewee.first():
                raise HTTPException(status_code=404, detail=INTERVIEWEE_NOT_FOUND_RESPONSE)
            else:
                interviewee.update({
                    "is_interviewed": req.is_interviewed,
                    "interviewed_at": req.interviewed_at,
                    "remarks": req.remarks
                })
                db.commit()
                return {"message": "An interviewee record is updated"}
    except Exception as e:
        print(e)