import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * MCPResourceListView
 * List view for MCPResources
 *
 * Model: MCPResource
 * Type: list
 */
function MCPResourceListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('MCPResourceController', 'MCPResource');
  const { data: schema } = useModelSchemaQuery('MCPResource');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    MCPResource: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { MCPResource: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'MCPResource' });
  
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
    viewSpec: { type: 'list', model: 'MCPResource', name: 'MCPResourceListView' },
    modelData,
    modelSchemas,
    primaryModel: 'MCPResource',
    selectedEntity: null,
    primaryEntities: modelData.MCPResource,
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

export default MCPResourceListView;
