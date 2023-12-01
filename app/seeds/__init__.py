from flask.cli import AppGroup
from .users import seed_users, undo_users
from .songs import seed_songs, undo_songs
from .playlists import seed_playlists, undo_playlists
from .playlist_songs import seed_playlist_songs, undo_playlist_songs
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .follows import seed_follows, undo_follows

from app.models.db import db, environment, SCHEMA

# `flask seed --help`
seed_commands = AppGroup('seed')


# `flask seed all`
@seed_commands.command('all')
def seed():
    # Before seeding in production, clear all seeds
    if environment == 'production':
        undo_users()
        undo_songs()
        undo_playlists()
        undo_playlist_songs()
        undo_comments()
        undo_likes()
        undo_follows()
    # Seed Functions
    seed_users()
    seed_songs()
    seed_playlists()
    seed_playlist_songs()
    seed_comments()
    seed_likes()
    seed_follows()


# `flask seed undo`
@seed_commands.command('undo')
def undo():
    # Seed Undo Functions
    undo_users()
    undo_songs()
    undo_playlists()
    undo_playlist_songs()
    undo_comments()
    undo_likes()
    undo_follows()
