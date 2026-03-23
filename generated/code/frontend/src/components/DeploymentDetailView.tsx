import { useMemo, useState, useEffect } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * DeploymentDetailView
 * Detail view for Deployment
 *
 * Model: Deployment
 * Type: detail
 */
function DeploymentDetailView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch all entities
  const { deployments, isLoading: isLoadingDeployment } = useDeployment({ list: true });
  const { deploymentinstances, isLoading: isLoadingDeploymentInstance } = useDeploymentInstance({ list: true });
  const { communicationchannels, isLoading: isLoadingCommunicationChannel } = useCommunicationChannel({ list: true });
  
  // Track selected entity ID
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  
  // Build model data from fetched entities
  // Wrap entities in expected format: { id, data: {...} }
  const modelData = useMemo(() => ({
    Deployment: (deployments || []).map((item: any) => ({ id: item.id, data: item })),
    DeploymentInstance: (deploymentinstances || []).map((item: any) => ({ id: item.id, data: item })),
    CommunicationChannel: (communicationchannels || []).map((item: any) => ({ id: item.id, data: item }))
  }), [deployments, deploymentinstances, communicationchannels]);
  
  // Entity selection
  const entities = deployments || [];
  useEffect(() => {
    if (entities.length > 0 && !selectedEntityId) {
      setSelectedEntityId(entities[0].id);
    }
  }, [entities, selectedEntityId]);
  
  // Find selected entity in wrapped modelData
  const selectedEntity = useMemo(
    () => modelData.Deployment?.find((e: any) => e.id === selectedEntityId) || null,
    [modelData, selectedEntityId]
  );
  
  // Note: In generated apps, we use runtime schema from the fetched data
  const modelSchemas = useMemo(() => ({}), []);
  
  // Attach event handler for entity selector (MUST be before early returns)
  useEffect(() => {
    const selector = document.getElementById('entity-selector') as HTMLSelectElement;
    if (selector) {
      const handler = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        setSelectedEntityId(target.value);
      };
      selector.addEventListener('change', handler);
      return () => selector.removeEventListener('change', handler);
    }
  }, [selectedEntityId]);
  
  if (isLoadingDeployment || isLoadingDeploymentInstance || isLoadingCommunicationChannel) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'detail', model: 'Deployment' });
  
  if (!pattern) {
    return (
      <div className="p-4 text-red-600">
        Pattern not found for detail view
      </div>
    );
  }
  
  // Build render context
  const context = {
    pattern,
    viewSpec: { type: 'detail', model: ["Deployment","DeploymentInstance","CommunicationChannel"], name: 'DeploymentDetailView' },
    modelData,
    modelSchemas,
    primaryModel: 'Deployment',
    selectedEntity,
    primaryEntities: modelData.Deployment,
    protocolMapping: REACT_PROTOCOL_MAPPING,
    tailwindAdapter: patternAdapter['tailwindAdapter']
  };
  
  // Render pattern
  let html = '';
  
  // Add entity selector if multiple entities
  if (entities.length > 1) {
    html += `
      <div class="mb-4">
        <select
          id="entity-selector"
          class="px-4 py-2 border rounded"
          value="${selectedEntityId || ''}"
        >
          ${entities.map((e: any) =>
            `<option value="${e.id}">${e.name || e.title || e.id}</option>`
          ).join('')}
        </select>
      </div>
    `;
  }
  
  html += patternAdapter.renderPattern(context);
  
  return (
    <div className="runtime-view-container p-4 h-full overflow-auto">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default DeploymentDetailView;
