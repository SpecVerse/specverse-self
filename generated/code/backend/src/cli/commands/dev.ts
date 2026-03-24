/**
 * dev command
 * Development workflow commands
 * Generated from SpecVerse specification
 */

import { Command } from 'commander';

import { readFileSync, writeFileSync, existsSync, watch } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { EngineRegistry } from '@specverse/engine-entities';
import type { ParserEngine } from '@specverse/types';

interface CommandOptions {
  [key: string]: any;
}



/**
 * Register the dev command on the program.
 */
export function registerDevCommand(program: Command): void {
  const cmd = program
    .command('dev')
    .description('Development workflow commands');

  cmd
    .command('format <file>')
    .description('Format a .specly file with consistent styling')
    .option('-w, --write', 'Write formatted output back to file', false)
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
        const result = parser.parseContent(content, file);
        if (result.errors.length > 0) {
          console.error('Cannot format invalid spec:');
          result.errors.forEach((e: string) => console.error(' ', e));
          process.exit(1);
        }
        const yaml = await import('js-yaml');
        const formatted = yaml.dump(yaml.load(content), { lineWidth: 120, noRefs: true });
        if (options.write) {
          writeFileSync(file, formatted);
          console.log('Formatted and saved: ' + file);
        } else {
          console.log(formatted);
        }
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });

  cmd
    .command('watch <file>')
    .description('Watch .specly files and re-validate on change')

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

        console.log('Watching ' + file + ' for changes...');
        const doValidate = () => {
          try {
            const c = readFileSync(file, 'utf8');
            const r = parser.parseContent(c, file);
            if (r.errors.length > 0) {
              console.log('[' + new Date().toLocaleTimeString() + '] FAILED');
              r.errors.forEach((e: string) => console.error(' ', e));
            } else {
              console.log('[' + new Date().toLocaleTimeString() + '] Valid');
            }
          } catch (e: any) { console.error('Watch error:', e.message); }
        };
        doValidate();
        watch(file, doValidate);
        await new Promise(() => {});
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });

  cmd
    .command('quick <file>')
    .description('Quick validation (schema-only, skip semantic checks)')

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
        const result = parser.parseContent(content, file);
        if (result.errors.length > 0) {
          console.error('Quick check: FAILED');
          result.errors.forEach((e: string) => console.error(' ', e));
          process.exit(1);
        }
        console.log('Quick check: OK');
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
}

