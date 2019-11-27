#!/bin/bash
set -eou pipefail

# To prepare a "workshop" branch with incomplete config, checkout master and run this script from the project root

# delete workshop branch if it exists
git branch -d workshop &>/dev/null || true
git checkout -b workshop

# remove Dockerfile answers
sed -i '' 's/FROM node:12/FROM ???/g' Dockerfile