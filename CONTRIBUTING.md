# Contributing to AIOps Academy

Thank you for your interest in contributing to the AIOps Academy platform. This is a professional education platform with strict quality and governance standards.

## Core Principles

1. **No AI Slop** - All AI-generated content must be human-verified
2. **Schema Validation** - All content must pass Zod schema validation
3. **Security First** - No secrets, no vulnerabilities, audit-ready
4. **Premium Quality** - Professional-grade UX and educational content
5. **Governance** - All AI prompts must be registered and versioned

## Before You Start

Read these critical documents:
- [PRD](./docs/PRD.md) - Product requirements and vision
- [README](./README.md) - Architecture overview

## Development Setup

### Prerequisites
- Node.js 18+
- pnpm 8+
- Git

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

## Content Contribution Guidelines

### Creating Modules

1. Create YAML file in `packages/content/modules/`
2. Follow the schema defined in `packages/schemas/module.schema.ts`
3. Validate: `pnpm validate:modules`

Example:
```yaml
id: my-module
title: My AIOps Module
track: practitioner
description: |
  A clear description of what learners will gain
learning_objectives:
  - Specific, measurable objective 1
  - Specific, measurable objective 2
```

### Creating Scenarios

1. Create YAML file in `packages/content/scenarios/`
2. Follow the 5Cs framework: Context, Challenge, Choices, Consequence, Contemplate
3. **No dummy data** - Real operational scenarios only
4. Validate: `pnpm validate:scenarios`

### Video Guidelines (Per PRD)

- **Maximum 6 minutes** per video
- Professional narration (no robotic AI voices)
- Dark mode visuals
- Hosted on Mux or Vimeo

### PDF Guidelines

- Inline rendering preferred
- Dark mode compatible
- Maximum 20 pages per document

## Code Contribution Guidelines

### TypeScript Standards

- Strict mode enabled
- All types must be explicit
- No `any` types without justification
- Use Zod for runtime validation

### Component Standards

- Dark mode only
- Framer Motion for animations (≤240ms)
- Purposeful animations only, no loops
- Follow design tokens in `lib/design/tokens.ts`

### AI Integration

**CRITICAL:** All AI prompts must be registered in `lib/ai/promptRegistry.ts`

```typescript
// ❌ WRONG - Unregistered prompt
const response = await ai.generate("Generate a diagram...");

// ✅ CORRECT - Registered prompt
import { renderPrompt } from "@/lib/ai/promptRegistry";
const { content } = renderPrompt("infographic-causal-loop", { nodes, relationships });
```

## Testing & Validation

Before submitting:

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Schema validation
pnpm validate:modules
pnpm validate:scenarios

# Build test
pnpm build
```

## Git Workflow

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes
3. Commit with clear messages: `git commit -m "feat: add scenario for memory leak"`
4. Push: `git push origin feature/my-feature`
5. Create Pull Request

### Commit Message Format

```
<type>: <description>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance
```

## Security Requirements

### Never Commit:
- ❌ API keys or secrets
- ❌ .env files with real values
- ❌ Personal data
- ❌ Unvetted AI outputs

### Always:
- ✅ Use environment variables for secrets
- ✅ Validate AI outputs with `outputValidator.ts`
- ✅ Run security audit: `pnpm audit`

## AI Governance Checklist

When using AI to generate content:

- [ ] Prompt is registered in `promptRegistry.ts`
- [ ] Output is validated with `outputValidator.ts`
- [ ] Human has reviewed and approved content
- [ ] No "AI slop" phrases (see PRD)
- [ ] No dummy data
- [ ] Sources are cited
- [ ] Aligns with Maestro framework

## Pull Request Checklist

- [ ] All tests pass
- [ ] Schema validation passes
- [ ] No linting errors
- [ ] No TypeScript errors
- [ ] Documentation updated
- [ ] AI outputs human-verified
- [ ] Follows PRD specifications
- [ ] Security audit clean

## Questions?

- Open an issue for bugs or feature requests
- Tag @vm799 for architecture questions
- Reference the PRD for design decisions

## Code of Conduct

This is a professional education platform. We expect:
- **Technical excellence** over shortcuts
- **Truth over validation** - Objective feedback is valued
- **Systems thinking** - Consider downstream impact
- **Respectful discourse** - Professional communication

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Remember:** This platform teaches how to design, govern, and trust AIOps systems. Your contributions directly impact practitioners learning to build mission-critical infrastructure. Quality matters.
