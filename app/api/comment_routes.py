from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Comment, db
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)



# DELETE /comments/:comment_id : Delete a Comment by ID
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
  """
  DELETE /comments/:comment_id : Delete a Comment by ID
  """
  comment = Comment.query.get(int(id))
  
  if not comment:
    return {'message': 'Comment Not Found'}, 404     
  elif comment.user_id != current_user.id:
    return {'message': 'Comment Not Ownded'}, 403
  else:
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Successfully Deleted'}