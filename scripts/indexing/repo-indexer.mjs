#!/usr/bin/env node
/**
 * SpecVerse Repo Indexer
 *
 * Walks a repo, hashes every file, maps paths to logical content areas,
 * and writes .specverse-index.json.
 *
 * Usage:
 *   node repo-indexer.mjs [repo-path]          # defaults to cwd
 *   node repo-indexer.mjs --all                 # index all known repos
 */

import { createHash } from 'crypto';
import {
  readFileSync, readdirSync, statSync, lstatSync,
  writeFileSync, existsSync, readlinkSync
} from 'fs';
import { join, relative, resolve, extname, basename } from 'path';

// ── Binary extensions (hash only, no content analysis) ──────────────────────

const BINARY_EXT = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.webp',
  '.woff', '.woff2', '.ttf', '.eot',
  '.vsix', '.tgz', '.zip', '.tar', '.gz', '.br',
  '.pdf', '.mp3', '.mp4', '.mov', '.wav',
  '.exe', '.dll', '.so', '.dylib', '.wasm', '.node',
]);

// ── Always skip these directory names ───────────────────────────────────────

const ALWAYS_SKIP_DIRS = new Set(['.git', '.DS_Store']);

// ── Helpers ─────────────────────────────────────────────────────────────────

function hashFile(filePath) {
  try {
    const content = readFileSync(filePath);
    return createHash('sha256').update(content).digest('hex').substring(0, 16);
  } catch {
    return 'unreadable';
  }
}

function fileSize(filePath) {
  try {
    return statSync(filePath).size;
  } catch {
    return 0;
  }
}

function isBinary(filePath) {
  return BINARY_EXT.has(extname(filePath).toLowerCase());
}

// ── Origin classification ───────────────────────────────────────────────────

function classifyOrigin(relPath, config) {
  // Check explicit overrides first
  for (const rule of config.originRules || []) {
    if (matchPattern(relPath, rule.pattern)) {
      return rule.origin;
    }
  }
  // Default rules
  if (relPath.startsWith('node_modules/')) return 'dependency';
  if (relPath.startsWith('dist/')) return 'built';
  return 'source';
}

function matchPattern(path, pattern) {
  // Simple prefix/suffix/contains matching
  if (pattern.endsWith('**')) {
    return path.startsWith(pattern.slice(0, -2));
  }
  if (pattern.startsWith('*')) {
    return path.endsWith(pattern.slice(1));
  }
  return path.startsWith(pattern);
}

// ── Logical path mapping ────────────────────────────────────────────────────

function toLogicalPath(relPath, contentAreas) {
  // Find longest matching prefix (most specific content area)
  let bestMatch = null;
  let bestLen = 0;

  for (const [area, localPrefix] of Object.entries(contentAreas)) {
    const prefix = localPrefix.endsWith('/') ? localPrefix : localPrefix + '/';
    if (relPath.startsWith(prefix) && prefix.length > bestLen) {
      bestMatch = area;
      bestLen = prefix.length;
    }
    // Exact file match (not just prefix)
    if (relPath === localPrefix && localPrefix.length > bestLen) {
      bestMatch = area;
      bestLen = localPrefix.length;
    }
  }

  if (bestMatch) {
    const remainder = relPath.substring(bestLen);
    return bestMatch + (remainder ? '/' + remainder : '');
  }

  // No mapping — use raw path
  return relPath;
}

function getCategory(logicalPath) {
  const first = logicalPath.split('/')[0];
  return first || 'other';
}

// ── Directory walker ────────────────────────────────────────────────────────

function walkDir(dir, rootDir, config, files = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }

  for (const entry of entries) {
    if (ALWAYS_SKIP_DIRS.has(entry)) continue;

    const fullPath = join(dir, entry);
    const relPath = relative(rootDir, fullPath);

    // Check excludes
    if (shouldExclude(relPath, config.exclude || [])) continue;

    let stat;
    try {
      const lstat = lstatSync(fullPath);

      if (lstat.isSymbolicLink()) {
        // Record symlink target
        const target = readlinkSync(fullPath);
        files.push({
          path: relPath,
          symlink: target,
          origin: 'symlink',
        });
        continue;
      }

      stat = lstat;
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      // Special handling for node_modules — only walk @specverse/*
      if (entry === 'node_modules') {
        const scopeDir = join(fullPath, '@specverse');
        if (existsSync(scopeDir)) {
          walkNodeModulesSpecverse(scopeDir, rootDir, config, files);
        }
        continue;
      }
      walkDir(fullPath, rootDir, config, files);
    } else if (stat.isFile()) {
      const hash = hashFile(fullPath);
      const size = stat.size;
      const origin = classifyOrigin(relPath, config);
      const logicalPath = toLogicalPath(relPath, config.contentAreas || {});
      const category = getCategory(logicalPath);

      files.push({
        path: relPath,
        logicalPath,
        hash,
        size,
        origin,
        category,
        binary: isBinary(fullPath),
      });
    }
  }

  return files;
}

