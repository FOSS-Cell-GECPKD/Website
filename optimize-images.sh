#!/bin/bash

# Base directories
SOURCE_BASE="public"
WEBP_BASE="public/webp"

# Create WebP base directory if it doesn't exist
mkdir -p "$WEBP_BASE"

# Function to process images in a directory
process_directory() {
  local dir="$1"

  # Create corresponding WebP directory
  local rel_path="${dir#$SOURCE_BASE/}"
  local webp_dir="$WEBP_BASE/$rel_path"
  mkdir -p "$webp_dir"

  # Process all images in this directory
  for file in "$dir"/*.{png,jpg,jpeg}; do
    # Skip if no matches were found
    [ -f "$file" ] || continue

    filename=$(basename -- "$file")
    name="${filename%.*}"

    echo "Processing: $file"

    # Convert to WebP with 80% quality and save to WebP directory
    magick "$file" -resize "800x800>" -quality 80 "$webp_dir/$name.webp"

    # Also optimize original in place
    magick "$file" -resize "800x800>" -quality 80 "$file"
  done
}

# Find all directories under public/images and process each
find "$SOURCE_BASE/images" -type d | while read -r dir; do
  process_directory "$dir"
done

echo "Image optimization complete!"
