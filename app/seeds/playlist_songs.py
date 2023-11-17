from app.models import db, playlist_songs, environment, SCHEMA
from sqlalchemy.sql import text


def seed_playlist_songs():
  playlist_song1 = playlist_songs(playlist_id=1, song_id=2)
  playlist_song2 = playlist_songs(playlist_id=1, song_id=3)
  playlist_song3 = playlist_songs(playlist_id=2, song_id=4)
  playlist_song4 = playlist_songs(playlist_id=1, song_id=5)
  playlist_song5 = playlist_songs(playlist_id=1, song_id=6)
  
  db.session.add(playlist_song1)
  db.session.add(playlist_song2)
  db.session.add(playlist_song3)
  db.session.add(playlist_song4)
  db.session.add(playlist_song5)

  db.session.commit()


def undo_playlist_songs():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM playlist_songs"))
      
  db.session.commit()