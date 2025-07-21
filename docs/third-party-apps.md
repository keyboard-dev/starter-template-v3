---
slug: /connectapps
title: Connect Third-Party Apps
sidebar_position: 3
---

# Connect Third-Party Apps

Follow the steps below to securely connect the apps you'd like you use within Claude to Keyboard:

### Step 1: Navigate to Repository Settings
1. Go to your GitHub repository that you forked, it should have the name "codespace-executor".
2. Click on the **Settings** tab (you need admin access)
3. In the left sidebar, click **Secrets and variables**
4. Click **Codespaces**

### Step 2: Add Repository Secrets**
1. Click **New repository secret**
2. Enter the secret name with **KEYBOARD_** prefix in the following format KEYBOARD_APPNAME_API_KEY (e.g. KEYBOARD_TYPEFORM_API_KEY)
3. Enter the secret value (your actual API key)
4. Click **Add secret**

### Tips
* Once you've added the secrets you will have to reset any codespaces already running (you can ask Keyboard to delete existing codespaces)
* In Claude desktop ask what environment variables Keyboard has access to in order to confirm the connection worked
* Start asking Claude to perform tasks in your connected apps once it confirms it has access to 

## Security Overview

### What does Keyboard have access to? 

Keyboard does not have access to the API keys you input. Those are stored in your private GitHub repo. Keyboard only knows that the environment variable is available to point Claude to when ready to execute a task. By default you will always have the ability to to approve or deny any task before Claude goes and executes a task leveraging the API key (*you can also turn this final approval off if you want*).

### Best Practices for AI-Driven Environment Variable Naming

**Do:**
* Use uppercase names with the **KEYBOARD_** prefix
* Include the service name in the variable name
* Use consistent naming patterns across your project

**Examples of Environment Variable Names:**
```bash
# Third-Party Integration Secrets
KEYBOARD_TYPEFORM_API_KEY
KEYBOARD_STRIPE_SECRET_KEY
KEYBOARD_STRIPE_PUBLISHABLE_KEY
KEYBOARD_SENDGRID_API_KEY
KEYBOARD_SENDGRID_FROM_EMAIL
KEYBOARD_ASANA_API_KEY
KEYBOARD_GOOGLE_SLIDES_API_KEY
KEYBOARD_GOOGLE_DOCS_API_KEY_READ_ONLY
KEYBOARD_GITHUB_TOKEN_FOR_API
```

### Avoid These Common Mistakes

* Generic names like KEY, SECRET, or TOKEN
* Lowercase or mixed-case names
* Ambiguous abbreviations
* Storing secrets in code or configuration files
* Using production keys in development environments

## Step-by-Step Integration Examples

### Typeform Integration

**Getting Your Typeform API Key:**
1. Log in to [Typeform](https://typeform.com)
2. Click on your profile picture → **Settings**
3. Go to **Personal tokens**
4. Click **Generate a new token**
5. Give it a descriptive name (e.g., "Keyboard Development")
6. Copy your personal access token (starts with tfp_)

**Add to GitHub Codespaces:**
- **Secret Name**: KEYBOARD_TYPEFORM_API_KEY
- **Secret Value**: tfp_your_actual_token_here

### SendGrid Email Integration

**Getting Your SendGrid API Key:**
1. Log in to [SendGrid](https://sendgrid.com)
2. Go to **Settings** → **API Keys**
3. Click **Create API Key**
4. Choose **Full Access** or configure specific permissions
5. Copy your API key (starts with SG.)

**Add to GitHub Codespaces:**
- **Secret Name**: KEYBOARD_SENDGRID_API_KEY
- **Secret Value**: SG.your_sendgrid_api_key_here
- **Secret Name**: KEYBOARD_SENDGRID_FROM_EMAIL
- **Secret Value**: your_verified_sender@example.com