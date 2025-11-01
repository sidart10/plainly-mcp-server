# Plainly MCP Server - Example Configuration

## Environment Variables

### Required
PLAINLY_API_KEY=your_api_key_here

## Claude Desktop Configuration

### macOS
File: ~/Library/Application Support/Claude/claude_desktop_config.json

```json
{
  "mcpServers": {
    "plainly-videos": {
      "command": "npx",
      "args": ["-y", "@plainly-videos/mcp-server-pro@latest"],
      "env": {
        "PLAINLY_API_KEY": "pk_live_..."
      }
    }
  }
}
```

### Windows
File: %APPDATA%\Claude\claude_desktop_config.json

Same JSON as above.

## Development Configuration

For local development:

```json
{
  "mcpServers": {
    "plainly-videos-dev": {
      "command": "node",
      "args": ["/absolute/path/to/plainly-mcp-server/dist/index.js"],
      "env": {
        "PLAINLY_API_KEY": "pk_test_..."
      }
    }
  }
}
```

## Cursor IDE Configuration

Add to your Cursor settings:

```json
{
  "mcp": {
    "servers": {
      "plainly-videos": {
        "command": "npx",
        "args": ["-y", "@plainly-videos/mcp-server-pro"],
        "env": {
          "PLAINLY_API_KEY": "pk_live_..."
        }
      }
    }
  }
}
```

## Getting Your API Key

1. Go to https://app.plainlyvideos.com/dashboard/user/settings/general
2. Click "Create New API Key"
3. Copy the key (starts with `pk_`)
4. Add it to your configuration

⚠️ **Security Note**: Never commit API keys to version control!
