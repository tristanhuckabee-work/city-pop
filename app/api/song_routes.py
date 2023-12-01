from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Comment, Song, db
from app.forms import SongForm, CommentForm

song_routes = Blueprint('songs', __name__)


#!NOT DONE
# GET /songs : Get all Songs
@song_routes.route('/', methods=['GET'])
def get_all_songs():
  """
  GET /api/songs : Get All Songs with or without search-parameters.
  """
  search_params =  []
  
  if len(search_params):
    songs = Song.query.filter(*search_params).all()
    return {'songs': [song.to_dict() for song in songs]}
  songs = Song.query.all()
  return {'songs': [song.to_dict() for song in songs]}

# GET /songs/:song_id : Get Song Details by ID
@song_routes.route('/<int:id>', methods=['GET'])
def get_song(id):
  """
  GET /api/songs/:song_id : Get Song Details by ID
  """
  song = Song.query.get(int(id))
  if (song):
    return song.to_dict()
  else:
    return {'message': 'Song not found'}, 404

# POST /songs : Create a New Song
@song_routes.route('/new', methods=['POST'])
@login_required
def post_new_song():
  """
  POST /songs : Create a New Song
  """
  form = SongForm()
  
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    print('\n\nINSIDE\n\n')
    if 'genre' in form.data:
      genre = form.data['genre']
    else:
      genre = ''
    song = Song(
      name=form.data['name'],
      genre=genre,
      image_url=form.data['image_url'],
      track_url=form.data['track_url'],
      user_id=current_user.id
    )
  
    db.session.add(song)
    db.session.commit()
  
    return song.to_dict(), 201
  print('\n\n\n\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', form.errors);
  return form.errors, 400

# PATCH /songs/:song_id : Update a Song by ID
@song_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_song(id):
  """
  PATCH /songs/:song_id : Update a Song by ID
  """
  form = SongForm()
  
  req = request.json
  song = Song.query.get(id)
  
  if not song:
    return {'message': 'Song not found'}, 404
  elif song.user_id != current_user.id:
    return {'message': 'Song not Owned'}, 403
  
  print(f'\n\n{req}\n\n')
  if 'name' in req:
    song.name=req['name']
  if 'genre' in req:
    song.genre=req['genre']
  if 'image_url' in req:
    song.image_url=req['image_url']
    
  db.session.commit()
  return song.to_dict(), 200

# DELETE /songs/:song_id : Delete a Song by ID
@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song(id):
  """
  DELETE /songs/:song_id : Delete a Song by ID
  """
  song = Song.query.get(int(id))
  if not song:
    return {'message': 'Song not found'}, 404
  elif song.user_id != current_user.id:
    return {'message': 'Song not Owned'}, 403
  else:
    db.session.delete(song)
    db.session.commit()
    return {'message':'Successfully Deleted'}

# COMMENTS ----------------------------------
# POST /songs/:song_id/comments : Add a new Comment to a Song by SongId
@song_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def add_comment_to_song(id):
  """
  POST /songs/:song_id/comments : Add a new Comment to a Song by SongId
  """
  form = CommentForm()
  
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    comment = Comment(
      content=form.data['content'],
      song_id=form.data['song_id'],
      user_id=current_user.id
    )
  
    db.session.add(comment)
    db.session.commit()
  
    return comment.to_dict(), 201
  return form.errors, 400

# GET /songs/:song_id/comments : Get All Comments by SongId
@song_routes.route('/<int:id>/comments', methods=['GET'])
def get_comments_for_song(id):
  """
  GET /songs/:song_id/comments : Get All Comments by SongId
  """
  comments = Comment.query.filter(Comment.song_id == id).all()
  
  return [comment.to_dict() for comment in comments]

# LIKES -------------------------------------