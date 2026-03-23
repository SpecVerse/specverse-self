import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * DeploymentListView
 * List view for Deployments
 *
 * Model: Deployment
 * Type: list
 */
function DeploymentListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('DeploymentController', 'Deployment');
  const { data: schema } = useModelSchemaQuery('Deployment');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Deployment: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Deployment: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Deployment' });
  
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
    viewSpec: { type: 'list', model: 'Deployment', name: 'DeploymentListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Deployment',
    selectedEntity: null,
    primaryEntities: modelData.Deployment,
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

export default DeploymentListView;
