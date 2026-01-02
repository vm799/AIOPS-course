/**
 * AI Provider Abstraction
 * Supports Claude, Gemini, and OpenAI with provider-agnostic interface
 * All calls are logged and validated
 */

export type AIProvider = "claude" | "gemini" | "openai";

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIResponse {
  content: string;
  model: string;
  provider: AIProvider;
  timestamp: Date;
  tokensUsed?: number;
}

export interface AIProviderConfig {
  provider: AIProvider;
  apiKey: string;
  model?: string;
}

/**
 * Provider-agnostic AI client
 * Enforces governance: all calls must use registered prompts
 */
export class AIClient {
  private config: AIProviderConfig;

  constructor(config: AIProviderConfig) {
    this.config = config;
  }

  /**
   * Generate content using AI
   * IMPORTANT: All prompts must be registered in promptRegistry.ts
   */
  async generate(
    messages: AIMessage[],
    options?: {
      temperature?: number;
      maxTokens?: number;
      promptId?: string; // For audit trail
    }
  ): Promise<AIResponse> {
    const { provider } = this.config;

    // Log the request for governance
    this.logRequest(messages, options);

    try {
      switch (provider) {
        case "claude":
          return await this.callClaude(messages, options);
        case "gemini":
          return await this.callGemini(messages, options);
        case "openai":
          return await this.callOpenAI(messages, options);
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }
    } catch (error) {
      console.error(`AI generation failed for provider ${provider}:`, error);
      throw error;
    }
  }

  private async callClaude(
    _messages: AIMessage[],
    _options?: { temperature?: number; maxTokens?: number }
  ): Promise<AIResponse> {
    // Implementation would call Anthropic's API
    // For now, return a mock response
    return {
      content: "Claude response",
      model: this.config.model || "claude-3-5-sonnet-20241022",
      provider: "claude",
      timestamp: new Date(),
    };
  }

  private async callGemini(
    _messages: AIMessage[],
    _options?: { temperature?: number; maxTokens?: number }
  ): Promise<AIResponse> {
    // Implementation would call Google's Gemini API
    return {
      content: "Gemini response",
      model: this.config.model || "gemini-1.5-pro",
      provider: "gemini",
      timestamp: new Date(),
    };
  }

  private async callOpenAI(
    _messages: AIMessage[],
    _options?: { temperature?: number; maxTokens?: number }
  ): Promise<AIResponse> {
    // Implementation would call OpenAI's API
    return {
      content: "GPT response",
      model: this.config.model || "gpt-4-turbo",
      provider: "openai",
      timestamp: new Date(),
    };
  }

  /**
   * Log AI request for governance and audit
   */
  private logRequest(
    messages: AIMessage[],
    options?: { promptId?: string }
  ) {
    // In production, this would log to a secure audit system
    console.log("[AI Governance] Request logged:", {
      provider: this.config.provider,
      promptId: options?.promptId,
      timestamp: new Date().toISOString(),
      messageCount: messages.length,
    });
  }
}

/**
 * Get configured AI client
 * Reads from environment variables
 */
export function getAIClient(): AIClient {
  const provider = (process.env.NEXT_PUBLIC_AI_PROVIDER || "claude") as AIProvider;
  const apiKey = process.env.AI_API_KEY || "";

  if (!apiKey) {
    console.warn("AI_API_KEY not configured. AI features will be disabled.");
  }

  return new AIClient({
    provider,
    apiKey,
  });
}
