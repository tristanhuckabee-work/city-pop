from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import User, Song, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict_page()

@user_routes.route('/<int:id>/songs')
def user_songs(id):
  """
  GET All Songs by User ID
  """
  songs = Song.query.filter(Song.user_id == id).all()
  print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', songs)
  return {'songs': [song.to_dict() for song in songs]}

@user_routes.route('/<int:id>/edit', methods=['PATCH'])
@login_required
def edit_user(id):
  """
  PATCH /users/:user_id/edit : Edit a User Details by ID
  """
  req = request.json
  user = User.query.get(id)
  
  if not user:
    return {'message': 'User not found'}, 404
  elif user.id != current_user.id:
    return {'message': 'Not current User'}, 403
  
  if 'description' in req:
    user.description=req['description']
  if 'image_url' in req:
    user.image_url=req['image_url']
    
  db.session.commit()
  return user.to_dict(), 200