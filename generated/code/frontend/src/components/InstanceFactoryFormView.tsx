import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * InstanceFactoryFormView
 * Form view for creating and editing InstanceFactory
 */
function InstanceFactoryFormView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manifestOptions, setManifestOptions] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/instanceFactorys/${id}`)
      .then(r => r.json())
      .then(data => { setForm(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetch('/api/manifests').then(r => r.json()).then(d => setManifestOptions(d)).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      // Convert datetime-local values to full ISO-8601 for Prisma
      const submitData = { ...form };
      for (const [key, val] of Object.entries(submitData)) {
        if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(val)) {
          submitData[key] = new Date(val).toISOString();
        }
      }
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/api/instanceFactorys/${id}` : '/api/instanceFactorys';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submitData) });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || 'Save failed'); }
      navigate('/instanceFactorylist');
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!id || !confirm('Delete this instanceFactory?')) return;
    await fetch(`/api/instanceFactorys/${id}`, { method: 'DELETE' });
    navigate('/instanceFactorylist');
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit' : 'New'} InstanceFactory</h1>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Manifest</label>
          <select
            value={form.manifestId ?? ''}
            onChange={e => setForm({...form, manifestId: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Manifest...</option>
            {manifestOptions.map((opt: any) => (
              <option key={opt.id} value={opt.id}>{opt.name || opt.title || opt.guestName || opt.id}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">name</label>
          <input
            type="text"
            value={form.name ?? ''}
            onChange={e => setForm({...form, name: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">version</label>
          <input
            type="text"
            value={form.version ?? ''}
            onChange={e => setForm({...form, version: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">category</label>
          <input
            type="text"
            value={form.category ?? ''}
            onChange={e => setForm({...form, category: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">technology</label>
          <input
            type="text"
            value={form.technology ?? ''}
            onChange={e => setForm({...form, technology: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            
          />
        </div>

        <div className="flex justify-between pt-4">
          <div>
            {id && <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>}
          </div>
          <div className="space-x-2">
            <button type="button" onClick={() => navigate('/instanceFactorylist')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
              {saving ? 'Saving...' : id ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InstanceFactoryFormView;
