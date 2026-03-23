import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * EventVersionListView
 * List view for EventVersions
 *
 * Model: EventVersion
 * Type: list
 */
function EventVersionListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('EventVersionController', 'EventVersion');
  const { data: schema } = useModelSchemaQuery('EventVersion');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    EventVersion: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { EventVersion: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'EventVersion' });
  
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
    viewSpec: { type: 'list', model: 'EventVersion', name: 'EventVersionListView' },
    modelData,
    modelSchemas,
    primaryModel: 'EventVersion',
    selectedEntity: null,
    primaryEntities: modelData.EventVersion,
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

export default EventVersionListView;
