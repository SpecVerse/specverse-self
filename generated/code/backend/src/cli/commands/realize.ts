/**
 * realize command
 * Generate production code from specification
 * Generated from SpecVerse specification
 */

import { Command } from 'commander';

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { EngineRegistry } from '@specverse/engine-entities';
import type { ParserEngine, RealizeEngine } from '@specverse/types';

interface CommandOptions {
  output?: string;
  manifest?: string;
}



/**
 * Register the realize command on the program.
 */
export function registerRealizeCommand(program: Command): void {
  const cmd = program
    .command('realize <type> <file>')
    .description('Generate production code from specification')
    .option('-o, --output <output>', 'Output directory')
    .option('-m, --manifest <manifest>', 'Implementation manifest file')
    .action(async (type: string, file: string, options: CommandOptions) => {
      try {
        if (!existsSync(file)) {
          console.error('File not found:', file);
          process.exit(1);
        }

        const __fn = fileURLToPath(import.meta.url);
        const __dn = dirname(__fn);
        const schemaPath = resolve(__dn, '../../../schema/SPECVERSE-SCHEMA.json');

        // Discover engines
        const registry = new EngineRegistry();
        await registry.discover();

        // Parse the spec
        const parser = registry.getEngineForCapability('parse') as ParserEngine;
        if (!parser) { console.error('No parser engine found.'); process.exit(1); }
        const schema = existsSync(schemaPath) ? JSON.parse(readFileSync(schemaPath, 'utf8')) : {};
        await parser.initialize({ schema });

        // Infer full architecture
        const inferEngine = registry.getEngineForCapability('infer') as any;
        if (!inferEngine) { console.error('No inference engine found.'); process.exit(1); }
        await inferEngine.initialize();

        const content = readFileSync(file, 'utf8');
        const parseResult = parser.parseContent(content, file);
        if (parseResult.errors.length > 0) {
          console.error('Invalid spec:');
          parseResult.errors.forEach((e: string) => console.error(' ', e));
          process.exit(1);
        }

        const inferResult = await inferEngine.infer(parseResult.ast!, {
          generateControllers: true, generateServices: true,
          generateEvents: true, generateViews: true,
        });

        // Load AI-optimized spec from inferred YAML
        const yaml = await import('js-yaml');
        const inferredSpec = yaml.load(inferResult.yaml);

        // Initialize realize engine with manifest
        const realizeEngine = registry.getEngineForCapability('realize') as RealizeEngine;
        if (!realizeEngine) { console.error('No realize engine found.'); process.exit(1); }
        const manifestPath = options.manifest || resolve(process.cwd(), 'manifests/implementation.yaml');
        if (!existsSync(manifestPath)) {
          console.error('Manifest not found:', manifestPath);
          process.exit(1);
        }
        await realizeEngine.initialize({ manifestPath, workingDir: process.cwd() });

        const outputDir = options.output || resolve(process.cwd(), 'generated/code');
        console.log('Realizing ' + type + ' from ' + file + '...');
        await (realizeEngine as any).realizeAll(inferredSpec, outputDir);
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
}

