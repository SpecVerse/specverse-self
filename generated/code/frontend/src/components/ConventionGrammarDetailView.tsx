import { useMemo, useState, useEffect } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * ConventionGrammarDetailView
 * Detail view for ConventionGrammar
 *
 * Model: ConventionGrammar
 * Type: detail
 */
function ConventionGrammarDetailView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch all entities
  const { conventiongrammars, isLoading: isLoadingConventionGrammar } = useConventionGrammar({ list: true });
  const { conventionpatterns, isLoading: isLoadingConventionPattern } = useConventionPattern({ list: true });
  
  // Track selected entity ID
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  
  // Build model data from fetched entities
  // Wrap entities in expected format: { id, data: {...} }
  const modelData = useMemo(() => ({
    ConventionGrammar: (conventiongrammars || []).map((item: any) => ({ id: item.id, data: item })),
    ConventionPattern: (conventionpatterns || []).map((item: any) => ({ id: item.id, data: item }))
  }), [conventiongrammars, conventionpatterns]);
  
  // Entity selection
  const entities = conventiongrammars || [];
  useEffect(() => {
    if (entities.length > 0 && !selectedEntityId) {
      setSelectedEntityId(entities[0].id);
    }
  }, [entities, selectedEntityId]);
  
  // Find selected entity in wrapped modelData
  const selectedEntity = useMemo(
    () => modelData.ConventionGrammar?.find((e: any) => e.id === selectedEntityId) || null,
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
  
  if (isLoadingConventionGrammar || isLoadingConventionPattern) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'detail', model: 'ConventionGrammar' });
  
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
    viewSpec: { type: 'detail', model: ["ConventionGrammar","ConventionPattern"], name: 'ConventionGrammarDetailView' },
    modelData,
    modelSchemas,
    primaryModel: 'ConventionGrammar',
    selectedEntity,
    primaryEntities: modelData.ConventionGrammar,
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

export default ConventionGrammarDetailView;
