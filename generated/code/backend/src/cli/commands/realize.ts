/**
 * realize command
 * Generate production code from specification
 * Generated from SpecVerse specification
 */

import { Command } from 'commander';

import { existsSync } from 'fs';
import { resolve } from 'path';

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

        // Delegate to specverse realize command (engine wiring requires full pipeline)
        const { execSync } = await import('child_process');
        const manifestFlag = options.manifest ? '-m ' + options.manifest : '';
        const outputFlag = options.output ? '-o ' + options.output : '';
        execSync('specverse realize ' + type + ' ' + file + ' ' + outputFlag + ' ' + manifestFlag, { stdio: 'inherit' });
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
}

