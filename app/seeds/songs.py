from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


def seed_songs():
  no_guardian_angel = Song(name='No Guardian Angel', genre='eurobeat',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1649191665/No_Guardian_Angel_tqibdv.mp4",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649205648/ab67616d0000b27397974872e84444385ffd01ea_dkmafg.jpg",
    user_id=6)
  midnight_pretenders = Song(name='Midnight Pretenders', genre='citypop',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1649191684/Midnight_Pretenders_qilu0r.mp4",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649372063/R-14508181-1575973209-2949_wn2lpr.jpg",
    user_id=4)
  running_in_the_90s = Song(name="Running in the 90's", genre='eurobeat',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1649191686/Running_In_The_90_s_srqvic.mp4",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649372099/I_Don_27t_Wanna_Break_Your_Sweet_Heart_Single_ssi237.webp",
    user_id=5)
  uninstall_love = Song(name='Uninstall Love', genre='eurobeat',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1649191637/Uninstall_Love_trqnhf.mp4",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1652200768/7084145293_e250170668_eoicuh.jpg",
    user_id=6)
  duvet_boa = Song(name='Duvet - Boa', genre='indie',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1702024034/duvet-boa_sm0du0.mp3",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1702024027/boa_okjpr6.jpg",
    user_id=1)
  condensed_milk = Song(name='Condensed Milk', genre='jpop',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1700886686/condensed-milk_qcq5l9.mp3",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1700886687/cybermilk_ryth7v.jpg",
    user_id=12)
  euroshima = Song(name='Euroshima', genre='postpunk',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1701069085/euroshima-rv_zs102e.mp3",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701069070/rendez-vous-song_dhna6u.jpg",
    user_id=8)
  dont_you_want_me = Song(name="Don't You Want Me", genre='jpop',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1700886953/dont-you-want-me_tjwlgq.mp3",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649206028/d1da0154c39d3c2ae8e6fb6f24323c63.800x800x1_ruvyhr.png",
    user_id=13)
  iclwy = Song(name="I Can't Live Without You", genre='jrock',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1701069092/i-cant-live-without-you-bm_ar0phk.mp3",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701069070/world-domination-bm_y7cih0.jpg",
    user_id=16)
  hysteric_night_girl = Song(name='Hysteric Night Girl', genre='jpop',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1700886960/hysteric-night-girl_ql1r5q.mp3",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649206041/ab67616d0000b2731a8bba168d85553d9b2d47a9_ezchvc.jpg",
    user_id=13)
  chain = Song(name='Chain', genre='jrock',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1701069089/chain-backon_pjzetb.mp3",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701069070/back-on-chain_chd4vu.jpg",
    user_id=7)
  demian = Song(name='Demian', genre='postpunk',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1701069092/demian-rv_eawsuk.mp3",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701069070/rendez-vous-song_dhna6u.jpg",
    user_id=8)
  fate = Song(name='Fate', genre='jrock',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1701069091/fate-bm_oc0wey.mp3",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701069070/world-domination-bm_y7cih0.jpg",
    user_id=16)
  night_of_fire = Song(name='Night of Fire - Niko', genre='eurobeat',
    track_url="https://res.cloudinary.com/dzsgront4/video/upload/v1649191683/Night_of_Fire_sb8phi.mp4",
    image_url="https://res.cloudinary.com/dzsgront4/image/upload/v1649205648/ab67616d0000b27397974872e84444385ffd01ea_dkmafg.jpg",
    user_id=2)

  db.session.add(no_guardian_angel)
  db.session.add(midnight_pretenders)
  db.session.add(running_in_the_90s)
  db.session.add(uninstall_love)
  db.session.add(condensed_milk)
  db.session.add(euroshima)
  db.session.add(dont_you_want_me)
  db.session.add(duvet_boa)
  db.session.add(iclwy)
  db.session.add(hysteric_night_girl)
  db.session.add(chain)
  db.session.add(demian)
  db.session.add(fate)
  db.session.add(night_of_fire)

  db.session.commit()


def undo_songs():
  if environment == "production":
    db.session.execute(
      f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM songs"))

  db.session.commit()
