#!/usr/bin/env node

/**
 * Generate sidebars.js for Docusaurus from SpecVerse examples structure
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

const EXAMPLES_DIR = path.resolve(process.cwd(), '../examples');
const GENERATED_MDX_DIR = path.resolve(process.cwd(), 'generated-mdx');
const OUTPUT_FILE = path.resolve(process.cwd(), 'sidebars.js');

/**
 * Category labels mapping
 */
const CATEGORY_LABELS = {
  '00-reference': 'Reference',
  '01-fundamentals': 'SpecVerse Fundamentals',
  '02-profiles': 'SpecVerse Profile System',
  '03-architecture': 'SpecVerse System Architecture',
  '04-domains': 'Real-World Domain Examples',
  '05-meta': 'Meta-Specifications',
  '06-deploy': 'Deployment Specifications',
  '07-legacy-conversions': 'Legacy System Conversions',
  '08-comprehensive': 'Comprehensive Examples',
  '09-service-layer': 'Service Layer Examples',
  '10-api': 'API Integration Examples',
  '11-view-inference': 'View Inference Examples',
  '12-tools': 'Tool Integration Examples',
  '13-diagrams': 'Diagram Examples',
  '14-end-to-end': 'End-to-End Examples',
  '15-v3.3-features': 'v3.3 Features'
};


/**
 * Get short category name for URLs
 */
function getCategoryShortName(category) {
  // Strip numbered prefix to match Docusaurus route transformation
  // 00-reference → reference, 01-fundamentals → fundamentals, etc.
  return category.replace(/^\d+-/, '');
}

/**
 * Generate examples section only for insertion into master sidebar
 */
function generateExamplesSection() {
  // Use generated MDX directory instead of source examples
  if (!fs.existsSync(GENERATED_MDX_DIR)) {
    console.warn(`⚠️  Generated MDX directory not found: ${GENERATED_MDX_DIR}`);
    return ['examples/index'];
  }

  const categories = fs.readdirSync(GENERATED_MDX_DIR)
    .filter(item => {
      const itemPath = path.join(GENERATED_MDX_DIR, item);
      return fs.statSync(itemPath).isDirectory() &&
             (item.match(/^\d+-/) || CATEGORY_LABELS[item]); // Include numbered dirs and specifically mapped dirs
    })
    .sort();

  const exampleItems = ['examples/index'];

  for (const category of categories) {
    const categoryPath = path.join(GENERATED_MDX_DIR, category);
    const categoryLabel = CATEGORY_LABELS[category] || category;

    // Find all .mdx files in the category, preferring top-level files
    let exampleFiles = glob.sync('*.mdx', { cwd: categoryPath }) // First, get top-level files
      .map(file => file.replace(/\.mdx$/, ''))
      .sort();

    // If no top-level files, fall back to nested files
    if (exampleFiles.length === 0) {
      exampleFiles = glob.sync('**/*.mdx', { cwd: categoryPath })
        .map(file => file.replace(/\.mdx$/, ''))
        .sort();
    }

    if (exampleFiles.length > 0) {
      const categoryItems = exampleFiles.map(file => {
        // Convert path to Docusaurus format
        let docPath = `examples/${getCategoryShortName(category)}/${file}`;

        // Special handling for nested directories (like 04-domains) - use simple path
        if (file.includes('/')) {
          const parts = file.split('/');
          if (parts[0] === parts[1]) {
            // If nested dir has same name as file (04-01-catalog/04-01-catalog), use simple path
            docPath = `examples/${getCategoryShortName(category)}/${parts[0]}`;
          }
        }

        return docPath;
      });

      exampleItems.push({
        type: 'category',
        label: categoryLabel,
        items: categoryItems
      });
    }
  }

  return exampleItems;
}

/**
 * Generate examples section only (for insertion into master sidebar)
 */
function generateExamplesSectionOnly() {
  const examplesSection = generateExamplesSection();

  return {
    "type": "category",
    "label": "Examples",
    "items": examplesSection
  };
}

/**
 * Main execution - generates examples section only
 */
function main() {
  console.log('🔧 Generating examples section for sidebar...');

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate examples section only
  const examplesSection = generateExamplesSectionOnly();

  // Create the JavaScript file content with just the examples section
  const jsContent = `/**
 * Examples Section for Docusaurus Sidebar
 * Generated from SpecVerse Language Specification Examples
 * Generated: ${new Date().toISOString()}
 *
 * This exports only the examples section to be inserted into the master sidebar template
 */

module.exports = ${JSON.stringify(examplesSection, null, 2)};
`;

  // Write to examples-sidebar.js instead of full sidebars.js
  const examplesOutputFile = path.join(path.dirname(OUTPUT_FILE), 'examples-sidebar.js');
  fs.writeFileSync(examplesOutputFile, jsContent);

  console.log(`✅ Examples section generated: ${examplesOutputFile}`);
  console.log(`   Found ${examplesSection.items.length - 1} example categories`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateExamplesSectionOnly, generateExamplesSection };