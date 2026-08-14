import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.heading}>ProdOps</h1>
        <p style={styles.subheading}>Sign in to your account</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>Sign in</button>

        <p style={styles.footerText}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'var(--color-bg)'
  },
  form: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    border: '0.5px solid var(--color-border)',
    width: '320px'
  },
  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: '22px',
    fontWeight: 500,
    marginBottom: '4px'
  },
  subheading: {
    fontSize: '13px',
    color: '#555',
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    fontFamily: 'var(--font-body)',
    fontSize: '14px'
  },
  button: {
    width: '100%',
    padding: '10px',
    background: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontFamily: 'var(--font-heading)',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: '8px'
  },
  error: {
    color: 'var(--color-down)',
    fontSize: '13px',
    marginBottom: '12px'
  },
  footerText: {
    fontSize: '13px',
    marginTop: '16px',
    textAlign: 'center',
    color: '#555'
  }
};