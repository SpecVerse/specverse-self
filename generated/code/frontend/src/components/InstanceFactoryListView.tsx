import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * InstanceFactoryListView
 * List view for InstanceFactorys
 *
 * Model: InstanceFactory
 * Type: list
 */
function InstanceFactoryListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('InstanceFactoryController', 'InstanceFactory');
  const { data: schema } = useModelSchemaQuery('InstanceFactory');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    InstanceFactory: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { InstanceFactory: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'InstanceFactory' });
  
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
    viewSpec: { type: 'list', model: 'InstanceFactory', name: 'InstanceFactoryListView' },
    modelData,
    modelSchemas,
    primaryModel: 'InstanceFactory',
    selectedEntity: null,
    primaryEntities: modelData.InstanceFactory,
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

export default InstanceFactoryListView;
