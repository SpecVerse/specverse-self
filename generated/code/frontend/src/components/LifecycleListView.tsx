import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * LifecycleListView
 * List view for Lifecycles
 *
 * Model: Lifecycle
 * Type: list
 */
function LifecycleListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('LifecycleController', 'Lifecycle');
  const { data: schema } = useModelSchemaQuery('Lifecycle');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Lifecycle: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Lifecycle: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Lifecycle' });
  
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
    viewSpec: { type: 'list', model: 'Lifecycle', name: 'LifecycleListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Lifecycle',
    selectedEntity: null,
    primaryEntities: modelData.Lifecycle,
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

export default LifecycleListView;
