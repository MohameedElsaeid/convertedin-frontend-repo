#!/bin/bash

# Specify the subdirectory path where the index.html file is located
subdirectory="dist/apps/redmose/app-assets"

# Specify the root directory path where you want to move the index.html file
rootdirectory="dist/apps/redmose"

mv "${subdirectory}/index.html" "${rootdirectory}"


echo "index.html file has been moved to the root directory."
