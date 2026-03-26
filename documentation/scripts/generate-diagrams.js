#!/usr/bin/env node

/**
 * Clean Diagram Generation Script for SpecVerse v3.1
 * 
 * Simplified script that generates diagrams and documentation without
 * complex hardcoded mappings and outdated logic.
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import { execSync } from 'child_process';

const EXAMPLES_DIR = path.resolve(process.cwd(), '../examples');
const MD_OUTPUT_DIR = path.resolve(process.cwd(), 'generated-md');
const MDX_OUTPUT_DIR = path.resolve(process.cwd(), 'generated-mdx');
// Use specverse CLI from PATH, or fallback to specverse-lang if available
const SPECVERSE_CLI = process.env.SPECVERSE_CLI || 'specverse';
const DIAGRAM_CLI = process.env.DIAGRAM_CLI || path.resolve(process.cwd(), '../../specverse-lang/tools/diagram-generator/dist/tools/diagram-generator/src/cli.js');

/**
 * Generate title from filename
 */
function generateTitle(filePath) {
  const basename = path.basename(filePath, '.specly');
  
  // Handle numbered examples like "01-01-basic-model"
  if (/^\d+-\d+-/.test(basename)) {
    return basename.replace(/^\d+-\d+-/, '').replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }
  
  // Handle other examples
  return basename.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Determine which diagram generator to use based on file path
 */
function shouldUseUnifiedGenerator(filePath) {
  // Use unified generator for 11-diagrams examples (specialized diagram types)
  return filePath.includes('/13-diagrams/') || filePath.includes('/11-diagrams/');
}

/**
 * Determine diagram type from file name for unified generator
 */
function getDiagramTypeFromFilename(filename) {
  const basename = path.basename(filename, '.specly');

  // Map filenames to diagram types
  if (basename.includes('event-flow-layered')) return 'event-flow-layered';
  if (basename.includes('event-flow-sequence')) return 'event-flow-sequence';
  if (basename.includes('event-flow-swimlane')) return 'event-flow-swimlane';
  if (basename.includes('er-diagram')) return 'er-diagram';
  if (basename.includes('profile-attachment')) return 'profile-attachment';
  if (basename.includes('lifecycle')) return 'lifecycle';
  if (basename.includes('mvc-architecture')) return 'mvc-architecture';
  if (basename.includes('service-architecture')) return 'service-architecture';
  if (basename.includes('component-dependencies')) return 'component-dependencies';
  if (basename.includes('deployment-topology')) return 'deployment-topology';
  if (basename.includes('capability-flow')) return 'capability-flow';
  if (basename.includes('manifest')) return 'manifest-mapping';
  if (basename.includes('technology-stack')) return 'technology-stack';
  if (basename.includes('capability-bindings')) return 'capability-bindings';

  // Default to model-architecture for generic diagrams
  return 'model-architecture';
}

/**
 * Generate diagram content using unified generator (for 11-diagrams)
 */
function generateUnifiedDiagram(inputFile, title) {
  const diagramType = getDiagramTypeFromFilename(inputFile);
  const tempFile = path.join('/tmp', `diagram-${Date.now()}.mmd`);

  const isPath = SPECVERSE_CLI.includes('/') || SPECVERSE_CLI.includes('\\');
  const cliRef = isPath ? `node "${SPECVERSE_CLI}"` : SPECVERSE_CLI;
  const command = `${cliRef} gen diagram "${inputFile}" --diagram-type ${diagramType} -o "${tempFile}"`;

  try {
    execSync(command, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    const result = fs.readFileSync(tempFile, 'utf8');
    fs.unlinkSync(tempFile); // Clean up temp file
    return '```mermaid\n' + result + '\n```';
  } catch (error) {
    console.error(`❌ Failed to generate unified diagram for ${inputFile}:`, error.message);
    return null;
  }
}

/**
 * Generate diagram content only (returns the diagram string)
 */
function generateDiagramContent(inputFile, title, includeAll = false) {
  // Use unified generator for 11-diagrams examples
  if (shouldUseUnifiedGenerator(inputFile)) {
    return generateUnifiedDiagram(inputFile, title);
  }

  // Use diagram generator for other examples
  const command = `node "${DIAGRAM_CLI}" "${inputFile}" --title "${title}" --docusaurus${includeAll ? ' --include-all' : ''}`;

  try {
    const result = execSync(command, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    return result;
  } catch (error) {
    console.error(`❌ Failed to generate diagram for ${inputFile}:`, error.message);
    return null;
  }
}

/**
 * Clean outdated content from MD files
 */
function cleanMdContent(content) {
  // Remove .yaml references and replace with direct validation
  content = content.replace(
    /```bash\n# Generate YAML from Specly DSL\nspecverse transpile ([^.]+)\.specly -o \1\.yaml\n```\n\n\*\*Generated file\*\*: (?:\[([^.]+)\.yaml\]\([^)]+\)|`[^`]+\.yaml`)/g,
    '```bash\n# Validate Specly file directly\nspecverse validate $1.specly\n```'
  );
  
  // Remove transpile to YAML sections
  content = content.replace(
    /### Generated(?:: | Format| YAML Format)\n\n(?:The (?:YAML format is generated automatically during the build process|Specly DSL can be transpiled to YAML format using):?\n\n)?```bash\n(?:# Generate YAML from Specly DSL\n)?specverse transpile [^\n]+\n```\n\n(?:\*\*Generated file\*\*: [^\n]+\n\n)?(?:This demonstrates[^]*?(?=\n## |\n### |$))?/g,
    '### Validation\n\nTo validate the specification:\n\n```bash\n# Validate Specly file directly\nspecverse validate $&\n```\n\nThis demonstrates the v3.1 **single source** architecture where:\n- **Specly DSL** serves as the primary, human-readable specification\n- Direct validation without intermediate formats\n- All tooling works directly with .specly files\n\n'
  );
  
  // Fix the validation command to use correct file name
  content = content.replace(
    /(specverse validate )\$&/g,
    '$1' + content.match(/([^/\\]+)\.specly/)?.[1] + '.specly' || 'example.specly'
  );
  
  // Remove additional YAML transpilation commands
  content = content.replace(
    /Transpile to YAML (?:format|and validate):\n```bash\nspecverse transpile [^\n]+\n(?:specverse validate [^\n]+\n)?```\n\n/g,
    ''
  );
  
  // Remove trailing slashes from directory links
  content = content.replace(/(\[.*?\]\([^)]*?)\/(\))/g, '$1$2');
  
  // Fix .md extensions to not have extensions (let Docusaurus handle routing)
  content = content.replace(/(\[.*?\]\([^)]*?)\.md(\))/g, '$1$2');
  
  return content;
}

