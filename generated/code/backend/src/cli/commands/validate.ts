/**
 * validate command
 * Validate a .specly specification
 * Generated from SpecVerse specification
 */

import { Command } from 'commander';

import { readFileSync, existsSync } from 'fs';
import { EngineRegistry } from '@specverse/engine-entities';
import type { ParserEngine } from '@specverse/types';

interface CommandOptions {
  json?: boolean;
  strict?: boolean;
}

/**
 * Exit codes:
  //   0: Valid
  //   1: Errors found
 */

/**
 * Register the validate command on the program.
 */
export function registerValidateCommand(program: Command): void {
  const cmd = program
    .command('validate <file>')
    .description('Validate a .specly specification')
    .option('--json', 'Output results in JSON format', false)
    .option('--strict', 'Enable strict validation mode', false)
    .action(async (file: string, options: CommandOptions) => {
      try {
        if (!existsSync(file)) {
          console.error('File not found:', file);
          process.exit(1);
        }

        // Discover and initialize parser engine
        const registry = new EngineRegistry();
        await registry.discover();
        const parser = registry.getEngineForCapability('parse') as ParserEngine;
        if (!parser) {
          console.error('No parser engine found. Install @specverse/engine-parser.');
          process.exit(1);
        }
        await parser.initialize();

        const content = readFileSync(file, 'utf8');
        const result = parser.parseContent(content, file);

        if (result.errors.length > 0) {
          console.error('Validation failed');
          result.errors.forEach((e: string) => console.error(' ', e));
          if (result.warnings && result.warnings.length > 0) {
            console.warn('Warnings:');
            result.warnings.forEach((w: string) => console.warn(' ', w));
          }
          process.exit(1);
        }

        if (options.json) {
          console.log(JSON.stringify({ valid: true, warnings: result.warnings }, null, 2));
        } else {
          console.log('Validation successful');
          if (result.warnings && result.warnings.length > 0) {
            console.warn('Warnings:');
            result.warnings.forEach((w: string) => console.warn(' ', w));
          }
        }
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
}

