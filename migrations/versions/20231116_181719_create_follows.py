"""create_follows

Revision ID: c4875f46982b
Revises: e4c558208b32
Create Date: 2023-11-16 18:17:19.977750

"""
from alembic import op
import sqlalchemy as sa
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'c4875f46982b'
down_revision = 'e4c558208b32'
branch_labels = None
depends_on = None

def upgrade():
  op.create_table('follows',
  sa.Column('id', sa.Integer(), nullable=False),
  sa.Column('follower_id', sa.Integer(), nullable=False),
  sa.Column('followed_id', sa.Integer(), nullable=False),
  sa.Column('created_at', sa.DateTime(), nullable=False),
  sa.Column('updated_at', sa.DateTime(), nullable=False),
  sa.PrimaryKeyConstraint('id')
  )

  if environment == "production":
    op.execute(f"ALTER TABLE follows SET SCHEMA {SCHEMA};")


def downgrade():
  op.drop_table('follows')