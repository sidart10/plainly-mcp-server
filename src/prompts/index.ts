import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { PlainlyClient } from "../plainly-client.js";

export function registerPrompts(server: Server, client: PlainlyClient) {
  // List available prompts
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: [
        {
          name: "create-social-media-video",
          description: "Create a social media video from a template",
          arguments: [
            {
              name: "projectId",
              description: "The Plainly project ID",
              required: true,
            },
            {
              name: "title",
              description: "Video title text",
              required: true,
            },
            {
              name: "description",
              description: "Video description or subtitle",
              required: false,
            },
          ],
        },
        {
          name: "batch-product-videos",
          description: "Create multiple product videos from a list",
          arguments: [
            {
              name: "projectId",
              description: "The Plainly project ID",
              required: true,
            },
            {
              name: "products",
              description: "JSON array of products with name, price, image fields",
              required: true,
            },
          ],
        },
        {
          name: "personalized-greeting",
          description: "Create personalized greeting videos",
          arguments: [
            {
              name: "projectId",
              description: "The Plainly project ID",
              required: true,
            },
            {
              name: "recipientName",
              description: "Name of the recipient",
              required: true,
            },
            {
              name: "message",
              description: "Custom message",
              required: true,
            },
          ],
        },
        {
          name: "check-render-progress",
          description: "Check progress of renders and get completed video URLs",
          arguments: [
            {
              name: "projectId",
              description: "Optional project ID to filter by",
              required: false,
            },
          ],
        },
        {
          name: "video-workflow",
          description: "Complete video creation workflow from template to delivery",
          arguments: [
            {
              name: "projectId",
              description: "The Plainly project ID",
              required: true,
            },
            {
              name: "templateId",
              description: "Template ID to use",
              required: true,
            },
            {
              name: "customizations",
              description: "JSON object with text, image, and other customizations",
              required: true,
            },
          ],
        },
        {
          name: "analyze-render-stats",
          description: "Analyze rendering performance and success rates",
          arguments: [
            {
              name: "timeframe",
              description: "Timeframe: 'today', 'week', 'month', or 'all'",
              required: false,
            },
          ],
        },
        {
          name: "troubleshoot-failed-renders",
          description: "Identify and help fix failed renders",
          arguments: [],
        },
        {
          name: "setup-webhook",
          description: "Setup webhook for render notifications",
          arguments: [
            {
              name: "webhookUrl",
              description: "URL to receive webhook notifications",
              required: true,
            },
            {
              name: "events",
              description: "Comma-separated events: render.completed, render.failed",
              required: true,
            },
          ],
        },
      ],
    };
  });

  // Get prompt content
  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case "create-social-media-video": {
          const { projectId, title, description } = args as {
            projectId: string;
            title: string;
            description?: string;
          };

          return {
            messages: [
              {
                role: "user",
                content: {
                  type: "text",
                  text: `I want to create a social media video for project ${projectId}.

Title: ${title}
${description ? `Description: ${description}` : ""}

Please:
1. Get the project details and available templates
2. Select the most appropriate template
3. Create a render with the provided text
4. Monitor the render progress
5. Provide the video URL when complete

Use the create_render tool with these parameters:
- projectId: ${projectId}
- parameters: { title: "${title}"${description ? `, description: "${description}"` : ""} }`,
                },
              },
            ],
          };
        }

        case "batch-product-videos": {
          const { projectId, products } = args as {
            projectId: string;
            products: string;
          };

          return {
            messages: [
              {
                role: "user",
                content: {
                  type: "text",
                  text: `I need to create product videos in bulk for project ${projectId}.

Products data: ${products}

Please:
1. Parse the products JSON
2. Get the project template details
3. Use batch_render to create videos for all products
4. Monitor the batch progress
5. Provide a summary of completed renders with video URLs

Make sure to map product fields (name, price, image) to the template parameters correctly.`,
                },
              },
            ],
          };
        }

        case "personalized-greeting": {
          const { projectId, recipientName, message } = args as {
            projectId: string;
            recipientName: string;
            message: string;
          };

          return {
            messages: [
              {
                role: "user",
                content: {
                  type: "text",
                  text: `Create a personalized greeting video for project ${projectId}.

Recipient: ${recipientName}
Message: ${message}

Please:
1. Get the greeting video template
2. Create a render with:
   - recipientName: "${recipientName}"
   - message: "${message}"
3. Wait for rendering to complete
4. Provide the video URL

Use appropriate text formatting and ensure the message displays nicely.`,
                },
              },
            ],
          };
        }

        case "check-render-progress": {
          const { projectId } = (args || {}) as { projectId?: string };

          return {
            messages: [
              {
                role: "user",
                content: {
                  type: "text",
                  text: `Check the status of all renders${projectId ? ` for project ${projectId}` : ""}.

Please:
1. List all renders${projectId ? ` filtered by project ${projectId}` : ""}
2. Group them by status (completed, processing, pending, failed)
3. For completed renders, show video URLs
4. For processing renders, show progress percentage
5. For failed renders, show error messages
6. Provide a summary with overall statistics`,
                },
              },
            ],
          };
        }

        case "video-workflow": {
          const { projectId, templateId, customizations } = args as {
            projectId: string;
            templateId: string;
            customizations: string;
          };

          return {
            messages: [
              {
                role: "user",
                content: {
                  type: "text",
                  text: `Execute a complete video creation workflow:

Project: ${projectId}
Template: ${templateId}
Customizations: ${customizations}

Please follow this workflow:
1. Get project and template details
2. Validate the customization parameters match template requirements
3. Create the render with the customizations
4. Monitor render progress (check every 10 seconds)
5. When complete, verify the video URL is accessible
6. Generate a thumbnail preview
7. Provide final delivery summary

If any step fails, provide clear error messages and suggestions for fixing.`,
                },
              },
            ],
          };
        }

        case "analyze-render-stats": {
          const { timeframe } = (args || {}) as { timeframe?: string };

          const timeframeText = timeframe || "all time";
          return {
            messages: [
              {
                role: "user",
                content: {
                  type: "text",
                  text: `Analyze render statistics for ${timeframeText}.

Please:
1. Get render statistics using get_render_stats
2. Calculate key metrics:
   - Success rate (completed vs total)
   - Failure rate
   - Average render duration
   - Peak rendering times
3. List failed renders with error patterns
4. Provide actionable insights:
   - Common failure causes
   - Optimization recommendations
   - Performance trends
5. Create a summary report

Format the analysis in a clear, readable way with charts and tables where helpful.`,
                },
              },
            ],
          };
        }

        case "troubleshoot-failed-renders": {
          return {
            messages: [
              {
                role: "user",
                content: {
                  type: "text",
                  text: `Help me troubleshoot failed renders.

Please:
1. List all failed renders
2. Group by error type/message
3. For each error type:
   - Explain what caused it
   - Provide specific solutions
   - Suggest how to prevent it
4. Identify renders that can be retried
5. For retry candidates, use retry_render tool
6. Provide a summary of actions taken and results

Common issues to check:
- Invalid parameter values
- Missing required assets
- Asset URL accessibility
- Template compatibility
- Output format issues`,
                },
              },
            ],
          };
        }

        case "setup-webhook": {
          const { webhookUrl, events } = args as {
            webhookUrl: string;
            events: string;
          };

          const eventArray = events.split(",").map((e) => e.trim());

          return {
            messages: [
              {
                role: "user",
                content: {
                  type: "text",
                  text: `Setup a webhook for render notifications.

Webhook URL: ${webhookUrl}
Events: ${events}

Please:
1. Validate the webhook URL is accessible (try a test ping)
2. Create the webhook using create_webhook tool with:
   - url: "${webhookUrl}"
   - events: ${JSON.stringify(eventArray)}
   - active: true
3. Verify the webhook was created successfully
4. Explain what events will trigger notifications
5. Provide example webhook payload structure
6. Suggest how to test the webhook

Security reminder: Ensure the webhook URL uses HTTPS and implement signature verification.`,
                },
              },
            ],
          };
        }

        default:
          throw new Error(`Unknown prompt: ${name}`);
      }
    } catch (error: any) {
      throw new Error(`Error generating prompt: ${error.message}`);
    }
  });
}
