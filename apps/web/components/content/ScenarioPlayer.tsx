"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Clock,
  Shield,
  DollarSign,
  Users,
  CheckCircle2,
  XCircle,
  Lightbulb,
} from 'lucide-react';

interface Choice {
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
}

interface Scenario {
  scenarioId: string;
  type: string;
  title: string;
  context: string;
  challenge: string;
  choices: Choice[];
  correctiveInsight: string;
  maestroPillar: string[];
  realWorldReference?: string;
}

interface ScenarioPlayerProps {
  scenario: Scenario;
  onComplete?: (choiceId: string, isOptimal: boolean) => void;
}

type Step = 'context' | 'challenge' | 'choices' | 'consequence' | 'contemplate';

export function ScenarioPlayer({ scenario, onComplete }: ScenarioPlayerProps) {
  const [currentStep, setCurrentStep] = useState<Step>('context');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [revealedImpact, setRevealedImpact] = useState(false);

  const handleChoiceSelect = (choice: Choice) => {
    setSelectedChoice(choice);
    setCurrentStep('consequence');
  };

  const handleRevealImpact = () => {
    setRevealedImpact(true);
  };

  const handleComplete = () => {
    if (selectedChoice && onComplete) {
      onComplete(selectedChoice.choiceId, selectedChoice.isOptimal);
    }
  };

  return (
    <div className="min-h-screen bg-background-primary p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-accent-neon-cyan/10 text-accent-neon-cyan text-sm font-medium border border-accent-neon-cyan/30">
              {scenario.type.replace('-', ' ')}
            </span>
            {scenario.maestroPillar.map((pillar) => (
              <span
                key={pillar}
                className="px-3 py-1 rounded-full bg-accent-neon-green/10 text-accent-neon-green text-sm font-medium border border-accent-neon-green/30"
              >
                {pillar.toUpperCase()}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            {scenario.title}
          </h1>

          {/* Step Progress */}
          <div className="flex items-center gap-2 mt-6">
            {['context', 'challenge', 'choices', 'consequence', 'contemplate'].map((step, index) => {
              const isCurrent = currentStep === step;
              const isCompleted =
                ['context', 'challenge', 'choices', 'consequence', 'contemplate'].indexOf(currentStep) >
                index;

              return (
                <React.Fragment key={step}>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      isCurrent
                        ? 'bg-neon-gradient text-background-primary'
                        : isCompleted
                        ? 'bg-accent-neon-green/20 text-accent-neon-green'
                        : 'bg-background-elevated text-text-muted'
                    }`}
                  >
                    <span className="text-sm font-medium capitalize">{step}</span>
                  </div>
                  {index < 4 && (
                    <div className="w-8 h-0.5 bg-accent-neon-cyan/20" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Context */}
          {currentStep === 'context' && (
            <motion.div
              key="context"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="p-8 bg-background-elevated rounded-lg border border-accent-neon-cyan/20">
                <h2 className="text-2xl font-bold text-accent-neon-cyan mb-4">
                  Context
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-text-primary leading-relaxed whitespace-pre-line">
                    {scenario.context}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentStep('challenge')}
                className="px-8 py-3 rounded-lg bg-neon-gradient hover:opacity-90 transition-opacity text-background-primary font-semibold"
              >
                Continue to Challenge
              </button>
            </motion.div>
          )}

          {/* Step 2: Challenge */}
          {currentStep === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="p-8 bg-background-elevated rounded-lg border border-red-500/30">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-red-400 mb-4">
                      Challenge
                    </h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-text-primary leading-relaxed whitespace-pre-line">
                        {scenario.challenge}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCurrentStep('choices')}
                className="px-8 py-3 rounded-lg bg-neon-gradient hover:opacity-90 transition-opacity text-background-primary font-semibold"
              >
                View Decision Options
              </button>
            </motion.div>
          )}

          {/* Step 3: Choices */}
          {currentStep === 'choices' && (
            <motion.div
              key="choices"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-accent-neon-cyan mb-4">
                Choose Your Approach
              </h2>
              <div className="grid gap-4">
                {scenario.choices.map((choice) => (
                  <motion.button
                    key={choice.choiceId}
                    onClick={() => handleChoiceSelect(choice)}
                    className="p-6 bg-background-elevated rounded-lg border border-accent-neon-cyan/20 hover:border-accent-neon-cyan/50 transition-colors text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {choice.label}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-text-muted" />
                        <span className="text-text-muted">MTTR:</span>
                        <span className="text-text-primary font-medium">{choice.impact.mttr}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-text-muted" />
                        <span className="text-text-muted">Risk:</span>
                        <span className="text-text-primary font-medium">{choice.impact.risk}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Consequence */}
          {currentStep === 'consequence' && selectedChoice && (
            <motion.div
              key="consequence"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div
                className={`p-8 bg-background-elevated rounded-lg border ${
                  selectedChoice.isOptimal
                    ? 'border-accent-neon-green/30'
                    : 'border-red-500/30'
                }`}
              >
                <div className="flex items-start gap-4 mb-6">
                  {selectedChoice.isOptimal ? (
                    <CheckCircle2 className="w-8 h-8 text-accent-neon-green flex-shrink-0" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
                  )}
                  <div>
                    <h2
                      className={`text-2xl font-bold mb-2 ${
                        selectedChoice.isOptimal ? 'text-accent-neon-green' : 'text-red-400'
                      }`}
                    >
                      {selectedChoice.isOptimal ? 'Optimal Decision' : 'Suboptimal Decision'}
                    </h2>
                    <p className="text-lg font-semibold text-text-primary">
                      {selectedChoice.label}
                    </p>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none mb-6">
                  <p className="text-text-primary leading-relaxed whitespace-pre-line">
                    {selectedChoice.consequence}
                  </p>
                </div>

                {!revealedImpact && (
                  <button
                    onClick={handleRevealImpact}
                    className="px-6 py-3 rounded-lg bg-accent-neon-cyan/10 hover:bg-accent-neon-cyan/20 transition-colors text-accent-neon-cyan border border-accent-neon-cyan/30"
                  >
                    Reveal Full Impact Analysis
                  </button>
                )}

                {revealedImpact && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 p-6 bg-background-primary rounded-lg border border-accent-neon-cyan/20"
                  >
                    <h3 className="text-lg font-semibold text-accent-neon-cyan mb-4">
                      Impact Analysis
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-text-muted">MTTR Impact</p>
                          <p className="text-text-primary font-medium">{selectedChoice.impact.mttr}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-text-muted">Risk Level</p>
                          <p className="text-text-primary font-medium">{selectedChoice.impact.risk}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-text-muted">SLA Impact</p>
                          <p className="text-text-primary font-medium">{selectedChoice.impact.slaImpact}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-text-muted">Revenue Impact</p>
                          <p className="text-text-primary font-medium">{selectedChoice.impact.revenueImpact}</p>
                        </div>
                      </div>
                      {selectedChoice.impact.teamMorale && (
                        <div className="flex items-start gap-3 col-span-2">
                          <Users className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-text-muted">Team Morale</p>
                            <p className="text-text-primary font-medium">{selectedChoice.impact.teamMorale}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {revealedImpact && (
                <button
                  onClick={() => setCurrentStep('contemplate')}
                  className="px-8 py-3 rounded-lg bg-neon-gradient hover:opacity-90 transition-opacity text-background-primary font-semibold"
                >
                  Continue to Insights
                </button>
              )}
            </motion.div>
          )}

          {/* Step 5: Contemplate */}
          {currentStep === 'contemplate' && (
            <motion.div
              key="contemplate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="p-8 bg-background-elevated rounded-lg border border-accent-neon-green/30">
                <div className="flex items-start gap-4 mb-6">
                  <Lightbulb className="w-8 h-8 text-accent-neon-green flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-accent-neon-green mb-4">
                      Corrective Insights
                    </h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-text-primary leading-relaxed whitespace-pre-line">
                        {scenario.correctiveInsight}
                      </p>
                    </div>
                  </div>
                </div>

                {scenario.realWorldReference && (
                  <div className="mt-6 p-4 bg-accent-neon-cyan/10 rounded-lg border border-accent-neon-cyan/30">
                    <p className="text-sm text-accent-neon-cyan">
                      <strong>Real-World Reference:</strong> {scenario.realWorldReference}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleComplete}
                className="px-8 py-3 rounded-lg bg-neon-gradient hover:opacity-90 transition-opacity text-background-primary font-semibold"
              >
                Complete Scenario
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
