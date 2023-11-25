from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
  user1 = User(username='yung-demo', email='demo@user.io', password='password', image_url="")
  user2 = User(username='city-pop-phantom', email='marnie@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1700889029/marnie_z9wlbg.png")
  user3 = User(username='bigBobby32', email='robertwilliams@user.io', password='password', image_url="")
  user4 = User(username='popkiller', email='popkiller@example.io', password='password')
  user5 = User(username='alice_smith', email='alice.smith@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1700889027/alicesmith_xmhfdy.png")
  user6 = User(username='Jessa Stebbins', email='travis.stebbins@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1700889212/jessastebbins_kmrhz9.jpg")
  user7 = User(username='susan_miller', email='susan.miller@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1700889028/susanmiller_bbjrgp.png")
  user8 = User(username='mike_thompson', email='mike.thompson@user.io', password='password', image_url="")
  user9 = User(username='emily_parker', email='emily.parker@user.io', password='password', image_url="")
  user10 = User(username='alex_turner', email='alex_turner@user.io', password='password', image_url="")
  user11 = User(username='lisa_jackson', email='lisa.jackson@user.io', password='password', image_url="")
  user12 = User(username='cyber milk ~chan', email='cyber.milk@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1700886687/cybermilk_ryth7v.jpg")
  user13 = User(username='psyqui', email='psyqui@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649206028/d1da0154c39d3c2ae8e6fb6f24323c63.800x800x1_ruvyhr.png")
  user14 = User(username='ryan_wilson', email='ryan.wilson@user.io', password='password', image_url="")
  user15 = User(username='sophia_carter', email='sophia.carter@user.io', password='password', image_url="")
  user16 = User(username='peter_anderson', email='peter.anderson@user.io', password='password', image_url="")
  user17 = User(username='nat_brown', email='natalie.brown@user.io', password='password', image_url="")
  user18 = User(username='charlie_king', email='charlie.king@user.io', password='password', image_url="")

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