from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class CommentForm(FlaskForm):
  content = StringField('content',
    validators=[DataRequired()])
  song_id = IntegerField("song_id",
    validators=[DataRequired()])
  user_id = IntegerField("user_id",
    validators=[DataRequired()])