from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Follow, db

follow_routes = Blueprint('follows', __name__)


# COMMENTS ----------------------------------
#! NOT DONE
# GET /follows : Get all Follows
@follow_routes.route('/', methods=['GET'])
def get_all_follows():
  """
  GET /api/follows : Get All Follows
  """
  follows = Follow.query.all()
  return {'follows': [follow.to_dict() for follow in follows]}
