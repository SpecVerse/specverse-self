import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

/**
 * CodeTemplateDetailView
 * Detail view for CodeTemplate
 */
function CodeTemplateDetailView() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/codeTemplates/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setItem(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!id) return <div className="p-6 text-gray-500">Select a codeTemplate from the list to view details.</div>;
  if (!item) return <div className="p-6 text-red-600">CodeTemplate not found.</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{item.name || item.title || 'CodeTemplate ' + item.id}</h1>
        <div className="space-x-2">
          <Link to={`/codeTemplateform?id=${item.id}`} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Edit</Link>
          <Link to="/codeTemplatelist" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Back</Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">ID</dt>
            <dd className="mt-1 text-sm text-gray-900">{item.id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">name</dt>
            <dd className="mt-1 text-sm text-gray-900">{String(item.name ?? '—')}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">templateType</dt>
            <dd className="mt-1 text-sm text-gray-900">{String(item.templateType ?? '—')}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">technology</dt>
            <dd className="mt-1 text-sm text-gray-900">{String(item.technology ?? '—')}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">basePath</dt>
            <dd className="mt-1 text-sm text-gray-900">{String(item.basePath ?? '—')}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default CodeTemplateDetailView;
