"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem, fadeInVariants } from "@/lib/design/motion";
import type { Scenario } from "@/lib/content/loader";

interface ScenarioDecisionProps {
  scenario: Scenario;
  onDecisionMade: (choiceId: string, timeToDecideSeconds: number) => void;
}

type Choice = Scenario['choices'][0];

export function ScenarioDecision({ scenario, onDecisionMade }: ScenarioDecisionProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showConsequence, setShowConsequence] = useState(false);
  const [startTime] = useState(Date.now());

  const handleChoiceSelect = (choiceId: string) => {
    if (showConsequence) return; // Prevent changing after submission

    const timeToDecide = Math.floor((Date.now() - startTime) / 1000);
    setSelectedChoice(choiceId);
    setShowConsequence(true);
    onDecisionMade(choiceId, timeToDecide);
  };

  const selectedChoiceData = scenario.choices.find((c) => c.choiceId === selectedChoice);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Scenario Context */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className="glass-effect rounded-2xl p-8 space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
          <span className="text-sm font-semibold text-accent-primary uppercase tracking-wider">
            {scenario.type.replace("-", " ")}
          </span>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-text-primary">Context</h2>
          <p className="text-lg text-text-muted leading-relaxed whitespace-pre-line">
            {scenario.context}
          </p>
        </div>

        <div className="border-t border-gray-800 pt-6 space-y-4">
          <h3 className="text-2xl font-bold text-accent-secondary">Challenge</h3>
          <p className="text-lg text-text-primary leading-relaxed whitespace-pre-line">
            {scenario.challenge}
          </p>
        </div>
      </motion.div>

      {/* Choices */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-text-primary">Your Decision</h3>
        {scenario.choices.map((choice, index) => (
          <ChoiceCard
            key={choice.choiceId}
            choice={choice}
            index={index}
            isSelected={selectedChoice === choice.choiceId}
            isDisabled={showConsequence && selectedChoice !== choice.choiceId}
            onSelect={() => handleChoiceSelect(choice.choiceId)}
          />
        ))}
      </motion.div>

      {/* Consequence & Insight */}
      <AnimatePresence>
        {showConsequence && selectedChoiceData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.24 }}
            className="space-y-6"
          >
            {/* Consequence */}
            <div className={`rounded-2xl p-8 border-2 ${
              selectedChoiceData.isOptimal
                ? "bg-green-950/20 border-green-800"
                : "bg-amber-950/20 border-amber-800"
            }`}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {selectedChoiceData.isOptimal ? (
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                  <h3 className="text-xl font-bold">
                    {selectedChoiceData.isOptimal ? "Optimal Decision" : "Suboptimal Decision"}
                  </h3>
                </div>

                <p className="text-text-primary leading-relaxed whitespace-pre-line">
                  {selectedChoiceData.consequence}
                </p>

                {/* Impact Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-800">
                  <ImpactMetric label="MTTR Impact" value={selectedChoiceData.impact.mttr} />
                  <ImpactMetric label="Risk Level" value={selectedChoiceData.impact.risk} />
                  {selectedChoiceData.impact.slaImpact && (
                    <ImpactMetric label="SLA Impact" value={selectedChoiceData.impact.slaImpact} className="md:col-span-2" />
                  )}
                </div>

                {/* Reasoning */}
                <div className="pt-4 border-t border-gray-800">
                  <h4 className="font-semibold text-text-primary mb-2">Why this matters:</h4>
                  <p className="text-text-muted leading-relaxed whitespace-pre-line">
                    {selectedChoiceData.consequence}
                  </p>
                </div>
              </div>
            </div>

            {/* Corrective Insight */}
            <div className="glass-effect rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-bold text-accent-primary">Corrective Insight</h3>
              <p className="text-text-primary leading-relaxed whitespace-pre-line">
                {scenario.correctiveInsight}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ChoiceCardProps {
  choice: Choice;
  index: number;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}

function ChoiceCard({ choice, index, isSelected, isDisabled, onSelect }: ChoiceCardProps) {
  return (
    <motion.button
      variants={staggerItem}
      onClick={onSelect}
      disabled={isDisabled}
      className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-240 ${
        isSelected
          ? "border-accent-primary bg-accent-primary/10"
          : isDisabled
          ? "border-gray-800 bg-gray-900/50 opacity-50 cursor-not-allowed"
          : "border-gray-800 bg-background-elevated hover:border-accent-primary/50 hover:bg-accent-primary/5"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
          isSelected ? "bg-accent-primary text-white" : "bg-gray-800 text-text-muted"
        }`}>
          {String.fromCharCode(65 + index)}
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="font-semibold text-lg text-text-primary">{choice.label}</h4>
        </div>
      </div>
    </motion.button>
  );
}

interface ImpactMetricProps {
  label: string;
  value: string;
  className?: string;
}

function ImpactMetric({ label, value, className = "" }: ImpactMetricProps) {
  const isNegative = value.startsWith("-");
  const isPositive = value.startsWith("+");

  return (
    <div className={`space-y-1 ${className}`}>
      <p className="text-xs text-text-muted uppercase tracking-wider">{label}</p>
      <p className={`font-semibold ${
        isNegative ? "text-green-400" : isPositive ? "text-red-400" : "text-text-primary"
      }`}>
        {value}
      </p>
    </div>
  );
}
