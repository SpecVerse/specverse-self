import { useMemo, useState, useEffect } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * ManifestDetailView
 * Detail view for Manifest
 *
 * Model: Manifest
 * Type: detail
 */
function ManifestDetailView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch all entities
  const { manifests, isLoading: isLoadingManifest } = useManifest({ list: true });
  const { instancefactorys, isLoading: isLoadingInstanceFactory } = useInstanceFactory({ list: true });
  const { capabilitymappings, isLoading: isLoadingCapabilityMapping } = useCapabilityMapping({ list: true });
  
  // Track selected entity ID
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  
  // Build model data from fetched entities
  // Wrap entities in expected format: { id, data: {...} }
  const modelData = useMemo(() => ({
    Manifest: (manifests || []).map((item: any) => ({ id: item.id, data: item })),
    InstanceFactory: (instancefactorys || []).map((item: any) => ({ id: item.id, data: item })),
    CapabilityMapping: (capabilitymappings || []).map((item: any) => ({ id: item.id, data: item }))
  }), [manifests, instancefactorys, capabilitymappings]);
  
  // Entity selection
  const entities = manifests || [];
  useEffect(() => {
    if (entities.length > 0 && !selectedEntityId) {
      setSelectedEntityId(entities[0].id);
    }
  }, [entities, selectedEntityId]);
  
  // Find selected entity in wrapped modelData
  const selectedEntity = useMemo(
    () => modelData.Manifest?.find((e: any) => e.id === selectedEntityId) || null,
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
  
  if (isLoadingManifest || isLoadingInstanceFactory || isLoadingCapabilityMapping) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'detail', model: 'Manifest' });
  
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
    viewSpec: { type: 'detail', model: ["Manifest","InstanceFactory","CapabilityMapping"], name: 'ManifestDetailView' },
    modelData,
    modelSchemas,
    primaryModel: 'Manifest',
    selectedEntity,
    primaryEntities: modelData.Manifest,
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

export default ManifestDetailView;
