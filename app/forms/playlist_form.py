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


class PlaylistForm(FlaskForm):
  name = StringField('name',
    validators=[DataRequired()])
  description = StringField('description',
    validators=[DataRequired()])
  image_url = StringField('image_url',
    validators=[DataRequired(), isImage])
  user_id = IntegerField("user_id",
    validators=[DataRequired()])