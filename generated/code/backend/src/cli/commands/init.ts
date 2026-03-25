/**
 * init command
 * Initialize a new SpecVerse project
 * Generated from SpecVerse specification
 */

import { Command } from 'commander';

import { existsSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync, copyFileSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

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
        const __fn = fileURLToPath(import.meta.url);
        const __dn = dirname(__fn);

        // Resolve templates from engine package assets
        const templateCandidates = [
          resolve(__dn, '../../../templates'),               // Shipped via realize
          resolve(__dn, '../../templates'),                   // Alternative layout
        ];
        // Also try node_modules
        for (let i = 2; i <= 5; i++) {
          const up = Array(i).fill('..').join('/');
          templateCandidates.push(resolve(__dn, up, 'node_modules/@specverse/engine-realize/assets/templates'));
        }

        let templatesDir = null;
        for (const candidate of templateCandidates) {
          if (existsSync(candidate) && existsSync(join(candidate, 'default'))) {
            templatesDir = candidate;
            break;
          }
        }

        if (!templatesDir) {
          console.error('Templates not found. Run specverse realize all first, or install @specverse/engine-realize.');
          process.exit(1);
        }

        if (options.list) {
          const templates = readdirSync(templatesDir).filter(
            d => statSync(join(templatesDir!, d)).isDirectory()
          );
          console.log('Available templates:');
          templates.forEach(t => console.log('  ' + t));
          return;
        }

        const projectName = name || 'my-project';
        const templateName = options.template || 'default';
        const templateDir = join(templatesDir, templateName);

        if (!existsSync(templateDir)) {
          console.error('Template not found: ' + templateName);
          console.error('Available: ' + readdirSync(templatesDir).filter(
            d => statSync(join(templatesDir!, d)).isDirectory()
          ).join(', '));
          process.exit(1);
        }

        const destDir = resolve(process.cwd(), projectName);
        if (existsSync(destDir)) {
          console.error('Directory already exists: ' + destDir);
          process.exit(1);
        }

        // Copy template with variable substitution
        const kebab = projectName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        const component = projectName.charAt(0).toUpperCase() + projectName.slice(1);
        const vars: Record<string, string> = {
          '{{PROJECT_NAME}}': projectName,
          '{{projectName}}': projectName,
          '{{projectNameKebab}}': kebab,
          '{{componentName}}': component,
          '{{DB_USER}}': 'postgres',
          '{{DB_PASSWORD}}': 'postgres',
        };

        function copyDir(src: string, dest: string) {
          mkdirSync(dest, { recursive: true });
          for (const item of readdirSync(src)) {
            const srcPath = join(src, item);
            let destName = item;
            if (item === 'gitignore') destName = '.gitignore';
            if (item === 'dot.env.example') destName = '.env.example';
            const destPath = join(dest, destName);

            if (statSync(srcPath).isDirectory()) {
              copyDir(srcPath, destPath);
            } else {
              let content = readFileSync(srcPath, 'utf8');
              for (const [key, val] of Object.entries(vars)) {
                content = content.split(key).join(val);
              }
              writeFileSync(destPath, content);
            }
          }
        }

        copyDir(templateDir, destDir);
        console.log('Project created: ' + destDir);
        console.log('Template: ' + templateName);
        console.log('');
        console.log('Next steps:');
        console.log('  cd ' + projectName);
        console.log('  npm install');
        console.log('  specverse validate specs/main.specly');
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
}

