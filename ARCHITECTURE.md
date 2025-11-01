# Plainly MCP Server Pro - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Claude / MCP Client                      │
│                  (User Interface Layer)                      │
└────────────────────────┬────────────────────────────────────┘
                         │ MCP Protocol (stdio)
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  MCP Server (index.ts)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Server Capabilities                      │  │
│  │  • Tools      • Resources      • Prompts             │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬────────────┬────────────┬────────────────────┘
             │            │            │
    ┌────────▼───┐  ┌────▼─────┐  ┌──▼────────┐
    │   Tools    │  │Resources │  │  Prompts  │
    │  Layer     │  │  Layer   │  │  Layer    │
    └────────┬───┘  └────┬─────┘  └──┬────────┘
             │            │            │
             └────────────┼────────────┘
                          │
              ┌───────────▼──────────┐
              │   Plainly Client     │
              │   (API Abstraction)  │
              └───────────┬──────────┘
                          │ HTTPS
              ┌───────────▼──────────┐
              │   Plainly API v2     │
              │ api.plainlyvideos.com│
              └──────────────────────┘
```

## Component Details

### 1. MCP Server (index.ts)
**Responsibility**: Protocol handling and routing

```typescript
- Initialize PlainlyClient
- Register tools/resources/prompts
- Handle MCP protocol
- Error management
- Transport layer (stdio)
```

**Lines of Code**: ~60

### 2. Plainly Client (plainly-client.ts)
**Responsibility**: API abstraction layer

```typescript
- HTTP client configuration
- API endpoint wrappers
- Error handling & parsing
- Type definitions
- Response transformation
```

**Lines of Code**: ~350

**Methods**:
- Project Management (5 methods)
- Template Management (2 methods)
- Render Management (9 methods)
- Asset Management (3 methods)
- Analytics (1 method)
- Webhooks (3 methods)

### 3. Tools Layer (tools/index.ts)
**Responsibility**: Business logic and operations

```typescript
- 25+ tool implementations
- Parameter validation
- Response formatting
- User-friendly messages
- Tool schema definitions
```

**Lines of Code**: ~600

**Tool Categories**:
1. Projects (5 tools)
2. Templates (2 tools)
3. Renders (9 tools)
4. Assets (3 tools)
5. Analytics (1 tool)
6. Webhooks (3 tools)

### 4. Resources Layer (resources/index.ts)
**Responsibility**: Data exposure

```typescript
- Resource URI routing
- Data fetching & caching
- JSON formatting
- Dynamic resource handling
```

**Lines of Code**: ~250

**Resources**:
- Static (8 resources)
- Dynamic (project/render specific)

### 5. Prompts Layer (prompts/index.ts)
**Responsibility**: Workflow templates

```typescript
- Prompt definitions
- Argument handling
- Message generation
- Workflow orchestration
```

**Lines of Code**: ~350

**Prompts**: 8 pre-built workflows

## Data Flow

### Example: Create Render

```
1. User → Claude
   "Create a video with title 'Summer Sale'"

2. Claude → MCP Server
   {
     tool: "create_render",
     arguments: {
       projectId: "abc-123",
       parameters: { title: "Summer Sale" }
     }
   }

3. MCP Server → Tools Layer
   Validates & processes request

4. Tools Layer → Plainly Client
   client.createRender(request)

5. Plainly Client → Plainly API
   POST /api/v2/renders
   {
     projectId: "abc-123",
     parameters: { title: "Summer Sale" }
   }

6. Plainly API → Plainly Client
   {
     id: "render-789",
     status: "pending",
     ...
   }

7. Plainly Client → Tools Layer
   Parsed response object

8. Tools Layer → MCP Server
   Formatted user message

9. MCP Server → Claude
   MCP protocol response

10. Claude → User
    "🎬 Render started!
     Render ID: render-789
     Status: pending"
```

## Error Flow

```
Error at Plainly API
        ↓
Caught by Plainly Client
        ↓
Wrapped with context
        ↓
Passed to Tools Layer
        ↓
Formatted for user
        ↓
Returned to Claude
        ↓
Displayed to user with suggestions
```

## Type Safety Flow

```
User Input
    ↓
MCP Protocol Validation
    ↓
Tool Schema Validation (Zod)
    ↓
TypeScript Compile-time Check
    ↓
Client Method Type Check
    ↓
API Request Type Check
    ↓
