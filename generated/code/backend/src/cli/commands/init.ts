/**
 * init command
 * Initialize a new SpecVerse project
 * Generated from SpecVerse specification
 */

import { Command } from 'commander';



interface CommandOptions {
  template?: string;
  list?: boolean;
}



/**
 * Register the init command on the program.
 */
export function registerInitCommand(program: Command): void {
  const cmd = program
    .command('init [name]')
    .description('Initialize a new SpecVerse project')
    .option('--template <template>', 'Template to use', "default")
    .option('--list', 'List available templates', false)
    .action(async (name: string, options: CommandOptions) => {
      try {
        if (options.list) {
          console.log('Available templates: default, backend-only, frontend-only, full-stack');
          return;
        }
        // Delegate to specverse init
        const { execSync } = await import('child_process');
        const templateFlag = options.template ? '--template ' + options.template : '';
        const nameArg = name || 'my-project';
        execSync('specverse init ' + nameArg + ' ' + templateFlag, { stdio: 'inherit' });
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
}

