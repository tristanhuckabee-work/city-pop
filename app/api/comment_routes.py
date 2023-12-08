from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Comment, db
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)



@comment_routes.route('/<int:id>/edit', methods=['PATCH'])
@login_required
def edit_comment(id):
  """
  PATCH /comments/:comment_id/edit : Edit a Comment by ID
  """
  req = request.json
  comment = Comment.query.get(id)
  
  if not comment:
    return {'message': 'Comment not found'}, 404
  elif comment.user_id != current_user.id:
    return {'message': 'Comment not Owned'}, 403

  if 'content' in req:
    comment.content=req['content']
    
  db.session.commit()
  return comment.to_dict(), 200

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
  """
  DELETE /comments/:comment_id : Delete a Comment by ID
  """
  comment = Comment.query.get(int(id))
  
  if not comment:
    return {'error': 'Comment Not Found'}, 404     
  elif comment.user_id != current_user.id:
    return {'error': 'Comment Not Ownded'}, 403
  else:
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Successfully Deleted'}