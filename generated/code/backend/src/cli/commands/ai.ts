/**
 * ai command
 * AI prompt building and suggestion commands
 * Generated from SpecVerse specification
 */

import { Command } from 'commander';

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { EngineRegistry } from '@specverse/engine-entities';
import type { ParserEngine } from '@specverse/types';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { writeFileSync } from 'fs';

interface CommandOptions {
  [key: string]: any;
}



/**
 * Register the ai command on the program.
 */
export function registerAiCommand(program: Command): void {
  const cmd = program
    .command('ai')
    .description('AI prompt building and suggestion commands');

  cmd
    .command('docs <file>')
    .description('Generate AI documentation prompts from specification')
    .option('-o, --output <output>', 'Output file path')
    .option('--config <config>', 'Configuration file with requirements, scale, etc.')
    .action(async (file: string, options: any) => {
      try {
        const __fn = fileURLToPath(import.meta.url);
        const __dn = dirname(__fn);
        const schemaPath = resolve(__dn, '../../../schema/SPECVERSE-SCHEMA.json');

        const registry = new EngineRegistry();
        await registry.discover();
        const parser = registry.getEngineForCapability('parse') as ParserEngine;
        if (!parser) { console.error('No parser engine found.'); process.exit(1); }
        const schema = existsSync(schemaPath) ? JSON.parse(readFileSync(schemaPath, 'utf8')) : {};
        await parser.initialize({ schema });

        const content = readFileSync(file, 'utf8');
        const parseResult = parser.parseContent(content, file);
        if (parseResult.errors.length > 0) { console.error('Invalid spec'); process.exit(1); }

        const ai = registry.getEngineForCapability('ai-prompts') as any;
        if (ai) {
          await ai.initialize(options.config ? { configPath: options.config } : {});
          const prompt = await ai.generatePrompt(parseResult.ast!);
          if (options.output) { writeFileSync(options.output, prompt); console.log('AI docs written to: ' + options.output); }
          else { console.log(prompt); }
        } else {
          console.log('AI engine not available. Install @specverse/engine-ai.');
        }
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });

  cmd
    .command('suggest <file>')
    .description('Get AI suggestions for improving a specification')

    .action(async (file: string, options: any) => {
      try {
        const __fn = fileURLToPath(import.meta.url);
        const __dn = dirname(__fn);
        const schemaPath = resolve(__dn, '../../../schema/SPECVERSE-SCHEMA.json');

        const registry = new EngineRegistry();
        await registry.discover();
        const parser = registry.getEngineForCapability('parse') as ParserEngine;
        if (!parser) { console.error('No parser engine found.'); process.exit(1); }
        const schema = existsSync(schemaPath) ? JSON.parse(readFileSync(schemaPath, 'utf8')) : {};
        await parser.initialize({ schema });

        const content = readFileSync(file, 'utf8');
        const parseResult = parser.parseContent(content, file);
        if (parseResult.errors.length > 0) { console.error('Invalid spec'); process.exit(1); }

        const ai = registry.getEngineForCapability('ai-prompts') as any;
        if (ai) {
          await ai.initialize();
          const suggestions = await ai.suggest(parseResult.ast!);
          for (const s of suggestions) console.log('-', s.description || s);
        } else {
          console.log('AI engine not available. Install @specverse/engine-ai.');
        }
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });

  cmd
    .command('template <operation>')
    .description('Generate AI implementation templates')
    .option('-o, --output <output>', 'Output file path')
    .option('--config <config>', 'Configuration file')
    .action(async (operation: string, options: any) => {
      try {
        const registry = new EngineRegistry();
        await registry.discover();
        const ai = registry.getEngineForCapability('ai-prompts') as any;
        if (ai) {
          await ai.initialize(options.config ? { configPath: options.config } : {});
          const template = await ai.template(operation);
          if (options.output) { writeFileSync(options.output, template); console.log('Template written to: ' + options.output); }
          else { console.log(template); }
        } else {
          console.log('AI engine not available. Install @specverse/engine-ai.');
        }
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
}

