import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * UIComponentListView
 * List view for UIComponents
 *
 * Model: UIComponent
 * Type: list
 */
function UIComponentListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('UIComponentController', 'UIComponent');
  const { data: schema } = useModelSchemaQuery('UIComponent');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    UIComponent: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { UIComponent: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'UIComponent' });
  
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
    viewSpec: { type: 'list', model: 'UIComponent', name: 'UIComponentListView' },
    modelData,
    modelSchemas,
    primaryModel: 'UIComponent',
    selectedEntity: null,
    primaryEntities: modelData.UIComponent,
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

export default UIComponentListView;
