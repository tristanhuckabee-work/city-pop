"""create_playlists

Revision ID: a892bee55fe9
Revises: b26d99cbfec8
Create Date: 2023-11-16 18:15:03.721511

"""
from alembic import op
import sqlalchemy as sa
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'a892bee55fe9'
down_revision = 'b26d99cbfec8'
branch_labels = None
depends_on = None


def upgrade():
  op.create_table('playlists',
  sa.Column('id', sa.Integer(), nullable=False),
  sa.Column('name', sa.String(length=40), nullable=False),
  sa.Column('description', sa.String(length=255)),
  sa.Column('image_url', sa.String(length=255)),
  sa.Column('user_id', sa.Integer(), nullable=False),
  sa.Column('createdAt', sa.DateTime(), nullable=False),
  sa.Column('updatedAt', sa.DateTime(), nullable=False),
  sa.ForeignKeyConstraint(['user_id'], ['users.id']),
  sa.PrimaryKeyConstraint('id')
  )

  if environment == "production":
    op.execute(f"ALTER TABLE playlists SET SCHEMA {SCHEMA};")


def downgrade():
  op.drop_table('playlists')