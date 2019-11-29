#!/bin/bash
set -eou pipefail

# To prepare a "workshop" branch with incomplete config, checkout master and run this script from the repo root

git pull
git branch -D workshop || true
git checkout -b workshop
git branch --set-upstream-to=origin/workshop

# remove Dockerfile answers
cp -f _workshop/Dockerfile_stripped Dockerfile

# remove cloudbuild.yaml answers
cp -f _workshop/cloudbuild_stripped.yaml cloudbuild.yaml

# break a test
sed -i '' 's/Hello, Dave/Hi, Dave/g' tests/app.test.js

# add a linting error
sed -i '' 's/port=8080;/port=8080;;/g' app.js

# delete this directory
rm -rf _workshop

# push branch
git add .
git commit -am"create workshop branch"
git push -f