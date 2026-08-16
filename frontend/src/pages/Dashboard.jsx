import { useState, useEffect } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [summary, setSummary] = useState(null);
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const [summaryRes, machinesRes] = await Promise.all([
        API.get('/dashboard/summary'),
        API.get('/machines'),
      ]);
      setSummary(summaryRes.data);
      setMachines(machinesRes.data);
    } catch (err) {
      setError('Failed to load dashboard data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statusColor = (status) => {
    if (status === 'running') return 'var(--color-running)';
    if (status === 'down') return 'var(--color-down)';
    return 'var(--color-idle)';
  };

  if (!summary) {
    return (
      <Layout>
        <div style={styles.container} className="page-container">
          {error ? <p style={{ color: 'var(--color-down)' }}>{error}</p> : <p style={styles.loading}>Loading dashboard...</p>}
        </div>
      </Layout>
    );
  }

  const cards = [
    { label: "Today's Output", value: summary.todayOutput, unit: 'units', highlight: true },
    { label: 'Active Orders', value: summary.activeOrders, unit: `of ${summary.totalOrders}` },
    { label: 'Machines Running', value: summary.totalMachines - summary.machinesDown, unit: `of ${summary.totalMachines}` },
    { label: 'Rejection Rate', value: `${summary.rejectionRate}%`, unit: 'all-time', warn: summary.rejectionRate > 5 },
  ];

  return (
    <Layout>
      <div style={styles.container} className="page-container">
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>Welcome, {user?.name}</h2>
          <p style={styles.subheading}>Here's what's happening on the floor today</p>
        </div>

        <div style={styles.cardGrid} className="grid-4">
          {cards.map((c) => (
            <div key={c.label} style={styles.statCard}>
              <div style={{
                ...styles.statValue,
                color: c.warn ? 'var(--color-down)' : c.highlight ? 'var(--color-primary)' : 'var(--color-text)'
              }}>
                {c.value}
              </div>
              <div style={styles.statLabel}>{c.label}</div>
              <div style={styles.statUnit}>{c.unit}</div>
            </div>
          ))}
        </div>

        {summary.activeDowntimes > 0 && (
          <div style={styles.alertBanner}>
            ⚠ {summary.activeDowntimes} machine{summary.activeDowntimes > 1 ? 's are' : ' is'} currently down — check the Downtime page
          </div>
        )}

        <div style={styles.card}>
          <h3 style={styles.sectionHeading}>Machine Status</h3>
          {machines.length === 0 ? (
            <p style={styles.emptyState}>No machines registered yet</p>
          ) : (
            <div style={styles.machineGrid}>
              {machines.map((m) => (
                <div key={m._id} style={styles.machineRow}>
                  <div>
                    <div style={styles.machineName}>{m.name}</div>
                    <div style={styles.machineCode}>{m.code} · {m.line}</div>
                  </div>
                  <span style={{ color: statusColor(m.status), fontWeight: 500, fontSize: '13px' }}>
                    ● {m.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: { padding: '32px 40px', maxWidth: '1000px' },
  loading: { fontSize: '14px', color: '#888' },
  headerRow: { marginBottom: '24px' },
  heading: { fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 500, marginBottom: '4px' },
  subheading: { fontFamily: 'var(--font-body)', fontSize: '13px', color: '#777' },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '14px',
    marginBottom: '20px'
  },
  statCard: {
    background: 'white',
    border: '0.5px solid var(--color-border)',
    borderRadius: '10px',
    padding: '18px 20px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
  },
  statValue: {
    fontFamily: 'var(--font-mono)',
    fontSize: '26px',
    fontWeight: 500
  },
  statLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    color: '#555',
    marginTop: '6px',
    fontWeight: 500
  },
  statUnit: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    color: '#999',
    marginTop: '2px'
  },
  alertBanner: {
    background: '#FBEDEA',
    border: '1px solid var(--color-down)',
    color: '#8A2E2E',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '13px',
    marginBottom: '20px'
  },
  card: {
    background: 'white',
    border: '0.5px solid var(--color-border)',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
  },
  sectionHeading: {
    fontFamily: 'var(--font-heading)',
    fontSize: '15px',
    fontWeight: 500,
    marginBottom: '14px'
  },
  machineGrid: { display: 'flex', flexDirection: 'column', gap: '2px' },
  machineRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 4px',
    borderBottom: '1px solid #F0F0EE'
  },
  machineName: { fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500 },
  machineCode: { fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#888', marginTop: '2px' },
  emptyState: { fontSize: '13px', color: '#999', padding: '12px 0' }
};

export default Dashboard;