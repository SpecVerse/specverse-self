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
        if (parseResult.errors.length > 0) {
          console.error('Invalid spec:');
          parseResult.errors.forEach((e: string) => console.error(' ', e));
          process.exit(1);
        }

        const aiEngine = registry.getEngineForCapability('ai-prompts') as any;
        if (!aiEngine) {
          console.error('AI engine not available. Install @specverse/engine-ai.');
          process.exit(1);
        }
        await aiEngine.initialize({ provider: options.provider });
        const prompt = await aiEngine.generatePrompt(parseResult.ast!, { type: 'docs' });
        const outputFile = options.output || basename(file, '.specly') + '-ai-docs.md';
        writeFileSync(outputFile, prompt);
        console.log('AI documentation prompt generated: ' + outputFile);
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
        if (parseResult.errors.length > 0) {
          console.error('Invalid spec:');
          parseResult.errors.forEach((e: string) => console.error(' ', e));
          process.exit(1);
        }

        const aiEngine = registry.getEngineForCapability('ai-suggestions') as any;
        if (!aiEngine) {
          console.error('AI engine not available. Install @specverse/engine-ai.');
          process.exit(1);
        }
        await aiEngine.initialize();
        const suggestions = await aiEngine.suggest(parseResult.ast!);
        suggestions.forEach((s: any) => console.log(' -', s.description || s));
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
        const aiEngine = registry.getEngineForCapability('ai-templates') as any;
        if (!aiEngine) {
          console.error('AI engine not available. Install @specverse/engine-ai.');
          process.exit(1);
        }
        await aiEngine.initialize();
        const template = await aiEngine.template(operation, { config: options.config });
        if (options.output) {
          writeFileSync(options.output, template);
          console.log('Template written to: ' + options.output);
        } else {
          console.log(template);
        }
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
}

