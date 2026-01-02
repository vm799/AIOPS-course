"use client";

// AIOps Academy - Main Landing Page
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const LiquidMetalHero = dynamic(() => import('@/components/hero/LiquidMetalHero'), {
  ssr: false,
});

export default function HomePage() {
  const router = useRouter();

  return (
    <main>
      <LiquidMetalHero
        badge="Post-LLM Era of AIOps"
        title="Master the Art of Agentic AIOps"
        subtitle="Move beyond chatbots to autonomous orchestration. Learn the Maestro Framework—the gold standard for multi-agent systems in enterprise operations."
        primaryCtaLabel="Start Module 1"
        secondaryCtaLabel="Explore Maestro"
        onPrimaryCtaClick={() => {
          router.push('/modules/intelligent-observability');
        }}
        onSecondaryCtaClick={() => {
          router.push('/modules/intelligent-observability/lessons/03-maestro-framework');
        }}
        metrics={[
          { value: "86min", label: "Module 1" },
          { value: "73%", label: "MTTR Reduction" },
          { value: "78%", label: "Signal Quality" },
          { value: "4", label: "Scenarios" },
        ]}
      />
    </main>
  );
}
