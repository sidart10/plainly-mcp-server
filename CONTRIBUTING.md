# Contributing to Plainly Videos MCP Server

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/plainly-mcp-server.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit and push
7. Create a Pull Request

## 📋 Development Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Test with MCP Inspector
npm run inspect
```

## 🎯 What to Contribute

### High Priority
- Bug fixes
- Documentation improvements
- Test coverage
- Performance optimizations
- New workflow prompts

### Medium Priority
- New tool implementations
- Enhanced error messages
- Code examples
- Integration guides

### Nice to Have
- UI improvements for examples
- Additional language support
- Advanced features

## 📝 Code Style

- Use TypeScript with strict mode
- Follow existing code patterns
- Add JSDoc comments for public APIs
- Use meaningful variable names
- Keep functions small and focused

### Example

```typescript
/**
 * Create a new video render
 * @param projectId - The project ID
 * @param parameters - Template parameters
 * @returns Render details with ID and status
 */
async createRender(
  projectId: string,
  parameters: Record<string, any>
): Promise<RenderResponse> {
  // Implementation
}
```

## 🧪 Testing

Before submitting:

1. Build succeeds: `npm run build`
2. No TypeScript errors
3. Test manually with MCP Inspector: `npm run inspect`
4. Verify documentation links work

## 📄 Documentation

When adding features:

1. Update README.md if needed
2. Add examples to docs/EXAMPLES.md
3. Update docs/QUICK_REFERENCE.md for API changes
4. Add workflow docs to docs/AGENT_WORKFLOWS.md if applicable

## 💬 Commit Messages

Follow this format:

```
type(scope): brief description

Detailed explanation if needed

Fixes #issue_number
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

Examples:
```
feat(tools): add video thumbnail generation tool

fix(client): handle API rate limiting properly

docs(examples): add batch rendering examples
```

## 🔍 Pull Request Process

1. Ensure your PR has a clear description
2. Link related issues
3. Update documentation
4. Add yourself to contributors if first PR
5. Wait for review
6. Address feedback
7. Merge when approved

## 🐛 Reporting Bugs

Include:
- Clear title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (Node version, OS, etc.)
- Error messages/logs

## 💡 Suggesting Features

Include:
- Clear use case
- Expected behavior
- Why it's useful
- Possible implementation approach

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on the code, not the person

## 📞 Questions?

- Open an issue for questions
- Tag with `question` label
- Check existing issues first

## 🏆 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Credited in documentation

Thank you for contributing! 🎉
