import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * MCPServerListView
 * List view for MCPServers
 *
 * Model: MCPServer
 * Type: list
 */
function MCPServerListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('MCPServerController', 'MCPServer');
  const { data: schema } = useModelSchemaQuery('MCPServer');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    MCPServer: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { MCPServer: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'MCPServer' });
  
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
    viewSpec: { type: 'list', model: 'MCPServer', name: 'MCPServerListView' },
    modelData,
    modelSchemas,
    primaryModel: 'MCPServer',
    selectedEntity: null,
    primaryEntities: modelData.MCPServer,
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

export default MCPServerListView;
