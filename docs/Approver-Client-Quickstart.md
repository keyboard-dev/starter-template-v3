# Step 1: Set Up Approver Client

## Prerequisites

Before you begin, ensure you have the following:

* Node.js (version 16 or later)

* npm (Node Package Manager)

* A GitHub Personal Access Token (PAT)

## Setting Up Environmental Variables

Create a `.env` file in the project root with the following configuration:

```bash

# Required
ENCRYPTION_KEY=RANDOM_ENCRYPTION_KEY
API_URL=API_URL_OF_KEYBOARD

# Optional: Enable message encryption
#CODE_ENCRYPTION_KEY=RANDOM_ENCRYPTION_KEY
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/approver-client.git
cd approver-client
```

2. Install dependencies:

```bash
npm install
```

## Running the Approver Client

Start the desktop application:

```bash
npm run dev
```

## Connecting to MCP Server

The Approver Client is designed to connect to a Keyboard MCP (Message Coordination Protocol) server:

1. Ensure the MCP server is running

2. The application will automatically attempt to establish a WebSocket connection

3. Configure server endpoints in your application settings if needed

## Authentication

The application uses OAuth 2.0 with PKCE (Proof Key for Code Exchange) for secure authentication:

* Click 'Login' in the application

* You'll be redirected to an authentication page

* Complete the OAuth flow to access the application

## Troubleshooting

* Verify your `.env` file contains the correct info

* Check network connectivity

* Ensure the MCP server is running and accessible

## Next Steps

* Explore message approval workflows

* Configure additional settings

* Review detailed documentation for advanced usage
