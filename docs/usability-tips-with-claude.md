# Using Keyoard in Claude

Before getting started: 

* Visit the Quickstart guide to ensure you have Keyboard installed with the proper permissions

* Connect Keyboard to the third party apps you want to give Claude access to (see here if you haven't already)

## Key Execution Requirements

1. Log into Keyboard 

2. Open Claude and ensure Keyboard is connected. (Tip: you can ask Claude if it is connected to Keyboard)

3. Keep the Keyboard desktop app open so you can approve the workflows as they come up

## Getting Started with Keyboard

You're ready to go! Just go into Claude and start asking it to perform tasks in the various apps you connected. 

### Initial Prompt Requirement

🔑 **Important**: When interacting with the system, always begin your prompt with the word 'keyboard'. This signals the system that you want to use Keyboard not accidentally trigger another tool.

Example:

```
keyboard: Please run some hello world code
```

## Best Practices

* Always verify your WebSocket connection is stable

* Start prompts with 'keyboard' to ensure proper context

* Use the Claude Desktop client for integrated experiences

## Troubleshooting

* Check network connectivity

* Verify WebSocket connection status

* Ensure Codespace is properly configured

* Validate GitHub PAT permissions
