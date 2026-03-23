/**
 * infer command
 * Generate architecture from models via inference engine
 * Generated from SpecVerse specification
 */

import { Command } from 'commander';

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { EngineRegistry } from '@specverse/engine-entities';
import type { ParserEngine, InferenceEngine } from '@specverse/types';

interface CommandOptions {
  output?: string;
  deployment?: boolean;
  verbose?: boolean;
}



/**
 * Register the infer command on the program.
 */
export function registerInferCommand(program: Command): void {
  const cmd = program
    .command('infer <file>')
    .description('Generate architecture from models via inference engine')
    .option('-o, --output <output>', 'Output file path')
    .option('--deployment', 'Generate deployment specification', false)
    .option('-v, --verbose', 'Show detailed inference process', false)
    .action(async (file: string, options: CommandOptions) => {
      try {
        if (!existsSync(file)) {
          console.error('File not found:', file);
          process.exit(1);
        }

        console.log('Running inference on', file, '...');

        // Discover engines
        const registry = new EngineRegistry();
        await registry.discover();

        const parser = registry.getEngineForCapability('parse') as ParserEngine;
        if (!parser) { console.error('No parser engine found.'); process.exit(1); }
        await parser.initialize();

        const inferEngine = registry.getEngineForCapability('infer') as InferenceEngine;
        if (!inferEngine) { console.error('No inference engine found.'); process.exit(1); }
        await inferEngine.initialize({ options: { verbose: options.verbose } });

        const content = readFileSync(file, 'utf8');
        const parseResult = parser.parseContent(content, file);

        if (parseResult.errors.length > 0) {
          console.error('Cannot infer from invalid specification:');
          parseResult.errors.forEach((e: string) => console.error(' ', e));
          process.exit(1);
        }

        const ast = parseResult.ast!;
        const inferResult = await inferEngine.infer(ast, {
          generateControllers: true,
          generateServices: true,
          generateEvents: true,
          generateViews: true,
          generateDeployment: options.deployment || false,
          verbose: options.verbose || false,
        });

        const outputFile = options.output || file.replace(/\.specly$/, '-inferred.specly');
        writeFileSync(outputFile, inferResult.yaml, 'utf8');
        console.log('Inferred specification written to:', outputFile);
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
}

