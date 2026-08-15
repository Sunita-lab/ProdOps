import { useState, useEffect } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [counts, setCounts] = useState({ products: 0, machines: 0, lines: 0, shifts: 0 });
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState('');

  const fetchSummary = async () => {
    try {
      const [productsRes, machinesRes, linesRes, shiftsRes] = await Promise.all([
        API.get('/products'),
        API.get('/machines'),
        API.get('/lines'),
        API.get('/shifts'),
      ]);
      setCounts({
        products: productsRes.data.length,
        machines: machinesRes.data.length,
        lines: linesRes.data.length,
        shifts: shiftsRes.data.length,
      });
      setMachines(machinesRes.data);
    } catch (err) {
      setError('Failed to load dashboard data');
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const statusColor = (status) => {
    if (status === 'running') return 'var(--color-running)';
    if (status === 'down') return 'var(--color-down)';
    return 'var(--color-idle)';
  };

  const cards = [
    { label: 'Products', value: counts.products },
    { label: 'Machines', value: counts.machines },
    { label: 'Lines', value: counts.lines },
    { label: 'Shifts', value: counts.shifts },
  ];

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>Welcome, {user?.name}</h2>
          <p style={styles.subheading}>Here's what's happening on the floor today</p>
        </div>

        {error && <p style={{ color: 'var(--color-down)', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        <div style={styles.cardGrid}>
          {cards.map((c) => (
            <div key={c.label} style={styles.statCard}>
              <div style={styles.statValue}>{c.value}</div>
              <div style={styles.statLabel}>{c.label}</div>
            </div>
          ))}
        </div>

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
  headerRow: { marginBottom: '24px' },
  heading: { fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 500, marginBottom: '4px' },
  subheading: { fontFamily: 'var(--font-body)', fontSize: '13px', color: '#777' },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '14px',
    marginBottom: '24px'
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
    fontSize: '28px',
    fontWeight: 500,
    color: 'var(--color-primary)'
  },
  statLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    marginTop: '4px'
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