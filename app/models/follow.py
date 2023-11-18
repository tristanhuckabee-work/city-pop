from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Follow(db.Model):
  __tablename__ = 'follows'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  followed_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())
  
  follower = db.relationship('User', foreign_keys=[follower_id], back_populates='following')
  followed = db.relationship('User', foreign_keys=[followed_id], back_populates='followers')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'genre': self.genre,
      'image_url': self.image_url,
      'track_url': self.track_url,
      'updated_at': self.updated_at,
      'user': self.user.to_dict_children()
    }
