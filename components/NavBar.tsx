import styles from './NavBar.module.css'
import Link from 'next/link'
export default function NavBar(){
    return <nav className={styles.NavBar}>
        <h1><Link href="/">CINETREX</Link></h1>
        <ul className={styles.LeftItems}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/movies">Movies</Link></li>
            <li><Link href="/tv_series">TV Series</Link></li>
            <li><Link href="/signin"><span className="blue-button">Log in</span></Link></li>
        </ul>
    </nav>
}
