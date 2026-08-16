import { useState, useEffect } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';

function ProductionEntry() {
  const [records, setRecords] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({ order: '', quantityProduced: '', rejectedQuantity: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchAll = async () => {
    try {
      const [recordsRes, ordersRes] = await Promise.all([
        API.get('/records'),
        API.get('/orders'),
      ]);
      setRecords(recordsRes.data);
      setOrders(ordersRes.data.filter((o) => o.status !== 'completed'));
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
    setSuccess('');
    try {
      await API.post('/records', {
        ...formData,
        rejectedQuantity: formData.rejectedQuantity || 0
      });
      setFormData({ order: '', quantityProduced: '', rejectedQuantity: '' });
      setSuccess('Entry recorded successfully');
      fetchAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record entry');
    }
  };

  return (
    <Layout>
      <div style={styles.container} className="page-container">
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>Production Entry</h2>
          <p style={styles.subheading}>Log output against an active order</p>
        </div>

        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <select name="order" value={formData.order} onChange={handleChange} style={styles.input} required>
              <option value="">Select Order</option>
              {orders.map((o) => (
                <option key={o._id} value={o._id}>
                  {o.orderNumber} — {o.product?.name} ({o.producedQuantity}/{o.targetQuantity})
                </option>
              ))}
            </select>

            <input name="quantityProduced" type="number" placeholder="Quantity produced" value={formData.quantityProduced} onChange={handleChange} style={styles.input} required />
            <input name="rejectedQuantity" type="number" placeholder="Rejected (optional)" value={formData.rejectedQuantity} onChange={handleChange} style={styles.input} />

            <button type="submit" style={styles.button}>+ Log Entry</button>
          </form>
        </div>

        {error && <p style={{ color: 'var(--color-down)', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
        {success && <p style={{ color: 'var(--color-running)', fontSize: '13px', marginBottom: '12px' }}>{success}</p>}

        <div style={styles.card}>
          <h3 style={styles.sectionHeading}>Recent Entries</h3>
          <div className="table-scroll">
            <table style={{ ...styles.table, minWidth: '700px' }}>
              <thead>
                <tr>
                  <th style={styles.th}>Order</th>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>Produced</th>
                  <th style={styles.th}>Rejected</th>
                  <th style={styles.th}>By</th>
                  <th style={styles.th}>When</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r._id}>
                    <td style={{ ...styles.td, fontFamily: 'var(--font-mono)' }}>{r.order?.orderNumber}</td>
                    <td style={styles.td}>{r.order?.product?.name}</td>
                    <td style={{ ...styles.td, fontFamily: 'var(--font-mono)' }}>{r.quantityProduced}</td>
                    <td style={{ ...styles.td, fontFamily: 'var(--font-mono)', color: r.rejectedQuantity > 0 ? 'var(--color-down)' : 'inherit' }}>
                      {r.rejectedQuantity}
                    </td>
                    <td style={styles.td}>{r.recordedBy?.name}</td>
                    <td style={{ ...styles.td, fontSize: '12px', color: '#888' }}>
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {records.length === 0 && (
                  <tr><td colSpan="6" style={styles.emptyState}>No entries logged yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
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
  sectionHeading: { fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 500, marginBottom: '14px' },
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
  emptyState: { padding: '24px 12px', textAlign: 'center', color: '#999', fontSize: '13px' }
};

export default ProductionEntry;