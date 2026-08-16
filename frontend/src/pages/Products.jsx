import { useState, useEffect } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';

function Products() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', code: '', unit: 'pcs', standardCycleTime: '' });
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      setError('Failed to load products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/products', formData);
      setFormData({ name: '', code: '', unit: 'pcs', standardCycleTime: '' });
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  return (
    <Layout>
      <div style={styles.container} className="page-container">
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>Products</h2>
          <p style={styles.subheading}>{products.length} products registered</p>
        </div>

        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input name="name" placeholder="Product name" value={formData.name} onChange={handleChange} style={styles.input} required />
            <input name="code" placeholder="Code (e.g. PRD-001)" value={formData.code} onChange={handleChange} style={styles.input} required />
            <input name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} style={{ ...styles.input, width: '90px' }} />
            <input name="standardCycleTime" type="number" placeholder="Cycle time (sec)" value={formData.standardCycleTime} onChange={handleChange} style={styles.input} required />
            <button type="submit" style={styles.button}>+ Add</button>
          </form>
        </div>

        {error && <p style={{ color: 'var(--color-down)', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        <div style={styles.card}>
          <div className="table-scroll">
            <table style={{ ...styles.table, minWidth: '560px' }}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Code</th>
                  <th style={styles.th}>Unit</th>
                  <th style={styles.th}>Cycle Time</th>
                  <th style={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} style={styles.tr}>
                    <td style={styles.td}>{p.name}</td>
                    <td style={{ ...styles.td, fontFamily: 'var(--font-mono)' }}>{p.code}</td>
                    <td style={styles.td}>{p.unit}</td>
                    <td style={{ ...styles.td, fontFamily: 'var(--font-mono)' }}>{p.standardCycleTime}s</td>
                    <td style={styles.td}>
                      <button onClick={() => handleDelete(p._id)} style={styles.deleteBtn}>Delete</button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr><td colSpan="5" style={styles.emptyState}>No products yet — add your first one above</td></tr>
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
  tr: { transition: 'background 0.1s ease' },
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

export default Products;