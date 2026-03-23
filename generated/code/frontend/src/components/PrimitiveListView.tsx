import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * PrimitiveListView
 * List view for Primitives
 *
 * Model: Primitive
 * Type: list
 */
function PrimitiveListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('PrimitiveController', 'Primitive');
  const { data: schema } = useModelSchemaQuery('Primitive');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Primitive: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Primitive: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Primitive' });
  
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
    viewSpec: { type: 'list', model: 'Primitive', name: 'PrimitiveListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Primitive',
    selectedEntity: null,
    primaryEntities: modelData.Primitive,
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

export default PrimitiveListView;
