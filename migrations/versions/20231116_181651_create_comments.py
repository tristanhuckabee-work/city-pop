"""create_comments

Revision ID: c1ac515f5bb3
Revises: 036bf750fede
Create Date: 2023-11-16 18:16:51.736451

"""
from alembic import op
import sqlalchemy as sa
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'c1ac515f5bb3'
down_revision = '036bf750fede'
branch_labels = None
depends_on = None


def upgrade():
  op.create_table('comments',
  sa.Column('id', sa.Integer(), nullable=False),
  sa.Column('content', sa.String(length=255), nullable=False),
  sa.Column('song_id', sa.Integer(), nullable=False),
  sa.Column('user_id', sa.Integer(), nullable=False),
  sa.Column('createdAt', sa.DateTime(), nullable=False),
  sa.Column('updatedAt', sa.DateTime(), nullable=False),
  sa.ForeignKeyConstraint(['user_id'], ['users.id']),
  sa.ForeignKeyConstraint(['song_id'], ['songs.id']),
  sa.PrimaryKeyConstraint('id')
  )

  if environment == "production":
    op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")


def downgrade():
  op.drop_table('comments')