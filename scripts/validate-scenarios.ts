#!/usr/bin/env tsx
/**
 * Scenario Validation Script
 * Validates all scenario YAML files against the schema
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import { parse } from "yaml";
import { ScenarioSchema } from "../packages/schemas/scenario.schema";

const SCENARIOS_DIR = join(process.cwd(), "packages/content/scenarios");

function validateScenarios() {
  console.log("🔍 Validating scenario files...\n");

  if (!existsSync(SCENARIOS_DIR)) {
    console.log("⚠️  Scenarios directory not found:", SCENARIOS_DIR);
    return;
  }

  const files = readdirSync(SCENARIOS_DIR).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));

  if (files.length === 0) {
    console.log("⚠️  No scenario files found in", SCENARIOS_DIR);
    return;
  }

  let errorCount = 0;
  let successCount = 0;

  for (const file of files) {
    const filePath = join(SCENARIOS_DIR, file);
    console.log(`Validating ${file}...`);

    try {
      const content = readFileSync(filePath, "utf-8");
      const data = parse(content);

      // Validate against Zod schema
      ScenarioSchema.parse(data);

      console.log(`✅ ${file} is valid\n`);
      successCount++;
    } catch (error) {
      console.error(`❌ ${file} failed validation:`);
      console.error(error);
      console.log();
      errorCount++;
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`Total: ${files.length} files`);
  console.log(`✅ Valid: ${successCount}`);
  console.log(`❌ Invalid: ${errorCount}`);
  console.log("=".repeat(50) + "\n");

  if (errorCount > 0) {
    process.exit(1);
  }
}

// Only run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateScenarios();
}
