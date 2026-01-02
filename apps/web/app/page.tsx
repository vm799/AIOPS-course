export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            AIOps Academy
          </h1>
          <p className="text-2xl md:text-3xl text-text-muted font-light">
            You design the future. We clear the way.
          </p>
        </div>

        {/* Value Proposition */}
        <div className="glass-effect rounded-2xl p-8 space-y-6">
          <p className="text-xl text-text-primary leading-relaxed">
            Professional-grade AIOps curriculum that teaches practitioners to architect{" "}
            <span className="text-accent-primary font-semibold">self-healing</span>,{" "}
            <span className="text-accent-secondary font-semibold">intelligent systems</span>{" "}
            through scenario-based learning and governed AI.
          </p>

          <div className="grid md:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2">
              <h3 className="text-accent-primary font-semibold">Practitioners</h3>
              <p className="text-sm text-text-muted">SREs, DevOps, Platform Engineers</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-accent-primary font-semibold">Architects</h3>
              <p className="text-sm text-text-muted">Platform & Enterprise Architects</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-accent-primary font-semibold">Executives</h3>
              <p className="text-sm text-text-muted">CTOs, Heads of Ops</p>
            </div>
          </div>
        </div>

        {/* Differentiators */}
        <div className="grid md:grid-cols-2 gap-4 text-left">
          {[
            "No multiple-choice trivia",
            "No dummy data",
            "Real operational scenarios",
            "Human judgment at the center",
            "Governed AI systems",
            "Enterprise audit-safe",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3 p-4 glass-effect rounded-lg">
              <svg
                className="w-5 h-5 text-accent-secondary flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-text-primary">{feature}</span>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="pt-8 border-t border-gray-800">
          <p className="text-text-muted text-sm">
            Platform in development • Phase 1: Foundation
          </p>
        </div>
      </div>
    </main>
  );
}
