/**
 * User Progress Schema
 * Tracks learner progress through the curriculum
 */

import { z } from "zod";

export const ModuleStatusSchema = z.enum([
  "not_started",
  "in_progress",
  "completed",
  "failed",
]);

export const ModuleProgressSchema = z.object({
  moduleId: z.string().min(1),
  completedLessons: z.array(z.string()),
  assessmentScore: z.number().min(0).max(100).optional(),
  status: ModuleStatusSchema,
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  timeSpentMinutes: z.number().min(0).default(0),
});

export const CertificationSchema = z.object({
  eligible: z.boolean(),
  issued: z.boolean(),
  issuedAt: z.date().optional(),
  certificateId: z.string().optional(),
  verificationUrl: z.string().url().optional(),
});

export const UserProgressSchema = z.object({
  userId: z.string().min(1),
  courseId: z.string().min(1),
  trackId: z.string().min(1),
  progress: z.array(ModuleProgressSchema),
  certification: CertificationSchema,
  enrolledAt: z.date(),
  lastActivityAt: z.date(),
  totalTimeSpentMinutes: z.number().min(0).default(0),
});

/**
 * Scenario Decision Tracking
 */
export const ScenarioDecisionSchema = z.object({
  scenarioId: z.string().min(1),
  userId: z.string().min(1),
  choiceId: z.string().min(1),
  timestamp: z.date(),
  timeToDecideSeconds: z.number().min(0),
  wasOptimal: z.boolean(),
  reasoning: z.string().optional(),
});

export const ScenarioProgressSchema = z.object({
  userId: z.string().min(1),
  decisions: z.array(ScenarioDecisionSchema),
  optimalDecisionRate: z.number().min(0).max(1),
  averageDecisionTimeSeconds: z.number().min(0),
});

// Type exports
export type ModuleStatus = z.infer<typeof ModuleStatusSchema>;
export type ModuleProgress = z.infer<typeof ModuleProgressSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type UserProgress = z.infer<typeof UserProgressSchema>;
export type ScenarioDecision = z.infer<typeof ScenarioDecisionSchema>;
export type ScenarioProgress = z.infer<typeof ScenarioProgressSchema>;
