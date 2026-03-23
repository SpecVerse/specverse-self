import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * CapabilityMappingListView
 * List view for CapabilityMappings
 *
 * Model: CapabilityMapping
 * Type: list
 */
function CapabilityMappingListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('CapabilityMappingController', 'CapabilityMapping');
  const { data: schema } = useModelSchemaQuery('CapabilityMapping');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    CapabilityMapping: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { CapabilityMapping: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'CapabilityMapping' });
  
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
    viewSpec: { type: 'list', model: 'CapabilityMapping', name: 'CapabilityMappingListView' },
    modelData,
    modelSchemas,
    primaryModel: 'CapabilityMapping',
    selectedEntity: null,
    primaryEntities: modelData.CapabilityMapping,
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

export default CapabilityMappingListView;
