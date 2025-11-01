# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Model Context Protocol (MCP) server for Plainly Videos API integration. It provides 25+ tools, 8+ resources, and 8 intelligent prompts for automated video creation workflows. The server acts as a bridge between AI assistants (like Claude) and the Plainly Videos API.

## Commands

### Development
- `npm run dev` - Start development server with tsx
- `npm run watch` - Start with file watching enabled
- `npm run build` - Compile TypeScript to dist/ and make executable
- `npm run inspect` - Launch MCP Inspector for debugging server

### Testing the Server
Use MCP Inspector to test tools, resources, and prompts:
```bash
npm run inspect
```

### Running Locally
For development testing with environment variables:
```bash
PLAINLY_API_KEY=your-key npm run dev
```

## Architecture

### Core Components

The codebase follows a layered architecture with clear separation of concerns:

1. **Server Layer** (`src/index.ts`)
   - MCP protocol handling via stdio transport
   - Server initialization and lifecycle management
   - Error handling and graceful shutdown
   - Registers tools, resources, and prompts

2. **API Client Layer** (`src/plainly-client.ts`)
   - `PlainlyClient` class wraps all Plainly API v2 endpoints
   - Handles HTTP communication via axios
   - Provides type-safe methods for all API operations
   - Centralizes error handling and response parsing
   - Methods organized by category: projects, templates, renders, assets, analytics, webhooks

3. **Tools Layer** (`src/tools/index.ts`)
   - `registerTools()` exports all 25+ tool definitions
   - Each tool has schema validation using Zod
   - Tools call PlainlyClient methods and format responses
   - Categories: project management (5), template operations (2), render management (9), asset management (3), analytics (1), webhooks (3)

4. **Resources Layer** (`src/resources/index.ts`)
   - Provides read-only access to Plainly data via URIs
   - Static resources: `plainly://projects`, `plainly://renders/recent`, `plainly://renders/completed`, `plainly://renders/failed`, `plainly://renders/pending`, `plainly://assets`, `plainly://stats/overview`, `plainly://webhooks`
   - Dynamic resources: `plainly://projects/{id}`, `plainly://renders/{id}`
   - Returns formatted JSON data

5. **Prompts Layer** (`src/prompts/index.ts`)
   - 8 pre-built workflow templates for common tasks
   - Prompts accept arguments and generate instructions for the AI
   - Workflows: social media video creation, batch rendering, personalized greetings, progress checking, complete video workflow, analytics, troubleshooting, webhook setup

### Key Design Principles

- **Type Safety**: Full TypeScript with strict mode enabled, Zod validation for runtime checks
- **Error Handling**: Comprehensive error messages with context and suggestions
- **Stateless**: No state between requests, enables horizontal scaling
- **API Abstraction**: PlainlyClient isolates API details from tool implementations
- **MCP Standard**: Follows Model Context Protocol specification for tools, resources, and prompts

## Important Implementation Details

### PlainlyClient Methods

When adding new functionality, use existing PlainlyClient methods or add new ones following this pattern:
```typescript
async methodName(params): Promise<ReturnType> {
  const response = await this.client.post('/api/v2/endpoint', data);
  return response.data;
}
```

All methods should:
- Use async/await
- Handle errors appropriately
- Return typed responses
- Include JSDoc comments

### Tool Implementation Pattern

Tools in `src/tools/index.ts` follow this structure:
```typescript
{
  name: "tool_name",
  description: "What the tool does",
  inputSchema: zodToJsonSchema(ParamsSchema),
  handler: async (params) => {
    // Validate params (Zod does this automatically)
    // Call PlainlyClient method
    // Format response for user
    // Return content array with text messages
  }
}
```

### Resource URI Patterns

Resources use URI-based routing:
- Static: Direct API call (e.g., `plainly://projects` → list all projects)
- Dynamic: Parse ID from URI (e.g., `plainly://projects/{id}` → get specific project)

### Environment Configuration

- `PLAINLY_API_KEY` (required) - API key for Plainly Videos
- API base URL is hardcoded to `https://api.plainlyvideos.com`

### Authentication

Plainly Videos API uses **HTTP Basic Authentication**:
- The API key is used as the username
- Password is empty
- Format: `Authorization: Basic {base64(apiKey:)}`
- Implementation in constructor:
  ```typescript
  const basicAuth = Buffer.from(`${apiKey}:`).toString('base64');
  Authorization: `Basic ${basicAuth}`
  ```

### Error Messages

Format errors with context and actionable suggestions:
```typescript
throw new Error(`Failed to create render: ${error.message}. Check that project ID is valid and parameters match template requirements.`);
```

## Code Style

- ES modules (`"type": "module"` in package.json)
- NodeNext module resolution
- Async/await over promises
- Functional style preferred for tools/resources/prompts
- Class-based for API client
- Minimal dependencies (axios, zod, @modelcontextprotocol/sdk)

## Common Patterns

### Adding a New Tool
1. Add method to PlainlyClient if needed
2. Define Zod schema for parameters
3. Add tool definition in `src/tools/index.ts` registerTools function
4. Test with MCP Inspector
5. Document in EXAMPLES.md

### Adding a New Resource
1. Add URI pattern handler in `src/resources/index.ts`
2. Call appropriate PlainlyClient method
3. Format as JSON with proper structure
4. Update README.md with new resource URI

### Adding a New Prompt
1. Define prompt in `src/prompts/index.ts`
2. Add argument schema
3. Create message generator function
4. Document workflow in EXAMPLES.md

## API Key Management

Never hardcode API keys. Always use environment variables. The server reads `PLAINLY_API_KEY` on startup and fails fast if not present.

## Build Output

- Source: `src/**/*.ts`
- Output: `dist/**/*.js`
- Entry point: `dist/index.js` (shebang for CLI execution)
- The build process ensures the entry point is executable

## Notes for AI Assistants

- When users ask about "renders", they mean video renders/jobs
- "Template" refers to After Effects templates in Plainly
- "Parameters" are the customizable fields in templates (text, images, etc.)
- Batch operations should be chunked (50-100 items) for performance
- Status polling is necessary - renders aren't instant
- Always validate template parameters before creating renders
