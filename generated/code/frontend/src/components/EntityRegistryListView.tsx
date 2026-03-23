import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * EntityRegistryListView
 * List view for EntityRegistrys
 *
 * Model: EntityRegistry
 * Type: list
 */
function EntityRegistryListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('EntityRegistryController', 'EntityRegistry');
  const { data: schema } = useModelSchemaQuery('EntityRegistry');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    EntityRegistry: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { EntityRegistry: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'EntityRegistry' });
  
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
    viewSpec: { type: 'list', model: 'EntityRegistry', name: 'EntityRegistryListView' },
    modelData,
    modelSchemas,
    primaryModel: 'EntityRegistry',
    selectedEntity: null,
    primaryEntities: modelData.EntityRegistry,
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

export default EntityRegistryListView;
