from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Follow, db

follow_routes = Blueprint('follows', __name__)


# #! FOR TESTING
# @follow_routes.route('/', methods=['GET'])
# def get_all_follows():
#   """
#   Get All Follows
#   """
#   follows = Follow.query.all()
#   return {'follows': [follow.to_dict() for follow in follows]}


@follow_routes.route('/following', methods=['GET'])
def get_all_following():
  """
  Get All Follows where CurrentUser is Follower
  """
  findMe = Follow.follower_id == current_user.id
  isFollowed = Follow.isFollowed == True
  
  follows = Follow.query.filter(findMe, isFollowed).all()
  return {'follows': [follow.followed_to_dict() for follow in follows]}


@follow_routes.route('/followers', methods=['GET'])
def get_all_followers():
  """
  Get All Follows where CurrentUser is Followed
  """
  findMe = Follow.followed_id == current_user.id
  isFollowed = Follow.isFollowed == True
  
  follows = Follow.query.filter(findMe, isFollowed).all()
  return {'follows': [follow.follower_to_dict() for follow in follows]}


@follow_routes.route('/recommended', methods=['GET'])
def get_recs():
  """
  Get Recommended Users based on current Follows
  """
  findMe = Follow.follower_id == current_user.id
  isFollowed = Follow.isFollowed == True
  
  follows = Follow.query.filter(findMe, isFollowed).all()
  
  flat_recs = []
  for rec_set in follows:
    this_set = rec_set.followed_recs()['recs']['following']
    diff = [user['user'] for user in this_set if user['user'] not in flat_recs and user['user']['id'] != current_user.id]
    flat_recs = [*diff, *flat_recs]
  follows = [user['user'] for user in [follow.followed_to_dict() for follow in follows]]
  difference = [user for user in flat_recs if user not in follows]
  
  return {'recs': difference}
