import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * AttributeListView
 * List view for Attributes
 *
 * Model: Attribute
 * Type: list
 */
function AttributeListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('AttributeController', 'Attribute');
  const { data: schema } = useModelSchemaQuery('Attribute');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Attribute: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Attribute: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Attribute' });
  
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
    viewSpec: { type: 'list', model: 'Attribute', name: 'AttributeListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Attribute',
    selectedEntity: null,
    primaryEntities: modelData.Attribute,
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

export default AttributeListView;
