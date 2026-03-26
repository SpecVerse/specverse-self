#!/bin/bash
# SpecVerse Documentation Build (from specverse-self)
# Generates MDX documentation and sidebar from composed examples.

set -e

echo "SpecVerse Documentation Build (specverse-self)"
echo "================================================"

# Must run from documentation/ directory
if [ ! -f "package.json" ] || [ ! -d "scripts" ]; then
    echo "Error: Must run from documentation/ directory"
    echo "Usage: cd documentation && ./scripts/build.sh"
    exit 1
fi

# Check composed examples exist
if [ ! -d "../examples" ]; then
    echo "Error: examples/ not found. Run 'node scripts/compose-examples.mjs' first."
    exit 1
fi

EXAMPLE_COUNT=$(find ../examples -name "*.specly" | wc -l | tr -d ' ')
echo "Found $EXAMPLE_COUNT .specly examples"

# Generate diagrams and MDX
echo "Generating diagrams and MDX documentation..."
node scripts/generate-diagrams.js

# Generate sidebar
echo "Generating sidebar configuration..."
node scripts/generate-sidebar.js

echo ""
echo "Documentation build complete!"
echo "  Markdown: generated-md/"
echo "  MDX: generated-mdx/"
