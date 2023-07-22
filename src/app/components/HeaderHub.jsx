import styles from './HeaderHub.module.css'
import Link from 'next/link'
export default function HeaderHub() {
    return(
        <header className={styles.headerHub}>
            <Link href='/'>
                <img src="/apple-touch-icon.png" alt="Logo Deal Dress" />
            </Link>
        </header>
    )
}