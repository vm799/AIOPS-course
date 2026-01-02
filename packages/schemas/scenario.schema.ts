/**
 * Scenario Schema
 * Defines the structure for scenario-based learning
 * @see docs/PRD.md#62-scenario-schema
 */

import { z } from "zod";

export const ImpactLevelSchema = z.enum(["high", "medium", "low"]);

export const ImpactMetricsSchema = z.object({
  mttr: z.string(), // e.g., "+30%", "-15%", "+240%"
  blastRadius: ImpactLevelSchema.optional(),
  risk: z.string(), // Allow any string for flexibility (high, medium, low, etc.)
  slaImpact: z.string().optional(),
  revenueImpact: z.string().optional(),
  teamMorale: z.string().optional(),
});

export const ChoiceSchema = z.object({
  choiceId: z.string().min(1),
  action: z.string().min(1),
  description: z.string().min(1),
  consequence: z.string().min(1),
  impact: ImpactMetricsSchema,
  isOptimal: z.boolean().default(false),
  reasoning: z.string().min(1),
  label: z.string().optional(), // For UI display
});

export const ScenarioTypeSchema = z.enum([
  "incident-response",
  "capacity-planning",
  "change-management",
  "security-event",
  "performance-degradation",
  "strategic-planning",
]);

export const ScenarioSchema = z.object({
  id: z.string().min(1),
  type: ScenarioTypeSchema,
  context: z.string().min(1),
  challenge: z.string().min(1),
  choices: z.array(ChoiceSchema).min(2).max(5),
  correctiveInsight: z.string().min(1),
  maestroPillar: z.array(z.enum([
    "sense",
    "understand",
    "decide",
    "act",
    "verify",
    "learn",
  ])).min(1),
  contemplate: z.string().min(1).optional(), // Reflection prompt (5Cs Framework)
  title: z.string().optional(),
  realWorldReference: z.string().optional(),
  metadata: z.object({
    basedOnIncident: z.string().optional(),
    revenueAtRisk: z.string().optional(),
    complexity: z.string().optional(),
  }).optional(),
});

/**
 * The 5Cs Framework for Scenario-Based Learning
 */
export const FiveCsScenarioSchema = ScenarioSchema.extend({
  // Context: Already covered by 'context' field
  // Challenge: Already covered by 'challenge' field
  // Choices: Already covered by 'choices' field
  // Consequence: Covered in each choice's 'consequence' field
  contemplate: z.string().min(50).max(1000), // Reflection prompt (required in 5Cs)
});

// Type exports
export type ImpactLevel = z.infer<typeof ImpactLevelSchema>;
export type ImpactMetrics = z.infer<typeof ImpactMetricsSchema>;
export type Choice = z.infer<typeof ChoiceSchema>;
export type ScenarioType = z.infer<typeof ScenarioTypeSchema>;
export type Scenario = z.infer<typeof ScenarioSchema>;
export type FiveCsScenario = z.infer<typeof FiveCsScenarioSchema>;
