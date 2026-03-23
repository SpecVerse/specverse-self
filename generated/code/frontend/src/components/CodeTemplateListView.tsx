import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * CodeTemplateListView
 * List view for CodeTemplates
 *
 * Model: CodeTemplate
 * Type: list
 */
function CodeTemplateListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('CodeTemplateController', 'CodeTemplate');
  const { data: schema } = useModelSchemaQuery('CodeTemplate');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    CodeTemplate: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { CodeTemplate: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'CodeTemplate' });
  
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
    viewSpec: { type: 'list', model: 'CodeTemplate', name: 'CodeTemplateListView' },
    modelData,
    modelSchemas,
    primaryModel: 'CodeTemplate',
    selectedEntity: null,
    primaryEntities: modelData.CodeTemplate,
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

export default CodeTemplateListView;
