import { Link } from 'react-router-dom';

function Landing() {
  const features = [
    { n: '01', title: 'Live Machine Status', desc: 'Track running, idle, and down machines across every line in real time.' },
    { n: '02', title: 'Production Orders', desc: 'Plan orders against products, machines, and shifts — track progress automatically.' },
    { n: '03', title: 'Downtime Logging', desc: 'Capture breakdowns and stoppages with categorized reasons for root-cause analysis.' },
    { n: '04', title: 'Quality Tracking', desc: 'Record pass/fail inspections and monitor rejection rates across orders.' },
  ];

  const steps = [
    { n: '1', title: 'Set up your floor', desc: 'Add products, machines, lines, and shifts once — the building blocks every order and entry will reference.' },
    { n: '2', title: 'Plan and run orders', desc: 'Create production orders against a product, machine, and shift. Operators log output as it happens.' },
    { n: '3', title: 'See it all live', desc: 'Downtime, quality, and output roll up into one dashboard — no end-of-shift spreadsheet needed.' },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.bgGrid} />

      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoDot} />
          ProdOps
        </div>
        <div style={styles.headerLinks}>
          <Link to="/login" style={styles.headerLink}>Sign in</Link>
          <Link to="/register" style={styles.headerCta}>Get started</Link>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.eyebrow}>PRODUCTION MONITORING</div>
          <h1 style={styles.heroTitle}>Know what's happening<br />on the floor, right now.</h1>
          <p style={styles.heroSubtitle}>
            Machines, orders, downtime, and quality — tracked in one place,
            from shift start to shipped output.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/register" style={styles.primaryBtn}>Get started</Link>
            <Link to="/login" style={styles.secondaryBtn}>Sign in</Link>
          </div>
        </div>

        <div style={styles.heroRight}>
          <div style={styles.mockWindow}>
            <div style={styles.mockTopBar}>
              <span style={{ ...styles.mockDot, background: '#E5544D' }} />
              <span style={{ ...styles.mockDot, background: '#E8B339' }} />
              <span style={{ ...styles.mockDot, background: '#3FAE5C' }} />
            </div>
            <div style={styles.mockBody}>
              <div style={styles.mockStatRow}>
                <div style={styles.mockStatCard}>
                  <div style={styles.mockStatValue}>1,284</div>
                  <div style={styles.mockStatLabel}>Today's Output</div>
                </div>
                <div style={styles.mockStatCard}>
                  <div style={{ ...styles.mockStatValue, fontSize: '18px' }}>6 / 8</div>
                  <div style={styles.mockStatLabel}>Active Orders</div>
                </div>
              </div>
              <div style={styles.mockListCard}>
                {[
                  { name: 'Line 1 — Filler', status: 'running' },
                  { name: 'Line 2 — Bottler', status: 'running' },
                  { name: 'Line 3 — Packer', status: 'idle' },
                  { name: 'Line 4 — Sealer', status: 'down' },
                ].map((m) => (
                  <div key={m.name} style={styles.mockRow}>
                    <span style={styles.mockRowName}>{m.name}</span>
                    <span style={{
                      ...styles.mockStatusPill,
                      color: m.status === 'running' ? '#2E7D46' : m.status === 'down' ? '#C43D3D' : '#C77A1F'
                    }}>
                      ● {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.featuresSection}>
        <div style={styles.sectionHead}>
          <div style={styles.eyebrow}>WHAT YOU GET</div>
          <h2 style={styles.sectionTitle}>Everything the floor needs, nothing it doesn't</h2>
        </div>
        <div style={styles.features} className="grid-4">
          {features.map((f) => (
            <div key={f.title} style={styles.featureCard}>
              <div style={styles.featureNum}>{f.n}</div>
              <div style={styles.featureTitle}>{f.title}</div>
              <div style={styles.featureDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.stepsSection}>
        <div style={styles.sectionHead}>
          <div style={styles.eyebrow}>HOW IT WORKS</div>
          <h2 style={styles.sectionTitle}>From setup to shift-end, in three steps</h2>
        </div>
        <div style={styles.stepsRow} className="grid-3">
          {steps.map((s, i) => (
            <div key={s.n} style={styles.stepItem}>
              <div style={styles.stepNumCircle}>{s.n}</div>
              <div style={styles.stepTitle}>{s.title}</div>
              <div style={styles.stepDesc}>{s.desc}</div>
              {i < steps.length - 1 && <div style={styles.stepConnector} />}
            </div>
          ))}
        </div>
      </section>

      <section style={styles.ctaSection}>
        <div style={styles.ctaBanner}>
          <div>
            <div style={styles.ctaTitle}>Ready to see your floor in real time?</div>
            <div style={styles.ctaSubtitle}>Set up your first product and machine in under five minutes.</div>
          </div>
          <Link to="/register" style={styles.ctaBtn}>Get started free</Link>
        </div>
      </section>

      <footer style={styles.footer}>
        <span>ProdOps — Industrial Production Monitoring</span>
      </footer>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: 'var(--color-bg)', position: 'relative', overflow: 'hidden' },
  bgGrid: {
    position: 'absolute', top: 0, left: 0, right: 0, height: '520px',
    backgroundImage: 'linear-gradient(rgba(11,95,165,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(11,95,165,0.05) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
    maskImage: 'linear-gradient(to bottom, black, transparent)',
    WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
    pointerEvents: 'none'
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '22px 48px', position: 'relative', zIndex: 1
  },
  logo: {
    fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 500, color: 'var(--color-text)',
    display: 'flex', alignItems: 'center', gap: '8px'
  },
  logoDot: {
    width: '8px', height: '8px', borderRadius: '2px', background: 'var(--color-primary)', display: 'inline-block'
  },
  headerLinks: { display: 'flex', alignItems: 'center', gap: '20px' },
  headerLink: { fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text)', textDecoration: 'none' },
  headerCta: {
    fontFamily: 'var(--font-body)', fontSize: '14px', color: 'white', textDecoration: 'none',
    background: 'var(--color-primary)', padding: '8px 16px', borderRadius: '6px'
  },
  hero: {
    maxWidth: '1080px', margin: '64px auto 120px', padding: '0 48px',
    display: 'flex', alignItems: 'center', gap: '48px', flexWrap: 'wrap', position: 'relative', zIndex: 1
  },
  heroLeft: { flex: '1 1 420px', minWidth: '320px' },
  eyebrow: {
    fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 500, letterSpacing: '1.5px',
    color: 'var(--color-primary)', marginBottom: '16px'
  },
  heroTitle: {
    fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 500,
    lineHeight: 1.2, color: 'var(--color-text)', marginBottom: '18px'
  },
  heroSubtitle: {
    fontFamily: 'var(--font-body)', fontSize: '16px', color: '#666',
    lineHeight: 1.6, marginBottom: '32px', maxWidth: '440px'
  },
  heroButtons: { display: 'flex', gap: '12px' },
  primaryBtn: {
    fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 500, color: 'white',
    textDecoration: 'none', background: 'var(--color-primary)', padding: '12px 24px', borderRadius: '6px'
  },
  secondaryBtn: {
    fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 500, color: 'var(--color-text)',
    textDecoration: 'none', background: 'white', border: '1px solid var(--color-border)',
    padding: '12px 24px', borderRadius: '6px'
  },
  heroRight: { flex: '1 1 380px', minWidth: '320px' },
  mockWindow: {
    background: 'white', borderRadius: '12px', border: '1px solid var(--color-border)',
    boxShadow: '0 20px 40px -12px rgba(28,31,34,0.18)', overflow: 'hidden'
  },
  mockTopBar: { display: 'flex', gap: '6px', padding: '12px 14px', background: '#F5F6F4', borderBottom: '1px solid var(--color-border)' },
  mockDot: { width: '9px', height: '9px', borderRadius: '50%', display: 'inline-block' },
  mockBody: { padding: '18px' },
  mockStatRow: { display: 'flex', gap: '10px', marginBottom: '14px' },
  mockStatCard: {
    flex: 1, background: '#F9FAF8', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '12px 14px'
  },
  mockStatValue: { fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 500, color: 'var(--color-primary)' },
  mockStatLabel: { fontFamily: 'var(--font-body)', fontSize: '11px', color: '#888', marginTop: '2px' },
  mockListCard: { border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' },
  mockRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '10px 14px', borderBottom: '1px solid #F0F0EE', fontSize: '13px'
  },
  mockRowName: { fontFamily: 'var(--font-body)', color: 'var(--color-text)' },
  mockStatusPill: { fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '12px' },

  sectionHead: { textAlign: 'center', maxWidth: '520px', margin: '0 auto 40px' },
  sectionTitle: {
    fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 500,
    color: 'var(--color-text)', lineHeight: 1.3
  },

  featuresSection: { padding: '0 48px 110px', position: 'relative', zIndex: 1 },
  features: {
    maxWidth: '1080px', margin: '0 auto',
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px'
  },
  featureCard: {
    background: 'white', border: '0.5px solid var(--color-border)', borderRadius: '10px',
    padding: '22px 20px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
  },
  featureNum: {
    fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#B8BCB5', marginBottom: '10px'
  },
  featureTitle: {
    fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 500,
    marginBottom: '8px', color: 'var(--color-text)'
  },
  featureDesc: {
    fontFamily: 'var(--font-body)', fontSize: '13px', color: '#777', lineHeight: 1.5
  },

  stepsSection: {
    padding: '90px 48px 110px', position: 'relative', zIndex: 1,
    background: 'white', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)'
  },
  stepsRow: {
    maxWidth: '900px', margin: '0 auto', display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px'
  },
  stepItem: { position: 'relative', textAlign: 'left' },
  stepNumCircle: {
    width: '34px', height: '34px', borderRadius: '50%', background: 'var(--color-chrome)',
    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-mono)', fontSize: '14px', marginBottom: '16px'
  },
  stepTitle: {
    fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 500,
    color: 'var(--color-text)', marginBottom: '8px'
  },
  stepDesc: {
    fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#777', lineHeight: 1.6
  },
  stepConnector: {
    display: 'none'
  },

  ctaSection: { padding: '90px 48px', position: 'relative', zIndex: 1 },
  ctaBanner: {
    maxWidth: '1000px', margin: '0 auto', background: 'var(--color-chrome)', borderRadius: '14px',
    padding: '40px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    flexWrap: 'wrap', gap: '20px'
  },
  ctaTitle: {
    fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 500, color: 'white', marginBottom: '6px'
  },
  ctaSubtitle: {
    fontFamily: 'var(--font-body)', fontSize: '14px', color: '#B8BFC4'
  },
  ctaBtn: {
    fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 500, color: 'var(--color-chrome)',
    textDecoration: 'none', background: 'white', padding: '13px 26px', borderRadius: '6px', whiteSpace: 'nowrap'
  },

  footer: {
    textAlign: 'center', padding: '24px', fontFamily: 'var(--font-body)',
    fontSize: '12px', color: '#999', position: 'relative', zIndex: 1
  }
};

export default Landing;