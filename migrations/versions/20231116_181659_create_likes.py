"""create_likes

Revision ID: e4c558208b32
Revises: c1ac515f5bb3
Create Date: 2023-11-16 18:16:59.001401

"""
from alembic import op
import sqlalchemy as sa
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'e4c558208b32'
down_revision = 'c1ac515f5bb3'
branch_labels = None
depends_on = None

def upgrade():
  op.create_table('likes',
  sa.Column('id', sa.Integer(), nullable=False),
  sa.Column('isLiked', sa.Boolean(True), nullable=False),
  sa.Column('song_id', sa.Integer(), nullable=False),
  sa.Column('user_id', sa.Integer(), nullable=False),
  sa.Column('createdAt', sa.DateTime(), nullable=False),
  sa.Column('updatedAt', sa.DateTime(), nullable=False),
  sa.ForeignKeyConstraint(['user_id'], ['users.id']),
  sa.ForeignKeyConstraint(['song_id'], ['songs.id']),
  sa.PrimaryKeyConstraint('id')
  )

  if environment == "production":
    op.execute(f"ALTER TABLE likes SET SCHEMA {SCHEMA};")


def downgrade():
  op.drop_table('likes')