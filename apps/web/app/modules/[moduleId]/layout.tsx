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
  const module = await loadModule(moduleId);

  return (
    <div className="flex h-screen bg-background-primary">
      <ModuleNav
        moduleId={module.id}
        moduleTitle={module.title}
        lessons={module.lessons}
        scenarios={module.scenarios}
        infographics={module.infographics}
        assessment={module.assessment}
      />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
