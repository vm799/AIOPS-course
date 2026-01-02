import React from 'react';
import { loadModule } from '@/lib/content/loader';
import { ModuleNav } from '@/components/navigation/ModuleNav';

export default async function ModuleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const moduleData = await loadModule(moduleId);

  return (
    <div className="flex h-screen bg-background-primary">
      <ModuleNav
        moduleId={moduleData.id}
        moduleTitle={moduleData.title}
        lessons={moduleData.lessons}
        scenarios={moduleData.scenarios}
        infographics={moduleData.infographics}
        assessment={moduleData.assessment}
      />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
