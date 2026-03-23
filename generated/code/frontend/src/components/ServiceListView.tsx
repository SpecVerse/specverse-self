import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * ServiceListView
 * List view for Services
 *
 * Model: Service
 * Type: list
 */
function ServiceListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('ServiceController', 'Service');
  const { data: schema } = useModelSchemaQuery('Service');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Service: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Service: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Service' });
  
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
    viewSpec: { type: 'list', model: 'Service', name: 'ServiceListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Service',
    selectedEntity: null,
    primaryEntities: modelData.Service,
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

export default ServiceListView;
