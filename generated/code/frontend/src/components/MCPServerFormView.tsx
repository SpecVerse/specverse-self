import { useNavigate, useParams } from 'react-router-dom';
import type { MCPServer } from '../types/MCPServer';
import { useMCPServer } from '../hooks/useMCPServer';
import { MCPServerForm } from './forms/MCPServerForm';

/**
 * MCPServerFormView
 * Form view for creating and editing MCPServer
 *
 * Model: MCPServer
 * Type: form
 */
function MCPServerFormView() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Fetch single mcpserver if selected
  const { mcpserver, create, update, delete: deleteMCPServer, validate, isDeleting, isValidating } = useMCPServer(
    selectedId ? { id: selectedId } : {}
  );
  
  // Fetch all mcpservers for the list
  const { mcpservers, isLoading: listLoading } = useMCPServer({ list: true });
  
  const handleSubmit = async (data: any) => {
    try {
      if (selectedId) {
        await update({ id: selectedId, data });
      } else {
        await create(data);
      }
      setSelectedId(null); // Clear selection after save
    } catch (error) {
      console.error('Error saving mcpserver:', error);
    }
  };
  
  const handleValidate = async (data: any) => {
    try {
      const result = await validate(data);
      alert('Validation successful: ' + JSON.stringify(result, null, 2));
    } catch (error: any) {
      alert('Validation failed: ' + (error.message || JSON.stringify(error)));
    }
  };
  
  const handleDelete = async () => {
    if (!selectedId) return;
    if (!confirm('Are you sure you want to delete this mcpserver?')) return;
  
    try {
      await deleteMCPServer(selectedId);
      setSelectedId(null); // Clear selection after delete
    } catch (error) {
      console.error('Error deleting mcpserver:', error);
      alert('Failed to delete mcpserver');
    }
  };
  
  const handleSelectMCPServer = (id: string) => {
    setSelectedId(id);
  };
  
  const handleCancel = () => {
    setSelectedId(null);
  };
  
  return (
    <div className="view-mcpserverformview min-h-screen bg-slate-900 text-gray-200">
      {/* Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* CURVED Form Section */}
        <div className="curved-form-section bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-1">
            {selectedId ? 'Edit MCPServer' : 'Create MCPServer'}
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Form view for creating and editing MCPServer
          </p>
          <MCPServerForm
            mcpserver={mcpserver}
            onSubmit={handleSubmit}
            onValidate={handleValidate}
            onDelete={selectedId ? handleDelete : undefined}
            onCancel={handleCancel}
            isDeleting={isDeleting}
            isValidating={isValidating}
          />
        </div>
  
        {/* CURVED List Section */}
        <div className="curved-list-section bg-slate-800 rounded-lg border border-slate-700 p-6">
          {listLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-gray-400">Loading mcpservers...</p>
              </div>
            </div>
          ) : mcpservers?.length === 0 ? (
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center">
              <p className="text-gray-400 mb-1">No mcpservers yet</p>
              <p className="text-sm text-gray-500">Create your first mcpserver using the form above</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    {/* Table headers will be dynamically generated based on model attributes */}
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mcpservers?.map((mcpserver: MCPServer) => (
                    <tr
                      key={mcpserver.id}
                      className={`border-b border-slate-700 transition-colors ${
                        selectedId === mcpserver.id ? 'bg-slate-700/50' : 'hover:bg-slate-700/30'
                      }`}
                    >
                      {/* Table cells will be dynamically generated based on model attributes */}
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleSelectMCPServer(mcpserver.id)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MCPServerFormView;
