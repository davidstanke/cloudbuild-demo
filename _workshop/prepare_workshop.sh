#!/bin/bash
set -eou pipefail

# To prepare a "workshop" branch with incomplete config, checkout master and run this script from the _workshop folder

# delete workshop branch if it exists
git branch -d workshop &>/dev/null || true
git checkout -b workshop

# remove Dockerfile answers
cp -f Dockerfile_stripped ../Dockerfile

# remove cloudbuild.yaml answers
cp -f cloudbuild_stripped.yaml ../cloudbuild.yaml