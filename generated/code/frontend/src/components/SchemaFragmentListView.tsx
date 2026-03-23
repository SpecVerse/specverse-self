import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * SchemaFragmentListView
 * List view for SchemaFragments
 *
 * Model: SchemaFragment
 * Type: list
 */
function SchemaFragmentListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('SchemaFragmentController', 'SchemaFragment');
  const { data: schema } = useModelSchemaQuery('SchemaFragment');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    SchemaFragment: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { SchemaFragment: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'SchemaFragment' });
  
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
    viewSpec: { type: 'list', model: 'SchemaFragment', name: 'SchemaFragmentListView' },
    modelData,
    modelSchemas,
    primaryModel: 'SchemaFragment',
    selectedEntity: null,
    primaryEntities: modelData.SchemaFragment,
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

export default SchemaFragmentListView;
