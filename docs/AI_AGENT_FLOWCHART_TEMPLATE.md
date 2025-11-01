# AI Agent Workflow Flowchart - Video Template Design

## 🎯 Concept Overview

An animated flowchart video showing how an AI Agent works through tool calling loops in an environment.

**Purpose**: Educational video explaining AI agent architecture and tool-calling workflow

**Duration**: 30-60 seconds

**Style**: Clean, modern, tech-focused with animated flow

---

## 🎨 Visual Design Concept

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│                    AI AGENT WORKFLOW                 │
│                                                      │
│  ┌──────────┐         ┌──────────┐                 │
│  │   USER   │────────▶│  AGENT   │                 │
│  │ REQUEST  │         │  (LLM)   │                 │
│  └──────────┘         └────┬─────┘                 │
│                            │                        │
│                            ▼                        │
│                     ┌──────────────┐                │
│                     │   THINKING   │                │
│                     │   PHASE      │                │
│                     └──────┬───────┘                │
│                            │                        │
│                ┌───────────┴───────────┐           │
│                ▼                       ▼           │
│         ┌─────────────┐        ┌─────────────┐    │
│         │ TOOL CALL 1 │        │ TOOL CALL 2 │    │
│         │  (API)      │        │  (Database) │    │
│         └──────┬──────┘        └──────┬──────┘    │
│                │                      │            │
│                └──────────┬───────────┘            │
│                           ▼                        │
│                    ┌─────────────┐                 │
│                    │  LOOP BACK  │                 │
│                    │  TO AGENT   │                 │
│                    └──────┬──────┘                 │
│                           ▼                        │
│                    ┌─────────────┐                 │
│                    │   FINAL     │                 │
│                    │  RESPONSE   │                 │
│                    └─────────────┘                 │
└─────────────────────────────────────────────────────┘
```

---

## 🎬 Animation Flow

### Scene Breakdown

#### **Scene 1: User Request (0-5s)**
```
User icon appears with text bubble
→ "Create a video from this data"
→ Animates toward Agent
```

#### **Scene 2: Agent Receives (5-10s)**
```
Agent (brain/robot icon) highlights
→ Shows "Processing..." text
→ Internal gears/neurons animate
```

#### **Scene 3: Thinking Phase (10-15s)**
```
Thought bubble appears above agent
→ Text: "Need to: 1. Fetch data, 2. Process, 3. Render"
→ Decision tree animates
```

#### **Scene 4: Tool Calls (15-35s)**
```
Agent sends arrows to multiple tools:

Tool 1: API Call
  → Icon: Cloud/API
  → Status: "Fetching data..."
  → Success: ✓ Data retrieved

Tool 2: Database Query
  → Icon: Database
  → Status: "Querying..."
  → Success: ✓ Records found

Tool 3: File Operation
  → Icon: Folder
  → Status: "Reading file..."
  → Success: ✓ File loaded

