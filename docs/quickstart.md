---
slug: /quickstart
title: Quickstart
sidebar_position: 2
---

## Getting Started

### Prerequisites

* Node.js (version 18 or higher)

* Access to Claude Desktop with an account that can add integrations and MCP servers

* GitHub Personal Access Token scoped to use codespaces (instructionso n how to create it below)
  
### Fork the Codespace Repo

Go fork this [repo](https://github.com/keyboard-dev/codespace-executor).

### Generate a GitHub PAT for the Codespace Repo

Generate a GitHub PAT that only has access to tho the codespace-executor repo and has the following codespaces permissions below in the screenshots:

![select-repo](/img/select_repo.png)

![generate-pat](/img/pat.png)

You will need to copy and paste this PAT in the next step.

### Setup with Claude Desktop in Claude Desktop

Download the keyboard-mcp.dxt file found here: [dxt github release](https://github.com/keyboard-dev/keyboard-mcp/releases)

Navigate to the Claude Desktop app Extensions page via the Claude settings page. 

![](/img/desktop.png)

Drag and drop the downloaded keyboard-mcp.dxt file and click "Install".

Copy the GitHub PAT generated in the previous step into the Claude UI.

## Clone the Approver App

```
# Get access to both repos
git clone --recursive https://github.com/keyboard-dev/keyboard-local.git
cd keyboard-local

# Work on desktop electron app
cd apps/approver-client
git checkout main
git pull origin main
```

## Add .env for the Desktop App

### Generate Encryption keys

Run this script at the root of project to create your encyrption keys. You will need to copy and paste them in the next step.

```
node generate-encryption-key.js
```

### Create the .env File

Create a `.env` file in the project root with the following configuration. If in Claude Desktop you want to optionally encrypt messages sent from your local MCP server to your codespace execution server the `CODE_ENCRYPTION_KEY` will be used to add an additional layer of encryption to the data in transit. You will also need to add an env variable to the codespace-executor called `KB_ENCRYPTION_KEY` that will be the same value as `CODE_ENCRYPTION_KEY`.

```bash
# Required
ENCRYPTION_KEY=RANDOM_ENCRYPTION_KEY

# Optional: Enable message encryption
#CODE_ENCRYPTION_KEY=RANDOM_ENCRYPTION_KEY
```

In this project we also use [dotenvx](https://dotenvx.com) to encrypt credentials at rest. Run the command below:

```bash

npx @dotenvx/dotenvx encrypt
npx @dotenvx/dotenvx ext gitignore
```

Now run the project.

```
# Install dependencies
npm install

# run the Electron App
npm run dev
```

Create an account and get started.

## Connect the Keyboard Desktop App to Claude

After you login into the desktop app find the "Settings" button. Once there find your web socket key and copy it.


![](/img/websocket-copy-key.png)

After you copy it navigate back to Claude to and add in the WebSocket Connection Key

![](/img/add-socket-key-to-claude.png)

That's it, setup should be done.

## Troubleshooting

* Verify your `.env` file contains the correct info

* Check network connectivity

* Ensure the MCP server is running and accessible

* If Claude is not loading trying quiting the Claude Desktop app and opening again

## Next Steps

* Explore message approval workflows

* Configure additional settings

* Review detailed documentation for advanced usage
