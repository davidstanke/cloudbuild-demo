#!/bin/bash
set -eo pipefail

# This script will [optionally] build and deploy the application to kubernetes. It uses
# whatever kubectl is already on the machine, with whatever configuration is already
# applied in kubectl.

GCP_PROJECT_ID="project_undefined"

# ============ BEGIN: parse flags ================

OPTS=`getopt -o vhns: --long verbose,dry-run,help,stack-size: -n 'parse-options' -- "$@"`
if [ $? != 0 ] ; then echo "Failed parsing options." >&2 ; exit 1 ; fi

SKIP_BUILD="false"

while true; do
  case "$1" in
    -s | --skip-build ) SKIP_BUILD="true"; shift ;;
    -- ) shift; break ;;
    * ) break ;;
  esac
done

# ============ END: parse flags ================

# attempt to read GCP project ID from gcloud config
if hash gcloud 2>/dev/null; then
    GCP_PROJECT_ID=$(gcloud config list --format 'value(core.project)')
fi

echo "Using GCP Project ID $GCP_PROJECT_ID"

if [ "$SKIP_BUILD" = "false" ] ; then
    docker build -t \
        gcr.io/$GCP_PROJECT_ID/cookieshop/shippingcalc:local \
        --build-arg PORT=8080 \
        ../src/shippingcalc
    docker build -t \
        gcr.io/$GCP_PROJECT_ID/cookieshop/web:local \
        --build-arg PORT=8080 \
        ../src/web
fi

# reinitialize 'local' namespace
kubectl delete namespace local --ignore-not-found
kubectl create namespace local
kubectl apply -f k8s-local/ --namespace=local