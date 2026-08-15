import { Link, useLocation, useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/products', label: 'Products' },
    { path: '/machines', label: 'Machines' },
    { path: '/lines', label: 'Lines' },
    { path: '/shifts', label: 'Shifts' },
    { path: '/orders', label: 'Production Orders' },
    { path: '/entry', label: 'Production Entry' },
    { path: '/downtime', label: 'Downtime' },
    { path: '/quality', label: 'Quality' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <div style={styles.logo}>ProdOps</div>
        <nav style={styles.nav}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...styles.navLink,
                  background: isActive ? 'rgba(11, 95, 165, 0.15)' : 'transparent',
                  color: isActive ? '#7EC1F5' : 'var(--color-text-light)',
                  borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent'
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div style={styles.sidebarFooter}>
          <div style={styles.userName}>{user?.name}</div>
          <div style={styles.userRole}>{user?.role}</div>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </aside>
      <main style={styles.main}>{children}</main>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', minHeight: '100vh' },
  sidebar: {
    width: '220px',
    background: 'var(--color-chrome)',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
    position: 'sticky',
    top: 0,
    height: '100vh'
  },
  logo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '18px',
    fontWeight: 500,
    color: 'var(--color-text-light)',
    padding: '0 20px',
    marginBottom: '28px'
  },
  nav: { display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 },
  navLink: {
    padding: '10px 20px',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    textDecoration: 'none',
    transition: 'background 0.15s ease'
  },
  sidebarFooter: {
    padding: '16px 20px',
    borderTop: '1px solid rgba(255,255,255,0.1)'
  },
  userName: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    color: 'var(--color-text-light)',
    fontWeight: 500
  },
  userRole: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: '#8A9299',
    textTransform: 'uppercase',
    marginBottom: '10px'
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #444',
    color: 'var(--color-text-light)',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    width: '100%'
  },
  main: {
    flex: 1,
    background: 'var(--color-bg)',
    overflowY: 'auto'
  }
};

export default Layout;