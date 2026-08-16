import { useState, useEffect } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';

function ProductionOrders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [machines, setMachines] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [formData, setFormData] = useState({
    orderNumber: '', product: '', machine: '', shift: '', targetQuantity: ''
  });
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      const [ordersRes, productsRes, machinesRes, shiftsRes] = await Promise.all([
        API.get('/orders'),
        API.get('/products'),
        API.get('/machines'),
        API.get('/shifts'),
      ]);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
      setMachines(machinesRes.data);
      setShifts(shiftsRes.data);
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
      await API.post('/orders', formData);
      setFormData({ orderNumber: '', product: '', machine: '', shift: '', targetQuantity: '' });
      fetchAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/orders/${id}`);
      fetchAll();
    } catch (err) {
      setError('Failed to delete order');
    }
  };

  const statusColor = (status) => {
    if (status === 'completed') return 'var(--color-running)';
    if (status === 'in-progress') return 'var(--color-idle)';
    return '#888';
  };

  return (
    <Layout>
      <div style={styles.container} className="page-container">
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>Production Orders</h2>
          <p style={styles.subheading}>{orders.length} orders</p>
        </div>

        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input name="orderNumber" placeholder="Order # (e.g. ORD-001)" value={formData.orderNumber} onChange={handleChange} style={styles.input} required />

            <select name="product" value={formData.product} onChange={handleChange} style={styles.input} required>
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>

            <select name="machine" value={formData.machine} onChange={handleChange} style={styles.input} required>
              <option value="">Select Machine</option>
              {machines.map((m) => (
                <option key={m._id} value={m._id}>{m.name}</option>
              ))}
            </select>

            <select name="shift" value={formData.shift} onChange={handleChange} style={styles.input} required>
              <option value="">Select Shift</option>
              {shifts.map((s) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>

            <input name="targetQuantity" type="number" placeholder="Target qty" value={formData.targetQuantity} onChange={handleChange} style={styles.input} required />

            <button type="submit" style={styles.button}>+ Create Order</button>
          </form>
        </div>

        {error && <p style={{ color: 'var(--color-down)', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        <div style={styles.card}>
          <div className="table-scroll">
            <table style={{ ...styles.table, minWidth: '820px' }}>
              <thead>
                <tr>
                  <th style={styles.th}>Order #</th>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>Machine</th>
                  <th style={styles.th}>Shift</th>
                  <th style={styles.th}>Target</th>
                  <th style={styles.th}>Produced</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td style={{ ...styles.td, fontFamily: 'var(--font-mono)' }}>{o.orderNumber}</td>
                    <td style={styles.td}>{o.product?.name}</td>
                    <td style={styles.td}>{o.machine?.name}</td>
                    <td style={styles.td}>{o.shift?.name}</td>
                    <td style={{ ...styles.td, fontFamily: 'var(--font-mono)' }}>{o.targetQuantity}</td>
                    <td style={{ ...styles.td, fontFamily: 'var(--font-mono)' }}>{o.producedQuantity}</td>
                    <td style={styles.td}>
                      <span style={{ color: statusColor(o.status), fontWeight: 500, fontSize: '13px' }}>
                        ● {o.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button onClick={() => handleDelete(o._id)} style={styles.deleteBtn}>Delete</button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr><td colSpan="8" style={styles.emptyState}>No orders yet — create your first one above</td></tr>
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
    fontFamily: 'var(--font-body)', fontSize: '13px', flex: '1', minWidth: '130px'
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
  emptyState: { padding: '24px 12px', textAlign: 'center', color: '#999', fontSize: '13px' }
};

export default ProductionOrders;