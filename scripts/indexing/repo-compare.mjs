#!/usr/bin/env node
/**
 * SpecVerse Repo Comparator
 *
 * Reads .specverse-index.json from multiple repos and reports:
 *   - DUPLICATED: same logical path + same hash in multiple repos
 *   - DRIFTED: same logical path but different hashes
 *   - UNIQUE: exists in only one repo
 *   - GENERATED COPIES: duplicates where one is generated/dependency origin
 *
 * Usage:
 *   node repo-compare.mjs                           # auto-discover repos
 *   node repo-compare.mjs path/to/index1.json path/to/index2.json ...
 *
 * Options:
 *   --category=examples     Filter to one category
 *   --origin=source         Filter to one origin type
 *   --show-hashes           Show file hashes
 *   --json                  Output as JSON
 *   --summary               Summary only (no file lists)
 */

import { readFileSync, existsSync } from 'fs';
import { join, resolve, basename, dirname } from 'path';

// ── Load indexes ────────────────────────────────────────────────────────────

function loadIndex(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    console.error(`Failed to load ${path}: ${e.message}`);
    return null;
  }
}

// ── Parse args ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const flags = {};
const indexPaths = [];

for (const arg of args) {
  if (arg.startsWith('--')) {
    const [key, val] = arg.substring(2).split('=');
    flags[key] = val ?? true;
  } else {
    indexPaths.push(arg);
  }
}

// Auto-discover if no paths given
if (indexPaths.length === 0) {
  const base = resolve(import.meta.dirname, '../../..');
  const repos = ['specverse-lang', 'specverse-engines', 'specverse-self', 'specverse-demo-self'];
  for (const repo of repos) {
    const idx = join(base, repo, '.specverse-index.json');
    if (existsSync(idx)) indexPaths.push(idx);
  }
}

if (indexPaths.length < 2) {
  console.error('Need at least 2 index files. Run repo-indexer.mjs --all first.');
  process.exit(1);
}

// ── Load all indexes ────────────────────────────────────────────────────────

const indexes = [];
for (const p of indexPaths) {
  const idx = loadIndex(p);
  if (idx) indexes.push(idx);
}

console.log(`\nComparing ${indexes.length} repos: ${indexes.map(i => i.repo).join(', ')}\n`);

// ── Build logical path map ──────────────────────────────────────────────────
// Map: logicalPath -> [{ repo, path, hash, size, origin, category }]

const logicalMap = new Map();

for (const index of indexes) {
  for (const file of index.files) {
    if (!file.logicalPath) continue;  // symlinks etc
    if (file.origin === 'symlink') continue;

    // Apply filters
    if (flags.category && file.category !== flags.category) continue;
    if (flags.origin && file.origin !== flags.origin) continue;

    const key = file.logicalPath;
    if (!logicalMap.has(key)) logicalMap.set(key, []);
    logicalMap.get(key).push({
      repo: index.repo,
      path: file.path,
      hash: file.hash,
      size: file.size,
      origin: file.origin,
      category: file.category,
    });
  }
}

// ── Classify each logical path ──────────────────────────────────────────────

const duplicated = [];    // same hash, multiple repos (source copies)
const drifted = [];       // same logical path, different hashes
const unique = [];         // exists in one repo only
const generatedCopies = []; // duplicate where at least one is generated/dependency

for (const [logicalPath, entries] of logicalMap) {
  // Deduplicate by repo (take first entry per repo)
  const byRepo = new Map();
  for (const entry of entries) {
    if (!byRepo.has(entry.repo)) byRepo.set(entry.repo, entry);
  }
  const deduped = Array.from(byRepo.values());

  if (deduped.length === 1) {
    unique.push({ logicalPath, entry: deduped[0] });
    continue;
  }

  // Multiple repos have this file
  const hashes = new Set(deduped.map(e => e.hash));
  const hasGenerated = deduped.some(e => e.origin === 'generated' || e.origin === 'dependency');
  const allSource = deduped.every(e => e.origin === 'source');

  if (hashes.size === 1) {
    // Same content everywhere
    if (hasGenerated) {
      generatedCopies.push({ logicalPath, entries: deduped });
    } else {
      duplicated.push({ logicalPath, entries: deduped });
    }
  } else {
    drifted.push({ logicalPath, entries: deduped });
  }
}

// ── Output ──────────────────────────────────────────────────────────────────

if (flags.json) {
  console.log(JSON.stringify({
    duplicated: duplicated.length,
    drifted: drifted.length,
    unique: unique.length,
    generatedCopies: generatedCopies.length,
    details: { duplicated, drifted, unique, generatedCopies },
  }, null, 2));
  process.exit(0);
}

// ── Summary ─────────────────────────────────────────────────────────────────

