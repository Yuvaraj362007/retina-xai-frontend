#!/usr/bin/env bash
set -e

pip install -r requirements.txt

mkdir -p models

python -c 'import os, urllib.request; url=os.environ["MODEL_URL"]; urllib.request.urlretrieve(url, "models/diabetic_retinopathy_full_model.pth")'

test -s models/diabetic_retinopathy_full_model.pth

echo "Model downloaded successfully."
ls -lh models/diabetic_retinopathy_full_model.pth
