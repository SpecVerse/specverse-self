import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * DiagramPluginListView
 * List view for DiagramPlugins
 *
 * Model: DiagramPlugin
 * Type: list
 */
function DiagramPluginListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('DiagramPluginController', 'DiagramPlugin');
  const { data: schema } = useModelSchemaQuery('DiagramPlugin');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    DiagramPlugin: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { DiagramPlugin: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'DiagramPlugin' });
  
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
    viewSpec: { type: 'list', model: 'DiagramPlugin', name: 'DiagramPluginListView' },
    modelData,
    modelSchemas,
    primaryModel: 'DiagramPlugin',
    selectedEntity: null,
    primaryEntities: modelData.DiagramPlugin,
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

export default DiagramPluginListView;
