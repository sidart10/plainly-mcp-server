# Plainly Videos MCP Server Pro 🎬

A comprehensive Model Context Protocol (MCP) server for [Plainly Videos](https://www.plainlyvideos.com/) that provides full API access, resources, and intelligent prompts for automated video creation.

## ✨ Features

### 🛠️ Complete Tool Suite (25+ Tools)

#### Project Management
- `list_projects` - List all video projects
- `get_project` - Get project details
- `create_project` - Create new projects
- `update_project` - Update project settings
- `delete_project` - Remove projects

#### Template Management
- `list_templates` - List templates for a project
- `get_template` - Get template details with parameters

#### Render Management
- `create_render` - Create new video renders
- `get_render` - Check render status
- `list_renders` - List renders with filtering
- `cancel_render` - Cancel pending renders
- `delete_render` - Delete renders
- `retry_render` - Retry failed renders
- `batch_render` - Bulk render multiple videos

#### Asset Management
- `list_assets` - List uploaded assets
- `upload_asset` - Register asset URLs
- `delete_asset` - Remove assets

#### Analytics
- `get_render_stats` - Get performance metrics

#### Webhook Management
- `list_webhooks` - List configured webhooks
- `create_webhook` - Setup notifications
- `delete_webhook` - Remove webhooks

### 📦 Resources

Pre-defined resources for quick access to data:

- `plainly://projects` - All projects overview
- `plainly://renders/recent` - Recent renders
- `plainly://renders/completed` - Completed videos
- `plainly://renders/failed` - Failed renders for debugging
- `plainly://renders/pending` - In-progress renders
- `plainly://assets` - Asset library
- `plainly://stats/overview` - Statistics dashboard
- `plainly://webhooks` - Webhook configuration
- `plainly://projects/{id}` - Specific project details
- `plainly://renders/{id}` - Specific render details

### 💡 Intelligent Prompts

Pre-built workflows for common tasks:

1. **create-social-media-video** - Quick social media content
2. **batch-product-videos** - Bulk product video generation
3. **personalized-greeting** - Custom greeting videos
4. **check-render-progress** - Monitor rendering status
5. **video-workflow** - Complete creation workflow
6. **analyze-render-stats** - Performance analytics
7. **troubleshoot-failed-renders** - Debug failed renders
8. **setup-webhook** - Configure notifications

## 🚀 Installation

### Prerequisites

- Node.js ≥ 18.0.0
- Plainly API Key ([Get one here](https://app.plainlyvideos.com/dashboard/user/settings/general))

### Method 1: NPM (Recommended)

```bash
npm install -g @plainly-videos/mcp-server-pro
```

### Method 2: From Source

```bash
git clone https://github.com/plainly-videos/mcp-server-pro.git
cd mcp-server-pro
npm install
npm run build
npm link
```

## ⚙️ Configuration

### Claude Desktop

Add to your Claude Desktop config:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "plainly-videos": {
      "command": "npx",
      "args": ["-y", "@plainly-videos/mcp-server-pro@latest"],
      "env": {
        "PLAINLY_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Other MCP Clients

For other MCP clients (Cursor, Windsurf, etc.), use:

```bash
plainly-mcp
```

With environment variable:
```bash
PLAINLY_API_KEY=your-api-key-here plainly-mcp
```

## 📖 Usage Examples

### Example 1: Create a Social Media Video

```
Use the create-social-media-video prompt with:
- projectId: abc123
- title: "New Product Launch!"
- description: "Check out our latest innovation"
```

### Example 2: Batch Product Videos

```
Create product videos for my e-commerce catalog using batch-product-videos:
- projectId: abc123
- products: [
    {"name": "Widget Pro", "price": "$99", "image": "https://..."},
    {"name": "Widget Plus", "price": "$79", "image": "https://..."}
  ]
```

### Example 3: Check Render Progress

```
What's the status of my renders?
```

The assistant will use the `check-render-progress` prompt to show all renders grouped by status.

### Example 4: Create Custom Render

```
Create a video for project abc123 with these parameters:
- headline: "Summer Sale"
- discount: "50% OFF"
- background_image: "https://example.com/beach.jpg"
```

The assistant will use the `create_render` tool directly.

### Example 5: Analytics

```
Analyze my rendering performance for the past month
```

Uses `analyze-render-stats` to provide insights and recommendations.

## 🔍 Advanced Usage

### Working with Resources

Access data directly through resources:

```
Show me all my projects
```

Reads from `plainly://projects` resource.

```
What renders failed today?
```

Reads from `plainly://renders/failed` resource.

### Batch Operations

```
Create 100 personalized videos from this CSV data...
```

Uses `batch_render` tool for efficient bulk processing.

### Webhook Integration

```
Setup a webhook at https://myapp.com/plainly-webhook for render completion
```

Uses `create_webhook` tool with proper event configuration.

## 🆚 Comparison: Original vs Pro

| Feature | Original Server | Pro Server |
|---------|----------------|------------|
| Tools | 4 | 25+ |
| Resources | ❌ | ✅ 8+ predefined |
| Prompts | ❌ | ✅ 8 workflows |
| Project Management | ❌ | ✅ Full CRUD |
| Asset Management | ❌ | ✅ Complete |
| Analytics | ❌ | ✅ Statistics |
| Webhook Support | ❌ | ✅ Full management |
| Batch Rendering | ❌ | ✅ Yes |
| Error Handling | Basic | ✅ Comprehensive |
| Retry Logic | ❌ | ✅ Built-in |
| Progress Monitoring | Manual | ✅ Automated |

## 🏗️ Architecture

```
plainly-mcp-server-pro/
├── src/
│   ├── index.ts              # Main server entry
│   ├── plainly-client.ts     # API client
│   ├── tools/
│   │   └── index.ts          # Tool definitions
│   ├── resources/
│   │   └── index.ts          # Resource providers
│   └── prompts/
│       └── index.ts          # Prompt templates
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Development

### Build

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Testing with MCP Inspector

```bash
npm run inspect
```

## 🤝 API Compatibility

This server implements the full Plainly API v2:

- ✅ Projects API
- ✅ Templates API
- ✅ Renders API
- ✅ Assets API
- ✅ Webhooks API
- ✅ Analytics API

## 📝 Error Handling

The server provides comprehensive error messages:

```
❌ Error: Plainly API Error: 404 - Project not found
```

With helpful context and suggestions for resolution.

## 🔐 Security

- API keys are passed via environment variables
- No credentials stored in code
- HTTPS enforced for all API calls
- Webhook signature verification recommended

## 📊 Performance

- Concurrent request handling
- Automatic retry for transient failures
- Efficient batch processing
- Response caching where appropriate

## 🐛 Troubleshooting

### Issue: "PLAINLY_API_KEY not found"

**Solution**: Ensure environment variable is set in your MCP client config.

### Issue: "Cannot find module"

**Solution**: Run `npm run build` before using the server.

### Issue: Renders timing out

**Solution**: Use the `get_render` tool to check status periodically rather than blocking.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

- 📧 Email: support@plainlyvideos.com
- 📚 Docs: https://help.plainlyvideos.com
- 💬 Discord: https://discord.gg/plainly

## 🎯 Roadmap

- [ ] Streaming render progress updates
- [ ] Template version management
- [ ] Collaborative editing support
- [ ] Advanced analytics dashboards
- [ ] AI-powered parameter suggestions
- [ ] Template marketplace integration

## ⭐ Star History

If you find this server useful, please give it a star on GitHub!

---

**Built with ❤️ for the Plainly Videos community**
