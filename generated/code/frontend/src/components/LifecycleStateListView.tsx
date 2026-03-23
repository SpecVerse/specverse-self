import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * LifecycleStateListView
 * List view for LifecycleStates
 *
 * Model: LifecycleState
 * Type: list
 */
function LifecycleStateListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('LifecycleStateController', 'LifecycleState');
  const { data: schema } = useModelSchemaQuery('LifecycleState');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    LifecycleState: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { LifecycleState: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'LifecycleState' });
  
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
    viewSpec: { type: 'list', model: 'LifecycleState', name: 'LifecycleStateListView' },
    modelData,
    modelSchemas,
    primaryModel: 'LifecycleState',
    selectedEntity: null,
    primaryEntities: modelData.LifecycleState,
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

export default LifecycleStateListView;
