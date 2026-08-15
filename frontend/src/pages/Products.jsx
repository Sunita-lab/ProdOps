import { useState, useEffect } from 'react';
import API from '../api/axios';

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
    <div style={styles.container}>
      <h2 style={styles.heading}>Products</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" placeholder="Product name" value={formData.name} onChange={handleChange} style={styles.input} required />
        <input name="code" placeholder="Code (e.g. PRD-001)" value={formData.code} onChange={handleChange} style={styles.input} required />
        <input name="unit" placeholder="Unit (pcs, kg...)" value={formData.unit} onChange={handleChange} style={styles.input} />
        <input name="standardCycleTime" type="number" placeholder="Cycle time (sec)" value={formData.standardCycleTime} onChange={handleChange} style={styles.input} required />
        <button type="submit" style={styles.button}>Add Product</button>
      </form>

      {error && <p style={{ color: 'var(--color-down)' }}>{error}</p>}

      <table style={styles.table}>
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
            <tr key={p._id}>
              <td style={styles.td}>{p.name}</td>
              <td style={styles.td}>{p.code}</td>
              <td style={styles.td}>{p.unit}</td>
              <td style={styles.td}>{p.standardCycleTime}s</td>
              <td style={styles.td}>
                <button onClick={() => handleDelete(p._id)} style={styles.deleteBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { padding: '24px' },
  heading: { fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '16px' },
  form: { display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' },
  input: {
    padding: '8px', border: '1px solid var(--color-border)', borderRadius: '6px',
    fontFamily: 'var(--font-body)', fontSize: '14px'
  },
  button: {
    background: 'var(--color-primary)', color: 'white', border: 'none',
    borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontFamily: 'var(--font-heading)'
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    textAlign: 'left', fontFamily: 'var(--font-heading)', fontSize: '13px',
    padding: '8px', borderBottom: '1px solid var(--color-border)'
  },
  td: {
    padding: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px',
    borderBottom: '1px solid var(--color-border)'
  },
  deleteBtn: {
    background: 'transparent', border: '1px solid var(--color-down)', color: 'var(--color-down)',
    borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '12px'
  }
};

export default Products;