#!/bin/bash

# Define backup folder and ensure it exists
BACKUP_DIR="backups/"
if [[ ! -d "$BACKUP_DIR" ]]; then
    echo "❌Backup dir $BACKUP_DIR not found."
    exit 1
fi

# Define zip file name with timestamp
ZIP_NAME="personal_site_$(date +%Y-%m-%d_%H-%M-%S).zip"
ZIP_PATH="$BACKUP_DIR/$ZIP_NAME"

echo "Creating backup zip at: $ZIP_PATH"

# Create the zip, excluding build/, node_modules/, .git/, backups/, and other unwanted files
if zip -r "$ZIP_PATH" . -x "build/*" "node_modules/*" "$BACKUP_DIR/*" ".git/*" "*.DS_Store" ".gitignore"; then
  if [[ -f "$ZIP_PATH" ]]; then
    echo "✅ Backup created: $ZIP_PATH"
  else
    echo "❌ Zip command completed, but file not found."
    exit 1
  fi
else
  echo "❌ Failed to create zip file."
  exit 1
fi
