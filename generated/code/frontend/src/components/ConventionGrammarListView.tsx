import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * ConventionGrammarListView
 * List view for ConventionGrammars
 *
 * Model: ConventionGrammar
 * Type: list
 */
function ConventionGrammarListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('ConventionGrammarController', 'ConventionGrammar');
  const { data: schema } = useModelSchemaQuery('ConventionGrammar');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    ConventionGrammar: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { ConventionGrammar: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'ConventionGrammar' });
  
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
    viewSpec: { type: 'list', model: 'ConventionGrammar', name: 'ConventionGrammarListView' },
    modelData,
    modelSchemas,
    primaryModel: 'ConventionGrammar',
    selectedEntity: null,
    primaryEntities: modelData.ConventionGrammar,
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

export default ConventionGrammarListView;
