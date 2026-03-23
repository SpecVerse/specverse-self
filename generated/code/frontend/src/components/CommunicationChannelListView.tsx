import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * CommunicationChannelListView
 * List view for CommunicationChannels
 *
 * Model: CommunicationChannel
 * Type: list
 */
function CommunicationChannelListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('CommunicationChannelController', 'CommunicationChannel');
  const { data: schema } = useModelSchemaQuery('CommunicationChannel');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    CommunicationChannel: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { CommunicationChannel: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'CommunicationChannel' });
  
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
    viewSpec: { type: 'list', model: 'CommunicationChannel', name: 'CommunicationChannelListView' },
    modelData,
    modelSchemas,
    primaryModel: 'CommunicationChannel',
    selectedEntity: null,
    primaryEntities: modelData.CommunicationChannel,
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

export default CommunicationChannelListView;
