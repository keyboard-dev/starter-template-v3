# Add Third Party Apps to Keyboard

## 📋 Table of Contents
1. [Overview](#overview)
2. [Why Environment Variables Matter](#why-environment-variables-matter)
3. [Setting Up GitHub Codespaces Environment Variables](#setting-up-github-codespaces-environment-variables)
4. [Step-by-Step Integration Examples](#step-by-step-integration-examples)
5. [Security Best Practices](#security-best-practices)
6. [Testing Your Setup](#testing-your-setup)
7. [Troubleshooting](#troubleshooting)
8. [Quick Reference](#quick-reference)

## Overview

Environment variables are crucial for enabling AI-powered code generation and execution in the Keyboard development ecosystem. These variables help AI intelligently interact with third-party services, generate contextually appropriate code, and securely manage integration capabilities.

This guide provides comprehensive instructions for integrating third-party services with your Keyboard development environment, with practical examples and step-by-step setup instructions that even the simplest user can follow.

## Why Environment Variables Matter

Environment variables provide a powerful and secure mechanism for AI to:
* **Generate and execute code dynamically** - AI can adapt code based on available services
* **Configure credentials for third-party integrations** - Secure authentication without hardcoding
* **Set runtime configurations for AI-driven development** - Customize behavior per environment
* **Enable secure, context-aware code generation** - AI understands what services are available
* **Facilitate intelligent cross-platform interactions** - Seamless integration across services

### AI-Powered Environment Variable Use Cases

Keyboard's environment variables are specifically designed to empower AI to:
* Authenticate with external APIs (Typeform, Stripe, SendGrid, etc.)
* Select appropriate code generation strategies based on available services
* Configure model-specific parameters for different integrations
* Manage secure communication between different services
* Control AI behavior and execution constraints

## Setting Up GitHub Codespaces Environment Variables

### Method 1: Repository-Level Secrets (Recommended)

This is the most secure method and works for all codespaces created from your repository.

**Step 1: Navigate to Repository Settings**
1. Go to your GitHub repository
2. Click on the **Settings** tab (you need admin access)
3. In the left sidebar, click **Secrets and variables**
4. Click **Codespaces**

**Step 2: Add Repository Secrets**
1. Click **New repository secret**
2. Enter the secret name with **KEYBOARD_** prefix (e.g., KEYBOARD_TYPEFORM_API_KEY)
3. Enter the secret value (your actual API key)
4. Click **Add secret**

## Step-by-Step Integration Examples

### 🔷 Typeform Integration

Typeform is a popular form builder with powerful APIs for creating and managing forms.

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

### 📧 SendGrid Email Integration

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

## Security Best Practices

### ✅ Best Practices for AI-Driven Environment Variable Naming

**Do:**
* Use descriptive, uppercase names with the **KEYBOARD_** prefix
* Be specific about the variable's purpose and AI interaction
* Include the service name in the variable name
* Use consistent naming patterns across your project

**Examples of Excellent Environment Variable Names:**
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

### ❌ Avoid These Common Mistakes

* Generic names like KEY, SECRET, or TOKEN
* Lowercase or mixed-case names
* Ambiguous abbreviations
* Storing secrets in code or configuration files
* Using production keys in development environments

### Discretionary Use Warning

**⚠️ Important Security Considerations:**

Environment variables in an AI-powered system require extra caution:
* **Understand potential security implications** - AI can use these credentials
* **Verify the source and purpose** of each variable before adding
* **Implement robust access controls** - Use repository secrets, not user secrets for sensitive data
* **Regularly audit AI integration configurations** - Review what services have access
* **Use principle of least privilege** - Only grant necessary permissions
* **Monitor API usage** - Watch for unexpected activity in your third-party service dashboards

## Conclusion

Properly managed environment variables are crucial for creating secure, intelligent, and flexible AI-driven code generation and execution in the Keyboard development ecosystem. By following this guide, you'll have a robust foundation for integrating third-party services securely and effectively.

---

**Need Help?**
- Check the specific API documentation for each service you're integrating
- Review GitHub Codespaces documentation for secrets management
- Use the provided test scripts to validate your setup
- Monitor your third-party service dashboards for usage and errors
- Follow security best practices and rotate keys regularly

Remember: Keep your API keys secret, use appropriate prefixes, validate configurations, and never commit sensitive data to your repository!
