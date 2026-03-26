// Compose examples from entity modules and engine packages.
//
// Discovers .specly + .example.yaml pairs from entity modules
// (core, extensions, _shared) and engine packages (generators,
// realize, inference). Outputs numbered directories matching
// the doc pipeline format: examples/01-fundamentals/01-01-basic-model.specly
//
// Pattern follows compose-schema.cjs.

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, cpSync, statSync, unlinkSync, rmdirSync, rmSync } from 'fs';
import { join, resolve, dirname, basename, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUTPUT = join(ROOT, 'examples');
const verbose = process.env.VERBOSE === 'true';

// ── Resolve engine package paths ────────────────────────────────────────────
// Try sibling repo first (file: reference), then node_modules

function findPackage(name) {
  // Sibling repo (specverse-engines)
  const sibling = resolve(ROOT, '..', 'specverse-engines', 'packages', name);
  if (existsSync(sibling)) return sibling;

  // node_modules
  const nm = join(ROOT, 'node_modules', '@specverse', `engine-${name}`);
  if (existsSync(nm)) return nm;

  // Generated code node_modules
  const genNm = join(ROOT, 'generated', 'code', 'node_modules', '@specverse', `engine-${name}`);
  if (existsSync(genNm)) return genNm;

  return null;
}

const ENTITIES_PKG = findPackage('entities');
const GENERATORS_PKG = findPackage('generators');
const REALIZE_PKG = findPackage('realize');
const INFERENCE_PKG = findPackage('inference');

if (!ENTITIES_PKG) {
  console.error('Cannot find @specverse/engine-entities. Install dependencies or check sibling repos.');
  process.exit(1);
}

console.log('Composing examples...');
if (verbose) {
  console.log(`  entities: ${ENTITIES_PKG}`);
  console.log(`  generators: ${GENERATORS_PKG || 'not found'}`);
  console.log(`  realize: ${REALIZE_PKG || 'not found'}`);
  console.log(`  inference: ${INFERENCE_PKG || 'not found'}`);
}

// ── Load category ordering ──────────────────────────────────────────────────

const categoryOrderPath = join(ENTITIES_PKG, 'src', '_shared', 'examples', 'category-order.yaml');
if (!existsSync(categoryOrderPath)) {
  console.error(`Category order file not found: ${categoryOrderPath}`);
  process.exit(1);
}

// Simple YAML parser for category-order.yaml (structured enough to parse with regex)
function parseCategoryOrder(content) {
  const categories = [];
  const blocks = content.split(/^  - slug:/m).slice(1);
  for (const block of blocks) {
    const lines = ('slug:' + block).split('\n');
    const cat = {};
    for (const line of lines) {
      const match = line.match(/^\s*(slug|number|title|description|targetAudience|estimatedTime):\s*"?([^"]*)"?\s*$/);
      if (match) cat[match[1]] = match[2].trim();
    }
    if (cat.slug && cat.number) categories.push(cat);
  }
  return categories;
}

const categoryOrder = parseCategoryOrder(readFileSync(categoryOrderPath, 'utf8'));
const categoryBySlug = new Map(categoryOrder.map(c => [c.slug, c]));

if (verbose) console.log(`  Loaded ${categoryOrder.length} categories`);

// ── Discover examples ───────────────────────────────────────────────────────

const discovered = []; // { speclyPath, sidecarPath, mdPaths[], source }

function discoverFromDir(dir, source) {
  if (!existsSync(dir)) return;
  const files = readdirSync(dir).filter(f => f.endsWith('.specly'));
  for (const file of files) {
    const stem = file.replace('.specly', '');
    const speclyPath = join(dir, file);
    const sidecarPath = join(dir, `${stem}.example.yaml`);
    const mdPaths = [];
    const mdPath = join(dir, `${stem}.md`);
    if (existsSync(mdPath)) mdPaths.push(mdPath);

    if (!existsSync(sidecarPath)) {
      console.warn(`  Warning: no sidecar for ${file} in ${relative(ROOT, dir)}`);
      continue;
    }

    discovered.push({ speclyPath, sidecarPath, mdPaths, source });
  }
}

