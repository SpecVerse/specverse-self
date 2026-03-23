import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * RelationshipListView
 * List view for Relationships
 *
 * Model: Relationship
 * Type: list
 */
function RelationshipListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('RelationshipController', 'Relationship');
  const { data: schema } = useModelSchemaQuery('Relationship');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Relationship: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Relationship: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Relationship' });
  
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
    viewSpec: { type: 'list', model: 'Relationship', name: 'RelationshipListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Relationship',
    selectedEntity: null,
    primaryEntities: modelData.Relationship,
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

export default RelationshipListView;
