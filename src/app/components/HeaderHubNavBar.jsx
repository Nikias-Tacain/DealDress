import styles from './HeaderHub.module.css'
import Link from 'next/link';
export default function HeaderHubNavBar() {
    return(
        <nav>
            <ul className={styles.headerHubNavBarList}>
                <li>
                    <Link href='/#quienesSomos'>
                        <p>Sobre Nosotros</p>
                    </Link>
                </li>
                <li>
                    <Link href='/tienda'>
                        <p>Tienda</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}