All return data back to Agent
```

#### **Scene 5: Loop Decision (35-45s)**
```
Agent evaluates responses
→ Diamond decision shape: "More actions needed?"
→ If YES: Loop back to Tool Calls (animated arrow curves back)
→ If NO: Proceed to Final Response
```

#### **Scene 6: Final Response (45-60s)**
```
Agent compiles results
→ "Task Complete" checkmark
→ Response flows back to User
→ User sees final output
```

---

## 📋 Template Parameters (Customizable)

### Text Parameters
```json
{
  "title": "AI Agent Workflow",
  "subtitle": "How Agents Use Tools",
  "user_request": "Create a video from this data",
  "tool_1_name": "API Call",
  "tool_1_action": "Fetching data...",
  "tool_2_name": "Database Query",
  "tool_2_action": "Querying records...",
  "tool_3_name": "File Operation",
  "tool_3_action": "Reading file...",
  "loop_count": "3",
  "final_message": "Task Complete ✓",
  "company_name": "Your Company",
  "logo_url": "https://..."
}
```

### Visual Parameters
```json
{
  "primary_color": "#3B82F6",
  "secondary_color": "#10B981",
  "background_color": "#0F172A",
  "accent_color": "#F59E0B",
  "agent_icon_style": "robot|brain|circuit",
  "animation_speed": "normal|fast|slow"
}
```

### Content Parameters
```json
{
  "number_of_tools": "2|3|4|5",
  "show_loop": true,
  "show_code_snippets": false,
  "highlight_tool_names": true,
  "show_timestamps": false
}
```

---

## 🎨 Visual Style Guide

### Color Palette
- **Background**: Dark navy (#0F172A)
- **Primary**: Blue (#3B82F6) - Agent, main flow
- **Success**: Green (#10B981) - Completed actions
- **Warning**: Yellow (#F59E0B) - Processing
- **Error**: Red (#EF4444) - Failures
- **Text**: White/Light gray

### Typography
- **Title**: Bold, 48px, Sans-serif
- **Labels**: Medium, 24px, Sans-serif
- **Body**: Regular, 18px, Sans-serif
- **Code**: Monospace, 16px, Courier

### Icons
- **Agent**: Robot/Brain/Circuit board
- **Tools**: Cloud, Database, File, API, Terminal
- **Status**: Checkmark, Loading spinner, Error X
- **Flow**: Arrows, Dotted lines for loops

### Animation Style
- **Smooth**: Ease in/out timing
- **Flow**: Arrows animate along path
- **Pulse**: Icons pulse when active
- **Glow**: Elements glow when processing
- **Color**: State changes with color transitions

---

## 🎯 Specific AI Agent Use Cases

### Example 1: Video Creation Agent
```
User Request: "Create a promotional video"
↓
Agent Thinking: Plan video workflow
↓
Tool Calls:
  1. Fetch template (Plainly API)
  2. Get product data (Database)
  3. Generate script (AI)
  4. Create render (Plainly)
↓
Loop: Check render status → If pending, wait → Check again
↓
Final: Video URL ready
```

### Example 2: Data Analysis Agent
```
User Request: "Analyze sales data"
↓
Agent Thinking: Identify data sources
↓
Tool Calls:
  1. Query database (SQL)
  2. Fetch external data (API)
  3. Run calculations (Python)
  4. Generate charts (Visualization tool)
↓
Loop: If incomplete, fetch more data
↓
Final: Analysis report
```

### Example 3: Tutorial Creation Agent
```
User Request: "Create JavaScript tutorial"
↓
Agent Thinking: Plan tutorial structure
↓
Tool Calls:
  1. Generate code examples (Code generator)
  2. Write explanations (AI)
  3. Create visuals (Plainly)
  4. Upload to platform (API)
↓
Loop: Create multiple sections
↓
Final: Complete tutorial ready
```

---

## 🏗️ After Effects Template Structure

### Composition Setup

```
Main Comp (1920x1080, 30fps, 60s)
├── Background Layer
├── Title Layer (text: title)
├── Subtitle Layer (text: subtitle)
│
├── Scene 1 - User Request
│   ├── User Icon
│   ├── Request Text (text: user_request)
│   └── Arrow to Agent
│
├── Scene 2 - Agent
│   ├── Agent Icon (image: agent_icon)
│   ├── Thinking Animation
│   └── Processing Text
│
├── Scene 3 - Tool Calls
│   ├── Tool 1
│   │   ├── Icon
│   │   ├── Name (text: tool_1_name)
│   │   ├── Action (text: tool_1_action)
│   │   └── Status Indicator
│   │
│   ├── Tool 2
│   │   ├── Icon
│   │   ├── Name (text: tool_2_name)
│   │   ├── Action (text: tool_2_action)
│   │   └── Status Indicator
│   │
│   └── Tool 3
│       ├── Icon
│       ├── Name (text: tool_3_name)
│       ├── Action (text: tool_3_action)
│       └── Status Indicator
│
├── Scene 4 - Loop Decision
│   ├── Diamond Shape
│   ├── Decision Text
│   └── Loop Arrow
│
├── Scene 5 - Final Response
│   ├── Success Icon
│   ├── Message (text: final_message)
│   └── Output Display
│
└── Branding
    ├── Logo (image: logo_url)
    └── Company Name (text: company_name)
