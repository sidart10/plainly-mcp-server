# Claude Desktop Configuration for Plainly MCP Server

Quick reference for setting up the Plainly MCP Server in Claude Desktop.

## Configuration File Location

### macOS
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

### Windows
```
%APPDATA%\Claude\claude_desktop_config.json
```

### Linux
```
~/.config/Claude/claude_desktop_config.json
```

## Full Configuration

Copy this configuration into your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "plainly-videos": {
      "command": "node",
      "args": [
        "/Users/sid/Desktop/4. Coding Projects/plainly-mcp-server/dist/index.js"
      ],
      "env": {
        "PLAINLY_API_KEY": "x6d4qcL3NvfWtcRCpsSjCNNVOQJiaoib"
      }
    }
  }
}
```

**Important:** Replace the path with your actual path to the server if different.

## If You Have Multiple MCP Servers

If you already have other servers configured, add the plainly-videos server to the existing configuration:

```json
{
  "mcpServers": {
    "your-existing-server": {
      "command": "...",
      "args": ["..."]
    },
    "plainly-videos": {
      "command": "node",
      "args": [
        "/Users/sid/Desktop/4. Coding Projects/plainly-mcp-server/dist/index.js"
      ],
      "env": {
        "PLAINLY_API_KEY": "x6d4qcL3NvfWtcRCpsSjCNNVOQJiaoib"
      }
    }
  }
}
```

## Step-by-Step Setup

### Step 1: Locate Configuration File

**macOS:**
```bash
open ~/Library/Application\ Support/Claude/
```

**Windows:**
```powershell
explorer %APPDATA%\Claude
```

### Step 2: Edit Configuration

1. Open `claude_desktop_config.json` in a text editor
2. If the file doesn't exist, create it with the configuration above
3. If it exists, add the plainly-videos server to the mcpServers object

### Step 3: Verify Path

Make sure the path in `args` points to your actual server location:

```bash
# Check if the file exists
ls -la "/Users/sid/Desktop/4. Coding Projects/plainly-mcp-server/dist/index.js"
```

Should show something like:
```
-rwxr-xr-x  1 sid  staff  1536 Nov  1 00:28 /Users/sid/Desktop/4. Coding Projects/plainly-mcp-server/dist/index.js
```

### Step 4: Restart Claude Desktop

1. Quit Claude Desktop completely (Cmd+Q on macOS)
2. Wait a few seconds
3. Reopen Claude Desktop

### Step 5: Verify Server is Loaded

In Claude Desktop:
1. Look for MCP server indicators
2. Try asking: "What Plainly tools are available?"
3. You should see tools listed

## Testing Commands

Once configured, test with these commands:

### Test 1: List Projects
```
List my Plainly projects
```

### Test 2: Check Server Status
```
What MCP servers are connected?
```

### Test 3: View Available Tools
```
Show me all Plainly video tools
```

## Troubleshooting

### Issue: Server Not Showing Up

**Check 1: Valid JSON**
Make sure your config file is valid JSON (no trailing commas, proper quotes)

**Check 2: Correct Path**
Verify the path to `dist/index.js` is correct:
```bash
cat "/Users/sid/Desktop/4. Coding Projects/plainly-mcp-server/dist/index.js" | head -1
```
Should show: `#!/usr/bin/env node`

**Check 3: Permissions**
Make sure the file is executable:
```bash
chmod +x "/Users/sid/Desktop/4. Coding Projects/plainly-mcp-server/dist/index.js"
```

**Check 4: Node.js Installed**
Verify Node.js is available:
```bash
node --version
```
Should show v18.0.0 or higher

### Issue: Authentication Errors

**Check 1: API Key Format**
Make sure there are no extra spaces or newlines in the API key

**Check 2: Key Validity**
Test the API key with curl:
```bash
curl -u "x6d4qcL3NvfWtcRCpsSjCNNVOQJiaoib:" https://api.plainlyvideos.com/api/v2/projects
```

Should return JSON (not 401 error)

### Issue: Server Crashes

**Check Logs:**
Claude Desktop logs are usually in:
- macOS: `~/Library/Logs/Claude/`
- Windows: `%APPDATA%\Claude\logs\`

Look for error messages related to "plainly-videos"

## Advanced Configuration

### Using Environment File

Instead of hardcoding the API key, you can reference an environment variable:

1. Set the environment variable system-wide:
```bash
# Add to ~/.zshrc or ~/.bash_profile
export PLAINLY_API_KEY="x6d4qcL3NvfWtcRCpsSjCNNVOQJiaoib"
```

2. Configure without the env section:
```json
{
  "mcpServers": {
    "plainly-videos": {
      "command": "node",
      "args": [
        "/Users/sid/Desktop/4. Coding Projects/plainly-mcp-server/dist/index.js"
      ]
    }
  }
}
```

The server will read from the system environment.

### Custom Server Name

You can change "plainly-videos" to any name you prefer:

```json
{
  "mcpServers": {
    "my-video-server": {
      "command": "node",
      "args": ["/path/to/dist/index.js"],
      "env": {
        "PLAINLY_API_KEY": "your-key"
      }
    }
  }
}
```

## Quick Copy Configuration

**Replace `YOUR_API_KEY_HERE` with your actual API key:**

```json
{
  "mcpServers": {
    "plainly-videos": {
      "command": "node",
      "args": ["/Users/sid/Desktop/4. Coding Projects/plainly-mcp-server/dist/index.js"],
      "env": {
        "PLAINLY_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

## Ready to Use! 🎬

Once configured and verified, you can start using Claude to:
- Create videos
- Manage projects
- Check render status
- Automate video workflows
- Analyze performance
- And much more!

Try: "Help me create a social media video for my product launch"

---

**Need Help?** Check SETUP_GUIDE.md for detailed instructions.
