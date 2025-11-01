import axios, { AxiosInstance, AxiosError } from "axios";

export interface PlainlyProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  aspectRatio?: string;
  duration?: number;
  parameters?: Record<string, any>;
}

export interface PlainlyTemplate {
  id: string;
  projectId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  parameters: Record<string, any>;
  aspectRatios?: string[];
  previewUrl?: string;
}

export interface RenderRequest {
  projectId: string;
  templateId?: string;
  parameters: Record<string, any>;
  output?: {
    format?: string;
    quality?: string;
    resolution?: string;
  };
  webhook?: string;
  metadata?: Record<string, any>;
}

export interface Render {
  id: string;
  projectId: string;
  templateId?: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress?: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  error?: string;
  parameters: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface Asset {
  id: string;
  name: string;
  type: "image" | "video" | "audio";
  url: string;
  size: number;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface RenderStats {
  totalRenders: number;
  completedRenders: number;
  failedRenders: number;
  pendingRenders: number;
  totalDuration: number;
  averageDuration: number;
}

export class PlainlyClient {
  private client: AxiosInstance;
  private baseURL = "https://api.plainlyvideos.com/api/v2";

  constructor(apiKey: string) {
    // Plainly uses HTTP Basic Auth with API key as username and empty password
    const basicAuth = Buffer.from(`${apiKey}:`).toString('base64');
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/json",
      },
      timeout: 30000,
    });
  }

  /**
   * Handle API errors consistently
   */
  private handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(
          `Plainly API Error: ${axiosError.response.status} - ${
            JSON.stringify(axiosError.response.data) || axiosError.message
          }`
        );
      } else if (axiosError.request) {
        throw new Error("Plainly API Error: No response received");
      }
    }
    throw new Error(`Plainly API Error: ${error.message || "Unknown error"}`);
  }

  // ===== PROJECT MANAGEMENT =====

  /**
   * List all projects
   */
  async listProjects(): Promise<PlainlyProject[]> {
    try {
      const response = await this.client.get("/projects");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get project details
   */
  async getProject(projectId: string): Promise<PlainlyProject> {
    try {
      const response = await this.client.get(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Create a new project
   */
  async createProject(data: {
    name: string;
    description?: string;
    metadata?: Record<string, any>;
  }): Promise<PlainlyProject> {
    throw new Error(
      "Creating projects via API is not supported by Plainly. " +
      "Please create projects through the Plainly dashboard at https://app.plainlyvideos.com. " +
      "Once created, you can use list_projects to get the project ID and then use all other tools."
    );
  }

  /**
   * Update a project
   */
  async updateProject(
    projectId: string,
    data: {
      name?: string;
      description?: string;
      metadata?: Record<string, any>;
    }
  ): Promise<PlainlyProject> {
    throw new Error(
      "Updating projects via API is not supported by Plainly. " +
      "Please update projects through the Plainly dashboard at https://app.plainlyvideos.com."
    );
  }

  /**
   * Delete a project
   */
  async deleteProject(projectId: string): Promise<void> {
    throw new Error(
      "Deleting projects via API is not supported by Plainly. " +
      "Please delete projects through the Plainly dashboard at https://app.plainlyvideos.com."
    );
  }

  // ===== TEMPLATE MANAGEMENT =====

  /**
   * List templates for a project
   */
  async listTemplates(projectId: string): Promise<PlainlyTemplate[]> {
    try {
      const response = await this.client.get(
        `/projects/${projectId}/templates`
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get template details
   */
  async getTemplate(
    projectId: string,
    templateId: string
  ): Promise<PlainlyTemplate> {
    try {
      const response = await this.client.get(
        `/projects/${projectId}/templates/${templateId}`
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ===== RENDER MANAGEMENT =====

  /**
   * Create a new render
   */
  async createRender(request: RenderRequest): Promise<Render> {
    try {
      const response = await this.client.post("/renders", request);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get render status
   */
  async getRender(renderId: string): Promise<Render> {
    try {
      const response = await this.client.get(`/renders/${renderId}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * List all renders
   */
  async listRenders(options?: {
    projectId?: string;
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<Render[]> {
    try {
      const params = new URLSearchParams();
      if (options?.projectId) params.append("projectId", options.projectId);
      if (options?.status) params.append("status", options.status);
      if (options?.limit) params.append("limit", options.limit.toString());
      if (options?.offset) params.append("offset", options.offset.toString());

      const response = await this.client.get(`/renders?${params.toString()}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Cancel a render
   */
  async cancelRender(renderId: string): Promise<void> {
    try {
      await this.client.post(`/renders/${renderId}/cancel`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Delete a render
   */
  async deleteRender(renderId: string): Promise<void> {
    try {
      await this.client.delete(`/renders/${renderId}`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Retry a failed render
   */
  async retryRender(renderId: string): Promise<Render> {
    try {
      const response = await this.client.post(`/renders/${renderId}/retry`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Batch render multiple videos
   */
  async batchRender(requests: RenderRequest[]): Promise<Render[]> {
    try {
      const response = await this.client.post("/renders/batch", { renders: requests });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ===== ASSET MANAGEMENT =====

  /**
   * List assets
   */
  async listAssets(options?: {
    type?: string;
    limit?: number;
    offset?: number;
  }): Promise<Asset[]> {
    try {
      const params = new URLSearchParams();
      if (options?.type) params.append("type", options.type);
      if (options?.limit) params.append("limit", options.limit.toString());
      if (options?.offset) params.append("offset", options.offset.toString());

      const response = await this.client.get(`/assets?${params.toString()}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Upload an asset
   */
  async uploadAsset(data: {
    name: string;
    url: string;
    type: "image" | "video" | "audio";
    metadata?: Record<string, any>;
  }): Promise<Asset> {
    try {
      const response = await this.client.post("/assets", data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Delete an asset
   */
  async deleteAsset(assetId: string): Promise<void> {
    try {
      await this.client.delete(`/assets/${assetId}`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ===== ANALYTICS & STATS =====

  /**
   * Get render statistics
   */
  async getRenderStats(options?: {
    projectId?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<RenderStats> {
    try {
      // Stats endpoint doesn't exist in API v2, calculate from renders list
      const renders = await this.listRenders(options);
      
      const stats: RenderStats = {
        totalRenders: renders.length,
        completedRenders: renders.filter(r => r.status === 'completed').length,
        failedRenders: renders.filter(r => r.status === 'failed').length,
        pendingRenders: renders.filter(r => r.status === 'pending' || r.status === 'processing').length,
        totalDuration: 0,
        averageDuration: 0
      };
      
      // Calculate durations if available
      const completedWithDuration = renders.filter(r => 
        r.status === 'completed' && r.createdAt && r.completedAt
      );
      
      if (completedWithDuration.length > 0) {
        stats.totalDuration = completedWithDuration.reduce((sum, r) => {
          const duration = new Date(r.completedAt!).getTime() - new Date(r.createdAt).getTime();
          return sum + duration;
        }, 0);
        stats.averageDuration = stats.totalDuration / completedWithDuration.length;
      }
      
      return stats;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ===== WEBHOOK MANAGEMENT =====

  /**
   * List webhooks
   */
  async listWebhooks(): Promise<any[]> {
    try {
      const response = await this.client.get("/webhooks");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Create a webhook
   */
  async createWebhook(data: {
    url: string;
    events: string[];
    active?: boolean;
  }): Promise<any> {
    try {
      const response = await this.client.post("/webhooks", data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Delete a webhook
   */
  async deleteWebhook(webhookId: string): Promise<void> {
    try {
      await this.client.delete(`/webhooks/${webhookId}`);
    } catch (error) {
      return this.handleError(error);
    }
  }
}