```

### Layer Expressions (for Dynamic Animation)

```javascript
// Auto-hide unused tools
if (thisComp.layer("Number of Tools").text.sourceText <= 2) {
  this.opacity = 0;
} else {
  this.opacity = 100;
}

// Loop animation based on parameter
loopOut("cycle", parseInt(thisComp.layer("Loop Count").text.sourceText));

// Color based on status
var status = thisComp.layer("Tool Status").text.sourceText;
if (status == "Success") {
  [16/255, 185/255, 129/255, 1]; // Green
} else if (status == "Processing") {
  [245/255, 158/255, 11/255, 1]; // Yellow
} else {
  [239/255, 68/255, 68/255, 1]; // Red
}
```

---

## 📝 Template Specifications Document

### Technical Requirements

**Resolution**: 1920x1080 (Full HD)
**Frame Rate**: 30fps
**Duration**: 60 seconds (adjustable)
**Aspect Ratios**: 16:9, 1:1, 9:16 (separate templates)
**File Format**: .aep (After Effects Project)

### Dynamic Text Layers (15)
1. Title
2. Subtitle
3. User Request Text
4. Tool 1 Name
5. Tool 1 Action
6. Tool 2 Name
7. Tool 2 Action
8. Tool 3 Name
9. Tool 3 Action
10. Loop Count
11. Decision Text
12. Final Message
13. Company Name
14. Timestamp (optional)
15. Credits

### Dynamic Image Layers (5)
1. Logo
2. Agent Icon
3. Tool 1 Icon
4. Tool 2 Icon
5. Tool 3 Icon

### Color Controls (5)
1. Primary Color
2. Secondary Color
3. Background Color
4. Accent Color
5. Text Color

---

## 🎥 Rendering Workflow with Plainly

### Step 1: Upload Template to Plainly

```bash
# After creating in After Effects
1. Export project file (.aep)
2. Upload to Plainly dashboard
3. Plainly analyzes and extracts parameters
4. Mark all text/image layers as dynamic
```

### Step 2: Create Project via MCP Server

```javascript
// Use our MCP server
create_project({
  name: "AI Agent Flowchart Videos",
  description: "Animated flowcharts explaining AI agent workflows"
})
// Returns: { projectId: "abc-123" }
```

### Step 3: Test Single Render

```javascript
create_render({
  projectId: "abc-123",
  parameters: {
    title: "AI Agent Workflow",
    subtitle: "Understanding Tool Calling",
    user_request: "Create a video from data",
    tool_1_name: "Plainly API",
    tool_1_action: "Fetching templates...",
    tool_2_name: "Database",
    tool_2_action: "Querying records...",
    tool_3_name: "File System",
    tool_3_action: "Reading config...",
    loop_count: "2",
    final_message: "Video Created Successfully ✓",
    company_name: "Your Company",
    logo_url: "https://your-site.com/logo.png",
    primary_color: "#3B82F6",
    background_color: "#0F172A"
  }
})
```

### Step 4: Batch Create Variations

```javascript
// Create multiple versions for different use cases
const workflows = [
  {
    title: "Video Creation Agent",
    tools: ["Plainly API", "Database", "AI Script Generator"]
  },
  {
    title: "Data Analysis Agent",
    tools: ["SQL Query", "API Call", "Python Calculator"]
  },
  {
    title: "Content Creator Agent",
    tools: ["Web Scraper", "AI Writer", "CMS Upload"]
  }
]

