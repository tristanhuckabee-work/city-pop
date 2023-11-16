from flask.cli import AppGroup
from .users import seed_users, undo_users

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# `flask seed all`
@seed_commands.command('all')
def seed():
    # Before seeding in production, clear all seeds
    if environment == 'production':
        undo_users()
    # Seed Functions
    seed_users()


# `flask seed undo`
@seed_commands.command('undo')
def undo():
    # Seed Undo Functions
    undo_users()
