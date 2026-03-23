import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * AIWorkflowListView
 * List view for AIWorkflows
 *
 * Model: AIWorkflow
 * Type: list
 */
function AIWorkflowListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('AIWorkflowController', 'AIWorkflow');
  const { data: schema } = useModelSchemaQuery('AIWorkflow');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    AIWorkflow: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { AIWorkflow: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'AIWorkflow' });
  
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
    viewSpec: { type: 'list', model: 'AIWorkflow', name: 'AIWorkflowListView' },
    modelData,
    modelSchemas,
    primaryModel: 'AIWorkflow',
    selectedEntity: null,
    primaryEntities: modelData.AIWorkflow,
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

export default AIWorkflowListView;