batch_render({
  renders: workflows.map(w => ({
    projectId: "abc-123",
    parameters: mapToTemplate(w)
  }))
})
```

---

## 💰 Cost Estimate

### Template Creation
- **DIY in After Effects**: 20-40 hours learning + design
- **Hire Motion Designer**: $300-800 for professional template
- **Use Template Marketplace**: $50-150 for pre-made

### Per-Video Rendering (Plainly)
- **Cost**: $1-3 per video (60 seconds, 1080p)
- **Time**: 5-10 minutes per render
- **Value**: Saves 2-4 hours manual editing

### Batch Economics
- Create 50 variations: $50-150 total
- Manual editing 50 videos: 100-200 hours of work
- **ROI**: Massive

---

## 🚀 Quick Start Implementation

### Option 1: Start Now (Simple Version)

**Tools Needed**:
- PowerPoint or Keynote
- Screen recording software
- Simple animation tool (Canva, Descript)

**Process**:
1. Create flowchart in slides
2. Animate transitions
3. Record as video
4. Quick and dirty but works

**Time**: 2-3 hours
**Cost**: Free
**Quality**: Basic

### Option 2: Professional Template (Recommended)

**Tools Needed**:
- After Effects (or hire designer)
- Plainly account
- Our MCP server

**Process**:
1. Design template in AE (or hire)
2. Upload to Plainly
3. Use MCP server for variations
4. Scale to unlimited videos

**Time**: 1-2 days setup, then 5 min per video
**Cost**: $300-800 one-time, then $1-3 per video
**Quality**: Professional

### Option 3: Hybrid Approach

**Start simple**, then upgrade:
1. Create basic version in Canva (2 hours)
2. Use as proof of concept
3. If valuable, invest in AE template
4. Migrate to Plainly for scale

---

## 📊 Customization Examples

### For Different Agent Types

#### **Video Creation Agent**
```json
{
  "title": "Video Creation AI Agent",
  "tools": [
    "Plainly API - Template Selection",
    "Database - Fetch Product Data",
    "AI Script - Generate Narration",
    "Render Engine - Create Video"
  ],
  "primary_color": "#8B5CF6"
}
```

#### **Data Analysis Agent**
```json
{
  "title": "Data Analysis AI Agent",
  "tools": [
    "SQL Query - Database Access",
    "Python Script - Calculations",
    "Chart Generator - Visualizations",
    "Report Builder - PDF Export"
  ],
  "primary_color": "#10B981"
}
```

#### **Customer Support Agent**
```json
{
  "title": "Support AI Agent",
  "tools": [
    "Knowledge Base - Search Docs",
    "CRM - Get Customer History",
    "AI Chat - Generate Response",
    "Email API - Send Reply"
  ],
  "primary_color": "#3B82F6"
}
```

---

## 🎯 Next Steps

### To Actually Create This:

**Immediate (No Plainly Yet)**:
1. I can create a detailed storyboard
2. Provide Figma/design mockups
3. You create quick version in Canva/PowerPoint

**Short-term (With Plainly)**:
1. Hire motion designer on Fiverr/Upwork
2. Show them this spec document
3. They create After Effects template
4. Upload to Plainly
5. Use MCP server to generate variations

**Long-term (Scale)**:
1. Create library of workflow templates
2. Automate video creation for docs
3. Generate training videos on demand
4. Build video content pipeline

---

## 📝 Template Brief for Designer

If hiring a designer, give them this:

```
PROJECT: AI Agent Workflow Flowchart Animation

DELIVERABLE: After Effects template with dynamic parameters

STYLE:
- Clean, modern, tech aesthetic
- Dark background with bright accents
- Smooth animations, professional feel
- Similar to: Fireship, ThePrimeagen, or tech explainer videos

DURATION: 60 seconds

ELEMENTS:
- Animated flowchart showing AI agent decision loop
- 3-5 tool call animations
- Loop-back animation
- Dynamic text (15 text layers)
- Dynamic images (5 image layers)
- Color controls (5 color parameters)

DELIVERABLES:
- .aep project file
- All assets (icons, fonts)
- Parameter documentation
- Test render video

BUDGET: $300-800 depending on complexity
TIMELINE: 5-7 days

REFERENCE: [Show them this document]
```

---

Would you like me to:
1. **Create a quick mockup** in a simpler tool you can use now?
2. **Find motion designers** who can build this template?
3. **Create detailed storyboards** frame-by-frame?
4. **Build a simplified version** you can make yourself?

This flowchart video would be PERFECT for explaining how your AI agents work with the Plainly MCP server!
