from app.models import db, Follow, environment, SCHEMA
from sqlalchemy.sql import text


def seed_follows():
  follow1 = Follow(follower_id=1, followed_id=2)
  follow2 = Follow(follower_id=1, followed_id=3)
  follow3 = Follow(follower_id=2, followed_id=1)
  follow4 = Follow(follower_id=2, followed_id=3)
  follow5 = Follow(follower_id=3, followed_id=1)
  follow6 = Follow(follower_id=3, followed_id=2)
  follow7 = Follow(follower_id=1, followed_id=4)
  follow8 = Follow(follower_id=2, followed_id=4)
  follow9 = Follow(follower_id=3, followed_id=4)
  follow10 = Follow(follower_id=4, followed_id=1)
  follow11 = Follow(follower_id=4, followed_id=2)
  follow12 = Follow(follower_id=4, followed_id=3)
  follow13 = Follow(follower_id=1, followed_id=5)
  follow14 = Follow(follower_id=2, followed_id=5)
  follow15 = Follow(follower_id=3, followed_id=5)
  follow16 = Follow(follower_id=4, followed_id=5)
  follow17 = Follow(follower_id=5, followed_id=1)
  follow18 = Follow(follower_id=5, followed_id=2)
  follow19 = Follow(follower_id=5, followed_id=3)
  follow20 = Follow(follower_id=5, followed_id=4)
  follow21 = Follow(follower_id=1, followed_id=6)
  follow22 = Follow(follower_id=2, followed_id=6)
  follow23 = Follow(follower_id=3, followed_id=6)
  follow24 = Follow(follower_id=4, followed_id=6)
  
  db.session.add(follow1)
  db.session.add(follow2)
  db.session.add(follow3)
  db.session.add(follow4)
  db.session.add(follow5)
  db.session.add(follow6)
  db.session.add(follow7)
  db.session.add(follow8)
  db.session.add(follow9)
  db.session.add(follow10)
  db.session.add(follow11)
  db.session.add(follow12)
  db.session.add(follow13)
  db.session.add(follow14)
  db.session.add(follow15)
  db.session.add(follow16)
  db.session.add(follow17)
  db.session.add(follow18)
  db.session.add(follow19)
  db.session.add(follow20)
  db.session.add(follow21)
  db.session.add(follow22)
  db.session.add(follow23)
  db.session.add(follow24)

  db.session.commit()


def undo_follows():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM follows"))

  db.session.commit()