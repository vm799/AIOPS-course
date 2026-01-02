"use client";

import dynamic from 'next/dynamic';

const LiquidMetalHero = dynamic(() => import('@/components/hero/LiquidMetalHero'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main>
      <LiquidMetalHero
        badge="Post-LLM Era of AIOps"
        title="Master the Art of Agentic AIOps"
        subtitle="Move beyond chatbots to autonomous orchestration. Learn the Maestro Framework—the gold standard for multi-agent systems in enterprise operations."
        primaryCtaLabel="Start Learning"
        secondaryCtaLabel="Explore Maestro"
        onPrimaryCtaClick={() => {
          // Navigate to course catalog
          console.log('Navigate to courses');
        }}
        onSecondaryCtaClick={() => {
          // Navigate to Maestro framework docs
          console.log('Navigate to Maestro docs');
        }}
        metrics={[
          { value: "6", label: "Week Program" },
          { value: "80%", label: "Alert Reduction" },
          { value: "45s", label: "MTTR Target" },
          { value: "2025", label: "Post-LLM Era" },
        ]}
      />
    </main>
  );
}
