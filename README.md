# Agentic AIOps & Intelligent Observability Academy

> **You design the future. We clear the way.**

A professional-grade AIOps curriculum that teaches practitioners to architect self-healing, intelligent systems through scenario-based learning and governed AI.

---

## 🎯 Vision

This platform teaches how to **think, design, govern, and trust AIOps systems**—not how to "use tools" or write notebooks.

**Target Audience:**
- 🔧 **Practitioners:** SREs, DevOps, Platform Engineers
- 🏗️ **Architects:** Platform / Enterprise Architects
- 📊 **Executives:** CTOs, Heads of Ops, Transformation Leaders

---

## 🏛️ Architecture

### Monorepo Structure

```
/
├── apps/
│   └── web/                 # Next.js learner platform (App Router)
├── packages/
│   ├── schemas/             # JSON schemas (Zod) + validation
│   ├── content/             # Git-backed curriculum (YAML + MD)
│   └── ai-tooling/          # Behind-the-scenes AI generation
├── docs/
│   ├── PRD.md              # Product Requirements Document
│   ├── ARCHITECTURE.md     # System architecture (coming soon)
│   └── SCHEMAS.md          # Schema documentation (coming soon)
└── .github/
    └── workflows/          # CI/CD for validation
```

### Tech Stack

**Learner-Facing:**
- **Next.js 14** (App Router) with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for purposeful animations
- **Dark mode only** design
- **SVG-first** visuals

**Content & Media:**
- **Mux / Vimeo** for video hosting
- **Inline PDF rendering**
- **Versioned SVG diagrams**
- **YAML / Markdown** content source

**AI Layer (Hidden):**
- **Claude / Gemini / GPT** (provider-abstracted)
- **Prompt registry** with versioning
- **Schema validation** on all AI output
- **Human-in-the-loop** approval gates

---

## 🎓 Learning Philosophy

### The Maestro Framework

Every module maps to the 6-pillar operational intelligence model:

1. **Sense** – Intelligent Observability
2. **Understand** – Causal inference & correlation
3. **Decide** – Risk-aware, policy-bounded decisioning
4. **Act** – Automated remediation with guardrails
5. **Verify** – Human-in-the-loop validation
6. **Learn** – Continuous feedback & adaptation

### Scenario-Based Learning (5Cs)

- **Context** – Real-world operational situation
- **Challenge** – Critical decision point
- **Choices** – Multiple paths with trade-offs
- **Consequence** – Realistic impact (MTTR, blast radius, SLA)
- **Contemplate** – Post-incident reflection

**No multiple-choice trivia. No dummy data.**

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/vm799/AIOPS-course.git
cd AIOPS-course

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see the platform.

---

## 📚 Documentation

- **[PRD](./docs/PRD.md)** – Product vision and requirements
- **Architecture Guide** – Coming soon
- **Schema Reference** – Coming soon
- **Content Authoring** – Coming soon

---

## 🔐 Security & Governance

This platform is built to **enterprise / audit-safe standards**:

- ✅ **RBAC** (Role-Based Access Control)
- ✅ **Encryption** at rest and in transit
- ✅ **Prompt versioning** and provenance tracking
- ✅ **Human verification** gates for AI-generated content
- ✅ **No prompt leakage** to learners
- ✅ **Schema validation** on all data

---

## 🎨 Design Principles

1. **Learning surface ≠ Execution surface**
   - Learners see polished UI, not code
2. **Human judgment at the center**
   - AI assists, humans decide
3. **Calm, premium, intelligent**
   - Not "lab notebook" vibes
4. **Purposeful animation only**
   - ≤240ms, no loops
5. **Dark mode only**
   - Professional, focused environment

---

## 📈 Roadmap

### Phase 1: Foundation (Days 1–20)
- [x] Repository structure
- [x] PRD documentation
- [ ] Next.js platform setup
- [ ] Schema definitions
- [ ] Design system

### Phase 2: Intelligence (Days 21–40)
- [ ] AI tutor abstraction
- [ ] Scenario engine
- [ ] Content pipeline

### Phase 3: Agentic Systems (Days 41–70)
- [ ] Closed-loop remediation simulations
- [ ] Maestro framework teaching
- [ ] AISecOps governance labs

### Phase 4: Production (Days 71–85)
- [ ] Observability
- [ ] Performance hardening
- [ ] UX polish

### Phase 5: Launch (Days 86–90)
- [ ] Security review
- [ ] Human QA
- [ ] Public beta

---

## 🤝 Contributing

This is a professional education platform. Contributions must:
- Follow the PRD specifications
- Pass schema validation
- Include human verification for AI-generated content
- Maintain enterprise-grade security standards

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## 📄 License

MIT License - Copyright 2026 Vaishali Mehmi

---

## 🌟 Why This Beats the Market

This platform:
- ✅ Avoids "AI slop"
- ✅ Outperforms Coursera/Udemy UX
- ✅ Matches real AIOps work
- ✅ Scales safely with AI
- ✅ Preserves human agency
- ✅ Signals premium, serious intent

**This is how elite technical education is built.**