/**
 * realize command
 * Generate production code from specification
 * Generated from SpecVerse specification
 */

import { Command } from 'commander';

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { EngineRegistry } from '@specverse/engine-entities';
import type { ParserEngine, InferenceEngine, RealizeEngine } from '@specverse/types';

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

        // Discover engines
        const registry = new EngineRegistry();
        await registry.discover();

        // Parse — let the parser engine handle its own schema
        const parser = registry.getEngineForCapability('parse') as ParserEngine;
        if (!parser) { console.error('No parser engine found.'); process.exit(1); }
        await parser.initialize();

        const content = readFileSync(file, 'utf8');
        const parseResult = parser.parseContent(content, file);
        if (parseResult.errors.length > 0) {
          console.error('Invalid spec:');
          parseResult.errors.forEach((e: string) => console.error(' ', e));
          process.exit(1);
        }

        // Infer — let the inference engine handle its own rules
        const inferEngine = registry.getEngineForCapability('infer') as InferenceEngine;
        if (!inferEngine) { console.error('No inference engine found.'); process.exit(1); }
        await inferEngine.initialize();
        const inferResult = await inferEngine.infer(parseResult.ast!, {
          generateControllers: true, generateServices: true,
          generateEvents: true, generateViews: true,
        });

        // Load inferred YAML and flatten component data for realize
        const yaml = await import('js-yaml');
        const inferredYaml = yaml.load(inferResult.yaml) as any;
        // Inference output: { components: { Name: { models, controllers, ... } } }
        // realizeAll expects: { models: {...}, controllers: {...}, ... } (flat component data)
        const componentName = Object.keys(inferredYaml?.components || {})[0];
        const componentData = componentName ? inferredYaml.components[componentName] : {};
        const inferredSpec = { ...componentData, componentName };

        // Realize — let the realize engine handle its own library
        const manifestPath = options.manifest || resolve(process.cwd(), 'manifests/implementation.yaml');
        if (!existsSync(manifestPath)) {
          console.error('Manifest not found:', manifestPath);
          process.exit(1);
        }
        const realizeEngine = registry.getEngineForCapability('realize') as RealizeEngine;
        if (!realizeEngine) { console.error('No realize engine found.'); process.exit(1); }
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

