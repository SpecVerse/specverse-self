import { useState, useEffect } from 'react';

/**
 * SystemDashboardView
 * System-wide dashboard showing overview of all main entities
 */
function SystemDashboardView() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch counts for all models
    Promise.all([
      fetch('/api/guesthouses').then(r => r.ok ? r.json() : []).then(d => ['guesthouses', Array.isArray(d) ? d.length : 0]).catch(() => ['guesthouses', 0]),
      fetch('/api/rooms').then(r => r.ok ? r.json() : []).then(d => ['rooms', Array.isArray(d) ? d.length : 0]).catch(() => ['rooms', 0]),
      fetch('/api/guests').then(r => r.ok ? r.json() : []).then(d => ['guests', Array.isArray(d) ? d.length : 0]).catch(() => ['guests', 0]),
      fetch('/api/bookings').then(r => r.ok ? r.json() : []).then(d => ['bookings', Array.isArray(d) ? d.length : 0]).catch(() => ['bookings', 0]),
      fetch('/api/houses').then(r => r.ok ? r.json() : []).then(d => ['houses', Array.isArray(d) ? d.length : 0]).catch(() => ['houses', 0])
    ]).then(results => {
      const s: Record<string, number> = {};
      results.forEach(([name, count]) => { if (count > 0 || name === 'specifications') s[name as string] = count as number; });
      setStats(s);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(stats).map(([name, count]) => (
          <div key={name} className="bg-white shadow rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">{name}</h3>
            <p className="text-3xl font-bold mt-2">{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SystemDashboardView;
