import { useState, useEffect } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';

function Downtime() {
  const [downtimes, setDowntimes] = useState([]);
  const [machines, setMachines] = useState([]);
  const [formData, setFormData] = useState({ machine: '', reason: '', category: 'other', startTime: '' });
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      const [downtimesRes, machinesRes] = await Promise.all([
        API.get('/downtimes'),
        API.get('/machines'),
      ]);
      setDowntimes(downtimesRes.data);
      setMachines(machinesRes.data);
    } catch (err) {
      setError('Failed to load data');
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/downtimes', formData);
      setFormData({ machine: '', reason: '', category: 'other', startTime: '' });
      fetchAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log downtime');
    }
  };

  const handleResolve = async (id) => {
    try {
      await API.put(`/downtimes/${id}/resolve`);
      fetchAll();
    } catch (err) {
      setError('Failed to resolve downtime');
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>Downtime</h2>
          <p style={styles.subheading}>Log and resolve machine downtime</p>
        </div>

        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <select name="machine" value={formData.machine} onChange={handleChange} style={styles.input} required>
              <option value="">Select Machine</option>
              {machines.map((m) => (
                <option key={m._id} value={m._id}>{m.name}</option>
              ))}
            </select>

            <select name="category" value={formData.category} onChange={handleChange} style={styles.input}>
              <option value="breakdown">Breakdown</option>
              <option value="maintenance">Maintenance</option>
              <option value="changeover">Changeover</option>
              <option value="material-shortage">Material Shortage</option>
              <option value="other">Other</option>
            </select>

            <input name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} style={styles.input} required />
            <input name="startTime" type="datetime-local" value={formData.startTime} onChange={handleChange} style={styles.input} required />

            <button type="submit" style={styles.button}>+ Log Downtime</button>
          </form>
        </div>

        {error && <p style={{ color: 'var(--color-down)', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Machine</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Reason</th>
                <th style={styles.th}>Started</th>
                <th style={styles.th}>Ended</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {downtimes.map((d) => (
                <tr key={d._id}>
                  <td style={styles.td}>{d.machine?.name}</td>
                  <td style={styles.td}>{d.category}</td>
                  <td style={styles.td}>{d.reason}</td>
                  <td style={{ ...styles.td, fontSize: '12px', color: '#888' }}>
                    {new Date(d.startTime).toLocaleString()}
                  </td>
                  <td style={{ ...styles.td, fontSize: '12px', color: '#888' }}>
                    {d.endTime ? new Date(d.endTime).toLocaleString() : '—'}
                  </td>
                  <td style={styles.td}>
                    {!d.endTime && (
                      <button onClick={() => handleResolve(d._id)} style={styles.resolveBtn}>Resolve</button>
                    )}
                  </td>
                </tr>
              ))}
              {downtimes.length === 0 && (
                <tr><td colSpan="6" style={styles.emptyState}>No downtime logged yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: { padding: '32px 40px', maxWidth: '1100px' },
  headerRow: { marginBottom: '24px' },
  heading: { fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 500, marginBottom: '4px' },
  subheading: { fontFamily: 'var(--font-body)', fontSize: '13px', color: '#777' },
  card: {
    background: 'white', border: '0.5px solid var(--color-border)', borderRadius: '10px',
    padding: '16px', marginBottom: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
  },
  form: { display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' },
  input: {
    padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '6px',
    fontFamily: 'var(--font-body)', fontSize: '13px', flex: '1', minWidth: '150px'
  },
  button: {
    background: 'var(--color-primary)', color: 'white', border: 'none',
    borderRadius: '6px', padding: '9px 18px', cursor: 'pointer',
    fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 500
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500,
    color: '#888', textTransform: 'uppercase', letterSpacing: '0.3px',
    padding: '10px 12px', borderBottom: '1px solid var(--color-border)'
  },
  td: {
    padding: '12px', fontFamily: 'var(--font-body)', fontSize: '13.5px',
    borderBottom: '1px solid #F0F0EE'
  },
  resolveBtn: {
    background: 'transparent', border: '1px solid var(--color-running)', color: 'var(--color-running)',
    borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', fontSize: '12px'
  },
  emptyState: { padding: '24px 12px', textAlign: 'center', color: '#999', fontSize: '13px' }
};

export default Downtime;