import { useMemo } from 'react';
import { usePatternAdapter, REACT_PROTOCOL_MAPPING } from '../lib/react-pattern-adapter';
import { useEntitiesQuery, useModelSchemaQuery } from '../hooks/useApi';

/**
 * ProfileListView
 * List view for Profiles
 *
 * Model: Profile
 * Type: list
 */
function ProfileListView() {
  const patternAdapter = usePatternAdapter();
  
  // Fetch data using generic hooks
  const { data: entities = [], isLoading } = useEntitiesQuery('ProfileController', 'Profile');
  const { data: schema } = useModelSchemaQuery('Profile');
  
  // Build model data and schemas
  const modelData = useMemo(() => ({
    Profile: entities
  }), [entities]);
  
  const modelSchemas = useMemo(() =>
    schema ? { Profile: schema } : {}
  , [schema]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  // Detect pattern
  const pattern = patternAdapter.detectPattern({ type: 'list', model: 'Profile' });
  
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
    viewSpec: { type: 'list', model: 'Profile', name: 'ProfileListView' },
    modelData,
    modelSchemas,
    primaryModel: 'Profile',
    selectedEntity: null,
    primaryEntities: modelData.Profile,
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

export default ProfileListView;