// Entity modules
const entitiesSrc = join(ENTITIES_PKG, 'src');
for (const group of ['core', 'extensions']) {
  const groupDir = join(entitiesSrc, group);
  if (!existsSync(groupDir)) continue;
  for (const mod of readdirSync(groupDir)) {
    const exDir = join(groupDir, mod, 'examples');
    discoverFromDir(exDir, `entities/${group}/${mod}`);
  }
}
// Shared cross-cutting
discoverFromDir(join(entitiesSrc, '_shared', 'examples'), 'entities/_shared');

// Engine packages
if (GENERATORS_PKG) discoverFromDir(join(GENERATORS_PKG, 'assets', 'examples'), 'generators');
if (REALIZE_PKG) discoverFromDir(join(REALIZE_PKG, 'assets', 'examples-decomposed'), 'realize');
if (INFERENCE_PKG) discoverFromDir(join(INFERENCE_PKG, 'assets', 'examples'), 'inference');

console.log(`  Discovered ${discovered.length} examples from ${new Set(discovered.map(d => d.source)).size} sources`);

// ── Parse sidecars ──────────────────────────────────────────────────────────

function parseSidecar(content) {
  const meta = {};
  for (const line of content.split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (m) {
      let val = m[2].trim();
      // Strip quotes
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      // Parse arrays
      if (val.startsWith('[') && val.endsWith(']')) {
        val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^"|"$/g, ''));
      }
      meta[m[1]] = val;
    }
  }
  return meta;
}

// ── Group by category and sort ──────────────────────────────────────────────

const byCategory = new Map(); // slug -> [{ meta, speclyPath, mdPaths }]

for (const item of discovered) {
  const meta = parseSidecar(readFileSync(item.sidecarPath, 'utf8'));
  const catSlug = meta.category;
  if (!catSlug) {
    console.warn(`  Warning: no category in ${relative(ROOT, item.sidecarPath)}`);
    continue;
  }
  if (!byCategory.has(catSlug)) byCategory.set(catSlug, []);
  byCategory.get(catSlug).push({
    meta,
    speclyPath: item.speclyPath,
    mdPaths: item.mdPaths,
    source: item.source,
  });
}

// Sort within each category by order
for (const [slug, items] of byCategory) {
  items.sort((a, b) => (parseInt(a.meta.order) || 99) - (parseInt(b.meta.order) || 99));
}

// ── Clean and write output ──────────────────────────────────────────────────

// Clean existing composed output (but preserve non-composed content)
if (existsSync(OUTPUT)) {
  // Only remove numbered directories that we'll regenerate
  for (const entry of readdirSync(OUTPUT)) {
    const entryPath = join(OUTPUT, entry);
    if (statSync(entryPath).isDirectory() && entry.match(/^\d{2}-/)) {
      // Remove numbered category directory
      cpSync(entryPath, entryPath, { force: true }); // no-op to check access
      rmDirRecursive(entryPath);
    }
  }
}
mkdirSync(OUTPUT, { recursive: true });

function rmDirRecursive(dir) {
  rmSync(dir, { recursive: true, force: true });
}

let totalWritten = 0;

