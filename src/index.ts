#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { PlainlyClient } from "./plainly-client.js";
import { registerTools } from "./tools/index.js";
import { registerResources } from "./resources/index.js";
import { registerPrompts } from "./prompts/index.js";

const API_KEY = process.env.PLAINLY_API_KEY;

if (!API_KEY) {
  console.error("Error: PLAINLY_API_KEY environment variable is required");
  process.exit(1);
}

// Initialize Plainly client
const plainlyClient = new PlainlyClient(API_KEY);

// Create MCP server
const server = new Server(
  {
    name: "plainly-videos-pro",
    version: "2.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

// Register all tools
registerTools(server, plainlyClient);

// Register all resources
registerResources(server, plainlyClient);

// Register all prompts
registerPrompts(server, plainlyClient);

// Error handling
server.onerror = (error: Error) => {
  console.error("[MCP Error]", error);
};

process.on("SIGINT", async () => {
  await server.close();
  process.exit(0);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Plainly Videos MCP Server Pro running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
