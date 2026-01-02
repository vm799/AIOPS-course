"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Target,
  Image as ImageIcon,
  ClipboardCheck,
  CheckCircle2,
  Circle,
  Clock,
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: number;
  completed?: boolean;
}

interface Scenario {
  id: string;
  title: string;
  type: string;
  estimatedTime: number;
  completed?: boolean;
}

interface Infographic {
  id: string;
  title: string;
}

interface Assessment {
  id: string;
  title: string;
  questionCount: number;
  completed?: boolean;
  score?: number;
}

interface ModuleNavProps {
  moduleId: string;
  moduleTitle: string;
  lessons: Lesson[];
  scenarios: Scenario[];
  infographics: Infographic[];
  assessment: Assessment;
}

export function ModuleNav({
  moduleId,
  moduleTitle,
  lessons,
  scenarios,
  infographics,
  assessment,
}: ModuleNavProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-80 h-full bg-background-elevated border-r border-accent-neon-cyan/20 overflow-y-auto">
      <div className="p-6 border-b border-accent-neon-cyan/20">
        <h2 className="text-xl font-bold text-text-primary">{moduleTitle}</h2>
        <p className="text-sm text-text-muted mt-1">Module Navigation</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Lessons */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-2">
            <BookOpen className="w-4 h-4 text-accent-neon-cyan" />
            <h3 className="text-sm font-semibold text-accent-neon-cyan uppercase">
              Lessons ({lessons.length})
            </h3>
          </div>
          <div className="space-y-1">
            {lessons.map((lesson, index) => {
              const path = `/modules/${moduleId}/lessons/${lesson.id}`;
              const active = isActive(path);

              return (
                <Link key={lesson.id} href={path}>
                  <motion.div
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      active
                        ? 'bg-neon-gradient text-background-primary'
                        : 'hover:bg-background-primary text-text-primary'
                    }`}
                    whileHover={{ x: active ? 0 : 4 }}
                  >
                    <div className="flex items-start gap-3">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-50" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {index + 1}. {lesson.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1 opacity-70">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">{lesson.duration} min</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Scenarios */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-2">
            <Target className="w-4 h-4 text-accent-neon-green" />
            <h3 className="text-sm font-semibold text-accent-neon-green uppercase">
              Scenarios ({scenarios.length})
            </h3>
          </div>
          <div className="space-y-1">
            {scenarios.map((scenario) => {
              const path = `/modules/${moduleId}/scenarios/${scenario.id}`;
              const active = isActive(path);

              return (
                <Link key={scenario.id} href={path}>
                  <motion.div
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      active
                        ? 'bg-neon-gradient text-background-primary'
                        : 'hover:bg-background-primary text-text-primary'
                    }`}
                    whileHover={{ x: active ? 0 : 4 }}
                  >
                    <div className="flex items-start gap-3">
                      {scenario.completed ? (
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-50" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {scenario.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs opacity-70 px-2 py-0.5 rounded bg-background-elevated">
                            {scenario.type}
                          </span>
                          <div className="flex items-center gap-1 opacity-70">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">{scenario.estimatedTime} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Infographics */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-2">
            <ImageIcon className="w-4 h-4 text-accent-neon-cyan" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-accent-neon-cyan uppercase">
              Infographics ({infographics.length})
            </h3>
          </div>
          <div className="space-y-1">
            {infographics.map((infographic) => {
              const path = `/modules/${moduleId}/infographics/${infographic.id}`;
              const active = isActive(path);

              return (
                <Link key={infographic.id} href={path}>
                  <motion.div
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      active
                        ? 'bg-neon-gradient text-background-primary'
                        : 'hover:bg-background-primary text-text-primary'
                    }`}
                    whileHover={{ x: active ? 0 : 4 }}
                  >
                    <p className="text-sm font-medium truncate">
                      {infographic.title}
                    </p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Assessment */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-2">
            <ClipboardCheck className="w-4 h-4 text-accent-neon-green" />
            <h3 className="text-sm font-semibold text-accent-neon-green uppercase">
              Assessment
            </h3>
          </div>
          <Link href={`/modules/${moduleId}/assessment`}>
            <motion.div
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                isActive(`/modules/${moduleId}/assessment`)
                  ? 'bg-neon-gradient text-background-primary'
                  : 'hover:bg-background-primary text-text-primary'
              }`}
              whileHover={{ x: isActive(`/modules/${moduleId}/assessment`) ? 0 : 4 }}
            >
              <div className="flex items-start gap-3">
                {assessment.completed ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-50" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{assessment.title}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {assessment.questionCount} questions · 80% to pass
                  </p>
                  {assessment.score !== undefined && (
                    <p className="text-xs mt-1 font-semibold">
                      Score: {assessment.score}%
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