Runtime Validation
```

## Resource Access Pattern

```
Resource Request
       ↓
URI Parsing
       ↓
  Static? ──Yes──→ Direct API Call
       │
       No
       ↓
  Dynamic? ──Yes──→ Parse ID → API Call
       │
       No
       ↓
  Error: Unknown URI
```

## Prompt Execution Flow

```
Prompt Requested
       ↓
Get Prompt Template
       ↓
Substitute Arguments
       ↓
Generate Instructions
       ↓
Return to Claude
       ↓
Claude Executes Tools
       ↓
Multi-step Workflow
```

## Module Dependencies

```
index.ts
  ├── plainly-client.ts
  │     └── axios
  ├── tools/index.ts
  │     ├── plainly-client.ts
  │     └── zod
  ├── resources/index.ts
  │     └── plainly-client.ts
  └── prompts/index.ts
        └── plainly-client.ts
```

## Configuration Flow

```
Environment Variables
  ├── PLAINLY_API_KEY (required)
  └── NODE_ENV (optional)
         ↓
    Config Loading
         ↓
   Client Init
         ↓
  Server Start
         ↓
Ready for Requests
```

## Scaling Considerations

### Horizontal Scaling
```
Multiple MCP instances can run in parallel:
- Each with own API key
- Shared Plainly API backend
- No state between instances
- Stateless design enables scaling
```

### Rate Limiting
```
Plainly Client
    ↓
Rate Limit Check
    ↓
  Under limit? ──No──→ Queue Request
    ↓ Yes
Execute Request
```

### Caching Strategy
```
Resource Request
       ↓
  In Cache? ──Yes──→ Return Cached
       │
       No
       ↓
Fetch from API
       ↓
  Cache Result
       ↓
Return to User
```

## Error Handling Hierarchy

```
1. Network Errors
   → Retry with backoff

2. API Errors (4xx)
   → User-friendly message + fix suggestion

3. API Errors (5xx)
   → Retry + escalate if persistent

4. Validation Errors
   → Clear parameter guidance

5. Unknown Errors
   → Log + generic message
```

## Security Layers

```
1. API Key Protection
   - Environment variables only
   - Never in code/logs

2. HTTPS Enforcement
   - All API calls via HTTPS
   - Certificate validation

3. Input Validation
   - Schema validation
   - Type checking
   - Sanitization

4. Error Sanitization
   - No sensitive data in errors
   - Safe error messages
```

## Testing Strategy

```
Unit Tests
  ├── Client methods
  ├── Tool handlers
  ├── Resource providers
  └── Prompt generators

Integration Tests
  ├── End-to-end workflows
  ├── API mocking
  └── Error scenarios

Manual Testing
  ├── MCP Inspector
  ├── Claude Desktop
  └── Real API calls
```

## Deployment Architecture

```
Development
  ├── Local build
  ├── npm run dev
  └── MCP Inspector

Production
  ├── npm publish
  ├── npx execution
  └── Claude Desktop
```

## Performance Optimizations

1. **Batch Operations**
   - Parallel processing
   - Chunked requests
   - Progress tracking

2. **Caching**
   - Resource caching
   - Template caching
   - Project metadata

3. **Connection Pooling**
   - Axios keep-alive
   - Connection reuse
   - Timeout handling

4. **Lazy Loading**
   - Load templates on-demand
   - Fetch resources when needed
   - Dynamic resource loading

## Monitoring Points

```
1. API Calls
   - Count
   - Duration
   - Error rate

2. Tool Usage
   - Frequency
   - Success rate
   - Performance

3. Resource Access
   - Cache hits/misses
   - Load time
   - Access patterns

4. Error Rates
   - By type
   - By endpoint
   - By tool
```

## Extensibility Points

### Adding a New Tool
```
1. Add method to PlainlyClient
2. Add tool handler in tools/index.ts
3. Add tool schema
4. Document in EXAMPLES.md
```

### Adding a New Resource
```
1. Add resource URI pattern
2. Add handler in resources/index.ts
3. Document URI format
4. Update resource list
```

### Adding a New Prompt
```
1. Add prompt definition
2. Add argument schema
3. Add message generator
4. Document workflow
```

---

This architecture enables:
- ✅ Maintainability
- ✅ Extensibility
- ✅ Type safety
- ✅ Error resilience
- ✅ Performance
- ✅ Security
- ✅ Testability