/**
 * Combine MD content with generated diagrams
 */
function combineMdWithDiagrams(mdFilePath, diagramContent) {
  if (!fs.existsSync(mdFilePath)) {
    // If no MD file exists, return just the diagram (or empty string if no diagram)
    return diagramContent || '';
  }
  
  let mdContent = fs.readFileSync(mdFilePath, 'utf8');
  
  // Clean outdated content first
  mdContent = cleanMdContent(mdContent);
  
  // Fix cross-reference links by stripping numbered directory prefixes
  mdContent = fixCrossReferenceLinks(mdContent);
  
  if (diagramContent) {
    // Find diagram sections - support both "Visual Diagram" and "Generated Diagram"
    const visualDiagramRegex = /## Visual Diagram\s*\n\n```mermaid[\s\S]*?```/g;
    const generatedDiagramRegex = /## Generated Diagram\s*\n\n```mermaid[\s\S]*?```/g;

    if (visualDiagramRegex.test(mdContent)) {
      // Replace existing Visual Diagram section
      const updatedContent = mdContent.replace(visualDiagramRegex, '## Visual Diagram\n\n' + diagramContent);
      return updatedContent;
    } else if (generatedDiagramRegex.test(mdContent)) {
      // Replace existing Generated Diagram section
      const updatedContent = mdContent.replace(generatedDiagramRegex, '## Generated Diagram\n\n' + diagramContent);
      return updatedContent;
    } else {
      // If no diagram section exists, DON'T add one - preserve original structure
      // Only generate diagrams where they're explicitly intended
      return mdContent;
    }
  } else {
    // No diagram content, just return the cleaned MD content
    return mdContent;
  }
}

