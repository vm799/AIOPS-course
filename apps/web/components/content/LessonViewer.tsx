"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Circle, ChevronRight, ChevronLeft } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface Lesson {
  id: string;
  title: string;
  duration: number;
  path: string;
  content?: string;
}

interface LessonViewerProps {
  lesson: Lesson;
  lessonContent: string;
  onComplete?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  isCompleted?: boolean;
}

export function LessonViewer({
  lesson,
  lessonContent,
  onComplete,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
  isCompleted = false,
}: LessonViewerProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollPercentage =
      (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
    setScrollProgress(Math.min(scrollPercentage, 100));

    // Auto-mark complete when scrolled to bottom
    if (scrollPercentage > 95 && !isCompleted && onComplete) {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-accent-neon-cyan/20 bg-background-elevated p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {lesson.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{lesson.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-accent-neon-green" />
                    <span className="text-accent-neon-green">Completed</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    <span>In Progress</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 bg-background-primary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-neon-gradient"
            initial={{ width: 0 }}
            animate={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto p-8 bg-background-primary"
        onScroll={handleScroll}
      >
        <div className="max-w-4xl mx-auto">
          <MarkdownRenderer content={lessonContent} />
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-accent-neon-cyan/20 bg-background-elevated p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-primary hover:bg-background-elevated disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-accent-neon-cyan/20"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-text-primary">Previous Lesson</span>
          </button>

          <div className="flex items-center gap-3">
            {!isCompleted && onComplete && (
              <button
                onClick={onComplete}
                className="px-6 py-2 rounded-lg bg-background-primary hover:bg-background-elevated transition-colors border border-accent-neon-green/50 text-accent-neon-green"
              >
                Mark as Complete
              </button>
            )}

            <button
              onClick={onNext}
              disabled={!hasNext}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-neon-gradient hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity text-background-primary font-semibold"
            >
              <span>Next Lesson</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
