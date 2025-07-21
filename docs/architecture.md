---
slug: /architecture
title: System Architecture
sidebar_position: 5
---


# Architecture

The Keyboard Development MCP (Model Context Protocol) system is designed with a modular, secure, and interactive architecture that facilitates code execution across different environments. This document outlines the key components and their interactions.

## System Architecture Diagram

```mermaid
flowchart LR
    A[MCP Client] -->|WebSocket Connection| B[MCP Server]
    B -->|Approval Request| C[Approver]
    C -->|Approval Response| B
    B -->|Secure Code Execution| D[Code Execution Environment]
    D -->|Execution Result| B
    B -->|Response| A
```

## Component Overview

### MCP Client

* The entry point of the system

* Initiates WebSocket connections

* Sends code execution requests

* Receives execution results and approvals

### MCP Server

* Central orchestration component

* Manages WebSocket communication

* Handles tool registration and execution

* Coordinates between desktop client and approver

* Manages security tokens and code evaluation workflow

### Approver Client

* Provides human-in-the-loop security mechanism

* Receives and processes approval requests

* Enables interactive decision-making for code execution, and code execution responses

* Sends approval/rejection responses

### Code Execution Environment

* Indvidual Secure GitHub Codespace

* Executes interpolated and evaluated code

* Provides isolated execution context

* Returns execution results

## Workflow Steps

1. **Initiation**: MCP connects via WebSocket

2. **Planning**: User creates a planning token

3. **Evaluation**: Code is security evaluated

4. **Approval**: Approver reviews and decides

5. **Execution**: Code runs in codespace

6. **Review**: User reviews and decides to send back response

7. **Response**: Result returned to MCP Client

## Security Mechanisms

* WebSocket token-based authentication

* Interactive human approval

* Isolated code execution environments

* Encryption of messages

* Single-use planning and execution tokens

## Key Technologies

* WebSocket for real-time communication

* GitHub Codespaces for secure execution

* Token-based security model

* Zod for runtime type validation

## Configuration

The system is highly configurable with options for:

* WebSocket connection parameters

* Reconnection strategies

* Approval timeout settings

* Encryption preferences
