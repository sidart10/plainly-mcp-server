# Plainly MCP Server - Setup Guide

Complete guide to set up and use the Plainly Videos MCP Server with Claude Desktop and other MCP clients.

## Prerequisites

- Node.js >= 18.0.0
- A Plainly Videos account with API key
- Claude Desktop (or any MCP-compatible client)

## Getting Your API Key

1. Go to [Plainly Dashboard](https://app.plainlyvideos.com/dashboard)
2. Navigate to **Organization Settings → API Keys**
3. Create or copy your API key
4. Keep it secure - you'll need it for configuration

## Installation Methods

### Method 1: From Source (Current Setup)

Since you already have the source code:

```bash
cd /Users/sid/Desktop/4. Coding Projects/plainly-mcp-server

# Install dependencies
npm install

# Build the project
npm run build

# Verify it works
node dist/index.js
```

### Method 2: Global Installation (Future)

Once published to npm:

```bash
npm install -g @plainly-videos/mcp-server-pro
```

## Configuration

### For Claude Desktop

#### macOS

Edit: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "plainly-videos": {
      "command": "node",
      "args": ["/Users/sid/Desktop/4. Coding Projects/plainly-mcp-server/dist/index.js"],
      "env": {
        "PLAINLY_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

#### Windows

Edit: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "plainly-videos": {
      "command": "node",
      "args": ["C:\\path\\to\\plainly-mcp-server\\dist\\index.js"],
      "env": {
        "PLAINLY_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### For Other MCP Clients

#### Cursor

Add to your Cursor settings:

```json
{
  "mcp": {
    "servers": {
      "plainly-videos": {
        "command": "node",
        "args": ["/Users/sid/Desktop/4. Coding Projects/plainly-mcp-server/dist/index.js"],
        "env": {
          "PLAINLY_API_KEY": "your-api-key-here"
        }
      }
    }
  }
}
```

#### Windsurf / Cline / Other Clients

Most MCP clients follow a similar pattern. Check their documentation for the exact configuration file location.

## Verification

After configuring, restart your MCP client and verify:

### 1. Check Server is Loaded

In Claude Desktop, you should see "plainly-videos" in the MCP servers list.

### 2. Test a Simple Query

Try asking:
```
List my Plainly projects
```

Claude should use the `list_projects` tool automatically.

### 3. Check Available Tools

Ask Claude:
```
What Plainly tools are available?
```

You should see 21 tools across 6 categories.

## Usage Examples

### Creating a Video

```
Create a video for my summer sale campaign using project ID abc-123 with these parameters:
- title: "Summer Sale 2024"
- subtitle: "50% Off Everything"
- background_image: "https://example.com/beach.jpg"
```

### Checking Render Status

```
What's the status of my recent renders?
```

### Batch Video Creation

```
Create product videos for these items:
1. Widget Pro - $99.99
2. Widget Lite - $49.99
3. Widget Max - $149.99
```

### Using Prompts

```
Use the create-social-media-video prompt with:
- projectId: abc-123
- title: "New Product Launch"
- description: "Available now!"
```

## Available Capabilities

### Tools (21)

**Project Management**
- `list_projects` - List all projects
- `get_project` - Get project details
- `create_project` - Create new project
- `update_project` - Update existing project
- `delete_project` - Delete project

**Template Operations**
- `list_templates` - List project templates
- `get_template` - Get template details and parameters

**Render Management**
- `create_render` - Create new video render
- `get_render` - Check render status
- `list_renders` - List renders with filtering
- `cancel_render` - Cancel pending render
- `delete_render` - Delete render
- `retry_render` - Retry failed render
- `batch_render` - Bulk render videos

**Asset Management**
- `list_assets` - List uploaded assets
- `upload_asset` - Register asset URL
- `delete_asset` - Remove asset

**Analytics**
- `get_render_stats` - Get performance metrics

**Webhooks**
- `list_webhooks` - List webhooks
- `create_webhook` - Setup notifications
- `delete_webhook` - Remove webhook

### Resources (8)

- `plainly://projects` - All projects
- `plainly://renders/recent` - Recent renders
- `plainly://renders/completed` - Completed videos
- `plainly://renders/failed` - Failed renders
- `plainly://renders/pending` - In-progress renders
- `plainly://assets` - Asset library
- `plainly://stats/overview` - Statistics
- `plainly://webhooks` - Webhook config

### Prompts (8)

1. **create-social-media-video** - Quick social media content
2. **batch-product-videos** - Bulk product videos
3. **personalized-greeting** - Custom greeting videos
4. **check-render-progress** - Monitor rendering
5. **video-workflow** - Complete creation workflow
6. **analyze-render-stats** - Performance analytics
7. **troubleshoot-failed-renders** - Debug failures
8. **setup-webhook** - Configure notifications

## Troubleshooting

### Server Not Loading

**Issue:** Claude Desktop doesn't show the server

**Solutions:**
1. Verify the path to `dist/index.js` is correct
2. Make sure Node.js is installed and accessible
3. Check Claude Desktop logs for errors
4. Restart Claude Desktop completely

### Authentication Errors

**Issue:** Getting 401 Unauthorized errors

**Solutions:**
1. Verify your API key is correct
2. Check the API key has proper permissions
3. Ensure the key is from Organization Settings, not user settings
4. Make sure there are no extra spaces in the key

### Build Issues

**Issue:** `npm run build` fails

**Solutions:**
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Server Crashes

**Issue:** Server stops working unexpectedly

**Solutions:**
1. Check Node.js version (should be >= 18.0.0)
2. Review error logs in Claude Desktop
3. Try running in development mode: `npm run dev`
4. Check for network connectivity issues

## Development

### Running in Development Mode

```bash
npm run dev
```

This uses `tsx` to run TypeScript directly without building.

### Watching for Changes

```bash
npm run watch
```

Automatically restarts when files change.

### Testing with MCP Inspector

```bash
npm run inspect
```

Opens a web interface to test tools, resources, and prompts.

### Making Changes

1. Edit files in `src/`
2. Run `npm run build` to compile
3. Restart your MCP client to load changes

## Project Structure

```
plainly-mcp-server/
├── src/
│   ├── index.ts              # Server entry point
│   ├── plainly-client.ts     # API client
│   ├── tools/
│   │   └── index.ts          # Tool definitions
│   ├── resources/
│   │   └── index.ts          # Resource providers
│   └── prompts/
│       └── index.ts          # Prompt templates
├── dist/                     # Compiled output
├── .env                      # Environment variables
├── .mcp.json                # MCP configuration
├── package.json             # Dependencies
└── CLAUDE.md                # AI assistant guide
```

## Security Best Practices

1. **Never commit API keys** - Keep `.env` in `.gitignore`
2. **Use environment variables** - Don't hardcode credentials
3. **Restrict API key permissions** - Use least privilege
4. **Rotate keys regularly** - Generate new keys periodically
5. **Monitor usage** - Check API logs for suspicious activity

## Performance Tips

1. **Batch operations** - Use `batch_render` for multiple videos
2. **Cache project data** - Store frequently used project IDs
3. **Use webhooks** - Get notified when renders complete
4. **Filter queries** - Use specific filters in list operations
5. **Monitor rate limits** - Don't exceed API quotas

## Getting Help

- **Documentation:** https://help.plainlyvideos.com
- **API Reference:** https://app.plainlyvideos.com/api-reference.html
- **Support:** support@plainlyvideos.com
- **Discord:** https://discord.gg/plainly

## Next Steps

1. ✅ Server is installed and configured
2. ✅ Authentication is working
3. 📹 Start creating videos!

Try these to get started:
- List your projects
- Check available templates
- Create your first video render
- Set up a webhook for notifications

---

**Version:** 2.0.0
**Last Updated:** November 1, 2025
**Status:** Production Ready ✅
