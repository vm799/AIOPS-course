/**
 * AI Output Validator
 * Enforces schema validation on all AI-generated content
 * @see docs/PRD.md#43-ai-hidden
 */

import { z } from "zod";

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  sanitizedOutput?: string;
}

/**
 * SVG Output Validator
 * Ensures generated SVGs are safe and meet design standards
 */
export function validateSVG(svg: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Basic SVG structure
  if (!svg.trim().startsWith("<svg")) {
    errors.push("Output must start with <svg> tag");
  }

  if (!svg.includes("</svg>")) {
    errors.push("SVG must be properly closed with </svg>");
  }

  // Security: No script tags allowed
  if (svg.includes("<script")) {
    errors.push("SVG must not contain script tags (security violation)");
  }

  // Security: No external references
  if (svg.includes("xlink:href") && svg.includes("http")) {
    errors.push("SVG must not reference external URLs (security violation)");
  }

  // Design standards (from PRD)
  const darkModeBg = svg.includes("#0B0F14") || svg.includes("#111827");
  const accentColors = svg.includes("#3B82F6") || svg.includes("#22D3EE");

  if (!darkModeBg) {
    warnings.push("SVG should use dark mode background colors (#0B0F14 or #111827)");
  }

  if (!accentColors) {
    warnings.push("SVG should use accent colors (#3B82F6 or #22D3EE)");
  }

  // Dimension check
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
  if (viewBoxMatch) {
    const [, , , width, height] = viewBoxMatch[1].split(" ").map(Number);
    if (width > 800 || height > 600) {
      warnings.push(`SVG dimensions (${width}x${height}) exceed recommended max (800x600)`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    sanitizedOutput: errors.length === 0 ? svg : undefined,
  };
}

/**
 * Text Content Validator
 * Validates educational content meets quality standards
 */
export function validateTextContent(
  content: string,
  options: {
    minWords?: number;
    maxWords?: number;
    requireSources?: boolean;
    forbiddenPhrases?: string[];
  }
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const wordCount = content.split(/\s+/).length;

  // Length validation
  if (options.minWords && wordCount < options.minWords) {
    errors.push(`Content too short (${wordCount} words, minimum ${options.minWords})`);
  }

  if (options.maxWords && wordCount > options.maxWords) {
    errors.push(`Content too long (${wordCount} words, maximum ${options.maxWords})`);
  }

  // Forbidden phrases (AI slop detection)
  const forbiddenPhrases = options.forbiddenPhrases || [
    "as an AI",
    "I cannot",
    "I apologize",
    "delve into",
    "it's important to note",
    "in summary",
    "in conclusion",
    "hope this helps",
  ];

  for (const phrase of forbiddenPhrases) {
    if (content.toLowerCase().includes(phrase.toLowerCase())) {
      errors.push(`Content contains forbidden phrase: "${phrase}" (AI slop detected)`);
    }
  }

  // Source requirement
  if (options.requireSources) {
    const hasSources =
      content.includes("Source:") ||
      content.includes("Reference:") ||
      content.match(/\[\d+\]/);

    if (!hasSources) {
      warnings.push("Content should include sources or references");
    }
  }

  // Quality checks
  const hasNumbers = /\d/.test(content);
  const hasSpecificExamples = content.includes("example") || content.includes("e.g.");

  if (!hasNumbers && !hasSpecificExamples) {
    warnings.push("Content should include specific examples or data points");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    sanitizedOutput: errors.length === 0 ? content : undefined,
  };
}

/**
 * Scenario Validator
 * Validates AI-generated scenarios meet educational standards
 */
const ScenarioChoiceSchema = z.object({
  choiceId: z.string(),
  action: z.string().min(10),
  description: z.string().min(10),
  consequence: z.string().min(10),
  impact: z.object({
    mttr: z.string().regex(/^[+-]\d+%$/),
    risk: z.enum(["high", "medium", "low"]),
  }),
  isOptimal: z.boolean(),
  reasoning: z.string().min(10),
});

export function validateScenario(scenarioData: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    // Validate structure
    const scenario = z
      .object({
        scenarioId: z.string(),
        type: z.enum([
          "incident-response",
          "capacity-planning",
          "change-management",
          "security-event",
          "performance-degradation",
        ]),
        context: z.string().min(50),
        challenge: z.string().min(50),
        choices: z.array(ScenarioChoiceSchema).min(2).max(5),
        correctiveInsight: z.string().min(50),
        maestroPillar: z.array(z.string()).min(1),
      })
      .parse(scenarioData);

    // Validate that exactly one choice is optimal
    const optimalChoices = scenario.choices.filter((c) => c.isOptimal);
    if (optimalChoices.length === 0) {
      errors.push("Scenario must have at least one optimal choice");
    }
    if (optimalChoices.length > 1) {
      warnings.push("Scenario has multiple optimal choices - ensure this is intentional");
    }

    // Validate MTTR impacts are realistic
    for (const choice of scenario.choices) {
      const mttrValue = parseInt(choice.impact.mttr.replace(/[^0-9-]/g, ""));
      if (Math.abs(mttrValue) > 1000) {
        warnings.push(
          `Unrealistic MTTR impact for choice ${choice.choiceId}: ${choice.impact.mttr}`
        );
      }
    }

    // Check for dummy data (forbidden per PRD)
    const dummyIndicators = ["lorem", "ipsum", "example.com", "test@test", "123-456"];
    const fullText = JSON.stringify(scenario).toLowerCase();

    for (const dummy of dummyIndicators) {
      if (fullText.includes(dummy)) {
        errors.push(`Scenario contains dummy data: "${dummy}" (forbidden per PRD)`);
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.push(...error.errors.map((e) => `${e.path.join(".")}: ${e.message}`));
    } else {
      errors.push(`Validation failed: ${error}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate any AI output based on type
 */
export function validateAIOutput(
  type: "svg" | "text" | "scenario",
  output: unknown,
  options?: any
): ValidationResult {
  switch (type) {
    case "svg":
      return validateSVG(output as string);
    case "text":
      return validateTextContent(output as string, options || {});
    case "scenario":
      return validateScenario(output);
    default:
      return {
        valid: false,
        errors: [`Unknown validation type: ${type}`],
        warnings: [],
      };
  }
}
