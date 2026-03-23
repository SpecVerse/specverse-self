import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * ManifestListView
 * List view for Manifests
 *
 * Model: Manifest
 * Type: list
 */
function ManifestListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('ManifestController', 'Manifest');
  const { data: schema } = useModelSchemaQuery('Manifest');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Manifest: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Manifest: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Manifest' });
  
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
    viewSpec: { type: 'list', model: 'Manifest', name: 'ManifestListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Manifest',
    selectedEntity: null,
    primaryEntities: modelData.Manifest,
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

export default ManifestListView;
