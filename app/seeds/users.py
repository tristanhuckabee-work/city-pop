from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
  demo = User(username='yung-demo', email='demo@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701235494/pexels-jacek-jan-skorupski_ljira3.jpg")
  user2 = User(username='city-pop-phantom', email='marnie@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1700889029/marnie_z9wlbg.png")
  user3 = User(username='bigBobby32', email='robertwilliams@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701235496/pexels-vadim-birsan_ahyinz.jpg")
  tomokoaran = User(username='Tomoko Aran', email='tomoko.aran@example.io', password='password')
  maxcoveri = User(username='Max Coveri', email='max.coveri@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701235495/pexels-stacey-koenitz-r_ovrq4z.jpg")
  stebbins = User(username='Jessa Stebbins', email='travis.stebbins@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1700889212/jessastebbins_kmrhz9.jpg")
  backon = User(username='BACK-ON', email='backon@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701069090/back-on_vn62zx.png")
  rendezvous = User(username='Rendez Vous', email='rendezvous@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701069070/rv-band_ukddzk.webp")
  user9 = User(username='emily_parker', email='emily.parker@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701235496/pexels-lanyjade-mondou_mg6ycp.jpg")
  user10 = User(username='alex_turner', email='alex_turner@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701235494/pexels-suzy-hazelwood_rfnl2j.jpg")
  user11 = User(username='lisa_jackson', email='lisa.jackson@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1700889028/susanmiller_bbjrgp.png")
  cybermilk = User(username='cyber milk ~chan', email='cyber.milk@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1700886687/cybermilk_ryth7v.jpg")
  psyqui = User(username='psyqui', email='psyqui@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649206028/d1da0154c39d3c2ae8e6fb6f24323c63.800x800x1_ruvyhr.png")
  user14 = User(username='ryan_wilson', email='ryan.wilson@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701235493/pexels-hasan-zahra_gacvtj.jpg")
  user15 = User(username='sophia_carter', email='sophia.carter@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701235644/pexels-mark-neal_ufgsfj.jpg")
  user16 = User(username='BAND-MAID', email='band-maid@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701069070/band-maid-band_bita1f.jpg")
  user17 = User(username='nat_brown', email='natalie.brown@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701235497/pexels-elijah-o_donnell_n1odvl.jpg")
  user18 = User(username='charlie_king', email='charlie.king@user.io', password='password', image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701235645/pexels-ovan_qc3lmr.jpg")

  db.session.add(demo)
  db.session.add(user2)
  db.session.add(user3)
  db.session.add(tomokoaran)
  db.session.add(maxcoveri)
  db.session.add(stebbins)
  db.session.add(backon)
  db.session.add(rendezvous)
  db.session.add(user9)
  db.session.add(user10)
  db.session.add(user11)
  db.session.add(cybermilk)
  db.session.add(psyqui)
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