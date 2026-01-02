import React from 'react';
import { redirect } from 'next/navigation';
import { loadModule } from '@/lib/content/loader';

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const moduleData = await loadModule(moduleId);

  // Redirect to the first lesson
  if (moduleData.lessons.length > 0) {
    redirect(`/modules/${moduleId}/lessons/${moduleData.lessons[0].id}`);
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-2xl p-8">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          {moduleData.title}
        </h1>
        <p className="text-text-muted mb-6 leading-relaxed">
          {moduleData.description}
        </p>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="p-4 bg-background-elevated rounded-lg border border-accent-neon-cyan/20">
            <p className="text-3xl font-bold text-accent-neon-cyan">
              {moduleData.lessons.length}
            </p>
            <p className="text-sm text-text-muted mt-1">Lessons</p>
          </div>
          <div className="p-4 bg-background-elevated rounded-lg border border-accent-neon-green/20">
            <p className="text-3xl font-bold text-accent-neon-green">
              {moduleData.scenarios.length}
            </p>
            <p className="text-sm text-text-muted mt-1">Scenarios</p>
          </div>
          <div className="p-4 bg-background-elevated rounded-lg border border-accent-neon-cyan/20">
            <p className="text-3xl font-bold text-accent-neon-cyan">
              {moduleData.duration}
            </p>
            <p className="text-sm text-text-muted mt-1">Minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
