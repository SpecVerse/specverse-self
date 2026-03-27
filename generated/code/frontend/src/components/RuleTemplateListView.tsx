import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * RuleTemplateListView
 * List view for RuleTemplates
 */
function formatCell(value: any): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}

function RuleTemplateListView() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ruleTemplates')
      .then(r => r.json())
      .then(data => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">RuleTemplates</h1>
        <Link to="/ruleTemplateform" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + New RuleTemplate
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No ruleTemplates yet</p>
          <p className="text-sm mt-1">Create your first ruleTemplate to get started</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">templateType</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">content</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">InferenceRule</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{formatCell(item.templateType)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{formatCell(item.content)}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    {item.rule ? (
                      <Link to={`/inferenceRuledetail?id=${item.rule.id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                        {item.rule.name || item.rule.title || item.rule.guestName || item.rule.id}
                      </Link>
                    ) : '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/ruleTemplatedetail?id=${item.id}`} className="text-blue-600 hover:text-blue-800 mr-3">View</Link>
                    <Link to={`/ruleTemplateform?id=${item.id}`} className="text-green-600 hover:text-green-800">Edit</Link>
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

export default RuleTemplateListView;
