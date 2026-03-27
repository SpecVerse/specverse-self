#!/usr/bin/env node
import { register } from 'tsx/esm/api';
const unregister = register();
await import('../src/cli/index.ts');
unregister();
