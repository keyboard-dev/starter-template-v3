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

**Step 3: Verify Access in Codespace**

Once you create or restart your codespace, the variables will be automatically available:

```javascript
// Check if environment variable is available
console.log('Typeform API Key:', process.env.KEYBOARD_TYPEFORM_API_KEY ? 'Available' : 'Not set');
```

### Method 2: User-Level Secrets

For secrets you want to use across all your codespaces:

1. Go to **GitHub Settings** → **Codespaces**
2. Add secrets that will be available in all your codespaces
3. Use the same **KEYBOARD_** prefix convention

### Method 3: Development Environment File (Local Testing Only)

⚠️ **Warning**: Only use this method for local development. Never commit .env files to your repository.

Create a .env file in your project root:

```bash
# .env file (add to .gitignore!)
KEYBOARD_TYPEFORM_API_KEY=tfp_your_typeform_token_here
KEYBOARD_STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
KEYBOARD_SENDGRID_API_KEY=SG.your_sendgrid_key_here
```

Load the variables in your code:
```javascript
// Install dotenv: npm install dotenv
require('dotenv').config();
```

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

**Example Usage in Code:**
```javascript
const axios = require('axios');

class KeyboardTypeformService {
    constructor() {
        this.apiKey = process.env.KEYBOARD_TYPEFORM_API_KEY;
        this.baseURL = 'https://api.typeform.com';
        
        if (!this.apiKey) {
            throw new Error('KEYBOARD_TYPEFORM_API_KEY environment variable is required');
        }
        
        this.headers = {
            'Authorization': 'Bearer ' + this.apiKey,
            'Content-Type': 'application/json'
        };
    }
    
    async getForms() {
        try {
            const response = await axios.get(this.baseURL + '/forms', {
                headers: this.headers
            });
            console.log('Found ' + response.data.items.length + ' forms');
            return response.data;
        } catch (error) {
            console.error('Error fetching forms:', error.response?.data || error.message);
            throw error;
        }
    }
    
    async getFormResponses(formId) {
        try {
            const response = await axios.get(this.baseURL + '/forms/' + formId + '/responses', {
                headers: this.headers
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching responses:', error.response?.data || error.message);
            throw error;
        }
    }
}

// Usage example
async function demonstrateTypeformIntegration() {
    try {
        const typeform = new KeyboardTypeformService();
        const forms = await typeform.getForms();
        console.log('Your Typeform integration is working!', forms.items.length, 'forms found');
    } catch (error) {
        console.error('Typeform integration failed:', error.message);
    }
}
```

### 💳 Stripe Payment Integration

**Getting Your Stripe API Keys:**
1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers** → **API keys**
3. Copy your **Secret key** (starts with sk_test_ for testing or sk_live_ for production)
4. Copy your **Publishable key** (starts with pk_test_ or pk_live_)

**Add to GitHub Codespaces:**
- **Secret Name**: KEYBOARD_STRIPE_SECRET_KEY
- **Secret Value**: sk_test_your_stripe_secret_key_here
- **Secret Name**: KEYBOARD_STRIPE_PUBLISHABLE_KEY
- **Secret Value**: pk_test_your_stripe_publishable_key_here

**Example Usage:**
```javascript
// First install: npm install stripe
const stripe = require('stripe')(process.env.KEYBOARD_STRIPE_SECRET_KEY);

async function createPaymentIntent(amount) {
    if (!process.env.KEYBOARD_STRIPE_SECRET_KEY) {
        throw new Error('KEYBOARD_STRIPE_SECRET_KEY environment variable is required');
    }
    
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Amount in cents
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });
        console.log('Payment intent created:', paymentIntent.id);
        return paymentIntent;
    } catch (error) {
        console.error('Error creating payment intent:', error.message);
        throw error;
    }
}
```

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

