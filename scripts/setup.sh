#!/bin/bash

# Plainly MCP Server Pro - Quick Setup Script

echo "🎬 Plainly MCP Server Pro - Setup"
echo "=================================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher"
    echo "Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Build project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"
echo ""

# Check for API key
if [ -z "$PLAINLY_API_KEY" ]; then
    echo "⚠️  PLAINLY_API_KEY environment variable not set"
    echo ""
    echo "To get your API key:"
    echo "1. Go to https://app.plainlyvideos.com/dashboard/user/settings/general"
    echo "2. Click 'Create New API Key'"
    echo "3. Copy the key"
    echo ""
    echo "Then add to your config:"
    echo '  "env": { "PLAINLY_API_KEY": "your-key-here" }'
else
    echo "✅ PLAINLY_API_KEY is set"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add to your Claude Desktop config:"
echo "   - macOS: ~/Library/Application Support/Claude/claude_desktop_config.json"
echo "   - Windows: %APPDATA%\\Claude\\claude_desktop_config.json"
echo ""
echo "2. Add this configuration:"
echo '   {'
echo '     "mcpServers": {'
echo '       "plainly-videos": {'
echo '         "command": "node",'
echo '         "args": ["'$(pwd)/dist/index.js'"],'
echo '         "env": {'
echo '           "PLAINLY_API_KEY": "your-api-key-here"'
echo '         }'
echo '       }'
echo '     }'
echo '   }'
echo ""
echo "3. Restart Claude Desktop"
echo ""
echo "4. Test with: 'Show me all my Plainly projects'"
echo ""
echo "📚 Documentation:"
echo "   - README.md     - Quick start"
echo "   - EXAMPLES.md   - Usage examples"
echo "   - CONFIG.md     - Configuration guide"
echo "   - COMPARISON.md - vs Original server"
echo ""
echo "💬 Need help? Check out the docs or visit:"
echo "   https://help.plainlyvideos.com"
echo ""
