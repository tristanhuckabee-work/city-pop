from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


playlist_songs = db.Table(
    "playlist_songs",
    db.Model.metadata,
    db.Column('playlist_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('playlists.id')), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('songs.id')), primary_key=True),
    db.Column('created_at', db.DateTime, default=datetime.now()),
    db.Column('updated_at', db.DateTime, default=datetime.now())
)

if environment == "production":
    playlist_songs.schema = SCHEMA
