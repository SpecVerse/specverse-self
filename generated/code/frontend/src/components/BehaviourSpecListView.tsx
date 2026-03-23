import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * BehaviourSpecListView
 * List view for BehaviourSpecs
 *
 * Model: BehaviourSpec
 * Type: list
 */
function BehaviourSpecListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('BehaviourSpecController', 'BehaviourSpec');
  const { data: schema } = useModelSchemaQuery('BehaviourSpec');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    BehaviourSpec: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { BehaviourSpec: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'BehaviourSpec' });
  
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
    viewSpec: { type: 'list', model: 'BehaviourSpec', name: 'BehaviourSpecListView' },
    modelData,
    modelSchemas,
    primaryModel: 'BehaviourSpec',
    selectedEntity: null,
    primaryEntities: modelData.BehaviourSpec,
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

export default BehaviourSpecListView;
