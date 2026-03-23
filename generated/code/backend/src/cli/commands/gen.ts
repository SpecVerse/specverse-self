/**
 * gen command
 * Generate outputs from specification
 * Generated from SpecVerse specification
 */

import { Command } from 'commander';

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname, basename, join } from 'path';
import { fileURLToPath } from 'url';
import { EngineRegistry } from '@specverse/engine-entities';
import type { ParserEngine } from '@specverse/types';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname, basename } from 'path';

interface CommandOptions {
  [key: string]: any;
}



/**
 * Register the gen command on the program.
 */
export function registerGenCommand(program: Command): void {
  const cmd = program
    .command('gen')
    .description('Generate outputs from specification');

  cmd
    .command('diagrams <file>')
    .description('Generate Mermaid diagrams (ER, lifecycle, architecture, etc.)')
    .option('--type <type>', 'Diagram type: er, class, event-flow, lifecycle, architecture, deployment, manifest, all', "all")
    .option('-o, --output <output>', 'Output directory')
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
        const ast = parseResult.ast!;

        const gen = registry.getEngineForCapability('generate-diagrams') as any;
        if (!gen) { console.error('No generators engine found.'); process.exit(1); }
        await gen.initialize();

        const diagrams = await gen.generateDiagrams(ast, { type: options.type || 'all' });
        const outputDir = options.output || basename(file, '.specly') + '-diagrams';
        if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });
        for (const [type, content] of diagrams.entries()) {
          writeFileSync(join(outputDir, type + '.mmd'), content);
          console.log('  ' + type);
        }
        console.log('Generated ' + diagrams.size + ' diagrams in: ' + outputDir);
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });

  cmd
    .command('docs <file>')
    .description('Generate documentation from specification')
    .option('--format <format>', 'Output format: markdown, html', "markdown")
    .option('-o, --output <output>', 'Output file path')
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

        const gen = registry.getEngineForCapability('generate-docs') as any;
        if (!gen) { console.error('No generators engine found.'); process.exit(1); }
        await gen.initialize();

        const docs = await gen.generateDocs(parseResult.ast!, { format: options.format || 'markdown' });
        const ext = options.format === 'html' ? '.html' : '.md';
        const outputFile = options.output || basename(file, '.specly') + '-docs' + ext;
        writeFileSync(outputFile, docs);
        console.log('Documentation generated: ' + outputFile);
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });

  cmd
    .command('uml <file>')
    .description('Generate UML diagrams')
    .option('--type <type>', 'UML type: class, sequence, activity, all', "all")
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

        const gen = registry.getEngineForCapability('generate-uml') as any;
        if (!gen) { console.error('No generators engine found.'); process.exit(1); }
        await gen.initialize();

        const uml = await gen.generateUML(parseResult.ast!, { type: options.type || 'all' });
        const outputFile = basename(file, '.specly') + '-uml.puml';
        writeFileSync(outputFile, uml);
        console.log('UML generated: ' + outputFile);
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
}

