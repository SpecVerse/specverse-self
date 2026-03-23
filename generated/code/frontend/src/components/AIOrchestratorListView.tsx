import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * AIOrchestratorListView
 * List view for AIOrchestrators
 *
 * Model: AIOrchestrator
 * Type: list
 */
function AIOrchestratorListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('AIOrchestratorController', 'AIOrchestrator');
  const { data: schema } = useModelSchemaQuery('AIOrchestrator');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    AIOrchestrator: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { AIOrchestrator: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'AIOrchestrator' });
  
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
    viewSpec: { type: 'list', model: 'AIOrchestrator', name: 'AIOrchestratorListView' },
    modelData,
    modelSchemas,
    primaryModel: 'AIOrchestrator',
    selectedEntity: null,
    primaryEntities: modelData.AIOrchestrator,
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

export default AIOrchestratorListView;
