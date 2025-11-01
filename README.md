# Plainly Videos MCP Server Pro

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-%3E%3D18.0.0-green.svg)](https://nodejs.org/)

A comprehensive Model Context Protocol (MCP) server for [Plainly Videos](https://www.plainlyvideos.com/) that provides full API access, resources, and intelligent prompts for automated video creation.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development
npm run dev
```

## 📖 Documentation

- **[Getting Started](docs/QUICKSTART.md)** - Quick setup guide
- **[Setup Guide](docs/SETUP_GUIDE.md)** - Detailed configuration
- **[Examples](docs/EXAMPLES.md)** - Usage examples
- **[Agent Workflows](docs/AGENT_WORKFLOWS.md)** - AI agent integration patterns
- **[Architecture](docs/ARCHITECTURE.md)** - System design
- **[API Reference](docs/QUICK_REFERENCE.md)** - Complete API docs

## ✨ Features

### 21+ Tools for Full API Coverage

**Projects** - `list_projects`, `get_project`, `create_project`, `update_project`, `delete_project`

**Templates** - `list_templates`, `get_template`

**Renders** - `create_render`, `get_render`, `list_renders`, `cancel_render`, `delete_render`, `retry_render`, `batch_render`

**Assets** - `list_assets`, `upload_asset`, `delete_asset`

**Analytics** - `get_render_stats`

**Webhooks** - `list_webhooks`, `create_webhook`, `delete_webhook`

### 8 Pre-Built Resources

Quick access to data via URIs:
- `plainly://projects` - All projects
- `plainly://renders/{status}` - Renders by status
- `plainly://assets` - Asset library
- `plainly://stats/overview` - Analytics
- `plainly://webhooks` - Webhook config

### 8 Intelligent Workflow Prompts

- `create-social-media-video` - Quick social content
- `batch-product-videos` - Bulk generation
- `personalized-greeting` - Custom videos
- `check-render-progress` - Status monitoring
- `video-workflow` - Complete pipeline
- `analyze-render-stats` - Performance analytics
- `troubleshoot-failed-renders` - Debug helper
- `setup-webhook` - Notification setup

## 📦 Installation

### Prerequisites

- Node.js ≥ 18.0.0
- Plainly API Key ([Get one here](https://app.plainlyvideos.com/dashboard/user/settings/general))

### Option 1: NPM (Recommended)

```bash
npm install -g @plainly-videos/mcp-server-pro
```

### Option 2: From Source

```bash
git clone https://github.com/sidart10/plainly-mcp-server.git
cd plainly-mcp-server
npm install
npm run build
```

## ⚙️ Configuration

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "plainly-videos": {
      "command": "node",
      "args": ["/path/to/plainly-mcp-server/dist/index.js"],
      "env": {
        "PLAINLY_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

See [docs/CLAUDE_DESKTOP_CONFIG.md](docs/CLAUDE_DESKTOP_CONFIG.md) for detailed setup.

## 🎯 Usage Examples

### Create a Single Video

```
Use create_render to make a tutorial video with:
- title: "JavaScript Promises"
- code: "const promise = new Promise(...)"
- explanation: "Promises handle async operations"
```

### Batch Create Videos

```
Create 50 tutorial videos from this CSV data:
[CSV content with title, code, explanation columns]
```

### Check Status

```
What's the status of my renders?
```

See [docs/EXAMPLES.md](docs/EXAMPLES.md) for 100+ examples.

## 🏗️ Project Structure

```
plainly-mcp-server/
├── src/
│   ├── index.ts              # Server entry point
│   ├── plainly-client.ts     # API client
│   ├── tools/                # Tool definitions
│   ├── resources/            # Resource providers
│   └── prompts/              # Workflow prompts
├── docs/                     # Documentation
├── examples/                 # Example scripts
├── scripts/                  # Build/setup scripts
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Development mode with auto-reload
npm run watch

# Test with MCP Inspector
npm run inspect
```

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆚 Why This Server?

| Feature | Basic Server | This Server |
|---------|--------------|-------------|
| Tools | 4 | 21+ |
| Resources | 0 | 8 |
| Prompts | 0 | 8 |
| API Coverage | 15% | 100% |
| Documentation | Minimal | Extensive |
| Error Handling | Basic | Production-grade |
| Agent Support | No | Yes |

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/sidart10/plainly-mcp-server/issues)
- **Email**: support@plainlyvideos.com
- **Website**: [plainlyvideos.com](https://www.plainlyvideos.com/)

## 🙏 Acknowledgments

Built with the Model Context Protocol by Anthropic. Special thanks to:
- [Plainly Videos](https://www.plainlyvidos.com/) for the API
- [Anthropic](https://www.anthropic.com/) for MCP
- Open source community

---

**Built with ❤️ for automated video creation**