for (const [catSlug, items] of byCategory) {
  const catInfo = categoryBySlug.get(catSlug);
  if (!catInfo) {
    console.warn(`  Warning: unknown category "${catSlug}" — skipping ${items.length} examples`);
    continue;
  }

  const catDir = join(OUTPUT, `${catInfo.number}-${catSlug}`);
  mkdirSync(catDir, { recursive: true });

  // Generate numbered filenames
  const metadataExamples = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const order = String(parseInt(item.meta.order) || (i + 1)).padStart(2, '0');
    const stem = basename(item.speclyPath, '.specly');
    const numberedName = `${catInfo.number}-${order}-${stem}`;

    // Copy .specly
    const destSpecly = join(catDir, `${numberedName}.specly`);
    writeFileSync(destSpecly, readFileSync(item.speclyPath, 'utf8'));

    // Copy companion .md files
    for (const mdPath of item.mdPaths) {
      const mdDest = join(catDir, `${numberedName}.md`);
      writeFileSync(mdDest, readFileSync(mdPath, 'utf8'));
    }

    metadataExamples.push({
      id: numberedName,
      title: item.meta.title || stem,
      description: item.meta.description || '',
      difficulty: item.meta.difficulty || 'intermediate',
      concepts: Array.isArray(item.meta.concepts) ? item.meta.concepts : [],
    });

    totalWritten++;
    if (verbose) console.log(`    ${numberedName}.specly ← ${item.source}`);
  }

  // Generate metadata.yaml for the category
  const metaYaml = generateCategoryMetadata(catInfo, metadataExamples);
  writeFileSync(join(catDir, 'metadata.yaml'), metaYaml);
}

// ── Copy passthrough directories ────────────────────────────────────────────

if (REALIZE_PKG) {
  const passthroughDirs = ['09-api', '10-api', 'manifests'];
  for (const dir of passthroughDirs) {
    const src = join(REALIZE_PKG, 'assets', 'examples', dir);
    if (existsSync(src)) {
      const dest = join(OUTPUT, dir);
      mkdirSync(dest, { recursive: true });
      cpSync(src, dest, { recursive: true });
      if (verbose) console.log(`  Passthrough: ${dir}/`);
    }
  }
}

// ── Copy common/ and metadata/ ──────────────────────────────────────────────

const sharedExamplesDir = join(entitiesSrc, '_shared', 'examples');
for (const dir of ['common', 'metadata']) {
  const src = join(sharedExamplesDir, dir);
  if (existsSync(src)) {
    const dest = join(OUTPUT, dir);
    mkdirSync(dest, { recursive: true });
    cpSync(src, dest, { recursive: true });
  }
}

// Copy metadata-schema.yaml
const metaSchemaPath = join(sharedExamplesDir, 'metadata-schema.yaml');
if (existsSync(metaSchemaPath)) {
  writeFileSync(join(OUTPUT, 'metadata-schema.yaml'), readFileSync(metaSchemaPath, 'utf8'));
}

// Copy README and validation scripts from realize
if (REALIZE_PKG) {
  for (const file of ['README.md', 'LEARNING-METADATA.md', 'validate-examples.cjs', 'validate-examples-with-expected-failures.cjs']) {
    const src = join(REALIZE_PKG, 'assets', 'examples', file);
    if (existsSync(src)) {
      writeFileSync(join(OUTPUT, file), readFileSync(src, 'utf8'));
    }
  }
}

// ── Summary ─────────────────────────────────────────────────────────────────

console.log(`  Composed ${totalWritten} examples into ${byCategory.size} categories`);
console.log(`  Output: ${relative(process.cwd(), OUTPUT)}/`);

// ── Helpers ─────────────────────────────────────────────────────────────────

function generateCategoryMetadata(catInfo, examples) {
  const lines = [];
  lines.push(`category: "${catInfo.slug}"`);
  lines.push(`title: "${catInfo.title}"`);
  if (catInfo.description) lines.push(`description: "${catInfo.description}"`);
  if (catInfo.targetAudience) lines.push(`targetAudience: "${catInfo.targetAudience}"`);
  if (catInfo.estimatedTime) lines.push(`estimatedTime: "${catInfo.estimatedTime}"`);
  lines.push('');
  lines.push('examples:');
  for (const ex of examples) {
    lines.push(`  - id: "${ex.id}"`);
    lines.push(`    title: "${ex.title}"`);
    if (ex.description) lines.push(`    description: "${ex.description}"`);
    lines.push(`    difficulty: "${ex.difficulty}"`);
    if (ex.concepts.length > 0) {
      lines.push(`    concepts: [${ex.concepts.map(c => `"${c}"`).join(', ')}]`);
    }
  }
  lines.push('');
  return lines.join('\n');
}
