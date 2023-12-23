from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Like, db
# from app.forms import SongForm, CommentForm

like_routes = Blueprint('likes', __name__)


@like_routes.route('/', methods=['GET'])
def get_user_likes():
  """
  GET /api/likes : Get All Likes by a User
  """
  likes = Like.query.filter(Like.user_id == current_user.id).all()

  return {'likes': [like.to_dict() for like in likes]}

@like_routes.route('/new', methods=['POST'])
@login_required
def add_new_like():
  """
  POST /api/likes/new : Create a new Like for a Song
  """
  req = request.json
  like = Like(
    user_id=req['user_id'],
    song_id=req['song_id'],
    isLiked=True
  )
  
  db.session.add(like)
  db.session.commit()
  return like.to_dict(), 201

@like_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_like(id):
  """
  PATCH /api/likes/:likeId : Like or Unlike an existing Like
  """
  like = Like.query.get(id)
  
  if not like:
    return {'message': 'Like not Found'}, 404
  elif like.user_id != current_user.id:
    return {'message': 'Like not Owned'}, 403
  
  like.isLiked = not like.isLiked
  
  db.session.commit()
  return like.to_dict(), 200