import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * LayoutListView
 * List view for Layouts
 *
 * Model: Layout
 * Type: list
 */
function LayoutListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('LayoutController', 'Layout');
  const { data: schema } = useModelSchemaQuery('Layout');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Layout: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Layout: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Layout' });
  
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
    viewSpec: { type: 'list', model: 'Layout', name: 'LayoutListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Layout',
    selectedEntity: null,
    primaryEntities: modelData.Layout,
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

export default LayoutListView;
