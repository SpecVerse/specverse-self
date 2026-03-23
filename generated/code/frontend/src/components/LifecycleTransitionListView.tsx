import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * LifecycleTransitionListView
 * List view for LifecycleTransitions
 *
 * Model: LifecycleTransition
 * Type: list
 */
function LifecycleTransitionListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('LifecycleTransitionController', 'LifecycleTransition');
  const { data: schema } = useModelSchemaQuery('LifecycleTransition');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    LifecycleTransition: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { LifecycleTransition: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'LifecycleTransition' });
  
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
    viewSpec: { type: 'list', model: 'LifecycleTransition', name: 'LifecycleTransitionListView' },
    modelData,
    modelSchemas,
    primaryModel: 'LifecycleTransition',
    selectedEntity: null,
    primaryEntities: modelData.LifecycleTransition,
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

export default LifecycleTransitionListView;
