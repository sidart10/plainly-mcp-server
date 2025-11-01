#!/usr/bin/env node

/**
 * Example: Creating AI Agent Flowchart Videos with Plainly MCP Server
 * 
 * This demonstrates how to create animated flowchart videos showing
 * how AI agents work with tool calling loops.
 */

// Simulated MCP server tool calls
// In practice, these would be called through Claude with the MCP server

const exampleWorkflows = [
  {
    title: "Video Creation AI Agent",
    subtitle: "Automated Video Production Workflow",
    user_request: "Create promotional video from product data",
    tool_1_name: "Plainly API",
    tool_1_action: "Fetching video templates...",
    tool_2_name: "Product Database",
    tool_2_action: "Querying product info...",
    tool_3_name: "AI Script Generator",
    tool_3_action: "Creating narration...",
    loop_count: "3",
    final_message: "Video rendered successfully ✓",
    primary_color: "#8B5CF6",
    secondary_color: "#10B981",
    background_color: "#0F172A"
  },
  {
    title: "Data Analysis AI Agent",
    subtitle: "Intelligent Data Processing Pipeline",
    user_request: "Analyze sales trends and generate report",
    tool_1_name: "SQL Database",
    tool_1_action: "Executing complex queries...",
    tool_2_name: "Python Analytics",
    tool_2_action: "Running calculations...",
    tool_3_name: "Chart Generator",
    tool_3_action: "Creating visualizations...",
    loop_count: "2",
    final_message: "Analysis complete ✓",
    primary_color: "#10B981",
    secondary_color: "#3B82F6",
    background_color: "#0F172A"
  },
  {
    title: "Tutorial Creator Agent",
    subtitle: "Automated Educational Content",
    user_request: "Create JavaScript tutorial series",
    tool_1_name: "Code Generator",
    tool_1_action: "Generating examples...",
    tool_2_name: "AI Explainer",
    tool_2_action: "Writing explanations...",
    tool_3_name: "Video Renderer",
    tool_3_action: "Creating animations...",
    loop_count: "4",
    final_message: "Tutorial series ready ✓",
    primary_color: "#F59E0B",
    secondary_color: "#EF4444",
    background_color: "#0F172A"
  }
];

console.log('🎬 AI Agent Flowchart Video Generator Example\n');
console.log('This example shows how to create flowchart videos using Plainly.\n');

console.log('📋 Example Workflows:\n');
exampleWorkflows.forEach((workflow, index) => {
  console.log(`${index + 1}. ${workflow.title}`);
  console.log(`   Subtitle: ${workflow.subtitle}`);
  console.log(`   User Request: "${workflow.user_request}"`);
  console.log(`   Tools:`);
  console.log(`     - ${workflow.tool_1_name}: ${workflow.tool_1_action}`);
  console.log(`     - ${workflow.tool_2_name}: ${workflow.tool_2_action}`);
  console.log(`     - ${workflow.tool_3_name}: ${workflow.tool_3_action}`);
  console.log(`   Loops: ${workflow.loop_count} iterations`);
  console.log(`   Result: ${workflow.final_message}`);
  console.log(`   Colors: ${workflow.primary_color}, ${workflow.secondary_color}`);
  console.log('');
});

console.log('🚀 To use with Plainly MCP Server:\n');
console.log('1. Create After Effects template (see docs/AI_AGENT_FLOWCHART_TEMPLATE.md)');
console.log('2. Upload template to Plainly dashboard');
console.log('3. Get project ID and template ID');
console.log('4. Use MCP server to render:\n');

console.log('Example MCP Server Usage:');
console.log(`
// Via Claude with MCP server active:

create_project({
  name: "AI Agent Flowchart Videos",
  description: "Animated workflow explanations"
})
// Returns: { projectId: "your-project-id" }

// Then batch render all workflows:
batch_render({
  renders: [
    {
      projectId: "your-project-id",
      parameters: {
        title: "Video Creation AI Agent",
        subtitle: "Automated Video Production Workflow",
        user_request: "Create promotional video from product data",
        tool_1_name: "Plainly API",
        tool_1_action: "Fetching video templates...",
        // ... more parameters
      }
    },
    // ... more workflows
  ]
})

// Monitor progress:
list_renders({ projectId: "your-project-id" })

// Get video URLs when complete
`);

console.log('\n✨ Result: 3 professional flowchart videos in ~15 minutes!');
console.log('\n📖 See docs/AI_AGENT_FLOWCHART_TEMPLATE.md for complete specification.');