**Example Usage:**
```javascript
// First install: npm install @sendgrid/mail
const sgMail = require('@sendgrid/mail');

function initializeSendGrid() {
    if (!process.env.KEYBOARD_SENDGRID_API_KEY) {
        throw new Error('KEYBOARD_SENDGRID_API_KEY environment variable is required');
    }
    sgMail.setApiKey(process.env.KEYBOARD_SENDGRID_API_KEY);
}

async function sendEmail(to, subject, html) {
    initializeSendGrid();
    
    const msg = {
        to,
        from: process.env.KEYBOARD_SENDGRID_FROM_EMAIL,
        subject,
        html,
    };
    
    try {
        await sgMail.send(msg);
        console.log('Email sent successfully to ' + to);
    } catch (error) {
        console.error('Error sending email:', error.response?.body || error.message);
        throw error;
    }
}
```

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

### Environment Variable Validation

Always validate your environment variables at startup:

```javascript
// Create a validation function
function validateEnvironmentVariables() {
    const requiredVars = [
        'KEYBOARD_TYPEFORM_API_KEY',
        'KEYBOARD_STRIPE_SECRET_KEY',
        'KEYBOARD_SENDGRID_API_KEY'
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
        console.error('❌ Missing required environment variables:');
        missingVars.forEach(varName => console.error('  - ' + varName));
        console.error('\nPlease check your GitHub Codespaces secrets configuration.');
        process.exit(1);
    }
    
    console.log('✅ All required environment variables are configured');
}

// Call at application startup
validateEnvironmentVariables();
```

### Discretionary Use Warning

**⚠️ Important Security Considerations:**

Environment variables in an AI-powered system require extra caution:
* **Understand potential security implications** - AI can access and use these credentials
* **Verify the source and purpose** of each variable before adding
* **Implement robust access controls** - Use repository secrets, not user secrets for sensitive data
* **Regularly audit AI integration configurations** - Review what services have access
* **Use principle of least privilege** - Only grant necessary permissions
* **Monitor API usage** - Watch for unexpected activity in your third-party service dashboards

## Testing Your Setup

### Environment Variable Test Script

Create a test script to verify your environment variables are properly configured:

```javascript
// test-keyboard-env.js
const requiredVars = {
    'KEYBOARD_TYPEFORM_API_KEY': { 
        description: 'Typeform form management', 
        test: (val) => val.startsWith('tfp_') 
    },
    'KEYBOARD_STRIPE_SECRET_KEY': { 
        description: 'Stripe payment processing', 
        test: (val) => val.startsWith('sk_') 
    },
    'KEYBOARD_SENDGRID_API_KEY': { 
        description: 'SendGrid email sending', 
        test: (val) => val.startsWith('SG.') 
    },
    'KEYBOARD_ASANA_API_KEY': { 
        description: 'Asana project management', 
        test: (val) => val.length > 20 
    },
    'KB_ENCRYPTION_SECRET': { 
        description: 'Keyboard encryption/decryption', 
        test: (val) => val.length >= 16 
    }
};

console.log('🔍 Checking Keyboard environment variables...\n');

let allGood = true;

for (const [varName, config] of Object.entries(requiredVars)) {
    const value = process.env[varName];
    const isSet = !!value;
    const isValid = isSet && config.test(value);
    
    const status = isSet ? (isValid ? '✅ Valid' : '⚠️  Invalid format') : '❌ Missing';
    const preview = isSet ? '(' + value.substring(0, 8) + '...)' : '';
    
    console.log(status + ' ' + varName);
    console.log('   Purpose: ' + config.description + ' ' + preview);
    
    if (!isSet || !isValid) {
        allGood = false;
    }
    console.log();
}

if (allGood) {
    console.log('🚀 All Keyboard environment variables are properly configured!');
} else {
    console.log('⚠️  Some environment variables need attention. Check your GitHub Codespaces secrets.');
}
```

## Troubleshooting

### Common Issues and Solutions

**1. Environment Variable Not Available in Codespace**

*Problem*: process.env.KEYBOARD_TYPEFORM_API_KEY returns undefined

*Solutions*:
- ✅ Restart your codespace after adding new secrets
- ✅ Check that the secret name matches exactly (case-sensitive)
- ✅ Verify the secret was added to the correct repository
- ✅ Make sure you're using the KEYBOARD_ prefix

**2. API Authentication Errors**

*Problem*: Getting 401 Unauthorized or 403 Forbidden errors

