/**
 * Module Schema
 * Defines the structure for course modules
 * @see docs/PRD.md#61-module-schema
 */

import { z } from "zod";

export const LearningOutcomeSchema = z.string().min(10).max(200);

export const AssetSchema = z.object({
  video: z.string().optional(),
  pdf: z.string().optional(),
});

export const InfographicSchema = z.string().endsWith(".svg");

export const AssessmentTypeSchema = z.enum([
  "scenario-decision",
  "multi-path",
  "causal-analysis",
]);

export const RubricVersionSchema = z.enum([
  "practitioner-v1",
  "architect-v1",
  "executive-v1",
]);

export const AssessmentSchema = z.object({
  type: AssessmentTypeSchema,
  rubric: RubricVersionSchema,
  passingScore: z.number().min(0).max(100).default(80),
});

export const LessonTypeSchema = z.enum([
  "video",
  "lab",
  "scenario",
  "quiz",
  "reading",
  "infographic",
]);

export const AIFeatureModesSchema = z.enum([
  "socratic",
  "diagnostic",
  "simulation",
]);

export const AIFeaturesSchema = z.object({
  enabled: z.boolean(),
  modes: z.array(AIFeatureModesSchema),
});

export const LessonSchema = z.object({
  lessonId: z.string().min(1),
  type: LessonTypeSchema,
  durationMinutes: z.number().min(1).max(360),
  contentRef: z.string().min(1),
  aiFeatures: AIFeaturesSchema.optional(),
});

export const ModuleSchema = z.object({
  moduleId: z.string().min(1),
  title: z.string().min(1).max(200),
  description: z.string().min(10).max(1000),
  learningObjectives: z.array(LearningOutcomeSchema).min(1).max(5),
  lessons: z.array(LessonSchema).min(1),
  assessment: AssessmentSchema,
});

export const TrackSchema = z.enum(["practitioner", "architect", "executive"]);

export const LevelSchema = z.enum(["beginner", "intermediate", "advanced"]);

export const PillarSchema = z.enum([
  "AIOps",
  "AISECOPS",
  "MAESTRO",
  "AGENTIC_SYSTEMS",
]);

export const CourseSchema = z.object({
  courseId: z.string().min(1),
  title: z.string().min(1).max(200),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  level: LevelSchema,
  pillars: z.array(PillarSchema).min(1),
  outcomes: z.array(z.string()).min(1),
  modules: z.array(ModuleSchema).min(1),
});

// Type exports
export type LearningOutcome = z.infer<typeof LearningOutcomeSchema>;
export type Asset = z.infer<typeof AssetSchema>;
export type Infographic = z.infer<typeof InfographicSchema>;
export type AssessmentType = z.infer<typeof AssessmentTypeSchema>;
export type RubricVersion = z.infer<typeof RubricVersionSchema>;
export type Assessment = z.infer<typeof AssessmentSchema>;
export type LessonType = z.infer<typeof LessonTypeSchema>;
export type AIFeatureModes = z.infer<typeof AIFeatureModesSchema>;
export type AIFeatures = z.infer<typeof AIFeaturesSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type Track = z.infer<typeof TrackSchema>;
export type Level = z.infer<typeof LevelSchema>;
export type Pillar = z.infer<typeof PillarSchema>;
export type Course = z.infer<typeof CourseSchema>;
