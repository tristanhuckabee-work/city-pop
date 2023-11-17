from .db import db, environment, SCHEMA, add_prefix_for_prod
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
  
  # following = db.relationship('Follow', back_populates='follower', cascade='all, delete-orphan')
  # followers = db.relationship('Follow', back_populates='followed', cascade='all, delete-orphan')
  
  # following = db.relationship(
  #   'User',
  #   secondary='follows',
  #   primaryjoin=('follows.follower_id' == 'id'),
  #   secondaryjoin=('follows.followed_id' == 'id'),
  # )
  # followers = db.relationship(
  #   'User', 
  #   secondary='follows',
  #   primaryjoin=('follows.followed_id' == 'id'),
  #   secondaryjoin=('follows.follower_id' == 'id'),
  #   back_populates='following'
  # )

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
