import { useState, useEffect } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';

function Machines() {
  const [machines, setMachines] = useState([]);
  const [formData, setFormData] = useState({ name: '', code: '', line: '', status: 'idle' });
  const [error, setError] = useState('');

  const fetchMachines = async () => {
    try {
      const res = await API.get('/machines');
      setMachines(res.data);
    } catch (err) {
      setError('Failed to load machines');
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/machines', formData);
      setFormData({ name: '', code: '', line: '', status: 'idle' });
      fetchMachines();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add machine');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/machines/${id}`);
      fetchMachines();
    } catch (err) {
      setError('Failed to delete machine');
    }
  };

  const statusColor = (status) => {
    if (status === 'running') return 'var(--color-running)';
    if (status === 'down') return 'var(--color-down)';
    return 'var(--color-idle)';
  };

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>Machines</h2>
          <p style={styles.subheading}>{machines.length} machines registered</p>
        </div>

        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input name="name" placeholder="Machine name" value={formData.name} onChange={handleChange} style={styles.input} required />
            <input name="code" placeholder="Code (e.g. MCH-001)" value={formData.code} onChange={handleChange} style={styles.input} required />
            <input name="line" placeholder="Line (e.g. Line 3)" value={formData.line} onChange={handleChange} style={styles.input} required />
            <select name="status" value={formData.status} onChange={handleChange} style={styles.input}>
              <option value="idle">Idle</option>
              <option value="running">Running</option>
              <option value="down">Down</option>
            </select>
            <button type="submit" style={styles.button}>+ Add</button>
          </form>
        </div>

        {error && <p style={{ color: 'var(--color-down)', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Code</th>
                <th style={styles.th}>Line</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {machines.map((m) => (
                <tr key={m._id}>
                  <td style={styles.td}>{m.name}</td>
                  <td style={{ ...styles.td, fontFamily: 'var(--font-mono)' }}>{m.code}</td>
                  <td style={styles.td}>{m.line}</td>
                  <td style={styles.td}>
                    <span style={{ color: statusColor(m.status), fontWeight: 500, fontSize: '13px' }}>
                      ● {m.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => handleDelete(m._id)} style={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
              {machines.length === 0 && (
                <tr><td colSpan="5" style={styles.emptyState}>No machines yet — add your first one above</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: { padding: '32px 40px', maxWidth: '900px' },
  headerRow: { marginBottom: '24px' },
  heading: { fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 500, marginBottom: '4px' },
  subheading: { fontFamily: 'var(--font-body)', fontSize: '13px', color: '#777' },
  card: {
    background: 'white',
    border: '0.5px solid var(--color-border)',
    borderRadius: '10px',
    padding: '16px',
    marginBottom: '20px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
  },
  form: { display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' },
  input: {
    padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '6px',
    fontFamily: 'var(--font-body)', fontSize: '13px', flex: '1', minWidth: '120px'
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
  deleteBtn: {
    background: 'transparent', border: '1px solid var(--color-down)', color: 'var(--color-down)',
    borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', fontSize: '12px'
  },
  emptyState: {
    padding: '24px 12px', textAlign: 'center', color: '#999', fontSize: '13px'
  }
};

export default Machines;