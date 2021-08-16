# Import Packages
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from database import get_db
import schemas, models


# Router Instance
router = APIRouter(
    prefix = "/api/blogs",
    tags = ["Blogs"]
)


# NO_BLOG_RESPONSE = {"msg": "Blog not found"}


# # Create Blog
# @router.post('', status_code = 201)
# def create_blog(req: schemas.Blog, db: Session = Depends(get_db)):
#     new_blog = models.Blog(title = req.title, content = req.content, user_id = req.user_id)
#     db.add(new_blog)
#     db.commit()
#     db.refresh(new_blog)
#     return {
#         "data": new_blog,
#         "msg": "A new blog has been added"
#     }


# # Get All Blogs
# @router.get('', status_code = 200)
# def get_all_blogs(db: Session = Depends(get_db)):
#     all_blogs = db.query(models.Blog).all()
#     return {
#         "data": all_blogs,
#         "msg": "All blogs has been retrieved"
#     }


# # Get One Blog
# @router.get('/{id}', status_code = 200)
# def get_one_blog(id, db: Session = Depends(get_db)):
#     blog = db.query(models.Blog).filter(models.Blog.blog_id == id)
#     if not blog.first():
#         raise HTTPException(status_code = 404, detail = NO_BLOG_RESPONSE)
#     else:
#         return {
#             "data": blog.first(),
#             "msg": "A blog has been identified"
#         }


# # Update Blog
# @router.put('/{id}', status_code = 202)
# def update_blog(id, req: schemas.Blog, db: Session = Depends(get_db)):
#     blog = db.query(models.Blog).filter(models.Blog.blog_id == id)
#     if not blog.first():
#         raise HTTPException(status_code = 404, detail = NO_BLOG_RESPONSE)
#     else:
#         blog.update({
#             "title": req.title,
#             "content": req.content,
#             "user_id": req.user_id
#         })
#         db.commit()
#         return {"msg": "A blog has been updated"}


# # Delete Blog
# @router.delete('/{id}', status_code = 204)
# def delete_blog(id, db: Session = Depends(get_db)):
#     blog = db.query(models.Blog).filter(models.Blog.blog_id == id)
#     if not blog.first():
#         raise HTTPException(status_code = 404, detail = NO_BLOG_RESPONSE)
#     else:
#         blog.delete(synchronize_session = False)
#         db.commit()
#         return {"msg": "A blog has been deleted"}