*Solutions*:
- ✅ Verify the API key is correct and hasn't expired
- ✅ Check if you're using test vs production keys appropriately
- ✅ Ensure proper headers are set in your requests
- ✅ Check the API documentation for required permissions

## Quick Reference

### Available Environment Variables in Keyboard System

Based on the current system, these are the available environment variable keys you can use:

```bash
# GitHub and Repository Management
KEYBOARD_REPO_GITHUB_TOKEN_TO_USE_FOR_BUILDING_APPS
KEYBOARD_GITHUB_TOKEN_FOR_GITHUB_API_OR_OCTOKIT
KEYBOARD_REPO_FOR_BUILDING
KEYBOARD_SECRET_GITHUB_README_PAT

# Deployment and Hosting
KEYBOARD_NETLIFY_ACCESS_TOKEN
KEYBOARD_VERCEL_V0_TOKEN

# Communication and Forms
KEYBOARD_TYPEFORM
KEYBOARD_RESEND_API_KEY
KEYBOARD_DEEPGRAM_API_KEY
KEYBOARD_TAVUS_API_KEY

# Project Management
KEYBOARD_ASANA
KEYBOARD_RETOOL

# Database
KEYBOARD_TURSO_DATABASE_TOKEN

# System
KEYBOARD_TEST
KB_ENCRYPTION_SECRET
```

### Common API Key Formats

| Service | Environment Variable | Key Format | Example |
|---------|---------------------|------------|---------|
| Typeform | KEYBOARD_TYPEFORM_API_KEY | tfp_... | tfp_1234567890abcdef |
| Stripe | KEYBOARD_STRIPE_SECRET_KEY | sk_test_... or sk_live_... | sk_test_1234567890abcdef |
| SendGrid | KEYBOARD_SENDGRID_API_KEY | SG.... | SG.1234567890abcdef |
| GitHub | KEYBOARD_GITHUB_TOKEN_FOR_API | ghp_... or github_pat_... | ghp_1234567890abcdef |
| Google | KEYBOARD_GOOGLE_API_KEY | AIza... | AIza1234567890abcdef |

### Setup Checklist

- [ ] **Identify required APIs** for your Keyboard project
- [ ] **Sign up for service accounts** (Typeform, Stripe, SendGrid, etc.)
- [ ] **Generate API keys** from service dashboards
- [ ] **Add secrets to GitHub Codespaces** with KEYBOARD_ prefix
- [ ] **Create environment variable validation** in your code
- [ ] **Test integrations** with the provided test scripts
- [ ] **Add error handling** for missing or invalid keys
- [ ] **Document your integrations** in your project README
- [ ] **Set up monitoring** for API usage and errors

## AI-Specific Environment Configuration

### Important Keyboard-Specific Variables

**KB_ENCRYPTION_SECRET**: Used for encrypting and decrypting sensitive data
- Should match your CODE_ENCRYPTION_KEY in the Desktop Approver App
- Must be at least 16 characters long
- Keep this secret secure as it protects sensitive data

**KEYBOARD_TEST**: Used for testing configurations
- Can be set to any value to enable test mode
- Useful for development and debugging

## Conclusion

Properly managed environment variables are crucial for creating secure, intelligent, and flexible AI-driven code generation and execution in the Keyboard development ecosystem. By following this guide, you'll have a robust foundation for integrating third-party services securely and effectively.

## Next Steps

1. **Review your current environment variable strategy** - Audit existing configurations
2. **Implement security best practices** - Follow the guidelines in this document
3. **Test your integrations** - Use the provided test scripts
4. **Set up monitoring** - Monitor API usage and errors
5. **Document your setup** - Keep your team informed about integrations
6. **Explore advanced capabilities** - Investigate additional AI code generation features

---

**Need Help?**
- Check the specific API documentation for each service you're integrating
- Review GitHub Codespaces documentation for secrets management
- Use the provided test scripts to validate your setup
- Monitor your third-party service dashboards for usage and errors
- Follow security best practices and rotate keys regularly

Remember: Keep your API keys secret, use appropriate prefixes, validate configurations, and never commit sensitive data to your repository!
