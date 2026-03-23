import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * InferenceRuleListView
 * List view for InferenceRules
 *
 * Model: InferenceRule
 * Type: list
 */
function InferenceRuleListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('InferenceRuleController', 'InferenceRule');
  const { data: schema } = useModelSchemaQuery('InferenceRule');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    InferenceRule: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { InferenceRule: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'InferenceRule' });
  
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
    viewSpec: { type: 'list', model: 'InferenceRule', name: 'InferenceRuleListView' },
    modelData,
    modelSchemas,
    primaryModel: 'InferenceRule',
    selectedEntity: null,
    primaryEntities: modelData.InferenceRule,
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

export default InferenceRuleListView;
