from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Follow(db.Model):
  __tablename__ = 'follows'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  isFollowed = db.Column(db.Boolean(True), nullable=False)
  follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  followed_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())
  
  follower = db.relationship('User', foreign_keys=[follower_id], back_populates='following')
  followed = db.relationship('User', foreign_keys=[followed_id], back_populates='followers')

  def debug_dict(self):
    return {
      'id': self.id,
      'isFollowed': self.isFollowed,
      'follower': self.follower.to_dict_children(),
      'followed': self.followed.to_dict_children()
    }
    
  def follower_to_dict(self):
    return {
      'id': self.id,
      'isFollowed': self.isFollowed,
      'user': self.follower.to_dict_children()
    }
  
  def followed_to_dict(self):
    return {
      'id': self.id,
      'isFollowed': self.isFollowed,
      'user': self.followed.to_dict_children()
    }
  
  def followed_recs(self):
    return {
      'isFollowed': self.isFollowed,
      'recs': self.followed.to_dict_recs()
    }
