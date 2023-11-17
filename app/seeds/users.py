from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
  user1 = User(username='yung-demo', email='demo@user.io', password='password')
  user2 = User(username='city-pop-phantom', email='marnie@user.io', password='password')
  user3 = User(username='bigBobby32', email='robertwilliams@user.io', password='password')
  user4 = User(username='popkiller', email='popkiller@example.io', password='password')
  user5 = User(username='alice_smith', email='alice.smith@user.io', password='password')
  user6 = User(username='Travis Stebbins', email='travis.stebbins@user.io', password='password')
  user7 = User(username='susan_miller', email='susan.miller@user.io', password='password')
  user8 = User(username='mike_thompson', email='mike.thompson@user.io', password='password')
  user9 = User(username='emily_parker', email='emily.parker@user.io', password='password')
  user10 = User(username='alex_turner', email='alex_turner@user.io', password='password')
  user11 = User(username='lisa_jackson', email='lisa.jackson@user.io', password='password')
  user12 = User(username='david_smith', email='david.smith@user.io', password='password')
  user13 = User(username='jessica_white', email='jessica.white@user.io', password='password')
  user14 = User(username='ryan_wilson', email='ryan.wilson@user.io', password='password')
  user15 = User(username='sophia_carter', email='sophia.carter@user.io', password='password')
  user16 = User(username='peter_anderson', email='peter.anderson@user.io', password='password')
  user17 = User(username='nat_brown', email='natalie.brown@user.io', password='password')
  user18 = User(username='charlie_king', email='charlie.king@user.io', password='password')

  db.session.add(user1)
  db.session.add(user2)
  db.session.add(user3)
  db.session.add(user4)
  db.session.add(user5)
  db.session.add(user6)
  db.session.add(user7)
  db.session.add(user8)
  db.session.add(user9)
  db.session.add(user10)
  db.session.add(user11)
  db.session.add(user12)
  db.session.add(user13)
  db.session.add(user14)
  db.session.add(user15)
  db.session.add(user16)
  db.session.add(user17)
  db.session.add(user18)

  db.session.commit()


def undo_users():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM users"))
      
  db.session.commit()