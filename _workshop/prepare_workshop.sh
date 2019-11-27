#!/bin/bash
set -eou pipefail

# To prepare a "workshop" branch with incomplete config, checkout master and run this script from the project root

# delete workshop branch if it exists
git branch -d workshop &>/dev/null || true
git checkout -b workshop

# remove Dockerfile answers
sed -i '' 's/node:12-alpine/???/g' Dockerfile
sed -i '' 's/npm install --only=production/???/g' Dockerfile
sed -i '' 's/npm start/???/g' Dockerfile
sed -i '' 's/8080/???/g' Dockerfile