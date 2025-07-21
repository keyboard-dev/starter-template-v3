---
slug: /claude
title: Using Keyboard in Claude
sidebar_position: 4
---

# Using Keyboard in Claude

Before getting started: 

* Visit the [quickstart](https://docs.keyboard.dev/docs/quickstart) guide to ensure you have Keyboard installed with the proper permissions

* Connect Keyboard to the third party apps you want to give Claude access to (see [here](https://docs.keyboard.dev/docs/connectapps) if you haven't already)

## Key Execution Requirements

1. Sign in to Keyboard 

2. Open Claude and ensure Keyboard is connected. (*Tip: you can ask Claude if it is connected to Keyboard*)

3. Keep the Keyboard desktop app open so you can approve the workflows as they come up

## Executing Tasks with Keyboard

You're ready to get started! Go into Claude and start asking it to perform tasks in the various apps you connected. 

### Initial Prompt Requirement

**Important**: When interacting with the system, always begin your prompt with the word 'keyboard'. This signals the system that you want to use Keyboard not accidentally trigger another tool.

Example:

```
keyboard: Please run some hello world code
```

### Approval App Workflow

When prompted to execute a task Claude will create a GitHub codespace, ensure it's connected to the necessary third-party apps and then write code to execute the task. By default, you will need to approve the code before Claude executes the code to undertake the task at hand. 

You will see a notification in the Keyboard desktop app to approve or deny the request

**Tip: Check the Keyboard desktop app if Claude seems to be stuck before executing a task. You may have to approve it before it gets executed.**

### Save Scripts

Claude will work to write a new script for each task it is asked to execute. Keyboard has the functionality to save a script once it's successful so that Claude can recall that script to save time the next time you want to access an app. 

Try asking Claude to save a script after a task was successfully executed so you can go back and recall that script the next time you want a similar task to be taken. You can give it any name you want. 

For example if you successfully created a Google Doc with Claude you can tell Claude: *Save this script in Keyboard and call it 'Create Google Slides'* 

The next time you want to create a Google Doc simply add *'Keyboard use the create Google Slides script'* in your prompt. 

## Best Practices

* Always verify your WebSocket connection is stable

* Start prompts with 'keyboard' to ensure proper context

* Use the Claude Desktop client for integrated experiences

## Troubleshooting

* If a connected app isn't working you can always ask Keyboard to list what environment variables it has access to

* Verify WebSocket connection status by clicking into the Keyboard desktop app *mcp-notification-app*

* Validate GitHub PAT permissions
