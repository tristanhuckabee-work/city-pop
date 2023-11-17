"""create_playlist_songs

Revision ID: 036bf750fede
Revises: a892bee55fe9
Create Date: 2023-11-16 18:16:36.142980

"""
from alembic import op
import sqlalchemy as sa
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '036bf750fede'
down_revision = 'a892bee55fe9'
branch_labels = None
depends_on = None

def upgrade():
  op.create_table('playlist_songs',
  sa.Column('id', sa.Integer(), nullable=False),
  sa.Column('playlist_id', sa.Integer(), nullable=False),
  sa.Column('song_id', sa.Integer(), nullable=False),
  sa.Column('createdAt', sa.DateTime(), server_default=sa.func.current_timestamp(), nullable=False),
  sa.Column('updatedAt', sa.DateTime(), server_default=sa.func.current_timestamp(), nullable=False),
  sa.ForeignKeyConstraint(['playlist_id'], ['playlists.id']),
  sa.ForeignKeyConstraint(['song_id'], ['songs.id']),
  sa.PrimaryKeyConstraint('id')
  )

  if environment == "production":
    op.execute(f"ALTER TABLE playlist_songs SET SCHEMA {SCHEMA};")


def downgrade():
  op.drop_table('playlist_songs')