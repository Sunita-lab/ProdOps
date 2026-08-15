import { useState, useEffect } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';

function Quality() {
  const [inspections, setInspections] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    order: '', inspectedQuantity: '', passedQuantity: '', failedQuantity: '', defectType: 'none', remarks: ''
  });
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      const [inspectionsRes, ordersRes] = await Promise.all([
        API.get('/quality'),
        API.get('/orders'),
      ]);
      setInspections(inspectionsRes.data);
      setOrders(ordersRes.data);
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
      await API.post('/quality', formData);
      setFormData({ order: '', inspectedQuantity: '', passedQuantity: '', failedQuantity: '', defectType: 'none', remarks: '' });
      fetchAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log inspection');
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>Quality Inspection</h2>
          <p style={styles.subheading}>Record pass/fail checks against orders</p>
        </div>

        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <select name="order" value={formData.order} onChange={handleChange} style={styles.input} required>
              <option value="">Select Order</option>
              {orders.map((o) => (
                <option key={o._id} value={o._id}>{o.orderNumber} — {o.product?.name}</option>
              ))}
            </select>

            <input name="inspectedQuantity" type="number" placeholder="Inspected" value={formData.inspectedQuantity} onChange={handleChange} style={styles.input} required />
            <input name="passedQuantity" type="number" placeholder="Passed" value={formData.passedQuantity} onChange={handleChange} style={styles.input} required />
            <input name="failedQuantity" type="number" placeholder="Failed" value={formData.failedQuantity} onChange={handleChange} style={styles.input} required />

            <select name="defectType" value={formData.defectType} onChange={handleChange} style={styles.input}>
              <option value="none">No Defect</option>
              <option value="dimensional">Dimensional</option>
              <option value="surface">Surface</option>
              <option value="material">Material</option>
              <option value="assembly">Assembly</option>
              <option value="other">Other</option>
            </select>

            <input name="remarks" placeholder="Remarks (optional)" value={formData.remarks} onChange={handleChange} style={{ ...styles.input, flexBasis: '100%' }} />

            <button type="submit" style={styles.button}>+ Log Inspection</button>
          </form>
        </div>

        {error && <p style={{ color: 'var(--color-down)', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Order</th>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Inspected</th>
                <th style={styles.th}>Passed</th>
                <th style={styles.th}>Failed</th>
                <th style={styles.th}>Defect</th>
                <th style={styles.th}>By</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((i) => (
                <tr key={i._id}>
                  <td style={{ ...styles.td, fontFamily: 'var(--font-mono)' }}>{i.order?.orderNumber}</td>
                  <td style={styles.td}>{i.order?.product?.name}</td>
                  <td style={{ ...styles.td, fontFamily: 'var(--font-mono)' }}>{i.inspectedQuantity}</td>
                  <td style={{ ...styles.td, fontFamily: 'var(--font-mono)', color: 'var(--color-running)' }}>{i.passedQuantity}</td>
                  <td style={{ ...styles.td, fontFamily: 'var(--font-mono)', color: i.failedQuantity > 0 ? 'var(--color-down)' : 'inherit' }}>{i.failedQuantity}</td>
                  <td style={styles.td}>{i.defectType}</td>
                  <td style={styles.td}>{i.inspectedBy?.name}</td>
                </tr>
              ))}
              {inspections.length === 0 && (
                <tr><td colSpan="7" style={styles.emptyState}>No inspections logged yet</td></tr>
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
    fontFamily: 'var(--font-body)', fontSize: '13px', flex: '1', minWidth: '140px'
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
  emptyState: { padding: '24px 12px', textAlign: 'center', color: '#999', fontSize: '13px' }
};

export default Quality;