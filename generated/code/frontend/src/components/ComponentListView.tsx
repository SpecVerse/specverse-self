import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * ComponentListView
 * List view for Components
 *
 * Model: Component
 * Type: list
 */
function ComponentListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('ComponentController', 'Component');
  const { data: schema } = useModelSchemaQuery('Component');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Component: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Component: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Component' });
  
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
    viewSpec: { type: 'list', model: 'Component', name: 'ComponentListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Component',
    selectedEntity: null,
    primaryEntities: modelData.Component,
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

export default ComponentListView;