/**
 * Fix cross-reference links by stripping numbered prefixes from directory names
 * Docusaurus strips numbers from directory names in routes, so cross-references need conversion
 * Converts: ../01-fundamentals/01-01-basic-model -> ../fundamentals/01-01-basic-model
 * Converts: ../02-profiles -> ../profiles
 * Note: Only fixes cross-references (../), not same-directory links (./) which are handled in sync
 */
function fixCrossReferenceLinks(content) {
  // Pattern to match relative links with numbered directory prefixes
  // Only matches cross-references starting with ../ (same-directory links handled in sync)
  // Matches: ../01-fundamentals/file or ../01-fundamentals or [text](../01-fundamentals/file)
  return content.replace(/(\.\.\/)(\d{2}-)([\w-]+)/g, (match, prefix, numbers, dirName) => {
    return prefix + dirName;
  });
}

/**
 * Generate front matter for MDX files
 */
function generateFrontMatter(filePath, title) {
  const basename = path.basename(filePath, '.mdx');
  const dirname = path.dirname(filePath);
  const categoryPath = dirname.replace(/.*\/examples\//, '');

  return `---
id: ${basename}
title: ${title}
sidebar_label: ${title}
---

`;
}

/**
 * Convert MD content to MDX format with front matter and Mermaid handling
 */
function convertToMdx(mdContent, filePath = '', title = '') {
  // Replace ```mermaid blocks with <Mermaid chart={`...`} /> wrapped in diagram-generated container
  // Look for both Visual Diagram and Generated Diagram sections
  let mdxContent = mdContent.replace(/## (?:Visual|Generated) Diagram\s*\n\n```mermaid\n([\s\S]*?)\n```/g,
    (match, diagram, offset, string) => {
      // Extract the header text (Visual or Generated)
      const headerMatch = match.match(/## (Visual|Generated) Diagram/);
      const headerText = headerMatch ? headerMatch[1] : 'Visual';
      return `## ${headerText} Diagram\n\n<div className="diagram-generated">\n\n<Mermaid chart={\`\n${diagram}\n\`} />\n\n</div>`;
    });

  // Handle any remaining ```mermaid blocks (non-diagram sections) without the special container
  mdxContent = mdxContent.replace(/```mermaid\n([\s\S]*?)\n```/g, '<Mermaid chart={`\n$1\n`} />');

  // Remove any import statements from the content (they can only be at the top in MDX)
  let cleanContent = mdxContent.replace(/^import Mermaid from ['"]@site\/src\/components\/Mermaid['"];?\s*$/gm, '');

  // Fix cross-reference links by stripping numbered directory prefixes
  cleanContent = fixCrossReferenceLinks(cleanContent);

  // Fix JSX syntax issues (MDX interprets <-> as JSX)
  cleanContent = cleanContent.replace(/<->/g, '↔');

  // Remove empty lines that might be left behind
  cleanContent = cleanContent.replace(/\n\s*\n\s*\n/g, '\n\n');

  // Generate front matter if file path is provided
  let frontMatter = '';
  if (filePath && title) {
    frontMatter = generateFrontMatter(filePath, title);
  }

  // Add front matter, import, and content
  const mermaidImport = "import Mermaid from '@site/src/components/Mermaid';";
  const finalContent = frontMatter + mermaidImport + "\n\n" + cleanContent;

  return finalContent;
}

/**
 * Main execution
 */
async function main() {
  console.log('🎯 SpecVerse Language Clean Diagram Generation');
  console.log('==============================================');
  console.log('');
  
  // Check prerequisites
  if (!fs.existsSync(EXAMPLES_DIR)) {
    console.error('❌ Examples directory not found:', EXAMPLES_DIR);
    process.exit(1);
  }
  
  if (!fs.existsSync(DIAGRAM_CLI)) {
    console.error('❌ Diagram CLI not found at:', DIAGRAM_CLI);
    console.error('Please run: npm run build');
    process.exit(1);
  }
  
  // Create output directories
  fs.mkdirSync(MD_OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(MDX_OUTPUT_DIR, { recursive: true });
  
  // Find all .specly files
  const speclyFiles = glob.sync('**/*.specly', { cwd: EXAMPLES_DIR });
  
  // Also find standalone README.md files in example directories (like 09-api)
  const standaloneReadmes = glob.sync('*/README.md', { cwd: EXAMPLES_DIR })
    .filter(file => {
      // Only include directories that don't have .specly files
      const dir = path.dirname(file);
      const hasSpeclyFiles = speclyFiles.some(speclyFile => speclyFile.startsWith(dir + '/'));
      return !hasSpeclyFiles;
    });

  // Find standalone .md files (excluding README.md and files with corresponding .specly)
  const standaloneMdFiles = glob.sync('**/*.md', { cwd: EXAMPLES_DIR })
    .filter(file => {
      // Exclude README.md files (handled separately)
      if (path.basename(file) === 'README.md') return false;

      // Exclude .md files that have corresponding .specly files
      const speclyCounterpart = file.replace(/\.md$/, '.specly');
      if (speclyFiles.includes(speclyCounterpart)) return false;

      return true;
    });

  const totalFiles = speclyFiles.length + standaloneReadmes.length + standaloneMdFiles.length;
  
  if (totalFiles === 0) {
    console.log('⚠️  No .specly files, standalone READMEs, or standalone .md files found in examples directory');
    return;
  }

  console.log(`📁 Found ${speclyFiles.length} example files, ${standaloneReadmes.length} standalone README files, and ${standaloneMdFiles.length} standalone .md files`);
  console.log('');
  
  let successCount = 0;
  let errorCount = 0;
  
  // Process .specly files
  for (const relativeFile of speclyFiles) {
    const inputFile = path.join(EXAMPLES_DIR, relativeFile);
    const title = generateTitle(relativeFile);
    
    // Look for corresponding MD file
    const mdFile = path.join(EXAMPLES_DIR, relativeFile.replace('.specly', '.md'));
    
    console.log(`📊 Processing: ${relativeFile}`);
    
    // Generate diagram content
    const diagramContent = generateDiagramContent(inputFile, title, true);
    
    // Combine MD content with diagrams (or just use MD content if diagram fails)
    let combinedMdContent;
    if (!diagramContent) {
      console.error(`❌ Failed to generate diagram for ${relativeFile} - proceeding with MD content only`);
      errorCount++;
      // Still process the MD file without diagrams
      combinedMdContent = combineMdWithDiagrams(mdFile, null);
    } else {
      combinedMdContent = combineMdWithDiagrams(mdFile, diagramContent);
    }
    
    // Generate MD version
    const mdOutputFile = path.join(MD_OUTPUT_DIR, relativeFile.replace('.specly', '.md'));
    fs.mkdirSync(path.dirname(mdOutputFile), { recursive: true });
    
    try {
      fs.writeFileSync(mdOutputFile, combinedMdContent, 'utf8');
      console.log(`📄 Generated MD: ${path.relative(process.cwd(), mdOutputFile)}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to write MD file ${mdOutputFile}:`, error.message);
      errorCount++;
      continue;
    }
    
    // Generate MDX version
    const mdxOutputFile = path.join(MDX_OUTPUT_DIR, relativeFile.replace('.specly', '.mdx'));
    fs.mkdirSync(path.dirname(mdxOutputFile), { recursive: true });
    
    try {
      const mdxContent = convertToMdx(combinedMdContent, mdxOutputFile, title);
      fs.writeFileSync(mdxOutputFile, mdxContent, 'utf8');
      console.log(`🔧 Generated MDX: ${path.relative(process.cwd(), mdxOutputFile)}`);
    } catch (error) {
      console.error(`❌ Failed to write MDX file ${mdxOutputFile}:`, error.message);
      errorCount++;
    }
  }
  
  // Process standalone README files
  for (const relativeFile of standaloneReadmes) {
    const inputFile = path.join(EXAMPLES_DIR, relativeFile);
    const title = generateTitle(relativeFile.replace('/README.md', ''));
    
    console.log(`📚 Processing README: ${relativeFile}`);
    
    try {
      // Read the README content directly
      let readmeContent = fs.readFileSync(inputFile, 'utf8');
      readmeContent = cleanMdContent(readmeContent);
      
      // Generate MD version
      const mdOutputFile = path.join(MD_OUTPUT_DIR, relativeFile);
      fs.mkdirSync(path.dirname(mdOutputFile), { recursive: true });
      fs.writeFileSync(mdOutputFile, readmeContent, 'utf8');
      console.log(`📄 Generated MD: ${path.relative(process.cwd(), mdOutputFile)}`);
      
      // Generate MDX version
      const mdxOutputFile = path.join(MDX_OUTPUT_DIR, relativeFile.replace('.md', '.mdx'));
      fs.mkdirSync(path.dirname(mdxOutputFile), { recursive: true });

      // Convert to Docusaurus-compatible MDX with front matter
      const readmeMdxContent = convertToMdx(readmeContent, mdxOutputFile, title);

      fs.writeFileSync(mdxOutputFile, readmeMdxContent, 'utf8');
      console.log(`🔧 Generated MDX: ${path.relative(process.cwd(), mdxOutputFile)}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to process README ${relativeFile}:`, error.message);
      errorCount++;
    }
  }

  // Process standalone .md files
  for (const relativeFile of standaloneMdFiles) {
    const inputFile = path.join(EXAMPLES_DIR, relativeFile);
    const title = generateTitle(path.basename(relativeFile, '.md'));

    console.log(`📄 Processing standalone MD: ${relativeFile}`);

    try {
      // Read the standalone .md file
      const mdContent = fs.readFileSync(inputFile, 'utf8');

      // Create enhanced MD version (for reference)
      const mdOutputFile = path.join(MD_OUTPUT_DIR, relativeFile);
      fs.mkdirSync(path.dirname(mdOutputFile), { recursive: true });

      const enhancedMdContent = `# ${title}\n\n${mdContent}`;
      fs.writeFileSync(mdOutputFile, enhancedMdContent, 'utf8');

      // Create MDX version for Docusaurus
      const mdxOutputFile = path.join(MDX_OUTPUT_DIR, relativeFile.replace('.md', '.mdx'));
      fs.mkdirSync(path.dirname(mdxOutputFile), { recursive: true });

      // Convert to Docusaurus-compatible MDX with front matter
      let mdxContent = convertToMdx(enhancedMdContent, mdxOutputFile, title);

      fs.writeFileSync(mdxOutputFile, mdxContent, 'utf8');
      console.log(`🔧 Generated MDX: ${path.relative(process.cwd(), mdxOutputFile)}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to process standalone MD ${relativeFile}:`, error.message);
      errorCount++;
    }
  }

  // Process README.md separately if it exists
  console.log('📊 Processing: README.md');
  const readmeSource = path.join(EXAMPLES_DIR, 'README.md');
  const readmeMdxTarget = path.join(MDX_OUTPUT_DIR, 'README.mdx');
  
  if (fs.existsSync(readmeSource)) {
    try {
      let readmeContent = fs.readFileSync(readmeSource, 'utf8');
      readmeContent = cleanMdContent(readmeContent);
      
      // Convert README to MDX with front matter (use 'index' as ID to match sidebar reference)
      const readmeMdxContent = convertToMdx(readmeContent, readmeMdxTarget, 'SpecVerse Examples').replace(
        'id: README',
        'id: index'
      );

      fs.writeFileSync(readmeMdxTarget, readmeMdxContent, 'utf8');
      console.log(`🔧 Generated README MDX: ${path.relative(process.cwd(), readmeMdxTarget)}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to generate README.mdx:`, error.message);
      errorCount++;
    }
  } else {
    console.log('⚠️  README.md not found in examples directory');
  }
  
  console.log('');
  console.log('✅ Clean diagram generation complete!');
  console.log(`📊 Results: ${successCount} successful, ${errorCount} errors`);
  console.log('');
  console.log('📁 Generated files:');
  console.log(`   📄 Markdown: ${path.relative(process.cwd(), MD_OUTPUT_DIR)}`);
  console.log(`   🔧 MDX: ${path.relative(process.cwd(), MDX_OUTPUT_DIR)}`);
  console.log('');
  console.log('🧹 Cleaned outdated content:');
  console.log('   ✅ Removed .yaml references');
  console.log('   ✅ Fixed trailing slashes in links');
  console.log('   ✅ Simplified validation commands');
  console.log('   ✅ Removed complex link mappings');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main };