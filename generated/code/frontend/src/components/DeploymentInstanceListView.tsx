import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * DeploymentInstanceListView
 * List view for DeploymentInstances
 */
function formatCell(value: any): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}

function DeploymentInstanceListView() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/deploymentInstances')
      .then(r => r.json())
      .then(data => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">DeploymentInstances</h1>
        <Link to="/deploymentInstanceform" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + New DeploymentInstance
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No deploymentInstances yet</p>
          <p className="text-sm mt-1">Create your first deploymentInstance to get started</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">scale</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Deployment</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{formatCell(item.name)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{formatCell(item.category)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{formatCell(item.scale)}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    {item.deployment ? (
                      <Link to={`/deploymentdetail?id=${item.deployment.id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                        {item.deployment.name || item.deployment.title || item.deployment.guestName || item.deployment.id}
                      </Link>
                    ) : '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/deploymentInstancedetail?id=${item.id}`} className="text-blue-600 hover:text-blue-800 mr-3">View</Link>
                    <Link to={`/deploymentInstanceform?id=${item.id}`} className="text-green-600 hover:text-green-800">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DeploymentInstanceListView;
