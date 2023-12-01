from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Playlist, db
from app.forms import PlaylistForm

playlist_routes = Blueprint('playlists', __name__)


# GET /playlists : Get all Playlists in Search

@playlist_routes.route('/<int:id>', methods=['GET'])
def get_playlist(id):
  """
  GET /playlists/:id : Get Playlist Details by ID
  """
  playlist = Playlist.query.get(int(id))
  if playlist:
    return playlist.page_to_dict()
  else:
    return {'message': 'Playlist Not Found'}, 404

# POST
# PATCH
# DELETE