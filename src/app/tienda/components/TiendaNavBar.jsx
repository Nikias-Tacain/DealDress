import CategoriesButton from './CategoriesButton'
import styles from './TiendaNavBar.module.css'
export default function TiendaNavBar() {
    return(
        <nav className={styles.navBar}>
            <section className={styles.navBar__section}>
                <CategoriesButton />
                <article>
                    <p>carrito</p>
                </article>
            </section>
        </nav>
    )
}