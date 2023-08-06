import ShoppingCartModal from './ShoppingCart'
import styles from './TiendaNavBar.module.css'
export default function TiendaNavBar() {
    return(
        <nav className={styles.navBar}>
            <section className={styles.navBar__section}>
                <article>
                    <ShoppingCartModal />
                </article>
            </section>
        </nav>
    )
}