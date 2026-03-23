import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * OperationListView
 * List view for Operations
 *
 * Model: Operation
 * Type: list
 */
function OperationListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('OperationController', 'Operation');
  const { data: schema } = useModelSchemaQuery('Operation');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Operation: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Operation: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Operation' });
  
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
    viewSpec: { type: 'list', model: 'Operation', name: 'OperationListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Operation',
    selectedEntity: null,
    primaryEntities: modelData.Operation,
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

export default OperationListView;
