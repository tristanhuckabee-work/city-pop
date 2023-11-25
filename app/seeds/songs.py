from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


def seed_songs():
  song1 = Song(name='Plastic Love - Mariya Takeuchi', genre='citypop',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1649191683/Night_of_Fire_sb8phi.mp4",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649205347/8b8_hocfp0.jpg",
    user_id=1)
  song2 = Song(name='Night of Fire - Niko', genre='eurobeat',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1649191683/Night_of_Fire_sb8phi.mp4",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649205648/ab67616d0000b27397974872e84444385ffd01ea_dkmafg.jpg",
    user_id=2)
  song3 = Song(name='No Guardian Angel', genre='eurobeat',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1649191665/No_Guardian_Angel_tqibdv.mp4",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649205648/ab67616d0000b27397974872e84444385ffd01ea_dkmafg.jpg",
    user_id=6)
  song4 = Song(name='Midnight Pretenders - Tomoko Aran', genre='citypop',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1649191684/Midnight_Pretenders_qilu0r.mp4",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649372063/R-14508181-1575973209-2949_wn2lpr.jpg",
    user_id=4)
  song5 = Song(name="Running in the 90's - Max Coveri", genre='eurobeat',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1649191686/Running_In_The_90_s_srqvic.mp4",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649372099/I_Don_27t_Wanna_Break_Your_Sweet_Heart_Single_ssi237.webp",
    user_id=5)
  song6 = Song(name='Uninstall Love', genre='eurobeat',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1649191637/Uninstall_Love_trqnhf.mp4",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1652200768/7084145293_e250170668_eoicuh.jpg",
    user_id=6)
  song7 = Song(name='Condensed Milk', genre='jpop',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1700886686/condensed-milk_qcq5l9.mp3",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1700886687/cybermilk_ryth7v.jpg",
    user_id=12)
  song8 = Song(name="Don't You Want Me", genre='jpop',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1700886953/dont-you-want-me_tjwlgq.mp3",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649206028/d1da0154c39d3c2ae8e6fb6f24323c63.800x800x1_ruvyhr.png",
    user_id=13)
  song9 = Song(name='Hysteric Night Girl', genre='jpop',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1700886960/hysteric-night-girl_ql1r5q.mp3",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649206041/ab67616d0000b2731a8bba168d85553d9b2d47a9_ezchvc.jpg",
    user_id=13)

  db.session.add(song1)
  db.session.add(song2)
  db.session.add(song3)
  db.session.add(song4)
  db.session.add(song5)
  db.session.add(song6)
  db.session.add(song7)
  db.session.add(song8)
  db.session.add(song9)

  db.session.commit()


def undo_songs():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM songs"))
      
  db.session.commit()