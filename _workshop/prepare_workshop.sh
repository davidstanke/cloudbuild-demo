#!/bin/bash
set -eou pipefail

# To prepare a "workshop" branch with incomplete config, checkout master and run this script

# delete workshop branch if it exists
git branch -d workshop &>/dev/null || true
git checkout -b workshop