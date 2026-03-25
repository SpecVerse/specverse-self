/**
 * session command
 * Manage AI sessions for spec generation with schema caching
 * Generated from SpecVerse specification
 */

import { Command } from 'commander';

import { EngineRegistry } from '@specverse/engine-entities';

interface CommandOptions {
  [key: string]: any;
}



/**
 * Register the session command on the program.
 */
export function registerSessionCommand(program: Command): void {
  const cmd = program
    .command('session')
    .description('Manage AI sessions for spec generation with schema caching');

  cmd
    .command('create')
    .description('Create a new AI session with schema loading')
    .option('-n, --name <name>', 'Descriptive name for the session')
    .option('-p, --pver <pver>', 'Prompt version to use', "default")
    .option('--json', 'Output result as JSON', false)
    .action(async (options: any) => {
      try {
        const registry = new EngineRegistry();
        await registry.discover();
        const aiEngine = registry.getEngineForCapability('ai-prompts') as any;
        if (!aiEngine) { console.error('AI engine not available.'); process.exit(1); }
        await aiEngine.initialize();

        const { SessionManager } = await import('@specverse/engine-ai');
        const manager = new SessionManager();
        const session = await manager.create({ name: options.name, pver: options.pver });

        if (options.json) {
          console.log(JSON.stringify(session, null, 2));
        } else {
          console.log('Session created: ' + session.sessionId);
          console.log('Status: ' + session.status);
          if (session.name) console.log('Name: ' + session.name);
          console.log('Prompt version: ' + session.pver);
        }
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });

  cmd
    .command('list')
    .description('List all active AI sessions')
    .option('-a, --all', 'Include inactive sessions', false)
    .option('--json', 'Output result as JSON', false)
    .action(async (options: any) => {
      try {
        const { SessionManager } = await import('@specverse/engine-ai');
        const manager = new SessionManager();
        const sessions = await manager.list({ all: options.all });

        if (options.json) {
          console.log(JSON.stringify(sessions, null, 2));
        } else if (sessions.length === 0) {
          console.log('No sessions found. Create one with: specverse session create');
        } else {
          console.log('Sessions (' + sessions.length + '):');
          for (const s of sessions) {
            console.log('  ' + (s.status === 'active' ? '*' : ' ') + ' ' + s.sessionId + (s.name ? ' (' + s.name + ')' : '') + ' — ' + s.status + ', ' + s.jobsProcessed + ' jobs');
          }
        }
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });

  cmd
    .command('delete <sessionId>')
    .description('Delete an AI session')
    .option('-f, --force', 'Force delete even if session has pending jobs', false)
    .option('--json', 'Output result as JSON', false)
    .action(async (sessionId: string, options: any) => {
      try {
        const { SessionManager } = await import('@specverse/engine-ai');
        const manager = new SessionManager();
        await manager.delete(sessionId, { force: options.force });
        console.log('Session deleted: ' + sessionId);
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });

  cmd
    .command('submit <sessionId> <requirements>')
    .description('Submit a job to an AI session')
    .option('-j, --job-id <job-id>', 'Custom job ID (auto-generated if not provided)')
    .option('-o, --output <output>', 'Output file path for generated spec')
    .option('-op, --operation <operation>', 'Operation type: create, analyse, materialise, realize', "create")
    .action(async (sessionId: string, requirements: string, options: any) => {
      try {
        const { SessionManager } = await import('@specverse/engine-ai');
        const manager = new SessionManager();
        const job = await manager.submit(sessionId, requirements, {
          jobId: options.jobId,
          outputPath: options.output,
          operation: options.operation,
        });
        console.log('Job submitted: ' + job.jobId);
        console.log('Status: ' + job.status);
        if (options.output) console.log('Output: ' + options.output);
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });

  cmd
    .command('status <id>')
    .description('Check status of a job or session')
    .option('--json', 'Output result as JSON', false)
    .action(async (id: string, options: any) => {
      try {
        const { SessionManager } = await import('@specverse/engine-ai');
        const manager = new SessionManager();
        const status = await manager.status(id);
        if (options.json) {
          console.log(JSON.stringify(status, null, 2));
        } else {
          console.log('ID: ' + (status.sessionId || status.jobId));
          console.log('Status: ' + status.status);
          if (status.created) console.log('Created: ' + new Date(status.created).toLocaleString());
          if (status.jobsProcessed !== undefined) console.log('Jobs: ' + status.jobsProcessed);
        }
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });

  cmd
    .command('process <jobId>')
    .description('Process a pending job (resume AI session)')

    .action(async (jobId: string, options: any) => {
      try {
        const { SessionManager } = await import('@specverse/engine-ai');
        const manager = new SessionManager();
        console.log('Processing job: ' + jobId);
        await manager.process(jobId);
        console.log('Job processed successfully');
      } catch (error: any) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
}

