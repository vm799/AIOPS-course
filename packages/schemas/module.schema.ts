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
  id: z.string().min(1),
  title: z.string().min(1),
  duration: z.number().min(1).max(360),
  path: z.string().min(1),
  type: LessonTypeSchema.optional(),
  aiFeatures: AIFeaturesSchema.optional(),
});

export const ScenarioReferenceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  type: z.string().min(1),
  difficulty: z.string().min(1),
  estimatedTime: z.number().min(1),
  path: z.string().min(1),
});

export const InfographicItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  path: z.string().min(1).endsWith(".svg"),
});

export const AssessmentItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  type: z.string().min(1),
  path: z.string().min(1),
  questionCount: z.number().min(1).optional(),
  totalPoints: z.number().min(1).optional(),
  passingScore: z.number().min(0).max(100),
  estimatedTime: z.number().min(1).optional(),
  topics: z.array(z.string()).optional(),
});

export const MetadataSchema = z.object({
  created: z.string(),
  version: z.string(),
  status: z.string(),
  contentQuality: z.string(),
  realWorldData: z.boolean(),
  aiSlop: z.boolean(),
});

export const ModuleSchema = z.object({
  id: z.string().min(1),
  moduleId: z.string().min(1),
  title: z.string().min(1).max(200),
  track: z.string().min(1),
  description: z.string().min(10).max(1000),
  duration: z.number().min(1).optional(),
  difficulty: z.string().min(1).optional(),
  learning_objectives: z.array(LearningOutcomeSchema).min(1),
  lessons: z.array(LessonSchema).min(1),
  scenarios: z.array(ScenarioReferenceSchema).optional(),
  infographics: z.array(InfographicItemSchema).optional(),
  assessment: AssessmentItemSchema,
  prerequisites: z.array(z.string()),
  nextModule: z.string().optional(),
  metadata: MetadataSchema.optional(),
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
export type ScenarioReference = z.infer<typeof ScenarioReferenceSchema>;
export type InfographicItem = z.infer<typeof InfographicItemSchema>;
export type AssessmentItem = z.infer<typeof AssessmentItemSchema>;
export type Metadata = z.infer<typeof MetadataSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type Track = z.infer<typeof TrackSchema>;
export type Level = z.infer<typeof LevelSchema>;
export type Pillar = z.infer<typeof PillarSchema>;
export type Course = z.infer<typeof CourseSchema>;
