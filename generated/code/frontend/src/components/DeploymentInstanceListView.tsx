import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * DeploymentInstanceListView
 * List view for DeploymentInstances
 *
 * Model: DeploymentInstance
 * Type: list
 */
function DeploymentInstanceListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('DeploymentInstanceController', 'DeploymentInstance');
  const { data: schema } = useModelSchemaQuery('DeploymentInstance');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    DeploymentInstance: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { DeploymentInstance: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'DeploymentInstance' });
  
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
    viewSpec: { type: 'list', model: 'DeploymentInstance', name: 'DeploymentInstanceListView' },
    modelData,
    modelSchemas,
    primaryModel: 'DeploymentInstance',
    selectedEntity: null,
    primaryEntities: modelData.DeploymentInstance,
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

export default DeploymentInstanceListView;
