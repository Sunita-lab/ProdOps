import { useState, useEffect } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';

function Shifts() {
  const [shifts, setShifts] = useState([]);
  const [formData, setFormData] = useState({ name: '', startTime: '', endTime: '' });
  const [error, setError] = useState('');

  const fetchShifts = async () => {
    try {
      const res = await API.get('/shifts');
      setShifts(res.data);
    } catch (err) {
      setError('Failed to load shifts');
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/shifts', formData);
      setFormData({ name: '', startTime: '', endTime: '' });
      fetchShifts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add shift');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/shifts/${id}`);
      fetchShifts();
    } catch (err) {
      setError('Failed to delete shift');
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>Shifts</h2>
          <p style={styles.subheading}>{shifts.length} shifts registered</p>
        </div>

        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input name="name" placeholder="Shift name (e.g. Shift A)" value={formData.name} onChange={handleChange} style={styles.input} required />
            <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} style={styles.input} required />
            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} style={styles.input} required />
            <button type="submit" style={styles.button}>+ Add</button>
          </form>
        </div>

        {error && <p style={{ color: 'var(--color-down)', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Start</th>
                <th style={styles.th}>End</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((s) => (
                <tr key={s._id}>
                  <td style={styles.td}>{s.name}</td>
                  <td style={{ ...styles.td, fontFamily: 'var(--font-mono)' }}>{s.startTime}</td>
                  <td style={{ ...styles.td, fontFamily: 'var(--font-mono)' }}>{s.endTime}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleDelete(s._id)} style={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
              {shifts.length === 0 && (
                <tr><td colSpan="4" style={styles.emptyState}>No shifts yet — add your first one above</td></tr>
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

export default Shifts;