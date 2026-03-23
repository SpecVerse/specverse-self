import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * MCPToolListView
 * List view for MCPTools
 *
 * Model: MCPTool
 * Type: list
 */
function MCPToolListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('MCPToolController', 'MCPTool');
  const { data: schema } = useModelSchemaQuery('MCPTool');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    MCPTool: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { MCPTool: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'MCPTool' });
  
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
    viewSpec: { type: 'list', model: 'MCPTool', name: 'MCPToolListView' },
    modelData,
    modelSchemas,
    primaryModel: 'MCPTool',
    selectedEntity: null,
    primaryEntities: modelData.MCPTool,
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

export default MCPToolListView;
