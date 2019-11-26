## Preparing Google Cloud to run this demo

### 1. Enable the needed APIs:

<walkthrough-enable-apis apis="run.googleapis.com,cloudbuild.googleapis.com,containerregistry.googleapis.com"></walkthrough-enable-apis>

### 2. Grant Cloud Build permission to deploy to Cloud Run
1. Go to [Google Cloud Console > Cloud Build Settings](https://console.cloud.google.com/cloud-build/settings)
1. On the line for **Cloud Run**, change Status to **ENABLED**
    > ...you will be promted to also grant the *Service Account User* role. Click "GRANT ACCESS TO ALL SERVICE ACCOUNTS"
1. The Service Account Permissions page should now look like this: [TODO: insert image]
    > Leave the Cloud Console open when you're finished; we'll be using it later.