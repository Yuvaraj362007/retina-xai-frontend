#!/usr/bin/env bash

set -e

echo "Installing application dependencies..."
pip install --no-cache-dir -r requirements-render.txt

echo "Installing CPU-only PyTorch..."
pip install --no-cache-dir \
  torch==2.14.0+cpu \
  torchvision==0.29.0+cpu \
  --index-url https://download.pytorch.org/whl/cpu

mkdir -p models

python -c 'import os, urllib.request; url=os.environ["MODEL_URL"]; urllib.request.urlretrieve(url, "models/diabetic_retinopathy_full_model.pth")'

test -s models/diabetic_retinopathy_full_model.pth

echo "Model downloaded successfully."

ls -lh models/diabetic_retinopathy_full_model.pth
