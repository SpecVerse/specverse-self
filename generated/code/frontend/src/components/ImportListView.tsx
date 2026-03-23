import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * ImportListView
 * List view for Imports
 *
 * Model: Import
 * Type: list
 */
function ImportListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('ImportController', 'Import');
  const { data: schema } = useModelSchemaQuery('Import');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Import: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Import: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Import' });
  
  if (!pattern) {
    return (
      <div className="p-4 text-red-600">
        Pattern not found for list view
      </div>
    );
  }
  
  // Build render context
  const context = {
    pattern,
    viewSpec: { type: 'list', model: 'Import', name: 'ImportListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Import',
    selectedEntity: null,
    primaryEntities: modelData.Import,
    protocolMapping: REACT_PROTOCOL_MAPPING,
    tailwindAdapter: patternAdapter['tailwindAdapter']
  };
  
  // Render pattern
  const html = patternAdapter.renderPattern(context);
  
  return (
    <div className="runtime-view-container p-4 h-full overflow-auto">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default ImportListView;
