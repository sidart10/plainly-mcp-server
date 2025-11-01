import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { PlainlyClient } from "../plainly-client.js";

export function registerTools(server: Server, client: PlainlyClient) {
  // ===== PROJECT TOOLS =====

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        // List all projects
        case "list_projects": {
          const projects = await client.listProjects();
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(projects, null, 2),
              },
            ],
          };
        }

        // Get project details
        case "get_project": {
          const { projectId } = args as { projectId: string };
          const project = await client.getProject(projectId);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(project, null, 2),
              },
            ],
          };
        }

        // Create project
        case "create_project": {
          const { name, description, metadata } = args as {
            name: string;
            description?: string;
            metadata?: Record<string, any>;
          };
          const project = await client.createProject({ name, description, metadata });
          return {
            content: [
              {
                type: "text",
                text: `✅ Project created successfully!\n\n${JSON.stringify(project, null, 2)}`,
              },
            ],
          };
        }

        // Update project
        case "update_project": {
          const { projectId, name, description, metadata } = args as {
            projectId: string;
            name?: string;
            description?: string;
            metadata?: Record<string, any>;
          };
          const project = await client.updateProject(projectId, { name, description, metadata });
          return {
            content: [
              {
                type: "text",
                text: `✅ Project updated successfully!\n\n${JSON.stringify(project, null, 2)}`,
              },
            ],
          };
        }

        // Delete project
        case "delete_project": {
          const { projectId } = args as { projectId: string };
          await client.deleteProject(projectId);
          return {
            content: [
              {
                type: "text",
                text: `✅ Project ${projectId} deleted successfully!`,
              },
            ],
          };
        }

        // ===== TEMPLATE TOOLS =====

        // List templates
        case "list_templates": {
          const { projectId } = args as { projectId: string };
          const templates = await client.listTemplates(projectId);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(templates, null, 2),
              },
            ],
          };
        }

        // Get template details
        case "get_template": {
          const { projectId, templateId } = args as { projectId: string; templateId: string };
          const template = await client.getTemplate(projectId, templateId);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(template, null, 2),
              },
            ],
          };
        }

        // ===== RENDER TOOLS =====

        // Create render
        case "create_render": {
          const { projectId, templateId, parameters, output, webhook, metadata } = args as {
            projectId: string;
            templateId?: string;
            parameters: Record<string, any>;
            output?: any;
            webhook?: string;
            metadata?: Record<string, any>;
          };
          const render = await client.createRender({
            projectId,
            templateId,
            parameters,
            output,
            webhook,
            metadata,
          });
          return {
            content: [
              {
                type: "text",
                text: `🎬 Render started!\n\nRender ID: ${render.id}\nStatus: ${render.status}\n\n${JSON.stringify(render, null, 2)}`,
              },
            ],
          };
        }

        // Get render status
        case "get_render": {
          const { renderId } = args as { renderId: string };
          const render = await client.getRender(renderId);
          
          let statusEmoji = "⏳";
          if (render.status === "completed") statusEmoji = "✅";
          if (render.status === "failed") statusEmoji = "❌";
          if (render.status === "processing") statusEmoji = "🔄";

          let message = `${statusEmoji} Render Status: ${render.status.toUpperCase()}\n\n`;
          message += `Render ID: ${render.id}\n`;
          if (render.progress) message += `Progress: ${render.progress}%\n`;
          if (render.videoUrl) message += `\n📹 Video URL: ${render.videoUrl}\n`;
          if (render.thumbnailUrl) message += `🖼️ Thumbnail: ${render.thumbnailUrl}\n`;
          if (render.error) message += `\n⚠️ Error: ${render.error}\n`;
          message += `\n${JSON.stringify(render, null, 2)}`;

          return {
            content: [
              {
                type: "text",
                text: message,
              },
            ],
          };
        }

        // List renders
        case "list_renders": {
          const { projectId, status, limit, offset } = args as {
            projectId?: string;
            status?: string;
            limit?: number;
            offset?: number;
          };
          const renders = await client.listRenders({ projectId, status, limit, offset });
          return {
            content: [
              {
                type: "text",
                text: `Found ${renders.length} render(s)\n\n${JSON.stringify(renders, null, 2)}`,
              },
            ],
          };
        }

        // Cancel render
        case "cancel_render": {
          const { renderId } = args as { renderId: string };
          await client.cancelRender(renderId);
          return {
            content: [
              {
                type: "text",
                text: `✅ Render ${renderId} cancelled successfully!`,
              },
            ],
          };
        }

        // Delete render
        case "delete_render": {
          const { renderId } = args as { renderId: string };
          await client.deleteRender(renderId);
          return {
            content: [
              {
                type: "text",
                text: `✅ Render ${renderId} deleted successfully!`,
              },
            ],
          };
        }

        // Retry render
        case "retry_render": {
          const { renderId } = args as { renderId: string };
          const render = await client.retryRender(renderId);
          return {
            content: [
              {
                type: "text",
                text: `🔄 Render retry initiated!\n\n${JSON.stringify(render, null, 2)}`,
              },
            ],
          };
        }

        // Batch render
        case "batch_render": {
          const { renders } = args as { renders: any[] };
          const results = await client.batchRender(renders);
          return {
            content: [
              {
                type: "text",
                text: `🎬 Batch render started for ${results.length} video(s)!\n\n${JSON.stringify(results, null, 2)}`,
              },
            ],
          };
        }

        // ===== ASSET TOOLS =====

        // List assets
        case "list_assets": {
          const { type, limit, offset } = args as { type?: string; limit?: number; offset?: number };
          const assets = await client.listAssets({ type, limit, offset });
          return {
            content: [
              {
                type: "text",
                text: `Found ${assets.length} asset(s)\n\n${JSON.stringify(assets, null, 2)}`,
              },
            ],
          };
        }

        // Upload asset
        case "upload_asset": {
          const { name, url, type, metadata } = args as {
            name: string;
            url: string;
            type: "image" | "video" | "audio";
            metadata?: Record<string, any>;
          };
          const asset = await client.uploadAsset({ name, url, type, metadata });
          return {
            content: [
              {
                type: "text",
                text: `✅ Asset uploaded successfully!\n\n${JSON.stringify(asset, null, 2)}`,
              },
            ],
          };
        }

        // Delete asset
        case "delete_asset": {
          const { assetId } = args as { assetId: string };
          await client.deleteAsset(assetId);
          return {
            content: [
              {
                type: "text",
                text: `✅ Asset ${assetId} deleted successfully!`,
              },
            ],
          };
        }

        // ===== ANALYTICS TOOLS =====

        // Get render stats
        case "get_render_stats": {
          const { projectId, startDate, endDate } = args as {
            projectId?: string;
            startDate?: string;
            endDate?: string;
          };
          const stats = await client.getRenderStats({ projectId, startDate, endDate });
          return {
            content: [
              {
                type: "text",
                text: `📊 Render Statistics\n\n${JSON.stringify(stats, null, 2)}`,
              },
            ],
          };
        }

        // ===== WEBHOOK TOOLS =====

        // List webhooks
        case "list_webhooks": {
          const webhooks = await client.listWebhooks();
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(webhooks, null, 2),
              },
            ],
          };
        }

        // Create webhook
        case "create_webhook": {
          const { url, events, active } = args as {
            url: string;
            events: string[];
            active?: boolean;
          };
          const webhook = await client.createWebhook({ url, events, active });
          return {
            content: [
              {
                type: "text",
                text: `✅ Webhook created successfully!\n\n${JSON.stringify(webhook, null, 2)}`,
              },
            ],
          };
        }

        // Delete webhook
        case "delete_webhook": {
          const { webhookId } = args as { webhookId: string };
          await client.deleteWebhook(webhookId);
          return {
            content: [
              {
                type: "text",
                text: `✅ Webhook ${webhookId} deleted successfully!`,
              },
            ],
          };
        }

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  });

  // Register tool schemas
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        // Project tools
        {
          name: "list_projects",
          description: "List all Plainly projects",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "get_project",
          description: "Get details of a specific project",
          inputSchema: {
            type: "object",
            properties: {
              projectId: { type: "string", description: "Project ID" },
            },
            required: ["projectId"],
          },
        },
        {
          name: "create_project",
          description: "Create a new video project",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string", description: "Project name" },
              description: { type: "string", description: "Project description" },
              metadata: { type: "object", description: "Additional metadata" },
            },
            required: ["name"],
          },
        },
        {
          name: "update_project",
          description: "Update an existing project",
          inputSchema: {
            type: "object",
            properties: {
              projectId: { type: "string", description: "Project ID" },
              name: { type: "string", description: "New project name" },
              description: { type: "string", description: "New description" },
              metadata: { type: "object", description: "Updated metadata" },
            },
            required: ["projectId"],
          },
        },
        {
          name: "delete_project",
          description: "Delete a project",
          inputSchema: {
            type: "object",
            properties: {
              projectId: { type: "string", description: "Project ID to delete" },
            },
            required: ["projectId"],
          },
        },
        // Template tools
        {
          name: "list_templates",
          description: "List all templates for a project",
          inputSchema: {
            type: "object",
            properties: {
              projectId: { type: "string", description: "Project ID" },
            },
            required: ["projectId"],
          },
        },
        {
          name: "get_template",
          description: "Get template details including parameters and preview",
          inputSchema: {
            type: "object",
            properties: {
              projectId: { type: "string", description: "Project ID" },
              templateId: { type: "string", description: "Template ID" },
            },
            required: ["projectId", "templateId"],
          },
        },
        // Render tools
        {
          name: "create_render",
          description: "Create a new video render with custom parameters",
          inputSchema: {
            type: "object",
            properties: {
              projectId: { type: "string", description: "Project ID" },
              templateId: { type: "string", description: "Template ID (optional)" },
              parameters: {
                type: "object",
                description: "Dynamic parameters for the video (text, images, etc.)",
              },
              output: {
                type: "object",
                description: "Output settings (format, quality, resolution)",
              },
              webhook: { type: "string", description: "Webhook URL for notifications" },
              metadata: { type: "object", description: "Custom metadata" },
            },
            required: ["projectId", "parameters"],
          },
        },
        {
          name: "get_render",
          description: "Check render status and get video URL when complete",
          inputSchema: {
            type: "object",
            properties: {
              renderId: { type: "string", description: "Render ID" },
            },
            required: ["renderId"],
          },
        },
        {
          name: "list_renders",
          description: "List renders with optional filtering",
          inputSchema: {
            type: "object",
            properties: {
              projectId: { type: "string", description: "Filter by project ID" },
              status: {
                type: "string",
                description: "Filter by status (pending, processing, completed, failed)",
              },
              limit: { type: "number", description: "Maximum results (default: 50)" },
              offset: { type: "number", description: "Pagination offset" },
            },
          },
        },
        {
          name: "cancel_render",
          description: "Cancel a pending or processing render",
          inputSchema: {
            type: "object",
            properties: {
              renderId: { type: "string", description: "Render ID to cancel" },
            },
            required: ["renderId"],
          },
        },
        {
          name: "delete_render",
          description: "Delete a render and its associated video",
          inputSchema: {
            type: "object",
            properties: {
              renderId: { type: "string", description: "Render ID to delete" },
            },
            required: ["renderId"],
          },
        },
        {
          name: "retry_render",
          description: "Retry a failed render with the same parameters",
          inputSchema: {
            type: "object",
            properties: {
              renderId: { type: "string", description: "Failed render ID" },
            },
            required: ["renderId"],
          },
        },
        {
          name: "batch_render",
          description: "Render multiple videos at once",
          inputSchema: {
            type: "object",
            properties: {
              renders: {
                type: "array",
                description: "Array of render requests",
                items: { type: "object" },
              },
            },
            required: ["renders"],
          },
        },
        // Asset tools
        {
          name: "list_assets",
          description: "List uploaded assets (images, videos, audio)",
          inputSchema: {
            type: "object",
            properties: {
              type: { type: "string", description: "Filter by type (image, video, audio)" },
              limit: { type: "number", description: "Maximum results" },
              offset: { type: "number", description: "Pagination offset" },
            },
          },
        },
        {
          name: "upload_asset",
          description: "Register an asset URL for use in renders",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string", description: "Asset name" },
              url: { type: "string", description: "Public URL of the asset" },
              type: {
                type: "string",
                description: "Asset type",
                enum: ["image", "video", "audio"],
              },
              metadata: { type: "object", description: "Additional metadata" },
            },
            required: ["name", "url", "type"],
          },
        },
        {
          name: "delete_asset",
          description: "Delete an asset",
          inputSchema: {
            type: "object",
            properties: {
              assetId: { type: "string", description: "Asset ID" },
            },
            required: ["assetId"],
          },
        },
        // Analytics tools
        {
          name: "get_render_stats",
          description: "Get render statistics and analytics",
          inputSchema: {
            type: "object",
            properties: {
              projectId: { type: "string", description: "Filter by project" },
              startDate: { type: "string", description: "Start date (ISO 8601)" },
              endDate: { type: "string", description: "End date (ISO 8601)" },
            },
          },
        },
        // Webhook tools
        {
          name: "list_webhooks",
          description: "List all configured webhooks",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "create_webhook",
          description: "Create a new webhook for render notifications",
          inputSchema: {
            type: "object",
            properties: {
              url: { type: "string", description: "Webhook URL" },
              events: {
                type: "array",
                description: "Events to trigger webhook",
                items: { type: "string" },
              },
              active: { type: "boolean", description: "Webhook active status" },
            },
            required: ["url", "events"],
          },
        },
        {
          name: "delete_webhook",
          description: "Delete a webhook",
          inputSchema: {
            type: "object",
            properties: {
              webhookId: { type: "string", description: "Webhook ID" },
            },
            required: ["webhookId"],
          },
        },
      ],
    };
  });
}
