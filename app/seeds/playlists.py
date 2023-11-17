from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text


def seed_playlists():
  playlist1 = Playlist(name='Get Hype',
    description="let's freaking gooooooo!",
    user_id=1)

  playlist2 = Playlist(name='Chill Out',
    description="zZzZZzZzZzZzZZzZZZZZZZZZZzzz",
    user_id=1)

  db.session.add(playlist1)
  db.session.add(playlist2)

  db.session.commit()


def undo_playlists():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM playlists"))
      
  db.session.commit()