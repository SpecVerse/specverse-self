import { useMemo, useState, useEffect } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * ComponentDetailView
 * Detail view for Component
 *
 * Model: Component
 * Type: detail
 */
function ComponentDetailView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch all entities
  const { components, isLoading: isLoadingComponent } = useComponent({ list: true });
  const { imports, isLoading: isLoadingImport } = useImport({ list: true });
  const { exports, isLoading: isLoadingExport } = useExport({ list: true });
  const { models, isLoading: isLoadingModel } = useModel({ list: true });
  const { controllers, isLoading: isLoadingController } = useController({ list: true });
  const { services, isLoading: isLoadingService } = useService({ list: true });
  const { events, isLoading: isLoadingEvent } = useEvent({ list: true });
  const { views, isLoading: isLoadingView } = useView({ list: true });
  
  // Track selected entity ID
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  
  // Build model data from fetched entities
  // Wrap entities in expected format: { id, data: {...} }
  const modelData = useMemo(() => ({
    Component: (components || []).map((item: any) => ({ id: item.id, data: item })),
    Import: (imports || []).map((item: any) => ({ id: item.id, data: item })),
    Export: (exports || []).map((item: any) => ({ id: item.id, data: item })),
    Model: (models || []).map((item: any) => ({ id: item.id, data: item })),
    Controller: (controllers || []).map((item: any) => ({ id: item.id, data: item })),
    Service: (services || []).map((item: any) => ({ id: item.id, data: item })),
    Event: (events || []).map((item: any) => ({ id: item.id, data: item })),
    View: (views || []).map((item: any) => ({ id: item.id, data: item }))
  }), [components, imports, exports, models, controllers, services, events, views]);
  
  // Entity selection
  const entities = components || [];
  useEffect(() => {
    if (entities.length > 0 && !selectedEntityId) {
      setSelectedEntityId(entities[0].id);
    }
  }, [entities, selectedEntityId]);
  
  // Find selected entity in wrapped modelData
  const selectedEntity = useMemo(
    () => modelData.Component?.find((e: any) => e.id === selectedEntityId) || null,
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
  
  if (isLoadingComponent || isLoadingImport || isLoadingExport || isLoadingModel || isLoadingController || isLoadingService || isLoadingEvent || isLoadingView) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'detail', model: 'Component' });
  
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
    viewSpec: { type: 'detail', model: ["Component","Import","Export","Model","Controller","Service","Event","View"], name: 'ComponentDetailView' },
    modelData,
    modelSchemas,
    primaryModel: 'Component',
    selectedEntity,
    primaryEntities: modelData.Component,
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

export default ComponentDetailView;
