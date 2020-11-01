import Link from 'next/link'

const Logo = () => (
  <Link href="/">
    <a
      href="/"
      style={{ textDecoration: 'none', fontSize: 25, fontFamily: 'Cambo' }}
    >
      <span style={{ color: '#e12830' }}>Urteile&nbsp;</span>
      <span style={{ color: '#014fa4' }}>&amp;&nbsp;Gesetze</span>
    </a>
  </Link>
)

export default Logo
