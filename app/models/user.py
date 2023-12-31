from .db import db, environment, SCHEMA, add_prefix_for_prod
from .follow import Follow
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(40), nullable=False, unique=True)
  email = db.Column(db.String(255), nullable=False, unique=True)
  hashed_password = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(255))
  image_url = db.Column(db.String(255), default="")
  
  songs = db.relationship('Song', back_populates='user', cascade='all, delete-orphan')
  playlists = db.relationship('Playlist', back_populates='user', cascade='all, delete-orphan')
  likes = db.relationship('Like', back_populates='user', cascade='all, delete-orphan')
  comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')
  
  following = db.relationship('Follow', foreign_keys=[Follow.follower_id], back_populates='follower', cascade='all, delete-orphan')
  followers = db.relationship('Follow', foreign_keys=[Follow.followed_id], back_populates='followed', cascade='all, delete-orphan')

  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)

  def to_dict(self):
    return {
      'id': self.id,
      'username': self.username,
      'email': self.email,
      'description': self.description,
      'image_url': self.image_url
    }
    
  # for use in children to_dicts
  def to_dict_children(self):
    return {
      'id': self.id,
      'username': self.username,
      'image_url': self.image_url
    }
  # for use in getting recommended follows
  def to_dict_recs(self):
    return {
      'user': self.to_dict_children(),
      'followers': [user.follower_to_dict() for user in self.followers],
      'following': [user.followed_to_dict() for user in self.following]
    }
  # for userPage
  def to_dict_page(self):
    return {
      'user': self.to_dict(),
      'ers_cnt': len([user.follower_to_dict() for user in self.followers]),
      'ing_cnt': len([user.followed_to_dict() for user in self.following]),
      'songs': [song.to_dict() for song in self.songs],
      'playlists': [playlist.simplified_dict() for playlist in self.playlists]
    }