from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
import math


def isImage(form, field):
  accepted = ['png', 'jpg', 'jpeg']
  url = field.data
  file_extension = url.split('.')[-1]
  if file_extension not in accepted:
    raise ValidationError('Image must be png, jpg or jpeg')

def isMusic(form, field):
  accepted = ['mp3', 'mp4', 'wav']
  url = field.data
  file_extension = url.split('.')[-1]
  if file_extension not in accepted:
    raise ValidationError('Track must be mp3, mp4 or wav')


class SongForm(FlaskForm):
  name = StringField('name',
    validators=[DataRequired()])
  genre = StringField('genre',
    validators=[DataRequired()])
  image_url = StringField('image_url',
    validators=[DataRequired(), isImage])
  track_url = StringField('track_url',
    validators=[DataRequired(), isMusic])
  user_id = IntegerField("user_id",
    validators=[DataRequired()])