function walkNodeModulesSpecverse(scopeDir, rootDir, config, files) {
  // Walk @specverse/* packages, but only key files
  const KEEP_PATTERNS = ['package.json', 'src/', 'assets/', 'schema/', 'libs/'];
  let packages;
  try {
    packages = readdirSync(scopeDir);
  } catch {
    return;
  }

  for (const pkg of packages) {
    const pkgDir = join(scopeDir, pkg);
    if (!statSync(pkgDir).isDirectory()) continue;

    // Index package.json
    const pkgJson = join(pkgDir, 'package.json');
    if (existsSync(pkgJson)) {
      const relPath = relative(rootDir, pkgJson);
      files.push({
        path: relPath,
        logicalPath: `dependencies/@specverse/${pkg}/package.json`,
        hash: hashFile(pkgJson),
        size: fileSize(pkgJson),
        origin: 'dependency',
        category: 'dependencies',
        binary: false,
      });
    }

    // Walk select subdirectories
    for (const subdir of ['src', 'assets', 'schema', 'libs']) {
      const sub = join(pkgDir, subdir);
      if (existsSync(sub) && statSync(sub).isDirectory()) {
        walkDirFlat(sub, rootDir, `dependencies/@specverse/${pkg}`, config, files);
      }
    }
  }
}

function walkDirFlat(dir, rootDir, logicalBase, config, files) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }

  for (const entry of entries) {
    if (ALWAYS_SKIP_DIRS.has(entry)) continue;
    if (entry === 'node_modules') continue;

    const fullPath = join(dir, entry);
    const relPath = relative(rootDir, fullPath);
    const relToBase = relative(join(rootDir, relPath.split('/').slice(0, 2).join('/')), fullPath);

    let stat;
    try {
      stat = statSync(fullPath);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      walkDirFlat(fullPath, rootDir, logicalBase, config, files);
    } else if (stat.isFile()) {
      const subPath = relative(resolve(rootDir, ...relPath.split('/').slice(0, 3)), fullPath);
      files.push({
        path: relPath,
        logicalPath: logicalBase + '/' + subPath,
        hash: hashFile(fullPath),
        size: stat.size,
        origin: 'dependency',
        category: 'dependencies',
        binary: isBinary(fullPath),
      });
    }
  }
}

function shouldExclude(relPath, excludes) {
  for (const pattern of excludes) {
    if (matchPattern(relPath, pattern)) return true;
    // Also check basename for simple patterns
    if (!pattern.includes('/') && basename(relPath) === pattern) return true;
  }
  return false;
}

// ── Config loading ──────────────────────────────────────────────────────────

function loadConfig(repoDir) {
  const configPath = join(repoDir, '.specverse-content-map.json');
  if (!existsSync(configPath)) {
    console.error(`No .specverse-content-map.json found in ${repoDir}`);
    console.error('Create one with content area mappings. See specverse-self/scripts/indexing/README.md');
    process.exit(1);
  }
  return JSON.parse(readFileSync(configPath, 'utf8'));
}

// ── Main ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

// --all mode: index all known repos
const REPOS_BASE = resolve(args.find(a => a.startsWith('--base='))?.split('=')[1] || join(import.meta.dirname, '../../..'));
const ALL_REPOS = ['specverse-lang', 'specverse-engines', 'specverse-self', 'specverse-demo-self'];

if (args.includes('--all')) {
  for (const repo of ALL_REPOS) {
    const repoDir = join(REPOS_BASE, repo);
    if (!existsSync(repoDir)) {
      console.warn(`Skipping ${repo} (not found at ${repoDir})`);
      continue;
    }
    if (!existsSync(join(repoDir, '.specverse-content-map.json'))) {
      console.warn(`Skipping ${repo} (no .specverse-content-map.json)`);
      continue;
    }
    indexRepo(repoDir);
  }
} else {
  const repoDir = resolve(args[0] || process.cwd());
  indexRepo(repoDir);
}

function indexRepo(repoDir) {
  const config = loadConfig(repoDir);
  console.log(`Indexing ${config.repo || basename(repoDir)}...`);

  const startTime = Date.now();
  const files = walkDir(repoDir, repoDir, config);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  const index = {
    repo: config.repo || basename(repoDir),
    root: repoDir,
    generated: new Date().toISOString(),
    config: {
      contentAreas: config.contentAreas || {},
    },
    summary: {
      totalFiles: files.length,
      byOrigin: countBy(files, 'origin'),
      byCategory: countBy(files, 'category'),
      totalSize: files.reduce((sum, f) => sum + (f.size || 0), 0),
    },
    files,
  };

  const outPath = join(repoDir, '.specverse-index.json');
  writeFileSync(outPath, JSON.stringify(index, null, 2));

  const sourceCount = files.filter(f => f.origin === 'source').length;
  const genCount = files.filter(f => f.origin === 'generated').length;
  const depCount = files.filter(f => f.origin === 'dependency').length;
  const builtCount = files.filter(f => f.origin === 'built').length;
  const symlinkCount = files.filter(f => f.origin === 'symlink').length;

  console.log(`  ${files.length} files indexed in ${elapsed}s`);
  console.log(`  source: ${sourceCount}, generated: ${genCount}, built: ${builtCount}, dependency: ${depCount}, symlink: ${symlinkCount}`);
  console.log(`  -> ${outPath}`);
}

function countBy(arr, key) {
  const counts = {};
  for (const item of arr) {
    const val = item[key] || 'unknown';
    counts[val] = (counts[val] || 0) + 1;
  }
  return counts;
}
