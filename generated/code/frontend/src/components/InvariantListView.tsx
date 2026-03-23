import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * InvariantListView
 * List view for Invariants
 *
 * Model: Invariant
 * Type: list
 */
function InvariantListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('InvariantController', 'Invariant');
  const { data: schema } = useModelSchemaQuery('Invariant');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Invariant: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Invariant: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Invariant' });
  
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
    viewSpec: { type: 'list', model: 'Invariant', name: 'InvariantListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Invariant',
    selectedEntity: null,
    primaryEntities: modelData.Invariant,
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

export default InvariantListView;
