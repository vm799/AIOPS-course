#!/usr/bin/env tsx
/**
 * Module Validation Script
 * Validates all module YAML files against the schema
 */

import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { parse } from "yaml";
import { ModuleSchema } from "../packages/schemas/module.schema";

const MODULES_DIR = join(process.cwd(), "packages/content/modules");

function validateModules() {
  console.log("🔍 Validating module files...\n");

  const files = readdirSync(MODULES_DIR).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));

  if (files.length === 0) {
    console.log("⚠️  No module files found in", MODULES_DIR);
    return;
  }

  let errorCount = 0;
  let successCount = 0;

  for (const file of files) {
    const filePath = join(MODULES_DIR, file);
    console.log(`Validating ${file}...`);

    try {
      const content = readFileSync(filePath, "utf-8");
      const data = parse(content);

      // Validate against Zod schema
      ModuleSchema.parse(data);

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
  validateModules();
}
