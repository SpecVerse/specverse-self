import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

/**
 * InvariantDetailView
 * Detail view for Invariant
 */
function InvariantDetailView() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/invariants/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setItem(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!id) return <div className="p-6 text-gray-500">Select a invariant from the list to view details.</div>;
  if (!item) return <div className="p-6 text-red-600">Invariant not found.</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{item.name || item.title || 'Invariant ' + item.id}</h1>
        <div className="space-x-2">
          <Link to={`/invariantform?id=${item.id}`} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Edit</Link>
          <Link to="/invariantlist" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Back</Link>
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
            <dt className="text-sm font-medium text-gray-500">description</dt>
            <dd className="mt-1 text-sm text-gray-900">{String(item.description ?? '—')}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">quintExpression</dt>
            <dd className="mt-1 text-sm text-gray-900">{String(item.quintExpression ?? '—')}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">category</dt>
            <dd className="mt-1 text-sm text-gray-900">{String(item.category ?? '—')}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default InvariantDetailView;
