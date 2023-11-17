from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .playlist_song import playlist_songs


class Song(db.Model):
  __tablename__ = 'songs'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False)
  genre = db.Column(db.String(20))
  image_url = db.Column(db.String(255), default="")
  track_url = db.Column(db.String(255), default="")
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())
  
  user = db.relationship('User', back_populates="songs")
  playlists = db.relationship('Playlist', secondary=playlist_songs, back_populates="songs")
  comments = db.relationship('Comment', back_populates="song")
  likes = db.relationship('Like', back_populates="song")

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
