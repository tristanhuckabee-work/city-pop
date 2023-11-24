import os
import json
import cloudinary
import cloudinary.api
import cloudinary.uploader
# from .cloudinary_env import cloud_name, api_key, api_secret
# from dotenv import load_dotenv
# load_dotenv()
config = cloudinary.config(
  # cloud_name, api_key, api_secret,
  secure=True
)


def upload_image(file):
  """
  Upload an Image and Get it's URL
  """
  # cloudinary.uploader.upload(file, **options)
  # cloudinary.uploader.upload(file,
  #   use_filename = True,
  #   unique_filename = False
  # )
  test = cloudinary.uploader.upload("https://cloudinary-devs.github.io/cld-docs-assets/assets/images/butterfly.jpeg",
    public_id="quickstart_butterfly",
    unique_filename=False,
    overwrite=True
  )

  # Build the URL for the image and save it in the variable 'srcURL'
  # srcURL = cloudinary.CloudinaryImage("quickstart_butterfly").build_url()

  # Log the image URL to the console.
  # Copy this URL in a browser tab to generate the image on the fly.
  print("****2. Upload an image****\nDelivery URL: ", test, "\n")
upload_image()