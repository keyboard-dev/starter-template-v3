# Adding Environment Variables to Keyboard Codespace

## Overview

This guide helps you configure environment variables for the Keyboard Codespace, which are crucial for configuring and securing your development environment.

## Types of Environment Variables

The Keyboard Codespace supports several types of environment variables:

### Basic Allowed Environment Variables

Several standard environment variables are automatically allowed:

- `PATH`
- `HOME`
- `USER`
- `NODE_ENV`
- `TZ`
- `LANG`
- `LC_ALL`
- `PWD`
- `TMPDIR`
- `TEMP`
- `TMP`

### Keyboard-Specific Environment Variables

All environment variables starting with `KEYBOARD` are automatically permitted. These can include configuration settings specific to your Keyboard project.

### Special Security Variables

#### Encryption Secret

A critical environment variable is `KB_ENCRYPTION_SECRET`, which is used for securing sensitive data:

```bash
# Set a secure, random encryption secret
export KB_ENCRYPTION_SECRET=your_long_random_secret_here
```

## Setting Environment Variables

### Using `.env` File

1. Create a `.env` file in your project root
2. Add your variables in `KEY=VALUE` format

```bash
# Example .env file
KEYBOARD_PROJECT_ID=myproject
KEYBOARD_API_KEY=your_api_key
KB_ENCRYPTION_SECRET=your_encryption_secret
```

### Using Command Line

You can set environment variables directly in the terminal:

```bash
# Set a single environment variable
export KEYBOARD_VARIABLE_NAME=value

# Set multiple variables
export KEYBOARD_PROJECT_ID=project123
export KEYBOARD_API_ENDPOINT=https://api.example.com
```

## Security Considerations

- Use strong, unique values for sensitive variables
- Never commit secrets to version control
- Rotate encryption keys periodically
- Use environment-specific configurations

## Verifying Environment Variables

The system will log which environment variables are permitted during execution. Check the server logs to confirm your variables are recognized.

## Troubleshooting

- Ensure variables are correctly spelled
- Check for typos in variable names
- Verify that sensitive variables like `KB_ENCRYPTION_SECRET` are set

## Next Steps

- Review your project's specific configuration requirements
- Implement secure variable management practices
- Test your environment variable configuration thoroughly
