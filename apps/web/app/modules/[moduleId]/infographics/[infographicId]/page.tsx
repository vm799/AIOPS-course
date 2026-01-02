import React from 'react';
import { loadModule, loadInfographic } from '@/lib/content/loader';

export default async function InfographicPage({
  params,
}: {
  params: Promise<{ moduleId: string; infographicId: string }>;
}) {
  const { moduleId, infographicId } = await params;

  // Load module metadata
  const module = await loadModule(moduleId);

  // Find the specific infographic
  const infographicMeta = module.infographics.find((i) => i.id === infographicId);
  if (!infographicMeta) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Infographic Not Found
          </h1>
          <p className="text-text-muted">
            The infographic &quot;{infographicId}&quot; could not be found in this module.
          </p>
        </div>
      </div>
    );
  }

  // Load the SVG content
  const svgContent = await loadInfographic(infographicMeta.path);

  return (
    <div className="flex flex-col h-full bg-background-primary">
      {/* Header */}
      <div className="border-b border-accent-neon-cyan/20 bg-background-elevated p-6">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          {infographicMeta.title}
        </h1>
        <p className="text-text-muted">{infographicMeta.description}</p>
      </div>

      {/* SVG Viewer */}
      <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
        <div
          className="max-w-full max-h-full"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
    </div>
  );
}

// Generate static params for all infographics in all modules
export async function generateStaticParams() {
  return [
    { moduleId: 'intelligent-observability', infographicId: 'maestro-framework-cycle' },
    { moduleId: 'intelligent-observability', infographicId: 'telemetry-pipeline-architecture' },
    { moduleId: 'intelligent-observability', infographicId: 'signal-vs-noise-visualization' },
    { moduleId: 'intelligent-observability', infographicId: 'causal-inference-loop' },
  ];
}
