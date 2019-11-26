## Preparing Google Cloud to run this demo

### 1. Enable the needed APIs:
Run this command in the shell:
```
gcloud services enable run.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com
```

### 2. Grant Cloud Build permission to deploy to Cloud Run
1. Go to [Google Cloud Console > Cloud Build Settings](https://console.cloud.google.com/cloud-build/settings)
1. On the line for **Cloud Run**, change Status to **ENABLED**
    > ...you will be promted to also grant the *Service Account User* role. Click "GRANT ACCESS TO ALL SERVICE ACCOUNTS"
    * The Service Account Permissions page should now look like this: [TODO: insert image]
1. Leave the Cloud Console open when you're finished; we'll be using it later.

### 3. Store your Google Cloud project ID in an environment variable
Run this command in the shell:
```
export PROJECT_ID=$(gcloud config list --format 'value(core.project)' 2>/dev/null)
```

### 4. configure Git
Run these commands in the shell, replacing the placeholder variables with your information:
```
git config --global user.email "$$YOUR_EMAIL$$"
```
```
git config --global user.name "$$YOUR_NAME$$"
```

### 5. enable Git credential helper
Using the credential helper makes it so you don't have to enter your password on every push
    * Copy the following command and run it in the shell:

    ```
    git config --global credential.helper store
    ```

### 6. log out of dockerhub
Your Cloud Shell may have been provisioned with a default dockerhub credential; we need to clear it out:
```
docker logout
```