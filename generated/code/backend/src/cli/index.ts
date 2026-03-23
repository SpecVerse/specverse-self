#!/usr/bin/env node
/**
 * SpecVerse specification language CLI
 * Generated from SpecVerse specification
 */

import { Command } from 'commander';
import { registerValidateCommand } from './commands/validate.js';
import { registerInferCommand } from './commands/infer.js';
import { registerRealizeCommand } from './commands/realize.js';
import { registerInitCommand } from './commands/init.js';
import { registerGenCommand } from './commands/gen.js';
import { registerDevCommand } from './commands/dev.js';
import { registerCacheCommand } from './commands/cache.js';
import { registerAiCommand } from './commands/ai.js';

const program = new Command();

program
  .name('specverse')
  .description('SpecVerse specification language CLI')
  .version('1.0.0');

// Register all commands
  registerValidateCommand(program);
  registerInferCommand(program);
  registerRealizeCommand(program);
  registerInitCommand(program);
  registerGenCommand(program);
  registerDevCommand(program);
  registerCacheCommand(program);
  registerAiCommand(program);

// Parse and execute
program.parseAsync(process.argv).catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
