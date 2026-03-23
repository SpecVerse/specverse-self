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
import type { ParserEngine } from '@specverse/types';

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
        if (!options.manifest) {
          console.error('Manifest required. Use -m <manifest-path>');
          process.exit(1);
        }

        console.log('Realizing ' + type + ' from ' + file + '...');

        const __fn = fileURLToPath(import.meta.url);
        const __dn = dirname(__fn);
        const schemaPath = resolve(__dn, '../../../schema/SPECVERSE-SCHEMA.json');

        const registry = new EngineRegistry();
        await registry.discover();

        // Parse
        const parser = registry.getEngineForCapability('parse') as ParserEngine;
        if (!parser) { console.error('No parser engine found.'); process.exit(1); }
        const schema = existsSync(schemaPath) ? JSON.parse(readFileSync(schemaPath, 'utf8')) : {};
        await parser.initialize({ schema });
        const content = readFileSync(file, 'utf8');
        const parseResult = parser.parseContent(content, file);
        if (parseResult.errors.length > 0) { console.error('Invalid spec'); process.exit(1); }

        // Generate AI-optimized spec
        const { AIViewGenerator } = await import('@specverse/engine-generators');
        const spec = new AIViewGenerator().generate(parseResult.ast!);

        // Realize
        const realizeModule = await import('@specverse/engine-realize');
        const realizeEngine = new realizeModule.SpecVerseRealizeEngine();
        await realizeEngine.initialize({ manifestPath: options.manifest, workingDir: process.cwd() });
        const outputDir = options.output || resolve(process.cwd(), 'generated/code');

        if (type === 'all') {
          await realizeEngine.realizeAll(spec, outputDir);
        } else {
          const resolved = realizeEngine.resolve(type === 'orm' ? 'orm.schema' : type);
          const output = await realizeEngine.generate(resolved, type, { spec });
          console.log('Generated: ' + output.filePath);
        }
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
}

