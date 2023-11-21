from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Follow, User, db

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
  
  follows = Follow.query.filter(findMe, isFollowed).limit(5).all()

  # Get Recommended Users from Followed Users
  ## Don't include Users currently Followed
  flat_recs = []
  for rec_set in follows:
    this_set = rec_set.followed_recs()['recs']
    diff = [user['user'] for user in this_set if user['user'] not in flat_recs and user['user']['id'] != current_user.id]
    flat_recs = [*diff, *flat_recs]
  follows = [user['user'] for user in [follow.followed_to_dict() for follow in follows]]
  difference = [user for user in flat_recs if user not in follows]
  
  # If User is following all Traditional Recs
  ## Get the 5 Users with the Most Followers and Rec Them
  if difference == []:
    limit = len(follows)+6 
    top = User.query.filter().limit(limit).all()
    # top_five = [user.to_dict_recs()['user'] for user in top if user.to_dict_recs()['user'] not in follows and user.to_dict_recs()['user']['id'] != current_user.id]
    top_five = []
    for user in top:
      curr = user.to_dict_recs()['user']
      
      is_not_followed = curr not in follows
      is_not_me = curr['id'] != current_user.id
      
      if is_not_followed and is_not_me:
        top_five.append(curr)

    return {'recs': top_five}
  
  return {'recs': difference}
