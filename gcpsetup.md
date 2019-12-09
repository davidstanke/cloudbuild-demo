## Preparing Google Cloud to run this demo

### 1. Enable the needed APIs:
Run these commands in the console:
```bash    
export PROJECT_ID=$(gcloud projects list --limit=1 --format 'value(PROJECT_ID)')
```
```bash    
gcloud config set project $PROJECT_ID
```
```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com
```

### 2. Grant Cloud Build permission to deploy to Cloud Run
1. Go to [Google Cloud Console > Cloud Build Settings](https://console.cloud.google.com/cloud-build/settings)
1. On the line for **Cloud Run**, change Status to **ENABLED**
    > ...you will be prompted to also grant the *Service Account User* role. Click "GRANT ACCESS TO ALL SERVICE ACCOUNTS"

### 3. configure Git
Run these commands in the console, replacing the placeholder variables with your GitHub information:

Set your email:    
```bash
git config --global user.email "YOUR-EMAIL"
```
Set your name:
```bash
git config --global user.name "YOUR-NAME"
```
Set the upstream remote to your GitHub account:
```bash
git remote set-url origin https://github.com/YOUR-GITHUB-USERNAME/cloudbuild-demo.git
```
Enable the git credential store:
```bash
git config --global credential.helper store
```