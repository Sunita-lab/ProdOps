import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>ProdOps</h1>
        <div style={styles.userInfo}>
          <span style={styles.userName}>{user?.name}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </header>

      <main style={styles.main}>
        <p>Welcome, {user?.name} ({user?.role})</p>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'var(--color-bg)'
  },
  header: {
    background: 'var(--color-chrome)',
    color: 'var(--color-text-light)',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: '18px',
    fontWeight: 500
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  userName: {
    fontSize: '14px'
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #555',
    color: 'var(--color-text-light)',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  main: {
    padding: '24px'
  }
};

export default Dashboard;