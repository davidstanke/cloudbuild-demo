#!/bin/bash
set -eo pipefail

GCP_PROJECT_ID="project_undefined"

if hash gcloud 2>/dev/null; then
    GCP_PROJECT_ID=$(gcloud config list --format 'value(core.project)')
fi

echo $GCP_PROJECT_ID

docker build -t \
    gcr.io/$GCP_PROJECT_ID/cookieshop/shippingcalc:local \
    --build_arg PORT=8080 \
    ../src/shippingcalc

kubectl delete namespce local || true
kubectl create namespace local
kubectl apply -f k8s-local.yml
