# Plainly MCP Server - Usage Examples

## Table of Contents
1. [Quick Start Examples](#quick-start-examples)
2. [Project Management](#project-management)
3. [Template Operations](#template-operations)
4. [Video Rendering](#video-rendering)
5. [Batch Operations](#batch-operations)
6. [Asset Management](#asset-management)
7. [Analytics & Monitoring](#analytics--monitoring)
8. [Webhook Integration](#webhook-integration)
9. [Advanced Workflows](#advanced-workflows)

---

## Quick Start Examples

### Create Your First Video

**User**: "Create a social media video for my summer sale"

**What happens**:
1. Assistant lists your projects
2. Asks which project/template to use
3. Creates render with your text
4. Monitors progress
5. Provides video URL when complete

### Check Render Status

**User**: "What's the status of my renders?"

**Assistant uses**: `list_renders` tool and shows:
- ✅ Completed: 15 videos (with URLs)
- 🔄 Processing: 3 videos (with progress %)
- ⏳ Pending: 5 videos
- ❌ Failed: 1 video (with error details)

---

## Project Management

### List All Projects

**User**: "Show me all my video projects"

```
Tool: list_projects
Result: Lists all projects with:
- Project ID
- Name
- Created date
- Aspect ratio
- Duration
```

### Create a New Project

**User**: "Create a new project called 'Holiday Campaign 2024'"

```
Tool: create_project
Parameters:
  name: "Holiday Campaign 2024"
  description: "Christmas and New Year video content"
```

### Get Project Details

**User**: "Show me details for project abc-123"

```
Tool: get_project
Parameters:
  projectId: "abc-123"
  
Returns:
- All project settings
- Available templates
- Recent renders
- Statistics
```

### Update Project

**User**: "Rename project abc-123 to 'Q1 2024 Campaign'"

```
Tool: update_project
Parameters:
  projectId: "abc-123"
  name: "Q1 2024 Campaign"
```

---

## Template Operations

### List Templates

**User**: "What templates are available for project abc-123?"

```
Tool: list_templates
Parameters:
  projectId: "abc-123"
  
Shows:
- Template names
- Required parameters
- Preview images
- Aspect ratios
```

### Get Template Details

**User**: "Show me the parameters for template xyz-789"

```
Tool: get_template
Parameters:
  projectId: "abc-123"
  templateId: "xyz-789"
  
Returns:
- All parameters (required & optional)
- Parameter types
- Default values
- Preview URL
```

---

## Video Rendering

### Simple Render

**User**: "Create a video with title 'Summer Sale' and subtitle '50% OFF'"

```
Tool: create_render
Parameters:
  projectId: "abc-123"
  parameters:
    title: "Summer Sale"
    subtitle: "50% OFF"
```

### Render with Images

**User**: "Create a video using this product image: https://example.com/product.jpg"

```
Tool: create_render
Parameters:
  projectId: "abc-123"
  parameters:
    title: "New Product"
    product_image: "https://example.com/product.jpg"
```

### Render with Custom Settings

**User**: "Create a 4K video in MP4 format"

```
Tool: create_render
Parameters:
  projectId: "abc-123"
  parameters:
    title: "4K Demo"
  output:
    format: "mp4"
    resolution: "3840x2160"
    quality: "high"
```

### Check Render Status

**User**: "What's the status of render xyz-123?"

```
Tool: get_render
Parameters:
  renderId: "xyz-123"
  
Shows:
- Status (pending/processing/completed/failed)
- Progress percentage
- Video URL (if completed)
- Error message (if failed)
```

### List Renders with Filtering

**User**: "Show me all completed renders from today"

```
Tool: list_renders
Parameters:
  status: "completed"
  
Filters can include:
- projectId
- status
- date range
```

### Cancel a Render

**User**: "Cancel render xyz-123"

```
Tool: cancel_render
Parameters:
  renderId: "xyz-123"
```

### Retry Failed Render

**User**: "Retry the failed render xyz-123"

```
Tool: retry_render
Parameters:
  renderId: "xyz-123"
  
Uses same parameters as original render
```

---

## Batch Operations

### Batch Product Videos

**User**: "Create videos for these products: [JSON data]"

```json
{
  "products": [
    {
      "name": "Widget Pro",
      "price": "$99.99",
      "image": "https://example.com/widget-pro.jpg",
      "features": "Premium quality, 2-year warranty"
    },
    {
      "name": "Widget Lite",
      "price": "$49.99",
      "image": "https://example.com/widget-lite.jpg",
      "features": "Great value, 1-year warranty"
    }
  ]
}
```

```
Tool: batch_render
Parameters:
  renders: [
    {
      projectId: "abc-123",
      parameters: { name: "Widget Pro", ... }
    },
    {
      projectId: "abc-123",
      parameters: { name: "Widget Lite", ... }
    }
  ]
```

### Batch with CSV

**User**: "Create videos from this CSV data"

Assistant will:
1. Parse CSV
2. Map columns to template parameters
3. Use `batch_render`
4. Monitor all renders
5. Provide summary with URLs

---

## Asset Management

### List Assets

**User**: "Show me all my uploaded images"

```
Tool: list_assets
Parameters:
  type: "image"
```

### Upload Asset

**User**: "Register this image for use in videos: https://example.com/logo.png"

```
Tool: upload_asset
Parameters:
  name: "Company Logo"
  url: "https://example.com/logo.png"
  type: "image"
  metadata:
    category: "logos"
    approved: true
```

### Delete Asset

**User**: "Delete asset xyz-789"

```
Tool: delete_asset
Parameters:
  assetId: "xyz-789"
```

---

## Analytics & Monitoring

### Get Statistics

**User**: "Show me my rendering statistics"

```
Tool: get_render_stats
Returns:
- Total renders
- Success rate
- Average duration
- Failed renders count
- Processing time metrics
```

### Project-Specific Stats

**User**: "Statistics for project abc-123"

```
Tool: get_render_stats
Parameters:
  projectId: "abc-123"
```

### Time-Based Stats

**User**: "Show stats for the last 30 days"

```
Tool: get_render_stats
Parameters:
  startDate: "2024-01-01"
  endDate: "2024-01-31"
```

### Resource-Based Monitoring

**User**: "Show me the statistics dashboard"

```
Resource: plainly://stats/overview
Provides:
- Real-time metrics
- Success rates
- Performance trends
- Cost analysis
```

---

## Webhook Integration

### List Webhooks

**User**: "What webhooks do I have configured?"

```
Tool: list_webhooks
Shows all active webhooks and their events
```

### Create Webhook

**User**: "Send me notifications when renders complete"

```
Tool: create_webhook
Parameters:
  url: "https://myapp.com/webhooks/plainly"
  events: ["render.completed", "render.failed"]
  active: true
```

### Delete Webhook

**User**: "Remove webhook xyz-123"

```
Tool: delete_webhook
Parameters:
  webhookId: "xyz-123"
```

### Webhook Event Types

Available events:
- `render.started` - Render begins processing
- `render.progress` - Progress updates (every 10%)
- `render.completed` - Render finished successfully
- `render.failed` - Render failed with error

---

## Advanced Workflows

### Complete Video Pipeline

**User**: "Create a complete video workflow from template to delivery"

```
Workflow:
1. Get project and template
2. Validate parameters
3. Create render
4. Monitor progress (polling)
5. Verify video URL
6. Download or distribute
7. Send notification
8. Update database
```

### Personalized Videos at Scale

**User**: "Create 1000 personalized greeting videos"

```
Process:
1. Load customer data
2. Validate all data
3. Batch render (chunks of 50)
4. Monitor all batches
5. Handle failures
6. Collect all URLs
7. Generate delivery report
```

### A/B Testing Videos

**User**: "Create two versions of this ad with different headlines"

```
Tool: batch_render
Parameters:
  renders: [
    {
      projectId: "abc-123",
      parameters: { headline: "Version A" },
      metadata: { variant: "A" }
    },
    {
      projectId: "abc-123",
      parameters: { headline: "Version B" },
      metadata: { variant: "B" }
    }
  ]
```

### Error Recovery Workflow

**User**: "Find and fix all failed renders from today"

```
Workflow:
1. list_renders with status="failed"
2. Analyze error patterns
3. Fix common issues:
   - Invalid URLs → Update assets
   - Missing parameters → Add defaults
   - Timeout → Retry
4. Use retry_render for fixable ones
5. Report unfixable issues
```

### Multi-Format Export

**User**: "Create this video in 4 different aspect ratios"

```
Tool: batch_render
Parameters:
  renders: [
    { output: { aspectRatio: "16:9" } },  // YouTube
    { output: { aspectRatio: "1:1" } },   // Instagram
    { output: { aspectRatio: "9:16" } },  // TikTok
    { output: { aspectRatio: "4:5" } }    // Facebook
  ]
```

---

## Using Prompts

### Social Media Video Prompt

**User**: "Use the create-social-media-video prompt"

Prompt asks for:
- projectId
- title
- description (optional)

Then executes complete workflow automatically.

### Batch Product Videos Prompt

**User**: "Use batch-product-videos with my product catalog"

Prompt handles:
- JSON parsing
- Parameter mapping
- Batch creation
- Progress monitoring
- Result compilation

### Check Progress Prompt

**User**: "Run check-render-progress"

Shows organized view of:
- All renders by status
- Video URLs for completed
- Progress for processing
- Errors for failed

---

## Tips & Best Practices

### 1. Asset URLs
- Use HTTPS
- Ensure public accessibility
- Consider CDN for performance
- Use signed URLs for private content

### 2. Batch Rendering
- Process in chunks (50-100)
- Use meaningful metadata
- Monitor progress actively
- Handle failures gracefully

### 3. Parameter Validation
- Check template requirements first
- Validate URLs before rendering
- Use appropriate data types
- Provide fallback values

### 4. Performance
- Use batch operations when possible
- Cache template details
- Implement retry logic
- Monitor API rate limits

### 5. Error Handling
- Check render status regularly
- Parse error messages
- Implement automatic retry for transients
- Log failures for analysis

---

## Troubleshooting

### Render Stuck in Processing

```
1. Check render status
2. If > 30 minutes, check for:
   - Large file sizes
   - Complex effects
   - High resolution
3. Contact support if > 1 hour
```

### Failed with "Invalid Parameter"

```
1. Get template details
2. Compare with provided parameters
3. Check:
   - Spelling of parameter names
   - Data types match
   - Required parameters present
```

### Asset URL Error

```
1. Verify URL is accessible (test in browser)
2. Ensure HTTPS (not HTTP)
3. Check for authentication requirements
4. Verify image format support
```

---

For more examples, visit: https://help.plainlyvideos.com/examples
