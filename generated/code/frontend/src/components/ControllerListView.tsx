import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * ControllerListView
 * List view for Controllers
 *
 * Model: Controller
 * Type: list
 */
function ControllerListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('ControllerController', 'Controller');
  const { data: schema } = useModelSchemaQuery('Controller');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Controller: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Controller: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Controller' });
  
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
    viewSpec: { type: 'list', model: 'Controller', name: 'ControllerListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Controller',
    selectedEntity: null,
    primaryEntities: modelData.Controller,
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

export default ControllerListView;
