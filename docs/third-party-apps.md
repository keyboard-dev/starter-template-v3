# Add Third Party Apps to Keyboard

## Overview

Environment variables are crucial for enabling AI-powered code generation and execution in the Keyboard development ecosystem. These variables help AI intelligently interact with third-party services, generate contextually appropriate code, and securely manage integration capabilities.

## Why Environment Variables Matter

Environment variables provide a powerful and secure mechanism for AI to:

* Generate and execute code dynamically

* Configure credentials for third-party integrations

* Set runtime configurations for AI-driven development

* Enable secure, context-aware code generation

* Facilitate intelligent cross-platform interactions

## AI-Powered Environment Variable Use Cases

Keyboard's environment variables are specifically designed to empower AI to:

* Authenticate with external APIs

* Select appropriate code generation strategies

* Configure model-specific parameters

* Manage secure communication between different services

* Control AI behavior and execution constraints

## Adding Environment Variables in GitHub Codespaces

### Step 1: Accessing Codespace Settings

1. Navigate to your GitHub repository

2. Click on the 'Code' dropdown

3. Select 'Create codespace on main'

### Step 2: Setting Environment Variables

You can set environment variables through two primary methods:

#### Method 1: GitHub Codespaces Repository Settings

* Go to Repository Settings

* Select 'Codespaces'

* Add variables that start with prefix "KEYBOARD_" in the 'Repository secrets' section

## Best Practices for AI-Driven Environment Variable Naming

✅ Do:

* Use descriptive, uppercase names

* Prefix with AI or integration context

* Be specific about the variable's purpose and AI interaction

❌ Avoid:

* Generic names like KEY or SECRET

* Lowercase or mixed-case names

* Ambiguous abbreviations

### Examples of Excellent Environment Variable Names

```bash

# Third-Party Integration Secrets
KEYBOARD_OPENAI_API_KEY
KEYBOARD_TYPEFORM_KEY
KEYBOARD_ASANA_API_KEY
KEYBOARD_GOOGLE_SLIDES_KEY
KEYBOARD_GOOGLE_DOCS_KEY_READ_ONLY
```

## Discretionary Use Warning

Disclaimer: Environment variables in an AI-powered system require extra caution:

* Understand potential security implications

* Verify the source and purpose of each variable

* Implement robust access controls

* Regularly audit AI integration configurations

* Use principle of least privilege

## AI-Specific Environment Configuration

Some key Keyboard specific environment variables:

* `KB_ENCRYPTION_SECRET`: Used for Encrypting and Decrypting, should match your `CODE_ENCRYPTION_KEY` in the Desktop Approver App

## Conclusion

Properly managed environment variables are crucial for creating secure, intelligent, and flexible AI-driven code generation and execution in the Keyboard development ecosystem.

## Next Steps

* Review your AI environment variable strategy

* Implement robust security practices

* Audit and secure AI integration configurations

* Explore advanced AI code generation capabilities
