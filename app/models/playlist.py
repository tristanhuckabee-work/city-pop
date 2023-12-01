from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .playlist_song import playlist_songs


class Playlist(db.Model):
  __tablename__ = 'playlists'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False)
  description = db.Column(db.String(255))
  image_url = db.Column(db.String(255), default="")
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())
  
  user = db.relationship('User', back_populates="playlists")
  songs = db.relationship('Song', secondary=playlist_songs, back_populates="playlists")


  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description,
      'image_url': self.image_url,
      'updated_at': self.updated_at,
      'user': self.user.to_dict_children(),
    }
  def simplified_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description,
      'image_url': self.image_url,
      'song_cnt': len([song for song in self.songs])
    }
  def page_to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description,
      'image_url': self.image_url,
      'updated_at': self.updated_at,
      'user': self.user.to_dict_children(),
      'songs': [song.to_dict() for song in self.songs]
    }