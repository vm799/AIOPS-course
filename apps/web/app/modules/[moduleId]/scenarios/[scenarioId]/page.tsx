import React from 'react';
import { loadModule, loadScenario } from '@/lib/content/loader';
import { ScenarioPlayer } from '@/components/content/ScenarioPlayer';

export default async function ScenarioPage({
  params,
}: {
  params: Promise<{ moduleId: string; scenarioId: string }>;
}) {
  const { moduleId, scenarioId } = await params;

  // Load module metadata
  const module = await loadModule(moduleId);

  // Find the specific scenario
  const scenarioMeta = module.scenarios.find((s) => s.id === scenarioId);
  if (!scenarioMeta) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Scenario Not Found
          </h1>
          <p className="text-text-muted">
            The scenario &quot;{scenarioId}&quot; could not be found in this module.
          </p>
        </div>
      </div>
    );
  }

  // Load the full scenario data
  const scenario = await loadScenario(scenarioMeta.path);

  return <ScenarioPlayer scenario={scenario} />;
}

// Generate static params for all scenarios in all modules
export async function generateStaticParams() {
  // For now, just return Module 1 scenarios
  return [
    { moduleId: 'intelligent-observability', scenarioId: 'retail-memory-leak' },
    { moduleId: 'intelligent-observability', scenarioId: 'microservices-cascade-failure' },
    { moduleId: 'intelligent-observability', scenarioId: 'telemetry-alert-fatigue' },
    { moduleId: 'intelligent-observability', scenarioId: 'kubernetes-node-degradation' },
  ];
}
