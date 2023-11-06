import styles from './HeaderHub.module.css'
import Link from 'next/link';
export default function HeaderHubNavBar() {
    return(
        <nav>
            <ul className={styles.headerHubNavBarList}>
                <li>
                    <Link href='/tienda'>
                        <p>TIENDA</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}