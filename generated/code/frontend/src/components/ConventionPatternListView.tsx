import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * ConventionPatternListView
 * List view for ConventionPatterns
 *
 * Model: ConventionPattern
 * Type: list
 */
function ConventionPatternListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('ConventionPatternController', 'ConventionPattern');
  const { data: schema } = useModelSchemaQuery('ConventionPattern');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    ConventionPattern: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { ConventionPattern: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'ConventionPattern' });
  
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
    viewSpec: { type: 'list', model: 'ConventionPattern', name: 'ConventionPatternListView' },
    modelData,
    modelSchemas,
    primaryModel: 'ConventionPattern',
    selectedEntity: null,
    primaryEntities: modelData.ConventionPattern,
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

export default ConventionPatternListView;
