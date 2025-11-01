import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { PlainlyClient } from "../plainly-client.js";

export function registerResources(server: Server, client: PlainlyClient) {
  // List available resources
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: "plainly://projects",
          name: "All Projects",
          description: "List of all Plainly video projects",
          mimeType: "application/json",
        },
        {
          uri: "plainly://renders/recent",
          name: "Recent Renders",
          description: "Most recent video renders across all projects",
          mimeType: "application/json",
        },
        {
          uri: "plainly://renders/completed",
          name: "Completed Renders",
          description: "All successfully completed renders",
          mimeType: "application/json",
        },
        {
          uri: "plainly://renders/failed",
          name: "Failed Renders",
          description: "All failed renders for debugging",
          mimeType: "application/json",
        },
        {
          uri: "plainly://renders/pending",
          name: "Pending Renders",
          description: "Renders currently in queue or processing",
          mimeType: "application/json",
        },
        {
          uri: "plainly://assets",
          name: "All Assets",
          description: "Library of uploaded assets (images, videos, audio)",
          mimeType: "application/json",
        },
        {
          uri: "plainly://stats/overview",
          name: "Statistics Overview",
          description: "Overall rendering statistics and metrics",
          mimeType: "application/json",
        },
        {
          uri: "plainly://webhooks",
          name: "Webhooks",
          description: "Configured webhook endpoints",
          mimeType: "application/json",
        },
      ],
    };
  });

  // Read resource content
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;

    try {
      switch (uri) {
        case "plainly://projects": {
          const projects = await client.listProjects();
          return {
            contents: [
              {
                uri,
                mimeType: "application/json",
                text: JSON.stringify(
                  {
                    total: projects.length,
                    projects: projects.map((p) => ({
                      id: p.id,
                      name: p.name,
                      createdAt: p.createdAt,
                      aspectRatio: p.aspectRatio,
                      duration: p.duration,
                    })),
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        case "plainly://renders/recent": {
          const renders = await client.listRenders({ limit: 20 });
          return {
            contents: [
              {
                uri,
                mimeType: "application/json",
                text: JSON.stringify(
                  {
                    total: renders.length,
                    renders: renders.map((r) => ({
                      id: r.id,
                      projectId: r.projectId,
                      status: r.status,
                      createdAt: r.createdAt,
                      videoUrl: r.videoUrl,
                      thumbnailUrl: r.thumbnailUrl,
                    })),
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        case "plainly://renders/completed": {
          const renders = await client.listRenders({ status: "completed" });
          return {
            contents: [
              {
                uri,
                mimeType: "application/json",
                text: JSON.stringify(
                  {
                    total: renders.length,
                    completedRenders: renders.map((r) => ({
                      id: r.id,
                      projectId: r.projectId,
                      completedAt: r.completedAt,
                      videoUrl: r.videoUrl,
                      thumbnailUrl: r.thumbnailUrl,
                      parameters: r.parameters,
                    })),
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        case "plainly://renders/failed": {
          const renders = await client.listRenders({ status: "failed" });
          return {
            contents: [
              {
                uri,
                mimeType: "application/json",
                text: JSON.stringify(
                  {
                    total: renders.length,
                    failedRenders: renders.map((r) => ({
                      id: r.id,
                      projectId: r.projectId,
                      error: r.error,
                      createdAt: r.createdAt,
                      parameters: r.parameters,
                    })),
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        case "plainly://renders/pending": {
          const pendingRenders = await client.listRenders({ status: "pending" });
          const processingRenders = await client.listRenders({ status: "processing" });
          const allPending = [...pendingRenders, ...processingRenders];
          
          return {
            contents: [
              {
                uri,
                mimeType: "application/json",
                text: JSON.stringify(
                  {
                    total: allPending.length,
                    pendingCount: pendingRenders.length,
                    processingCount: processingRenders.length,
                    renders: allPending.map((r) => ({
                      id: r.id,
                      projectId: r.projectId,
                      status: r.status,
                      progress: r.progress,
                      createdAt: r.createdAt,
                    })),
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        case "plainly://assets": {
          const assets = await client.listAssets();
          return {
            contents: [
              {
                uri,
                mimeType: "application/json",
                text: JSON.stringify(
                  {
                    total: assets.length,
                    assets: assets.map((a) => ({
                      id: a.id,
                      name: a.name,
                      type: a.type,
                      url: a.url,
                      size: a.size,
                      createdAt: a.createdAt,
                    })),
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        case "plainly://stats/overview": {
          const stats = await client.getRenderStats();
          return {
            contents: [
              {
                uri,
                mimeType: "application/json",
                text: JSON.stringify(
                  {
                    overview: {
                      totalRenders: stats.totalRenders,
                      completedRenders: stats.completedRenders,
                      failedRenders: stats.failedRenders,
                      pendingRenders: stats.pendingRenders,
                      successRate: stats.totalRenders > 0 
                        ? ((stats.completedRenders / stats.totalRenders) * 100).toFixed(2) + '%'
                        : 'N/A',
                      totalDuration: stats.totalDuration,
                      averageDuration: stats.averageDuration,
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        case "plainly://webhooks": {
          const webhooks = await client.listWebhooks();
          return {
            contents: [
              {
                uri,
                mimeType: "application/json",
                text: JSON.stringify(
                  {
                    total: webhooks.length,
                    webhooks,
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        // Support dynamic project and render URIs
        default: {
          // Parse project-specific URIs
          const projectMatch = uri.match(/^plainly:\/\/projects\/([^/]+)$/);
          if (projectMatch) {
            const projectId = projectMatch[1];
            const project = await client.getProject(projectId);
            const templates = await client.listTemplates(projectId);
            
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(
                    {
                      project,
                      templates,
                      templatesCount: templates.length,
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }

          // Parse render-specific URIs
          const renderMatch = uri.match(/^plainly:\/\/renders\/([^/]+)$/);
          if (renderMatch) {
            const renderId = renderMatch[1];
            const render = await client.getRender(renderId);
            
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(render, null, 2),
                },
              ],
            };
          }

          throw new Error(`Unknown resource URI: ${uri}`);
        }
      }
    } catch (error: any) {
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `Error reading resource: ${error.message}`,
          },
        ],
      };
    }
  });
}
