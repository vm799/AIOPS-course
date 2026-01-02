import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { ModuleSchema } from '@/packages/schemas/module.schema';
import { ScenarioSchema } from '@/packages/schemas/scenario.schema';

const CONTENT_ROOT = path.join(process.cwd(), '../../packages/content');

export interface Module {
  id: string;
  moduleId: string;
  title: string;
  track: string;
  description: string;
  duration: number;
  difficulty: string;
  learning_objectives: string[];
  lessons: Array<{
    id: string;
    title: string;
    duration: number;
    path: string;
  }>;
  scenarios: Array<{
    id: string;
    title: string;
    type: string;
    difficulty: string;
    estimatedTime: number;
    path: string;
  }>;
  infographics: Array<{
    id: string;
    title: string;
    description: string;
    path: string;
  }>;
  assessment: {
    id: string;
    title: string;
    type: string;
    path: string;
    questionCount: number;
    totalPoints: number;
    passingScore: number;
    estimatedTime: number;
    topics: string[];
  };
  prerequisites: string[];
  nextModule?: string;
  metadata: {
    created: string;
    version: string;
    status: string;
    contentQuality: string;
    realWorldData: boolean;
    aiSlop: boolean;
  };
}

export interface Scenario {
  scenarioId: string;
  type: string;
  title: string;
  context: string;
  challenge: string;
  choices: Array<{
    choiceId: string;
    label: string;
    impact: {
      mttr: string;
      risk: string;
      slaImpact: string;
      revenueImpact: string;
      teamMorale?: string;
    };
    isOptimal: boolean;
    consequence: string;
  }>;
  correctiveInsight: string;
  maestroPillar: string[];
  realWorldReference?: string;
  metadata?: {
    basedOnIncident?: string;
    revenueAtRisk?: string;
    complexity?: string;
  };
}

export interface Assessment {
  assessmentId: string;
  moduleId: string;
  title: string;
  passingScore: number;
  timeLimit: number;
  questions: Array<{
    questionId: string;
    type: string;
    scenario?: string;
    question: string;
    points: number;
    options: Array<{
      optionId: string;
      text: string;
      isCorrect: boolean;
      explanation: string;
    }>;
  }>;
  metadata: {
    difficulty: string;
    estimatedTime: number;
    topics: string[];
    passingCriteria: {
      minimumScore: number;
      requiredQuestions: string[];
    };
    learningOutcomes: string[];
  };
}

/**
 * Load module metadata from YAML
 */
export async function loadModule(moduleId: string): Promise<Module> {
  const modulePath = path.join(CONTENT_ROOT, 'modules', `${moduleId}.yaml`);

  if (!fs.existsSync(modulePath)) {
    throw new Error(`Module not found: ${moduleId}`);
  }

  const fileContents = fs.readFileSync(modulePath, 'utf8');
  const moduleData = yaml.parse(fileContents);

  // Validate with Zod schema
  const validated = ModuleSchema.parse(moduleData);

  return moduleData as Module;
}

/**
 * Load lesson markdown content
 */
export async function loadLesson(lessonPath: string): Promise<string> {
  const fullPath = path.join(CONTENT_ROOT, lessonPath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Lesson not found: ${lessonPath}`);
  }

  return fs.readFileSync(fullPath, 'utf8');
}

/**
 * Load scenario from YAML
 */
export async function loadScenario(scenarioPath: string): Promise<Scenario> {
  const fullPath = path.join(CONTENT_ROOT, scenarioPath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Scenario not found: ${scenarioPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const scenarioData = yaml.parse(fileContents);

  // Validate with Zod schema
  const validated = ScenarioSchema.parse(scenarioData);

  return scenarioData as Scenario;
}

/**
 * Load assessment from YAML
 */
export async function loadAssessment(assessmentPath: string): Promise<Assessment> {
  const fullPath = path.join(CONTENT_ROOT, assessmentPath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Assessment not found: ${assessmentPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const assessmentData = yaml.parse(fileContents);

  return assessmentData as Assessment;
}

/**
 * Load infographic SVG content
 */
export async function loadInfographic(infographicPath: string): Promise<string> {
  const fullPath = path.join(CONTENT_ROOT, infographicPath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Infographic not found: ${infographicPath}`);
  }

  return fs.readFileSync(fullPath, 'utf8');
}

/**
 * List all available modules
 */
export async function listModules(): Promise<string[]> {
  const modulesDir = path.join(CONTENT_ROOT, 'modules');

  if (!fs.existsSync(modulesDir)) {
    return [];
  }

  const files = fs.readdirSync(modulesDir);
  return files
    .filter(file => file.endsWith('.yaml'))
    .map(file => file.replace('.yaml', ''));
}

/**
 * Get module progress (placeholder for future implementation)
 */
export interface ModuleProgress {
  moduleId: string;
  lessonsCompleted: string[];
  scenariosCompleted: string[];
  assessmentScore?: number;
  completionPercentage: number;
}

export async function getModuleProgress(
  userId: string,
  moduleId: string
): Promise<ModuleProgress> {
  // Placeholder - would integrate with database in production
  return {
    moduleId,
    lessonsCompleted: [],
    scenariosCompleted: [],
    completionPercentage: 0,
  };
}
