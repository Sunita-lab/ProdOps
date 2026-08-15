import { Link } from 'react-router-dom';

function Landing() {
  const features = [
    { title: 'Live Machine Status', desc: 'Track running, idle, and down machines across every line in real time.' },
    { title: 'Production Orders', desc: 'Plan orders against products, machines, and shifts — track progress automatically.' },
    { title: 'Downtime Logging', desc: 'Capture breakdowns and stoppages with categorized reasons for root-cause analysis.' },
    { title: 'Quality Tracking', desc: 'Record pass/fail inspections and monitor rejection rates across orders.' },
  ];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>ProdOps</div>
        <div style={styles.headerLinks}>
          <Link to="/login" style={styles.headerLink}>Sign in</Link>
          <Link to="/register" style={styles.headerCta}>Get started</Link>
        </div>
      </header>

      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Production monitoring,<br />built for the factory floor.</h1>
        <p style={styles.heroSubtitle}>
          Track machines, orders, downtime, and quality in one place —
          from shift start to shipped output.
        </p>
        <div style={styles.heroButtons}>
          <Link to="/register" style={styles.primaryBtn}>Get started</Link>
          <Link to="/login" style={styles.secondaryBtn}>Sign in</Link>
        </div>
      </section>

      <section style={styles.features}>
        {features.map((f) => (
          <div key={f.title} style={styles.featureCard}>
            <div style={styles.featureTitle}>{f.title}</div>
            <div style={styles.featureDesc}>{f.desc}</div>
          </div>
        ))}
      </section>

      <footer style={styles.footer}>
        <span>ProdOps — Industrial Production Monitoring</span>
      </footer>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: 'var(--color-bg)' },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 48px'
  },
  logo: { fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 500, color: 'var(--color-text)' },
  headerLinks: { display: 'flex', alignItems: 'center', gap: '20px' },
  headerLink: { fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text)', textDecoration: 'none' },
  headerCta: {
    fontFamily: 'var(--font-body)', fontSize: '14px', color: 'white', textDecoration: 'none',
    background: 'var(--color-primary)', padding: '8px 16px', borderRadius: '6px'
  },
  hero: {
    maxWidth: '640px', margin: '80px auto 100px', textAlign: 'center', padding: '0 24px'
  },
  heroTitle: {
    fontFamily: 'var(--font-heading)', fontSize: '38px', fontWeight: 500,
    lineHeight: 1.25, color: 'var(--color-text)', marginBottom: '16px'
  },
  heroSubtitle: {
    fontFamily: 'var(--font-body)', fontSize: '16px', color: '#666',
    lineHeight: 1.6, marginBottom: '32px'
  },
  heroButtons: { display: 'flex', gap: '12px', justifyContent: 'center' },
  primaryBtn: {
    fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 500, color: 'white',
    textDecoration: 'none', background: 'var(--color-primary)', padding: '12px 24px', borderRadius: '6px'
  },
  secondaryBtn: {
    fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 500, color: 'var(--color-text)',
    textDecoration: 'none', background: 'white', border: '1px solid var(--color-border)',
    padding: '12px 24px', borderRadius: '6px'
  },
  features: {
    maxWidth: '1000px', margin: '0 auto', padding: '0 24px 100px',
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px'
  },
  featureCard: {
    background: 'white', border: '0.5px solid var(--color-border)', borderRadius: '10px',
    padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
  },
  featureTitle: {
    fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 500,
    marginBottom: '8px', color: 'var(--color-text)'
  },
  featureDesc: {
    fontFamily: 'var(--font-body)', fontSize: '13px', color: '#777', lineHeight: 1.5
  },
  footer: {
    textAlign: 'center', padding: '24px', fontFamily: 'var(--font-body)',
    fontSize: '12px', color: '#999', borderTop: '1px solid var(--color-border)'
  }
};

export default Landing;