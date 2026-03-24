/**
 * cache command
 * Manage import cache
 * Generated from SpecVerse specification
 */

import { Command } from 'commander';

import { EngineRegistry } from '@specverse/engine-entities';
import type { ParserEngine } from '@specverse/types';

interface CommandOptions {
  stats?: boolean;
  list?: boolean;
  clear?: boolean;
}



/**
 * Register the cache command on the program.
 */
export function registerCacheCommand(program: Command): void {
  const cmd = program
    .command('cache')
    .description('Manage import cache')
    .option('--stats', 'Show cache statistics', false)
    .option('--list', 'List cached items', false)
    .option('--clear', 'Clear all cached items', false)
    .action(async (options: CommandOptions) => {
      try {
        const registry = new EngineRegistry();
        await registry.discover();
        const parser = registry.getEngineForCapability('parse') as ParserEngine;
        if (!parser) { console.error('No parser engine found.'); process.exit(1); }
        await parser.initialize();

        // Access ImportResolver cache via parser
        const resolverModule = await import('@specverse/engine-parser');
        const resolver = new resolverModule.ImportResolver({ basePath: process.cwd() });

        const cacheDir = (resolver as any).getCacheDir ? (resolver as any).getCacheDir() : null;
        if (options.stats) {
          console.log('Cache directory:', cacheDir || 'default');
        } else if (options.list) {
          if (cacheDir) {
            const fs = await import('fs');
            if (fs.existsSync(cacheDir)) {
              const items = fs.readdirSync(cacheDir);
              if (items.length === 0) { console.log('Cache is empty'); }
              else { items.forEach((item: string) => console.log(' ', item)); }
            } else { console.log('Cache directory does not exist'); }
          } else { console.log('No cache directory configured'); }
        } else if (options.clear) {
          if (resolver.clearCache) { resolver.clearCache(); }
          console.log('Cache cleared');
        } else {
          console.log('Use --stats, --list, or --clear');
        }
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
}

