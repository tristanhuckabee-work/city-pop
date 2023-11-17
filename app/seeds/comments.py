from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comments():
  comment1 = Comment(content="💕💕💕", song_id=1, user_id=2)
  comment2 = Comment(content="wow the nostalgia!!!", song_id=1, user_id=13)
  comment3 = Comment(content="Wooooo!", song_id=6, user_id=12)
  comment4 = Comment(content="I love it!", song_id=6, user_id=17)
  comment5 = Comment(content="So Good! <3", song_id=5, user_id=17)
  comment6 = Comment(content="Man I love this song...", song_id=5, user_id=18)
  comment7 = Comment(content="*drifting intesifies*", song_id=5, user_id=14)
  comment8 = Comment(content="<3 <3", song_id=4, user_id=14)
  comment9 = Comment(content="MiDnIgHt pReTeNdErS!!!!!", song_id=4, user_id=6)
  comment10 = Comment(content="I like this one.", song_id=4, user_id=5)
  comment11 = Comment(content="that bass tho", song_id=3, user_id=5)
  comment12 = Comment(content="gotta love the bass", song_id=3, user_id=7)
  comment13 = Comment(content="gotta get that...", song_id=3, user_id=8)
  comment14 = Comment(content="why're people so obsessed with fish in here?", song_id=3, user_id=9)
  comment15 = Comment(content="gotta- gotta-- I GOTTA GO FAST", song_id=2, user_id=9)
  comment16 = Comment(content="zoom zoom", song_id=2, user_id=10)
  comment17 = Comment(content="I can feel the rhythm in my soul!", song_id=2, user_id=11)
  comment18 = Comment(content="yay, I love it", song_id=2, user_id=12)
  comment19 = Comment(content="wahooo", song_id=2, user_id=13)
  comment20 = Comment(content="best song whole city", song_id=2, user_id=1)

  db.session.add(comment1)
  db.session.add(comment2)
  db.session.add(comment3)
  db.session.add(comment4)
  db.session.add(comment5)
  db.session.add(comment6)
  db.session.add(comment7)
  db.session.add(comment8)
  db.session.add(comment9)
  db.session.add(comment10)
  db.session.add(comment11)
  db.session.add(comment12)
  db.session.add(comment13)
  db.session.add(comment14)
  db.session.add(comment15)
  db.session.add(comment16)
  db.session.add(comment17)
  db.session.add(comment18)
  db.session.add(comment19)
  db.session.add(comment20)

  db.session.commit()


def undo_comments():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM comments"))
      
  db.session.commit()