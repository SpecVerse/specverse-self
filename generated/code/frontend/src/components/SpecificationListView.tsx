import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * SpecificationListView
 * List view for Specifications
 *
 * Model: Specification
 * Type: list
 */
function SpecificationListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('SpecificationController', 'Specification');
  const { data: schema } = useModelSchemaQuery('Specification');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Specification: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Specification: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Specification' });
  
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
    viewSpec: { type: 'list', model: 'Specification', name: 'SpecificationListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Specification',
    selectedEntity: null,
    primaryEntities: modelData.Specification,
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

export default SpecificationListView;
