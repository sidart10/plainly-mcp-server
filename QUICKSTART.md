# 🚀 Plainly MCP Server - Quick Start

Get up and running in 5 minutes!

## Step 1: Verify Installation (30 seconds)

```bash
cd /Users/sid/Desktop/4.\ Coding\ Projects/plainly-mcp-server

# Check build exists
ls dist/index.js

# Should show: dist/index.js ✅
```

## Step 2: Configure Claude Desktop (2 minutes)

### Open config file:
```bash
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### Add this configuration:
```json
{
  "mcpServers": {
    "plainly-videos": {
      "command": "node",
      "args": ["/Users/sid/Desktop/4. Coding Projects/plainly-mcp-server/dist/index.js"],
      "env": {
        "PLAINLY_API_KEY": "x6d4qcL3NvfWtcRCpsSjCNNVOQJiaoib"
      }
    }
  }
}
```

**Save the file!**

## Step 3: Restart Claude Desktop (30 seconds)

1. Quit Claude Desktop (Cmd+Q)
2. Wait 3 seconds
3. Open Claude Desktop again

## Step 4: Test It! (1 minute)

In Claude Desktop, try these commands:

### Test 1: Check server is loaded
```
What Plainly tools are available?
```

Should list 21 tools ✅

### Test 2: List projects
```
List my Plainly projects
```

Should return project data ✅

### Test 3: Create a video
```
Help me create a social media video
```

Claude will guide you through the process ✅

## ✅ You're Done!

The server is now connected to Claude Desktop and ready to use.

## What You Can Do Now

**Create Videos:**
```
Create a video with title "Summer Sale" for project abc-123
```

**Check Status:**
```
What's the status of my recent renders?
```

**Batch Creation:**
```
Create 10 product videos from this data: [your data]
```

**Analytics:**
```
Show me my rendering statistics for this month
```

## Need More Help?

- **Quick Reference:** See CLAUDE_DESKTOP_CONFIG.md
- **Full Setup:** See SETUP_GUIDE.md
- **Examples:** See EXAMPLES.md
- **Troubleshooting:** See SETUP_GUIDE.md

## Common Issues

### Server not showing in Claude?
1. Check config file is valid JSON
2. Verify path is correct
3. Restart Claude Desktop completely

### Getting authentication errors?
1. Check API key is correct in config
2. Make sure there are no extra spaces
3. Verify key is from Plainly dashboard

### Need to rebuild?
```bash
npm run build
```

Then restart Claude Desktop.

---

**That's it! You're ready to create videos with AI! 🎬**
