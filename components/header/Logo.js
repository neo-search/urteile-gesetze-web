import Link from 'next/link';

export default () => (
    <Link href="/" style={{ textDecoration: 'none', fontSize: 22, fontFamily: "'Crimson Pro', serif", fontWeight: 600, letterSpacing: '0.01em' }}>
        <span style={{ color: '#c0392b' }}>
            Urteile&nbsp;
        </span>
        <span style={{ color: '#1a3f7a' }}>
            &amp;&nbsp;Gesetze
        </span>
    </Link>
);