import React from 'react';
import { loadModule, loadLesson } from '@/lib/content/loader';
import { LessonViewer } from '@/components/content/LessonViewer';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = await params;

  // Load module metadata
  const moduleData = await loadModule(moduleId);

  // Find the specific lesson
  const lessonIndex = moduleData.lessons.findIndex((l) => l.id === lessonId);
  if (lessonIndex === -1) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Lesson Not Found
          </h1>
          <p className="text-text-muted">
            The lesson &quot;{lessonId}&quot; could not be found in this module.
          </p>
        </div>
      </div>
    );
  }

  const lesson = module.lessons[lessonIndex];
  const lessonContent = await loadLesson(lesson.path);

  const hasNext = lessonIndex < module.lessons.length - 1;
  const hasPrevious = lessonIndex > 0;

  return (
    <LessonViewer
      lesson={lesson}
      lessonContent={lessonContent}
      hasNext={hasNext}
      hasPrevious={hasPrevious}
      isCompleted={false} // TODO: Track completion status
    />
  );
}

// Generate static params for all lessons in all modules
export async function generateStaticParams() {
  // For now, just return Module 1 lessons
  return [
    { moduleId: 'intelligent-observability', lessonId: '01-introduction-intelligent-observability' },
    { moduleId: 'intelligent-observability', lessonId: '02-from-monitoring-to-observability' },
    { moduleId: 'intelligent-observability', lessonId: '03-maestro-framework' },
    { moduleId: 'intelligent-observability', lessonId: '04-telemetry-chaos-signal-vs-noise' },
    { moduleId: 'intelligent-observability', lessonId: '05-causal-inference-operations' },
  ];
}
