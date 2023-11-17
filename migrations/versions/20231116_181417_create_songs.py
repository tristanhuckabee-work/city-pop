"""create_songs

Revision ID: b26d99cbfec8
Revises: ffdc0a98111c
Create Date: 2023-11-16 18:14:17.860980

"""
from alembic import op
import sqlalchemy as sa
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'b26d99cbfec8'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
  op.create_table('songs',
  sa.Column('id', sa.Integer(), nullable=False),
  sa.Column('name', sa.String(length=40), nullable=False),
  sa.Column('genre', sa.String(length=20)),
  sa.Column('image_url', sa.String(length=255), nullable=False),
  sa.Column('track_url', sa.String(length=255), nullable=False),
  sa.Column('user_id', sa.Integer(), nullable=False),
  sa.Column('createdAt', sa.DateTime(), nullable=False),
  sa.Column('updatedAt', sa.DateTime(), nullable=False),
  sa.ForeignKeyConstraint(['user_id'], ['users.id']),
  sa.PrimaryKeyConstraint('id')
  )

  if environment == "production":
    op.execute(f"ALTER TABLE songs SET SCHEMA {SCHEMA};")


def downgrade():
  op.drop_table('songs')