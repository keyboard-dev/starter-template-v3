## Getting Started

### Prerequisites

* Node.js (version 18 or higher)

* Access to an Claude Desktop. with an account that can add integrations and MCP servers.

* GitHub Personal Access Token scoped to use codespaces

### Fork the codespace repo

Go fork this repo: [repo link](https://github.com/keyboard-dev/codespace-executor).

### Generate a GitHub Pat for the codespace repo

Generate a GitHub PAT that only has access to tho the codespace-executor repo and has the following codespaces permissions below in the screenshots:

![select-repo](/img/select_repo.png)

![generate-pat](/img/pat.png)

You will need to copy and paste this PAT in the next step.

### Setup with Claude Desktop

You will need to drag and drop the keyboard-mcp.dxt file found here: [dxt github release](https://github.com/keyboard-dev/keyboard-mcp/releases)

![](/img/desktop.png)

Just Drag and drop and then click "install".

Copy that PAT in the Claude UI.

## Clone clone the approver App

```
# Clone the Keyboard Desktop App
git clone https://github.com/keyboard-dev/approver-client.git

cd approver-client
```

## Add .env for the Desktop App

### Generate encryption keys

run this script at the root of project to create your encyrption keys. You will need to copy and paste them in the next step.

```
node generate-encryption-key.js
```

### Create the .env file

Create a `.env` file in the project root with the following configuration. If in Claude Desktop you want to optionally encrypt messages sent from your local MCP server to your codespace execution server the `CODE_ENCRYPTION_KEY` will be used to add an additional layer of encryption to the data in transit. You will also need to add an env variable to the codespace-executor called `KB_ENCRYPTION_KEY` that will be the same value as `CODE_ENCRYPTION_KEY`.

```bash
# Required
ENCRYPTION_KEY=RANDOM_ENCRYPTION_KEY

# Optional: Enable message encryption
#CODE_ENCRYPTION_KEY=RANDOM_ENCRYPTION_KEY
```

In this project we also use [dotenvx](https://dotenvx.com) to encrypt the credentials to rest. So make sure to run this command below.

```bash

npx @dotenvx/dotenvx encrypt
npx @dotenvx/dotenvx ext gitignore
```

Now run the project

```
# Install dependencies
npm install

# run the Electron App
npm run dev
```

Create an account and get started.

## Connect the Keyboard Desktop App to Claude

![](upload)

## Troubleshooting

* Verify your `.env` file contains the correct info

* Check network connectivity

* Ensure the MCP server is running and accessible

## Next Steps

* Explore message approval workflows

* Configure additional settings

* Review detailed documentation for advanced usage
