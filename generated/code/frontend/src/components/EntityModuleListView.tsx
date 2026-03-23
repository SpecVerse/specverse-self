import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * EntityModuleListView
 * List view for EntityModules
 *
 * Model: EntityModule
 * Type: list
 */
function EntityModuleListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('EntityModuleController', 'EntityModule');
  const { data: schema } = useModelSchemaQuery('EntityModule');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    EntityModule: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { EntityModule: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'EntityModule' });
  
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
    viewSpec: { type: 'list', model: 'EntityModule', name: 'EntityModuleListView' },
    modelData,
    modelSchemas,
    primaryModel: 'EntityModule',
    selectedEntity: null,
    primaryEntities: modelData.EntityModule,
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

export default EntityModuleListView;