console.log('='.repeat(70));
console.log('SUMMARY');
console.log('='.repeat(70));
console.log(`  Duplicated (same hash, multiple source repos):  ${duplicated.length}`);
console.log(`  Drifted (same logical path, different content):  ${drifted.length}`);
console.log(`  Generated copies (expected from realization):    ${generatedCopies.length}`);
console.log(`  Unique (one repo only):                          ${unique.length}`);
console.log();

// Per-repo summary
for (const index of indexes) {
  const repoFiles = index.files.filter(f => f.origin !== 'symlink');
  const sourceFiles = repoFiles.filter(f => f.origin === 'source');
  const genFiles = repoFiles.filter(f => f.origin === 'generated');
  const builtFiles = repoFiles.filter(f => f.origin === 'built');
  const depFiles = repoFiles.filter(f => f.origin === 'dependency');
  console.log(`  ${index.repo}: ${sourceFiles.length} source, ${genFiles.length} generated, ${builtFiles.length} built, ${depFiles.length} dependency`);
}
console.log();

if (flags.summary) process.exit(0);

// ── Duplicated ──────────────────────────────────────────────────────────────

if (duplicated.length > 0) {
  console.log('='.repeat(70));
  console.log(`DUPLICATED — same content in multiple source repos (${duplicated.length} files)`);
  console.log('='.repeat(70));

  // Group by category
  const byCategory = groupBy(duplicated, d => d.entries[0]?.category || 'other');
  for (const [category, items] of Object.entries(byCategory).sort()) {
    console.log(`\n  [${category}] (${items.length} files)`);
    for (const item of items.slice(0, flags.limit ? parseInt(flags.limit) : 20)) {
      const repos = item.entries.map(e => e.repo).join(', ');
      const hash = flags['show-hashes'] ? ` (${item.entries[0].hash})` : '';
      console.log(`    ${item.logicalPath}${hash}`);
      console.log(`      in: ${repos}`);
    }
    if (items.length > 20 && !flags.limit) {
      console.log(`    ... and ${items.length - 20} more`);
    }
  }
  console.log();
}

// ── Drifted ─────────────────────────────────────────────────────────────────

if (drifted.length > 0) {
  console.log('='.repeat(70));
  console.log(`DRIFTED — same logical path, DIFFERENT content (${drifted.length} files)`);
  console.log('='.repeat(70));

  for (const item of drifted) {
    console.log(`\n  ${item.logicalPath}`);
    for (const entry of item.entries) {
      const sizeStr = formatSize(entry.size);
      console.log(`    ${entry.repo}: hash=${entry.hash} (${sizeStr}) [${entry.origin}]`);
      console.log(`      path: ${entry.path}`);
    }
  }
  console.log();
}

// ── Unique ──────────────────────────────────────────────────────────────────

if (unique.length > 0) {
  console.log('='.repeat(70));
  console.log(`UNIQUE — exists in only one repo (${unique.length} files)`);
  console.log('='.repeat(70));

  // Group by repo then category
  const byRepo = groupBy(unique, u => u.entry.repo);
  for (const [repo, items] of Object.entries(byRepo).sort()) {
    console.log(`\n  ${repo} (${items.length} unique files):`);
    const byCategory = groupBy(items, i => i.entry.category);
    for (const [category, catItems] of Object.entries(byCategory).sort()) {
      console.log(`    [${category}] (${catItems.length})`);
      const sourceItems = catItems.filter(i => i.entry.origin === 'source');
      for (const item of sourceItems.slice(0, flags.limit ? parseInt(flags.limit) : 10)) {
        console.log(`      ${item.logicalPath}`);
      }
      if (sourceItems.length > 10 && !flags.limit) {
        console.log(`      ... and ${sourceItems.length - 10} more`);
      }
      const nonSourceCount = catItems.length - sourceItems.length;
      if (nonSourceCount > 0) {
        console.log(`      + ${nonSourceCount} ${catItems.find(i => i.entry.origin !== 'source')?.entry.origin || 'other'} files`);
      }
    }
  }
  console.log();
}

// ── Generated copies ────────────────────────────────────────────────────────

if (generatedCopies.length > 0) {
  console.log('='.repeat(70));
  console.log(`GENERATED COPIES — expected duplicates from realization (${generatedCopies.length} files)`);
  console.log('='.repeat(70));

  const byCategory = groupBy(generatedCopies, d => d.entries[0]?.category || 'other');
  for (const [category, items] of Object.entries(byCategory).sort()) {
    console.log(`  [${category}]: ${items.length} files`);
  }
  console.log();
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function groupBy(arr, fn) {
  const groups = {};
  for (const item of arr) {
    const key = fn(item);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  }
  return groups;
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}
