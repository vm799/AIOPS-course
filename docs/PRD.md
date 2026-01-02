# PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Project:** Agentic AIOps & Intelligent Observability Academy
**Owner:** Vaishali Mehmi
**Standard:** Enterprise / Regulated / Audit-Safe
**Audience:** Practitioner → Architect → Executive

---

## 1. PRODUCT VISION (NON-NEGOTIABLE)

### 1.1 Core Thesis

The course teaches how to **think, design, govern, and trust AIOps systems**, not how to "use tools" or write notebooks.

> **You design the future. We clear the way.**

The platform must:
- Keep human judgment central
- Remove repetitive cognitive load
- Replace "monitoring" with agentic control planes
- Teach closed-loop, predictive, governed AIOps

---

## 2. NON-GOALS (EXPLICIT)

The platform will **not**:
- ❌ Use Jupyter notebooks as a learning surface
- ❌ Require Python knowledge
- ❌ Teach ML math in isolation
- ❌ Present raw prompts or AI internals to learners
- ❌ Use dummy data, mock systems, or fake metrics

---

## 3. TARGET USERS & TRACKS

### 3.1 Practitioner Track (Primary)
- **Who:** SREs, DevOps, Platform Engineers
- **Goal:** Operate, trust, and intervene in AIOps systems
- **Focus:** Scenarios, decisions, trade-offs

### 3.2 Architect Track
- **Who:** Platform / Enterprise Architects
- **Goal:** Design agentic, governed systems
- **Focus:** System boundaries, failure modes, integration

### 3.3 Executive Track
- **Who:** CTOs, Heads of Ops, Transformation Leaders
- **Goal:** Understand AIOps as a strategic control plane
- **Focus:** Risk, ROI, resilience, governance

**Tracks share content but differ in:**
- Depth
- Framing
- Assessment rigor

---

## 4. TECH STACK (FINAL, LOCKED)

### 4.1 Learner-Facing
- **Next.js** (App Router)
- **Tailwind CSS**
- **Framer Motion**
- **Dark mode only**
- **SVG-first visuals**

### 4.2 Content & Media
- **Videos:** Mux / Vimeo
- **PDFs:** Inline rendered
- **Diagrams:** Versioned SVG
- **Content source:** YAML / Markdown

### 4.3 AI (Hidden)
- **Providers:** Claude / Gemini / GPT (provider-abstracted)
- **Prompt registry** with versioning
- **SVG infographic generation**
- **Schema validation** on all AI output

---

## 5. REPO STRUCTURE (MANDATORY)

```
/app
  /course
    /[track]
      /[module]
        page.tsx
/components
  /VideoPlayer
  /PDFViewer
  /ScenarioDecision
  /Infographic
/content
  /tracks
  /modules
  /scenarios
  /assessments
/lib
  /ai
    provider.ts
    promptRegistry.ts
    outputValidator.ts
  /design
    tokens.ts
    motion.ts
/config
  constants.ts
```

**No deviation without review.**

---

## 6. CONTENT SCHEMA (STRICT)

### 6.1 Module Schema

```yaml
id: intelligent-observability
title: Intelligent Observability as a Control Plane
track: practitioner
learning_outcomes:
  - Explain telemetry chaos and noise
  - Distinguish correlation from causation
assets:
  video: intelligent-observability.mp4
  pdf: observability-foundations.pdf
infographics:
  - causal-loop.svg
scenarios:
  - retail-memory-leak
assessment:
  type: scenario-decision
  rubric: practitioner-v1
```

### 6.2 Scenario Schema

```yaml
id: retail-memory-leak
context: >
  High-traffic retail platform during peak trading hours.
challenge: >
  Gradual memory leak detected via predictive signals.
choices:
  - id: auto-remediate
    description: Trigger closed-loop restart
  - id: human-verify
    description: Pause and validate causal chain
consequences:
  auto-remediate: Increased risk of false positive rollback
  human-verify: Higher MTTR, lower blast radius
```

---

## 7. E2E USER FLOWS

### 7.1 Learner Flow
1. Select track
2. Enter module
3. Watch short video (≤6 min)
4. Review infographic
5. Read PDF excerpt
6. Complete scenario decision
7. Receive consequence + explanation
8. Progress saved

**No dead ends. No overload.**

---

## 8. INFOGRAPHIC GENERATION (CONTROLLED)

### 8.1 AI Input (Internal Only)

```json
{
  "diagramType": "causal-loop",
  "nodes": ["Telemetry", "Noise Reduction", "Causal Engine", "Remediation"],
  "relationships": [
    {"from": "Telemetry", "to": "Noise Reduction"},
    {"from": "Causal Engine", "to": "Remediation"}
  ]
}
```

### 8.2 Output
- **SVG only**
- **Versioned**
- **Human-approved before publish**

**Learners never see AI prompts.**

---

## 9. DESIGN & ANIMATION SPEC

### 9.1 Design Tokens

```typescript
export const colors = {
  bgPrimary: "#0B0F14",
  bgElevated: "#111827",
  accentPrimary: "#3B82F6",
  accentSecondary: "#22D3EE",
  textPrimary: "#E5E7EB",
  textMuted: "#9CA3AF"
}
```

### 9.2 Motion Rules
- **Purposeful only**
- **No loops**
- **Duration ≤240ms**

Used for:
- State change
- Causality reveal
- Progression

---

## 10. ASSESSMENT RUBRIC (EXAMPLE)

### Practitioner Rubric

| Dimension | Pass Criteria |
|-----------|---------------|
| Judgment | Chooses risk-aware option |
| Reasoning | Explains trade-off clearly |
| Governance | Identifies need for human override |
| Systems Thinking | References downstream impact |

**No multiple-choice trivia.**

---

## 11. CERTIFICATION STANDARD
- ✅ Scenario-based
- ✅ Human-verified
- ✅ No auto-pass
- ✅ Audit-ready

---

## 12. CLAUDE GOVERNANCE (ENFORCED)

Claude must:
- Use schemas only
- Declare unknowns
- Never invent metrics
- Never simplify logic
- Pass validation gates

**If blocked → stop and ask.**

---

## 13. WHY THIS BEATS THE MARKET

This system:
- ✅ Avoids "AI slop"
- ✅ Outperforms Coursera/Udemy UX
- ✅ Matches real AIOps work
- ✅ Scales safely with AI
- ✅ Preserves human agency
- ✅ Signals premium, serious intent

**This is how elite technical education is built.**
