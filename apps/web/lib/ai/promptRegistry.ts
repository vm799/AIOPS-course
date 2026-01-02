/**
 * Prompt Registry
 * All AI prompts are versioned, documented, and auditable
 * @see docs/PRD.md#12-claude-governance-enforced
 */

export interface RegisteredPrompt {
  id: string;
  version: string;
  purpose: string;
  template: string;
  variables: string[];
  approvedBy: string;
  approvedAt: Date;
  examples?: Array<{
    input: Record<string, string>;
    expectedOutput: string;
  }>;
}

/**
 * Prompt Registry
 * All prompts used in production must be registered here
 */
export const PROMPT_REGISTRY: Record<string, RegisteredPrompt> = {
  "infographic-causal-loop": {
    id: "infographic-causal-loop",
    version: "1.0.0",
    purpose: "Generate SVG causal loop diagram for AIOps systems",
    approvedBy: "Vaishali Mehmi",
    approvedAt: new Date("2026-01-02"),
    template: `Generate an SVG causal loop diagram showing the relationships between AIOps components.

Components: {{nodes}}
Relationships: {{relationships}}

Requirements:
- Use dark mode colors (#0B0F14 background, #E5E7EB text)
- Show causality with directional arrows
- Include + or - labels for reinforcing/balancing loops
- SVG must be valid and self-contained
- Max dimensions: 800x600px
- Use accent colors: #3B82F6 (primary), #22D3EE (secondary)

Output only valid SVG XML, no explanations.`,
    variables: ["nodes", "relationships"],
    examples: [
      {
        input: {
          nodes: '["Telemetry", "Noise Reduction", "Causal Engine", "Remediation"]',
          relationships: '[{"from": "Telemetry", "to": "Noise Reduction", "type": "positive"}]',
        },
        expectedOutput: "<svg>...</svg>",
      },
    ],
  },

  "scenario-explanation": {
    id: "scenario-explanation",
    version: "1.0.0",
    purpose: "Explain why a scenario choice was optimal or suboptimal",
    approvedBy: "Vaishali Mehmi",
    approvedAt: new Date("2026-01-02"),
    template: `Analyze the following AIOps scenario decision and provide educational reasoning.

Scenario: {{scenarioContext}}
Choice Made: {{choiceMade}}
Consequence: {{consequence}}

Provide a concise explanation (150-200 words) that:
1. Explains the trade-offs involved
2. Highlights what the learner should have considered
3. References relevant AIOps principles (from Maestro framework)
4. Avoids jargon and focuses on systems thinking

Do NOT:
- Invent metrics or data not provided
- Oversimplify the decision
- Use patronizing language`,
    variables: ["scenarioContext", "choiceMade", "consequence"],
  },

  "module-summary": {
    id: "module-summary",
    version: "1.0.0",
    purpose: "Generate concise module summary for NotebookLM video",
    approvedBy: "Vaishali Mehmi",
    approvedAt: new Date("2026-01-02"),
    template: `Summarize this AIOps module for a 2-minute video overview.

Module Title: {{moduleTitle}}
Learning Objectives: {{learningObjectives}}
Key Concepts: {{keyConcepts}}

Generate a script that:
- Opens with a compelling operational scenario
- Explains the "why" before the "what"
- Uses the Maestro framework (Sense → Understand → Decide → Act → Verify → Learn)
- Ends with actionable takeaway
- Total length: 250-300 words
- Conversational tone, technical precision

Target audience: {{audience}} (practitioner/architect/executive)`,
    variables: ["moduleTitle", "learningObjectives", "keyConcepts", "audience"],
  },
};

/**
 * Get a registered prompt by ID
 * Enforces that all prompts must be registered
 */
export function getPrompt(id: string): RegisteredPrompt {
  const prompt = PROMPT_REGISTRY[id];

  if (!prompt) {
    throw new Error(
      `Prompt '${id}' not found in registry. All prompts must be registered for governance.`
    );
  }

  return prompt;
}

/**
 * Render a prompt template with variables
 */
export function renderPrompt(
  promptId: string,
  variables: Record<string, string>
): { content: string; metadata: RegisteredPrompt } {
  const prompt = getPrompt(promptId);

  // Validate that all required variables are provided
  const missingVars = prompt.variables.filter((v) => !(v in variables));
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required variables for prompt '${promptId}': ${missingVars.join(", ")}`
    );
  }

  // Replace template variables
  let content = prompt.template;
  for (const [key, value] of Object.entries(variables)) {
    content = content.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  return {
    content,
    metadata: prompt,
  };
}

/**
 * List all registered prompts
 */
export function listPrompts(): RegisteredPrompt[] {
  return Object.values(PROMPT_REGISTRY);
}

/**
 * Validate prompt output against schema
 * Ensures AI output meets quality standards
 */
export function validatePromptOutput(
  promptId: string,
  output: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Example validations (extend as needed)
  if (promptId.startsWith("infographic-")) {
    // SVG validation
    if (!output.trim().startsWith("<svg")) {
      errors.push("Output must be valid SVG XML");
    }
    if (!output.includes("</svg>")) {
      errors.push("SVG must be properly closed");
    }
  }

  // Length validation for explanations
  if (promptId.includes("explanation") || promptId.includes("summary")) {
    const wordCount = output.split(/\s+/).length;
    if (wordCount < 50) {
      errors.push(`Output too short (${wordCount} words, minimum 50)`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
