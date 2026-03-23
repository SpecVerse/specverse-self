import { useMemo, useState, useEffect } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * ModelDetailView
 * Detail view for Model
 *
 * Model: Model
 * Type: detail
 */
function ModelDetailView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch all entities
  const { models, isLoading: isLoadingModel } = useModel({ list: true });
  const { attributes, isLoading: isLoadingAttribute } = useAttribute({ list: true });
  const { relationships, isLoading: isLoadingRelationship } = useRelationship({ list: true });
  const { lifecycles, isLoading: isLoadingLifecycle } = useLifecycle({ list: true });
  const { operations, isLoading: isLoadingOperation } = useOperation({ list: true });
  const { profiles, isLoading: isLoadingProfile } = useProfile({ list: true });
  const { controllers, isLoading: isLoadingController } = useController({ list: true });
  const { services, isLoading: isLoadingService } = useService({ list: true });
  
  // Track selected entity ID
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  
  // Build model data from fetched entities
  // Wrap entities in expected format: { id, data: {...} }
  const modelData = useMemo(() => ({
    Model: (models || []).map((item: any) => ({ id: item.id, data: item })),
    Attribute: (attributes || []).map((item: any) => ({ id: item.id, data: item })),
    Relationship: (relationships || []).map((item: any) => ({ id: item.id, data: item })),
    Lifecycle: (lifecycles || []).map((item: any) => ({ id: item.id, data: item })),
    Operation: (operations || []).map((item: any) => ({ id: item.id, data: item })),
    Profile: (profiles || []).map((item: any) => ({ id: item.id, data: item })),
    Controller: (controllers || []).map((item: any) => ({ id: item.id, data: item })),
    Service: (services || []).map((item: any) => ({ id: item.id, data: item }))
  }), [models, attributes, relationships, lifecycles, operations, profiles, controllers, services]);
  
  // Entity selection
  const entities = models || [];
  useEffect(() => {
    if (entities.length > 0 && !selectedEntityId) {
      setSelectedEntityId(entities[0].id);
    }
  }, [entities, selectedEntityId]);
  
  // Find selected entity in wrapped modelData
  const selectedEntity = useMemo(
    () => modelData.Model?.find((e: any) => e.id === selectedEntityId) || null,
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
  
  if (isLoadingModel || isLoadingAttribute || isLoadingRelationship || isLoadingLifecycle || isLoadingOperation || isLoadingProfile || isLoadingController || isLoadingService) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'detail', model: 'Model' });
  
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
    viewSpec: { type: 'detail', model: ["Model","Attribute","Relationship","Lifecycle","Operation","Profile","Controller","Service"], name: 'ModelDetailView' },
    modelData,
    modelSchemas,
    primaryModel: 'Model',
    selectedEntity,
    primaryEntities: modelData.Model,
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

export default ModelDetailView;
