#!/bin/bash
set -eo pipefail

# This script will [optionally] build and deploy the application to kubernetes. It uses
# whatever kubectl is already on the machine, with whatever configuration is already
# applied in kubectl. It also assumes kustomize is available.

GCP_PROJECT_ID="project_undefined"
TIMESTAMP=$(date +%s)

echo $TIMESTAMP

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
        gcr.io/$GCP_PROJECT_ID/cookieshop/shippingcalc:$TIMESTAMP \
        --build-arg PORT=8080 \
        ../../src/shippingcalc
    docker build -t \
        gcr.io/$GCP_PROJECT_ID/cookieshop/web:$TIMESTAMP \
        --build-arg PORT=8080 \
        ../../src/web
    docker push gcr.io/$GCP_PROJECT_ID/cookieshop/web:$TIMESTAMP 
    docker push gcr.io/$GCP_PROJECT_ID/cookieshop/shippingcalc:$TIMESTAMP
fi

# patch k8s
kustomize edit set image gcr.io/$GCP_PROJECT_ID/cookieshop/web:VERSION_TAG=gcr.io/$GCP_PROJECT_ID/cookieshop/web:$TIMESTAMP
kustomize edit set image gcr.io/$GCP_PROJECT_ID/cookieshop/shippingcalc:VERSION_TAG=gcr.io/$GCP_PROJECT_ID/cookieshop/shippingcalc:$TIMESTAMP
kustomize build . > /tmp/$TIMESTAMP.yaml
cat /tmp/$TIMESTAMP.yaml

# reinitialize 'local' namespace
kubectl delete namespace $TIMESTAMP --ignore-not-found
kubectl create namespace $TIMESTAMP
kubectl apply -f /tmp/$TIMESTAMP.yaml --namespace=$TIMESTAMP