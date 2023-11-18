from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Like(db.Model):
  __tablename__ = 'likes'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  isLiked = db.Column(db.Boolean(True), nullable=False)
  song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())
  
  user = db.relationship('User', back_populates="likes")
  song = db.relationship('Song', back_populates="likes")

  def to_dict(self):
    return {
      'id': self.id,
      'isLiked': self.isLiked,
      'updated_at': self.updated_at,
      'user': self.user.to_dict_children()
    }
