import Link from 'next/link';

export default () => (
    <Link href="/" style={{ textDecoration: 'none', fontSize: 25, fontFamily: 'Cambo' }}>
        <span style={{ color: '#e12830' }}>
            Urteile&nbsp;
        </span>
        <span style={{ color: '#014fa4' }}>
            &amp;&nbsp;Gesetze
        </span>
    </Link>
);