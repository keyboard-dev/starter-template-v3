---
slug: /
title: Welcome
sidebar_position: 1
---



# Welcome to Keyboard: Your Model Context Protocol Server

## Introduction to Keyboard

Keyboard is a powerful Model Context Protocol (MCP) server designed to transform how you interact with AI clients like Claude by enabling direct code execution and task automation. It provides a flexible and secure platform for connecting your internal applications to your AI client and executing complex tasks across various domains.

## What Can Keyboard Do?

Keyboard allows users to extend the capabilities of AI clients by:

* Connect various apps to your AI client via one secure MCP server

* Execute the tasks within your own environment

* Automating workflows

* Executing context-specific tasks using a robust server infrastructure

## Key Features

### Secure Code Execution

* Run code safely within controlled environments

* Support for multiple execution contexts

* Built-in security mechanisms to prevent malicious actions

### Multi-Client Support

* Compatible with Claude and other MCP clients

* Flexible integration with various AI services

* Extensible architecture for future client support

### Task Automation

* Create complex, multi-step workflows

* Automate repetitive tasks

* Integrate with various services and APIs

## Getting Started

### Prerequisites

* Node.js (version 18 or higher)

* Access to an MCP-compatible AI client

* GitHub Personal Access Token (for some advanced features)

### Quick Setup with Claude Desktop You will need to drag and drop the keyboard-mcp.dxt file found here: <https://github.com/keyboard-dev/keyboard-mcp/releases>

![](/img/desktop.png)Just Drag and drop and then click "install". From there you will be prompted to add a GitHub PAT.\
\
Before you do that please go fork: <https://github.com/keyboard-dev/codespace-executor>.\
\
Once you fork that repo generate a GitHub PAT that only has access to that repo and has the following permissions below in the screenshot

```
# Clone the Keyboard Desktop App
git clone https://github.com/keyboard-dev/approver-client.git

# Install dependencies
npm install

# run the Electron App
npm run dev
```

## Core Concepts

### Model Context Protocol (MCP)

Keyboard implements the Model Context Protocol, which provides a standardized way for AI clients to interact with execution environments, enabling more dynamic and powerful interactions.

### Execution Tools

Keyboard provides a range of tools for different execution scenarios:

* WebSocket communication

* Code evaluation

* Resource management

* Secure token-based execution

## Security First

Keyboard is designed with security at its core:

* Token-based authentication

* Controlled execution environments

* Comprehensive security checks

* Approval workflows for sensitive operations

## Next Steps

* Explore the documentation

* Check out example workflows

* Join our community discussions

## Contributing

Interested in improving Keyboard? We welcome contributions! Please join our #contributing channel on Discord and ping us there!

## License

Keyboard is open-source software licensed under \[Your License Here].
