import styles from './TiendaNavBar.module.css'
export default function TiendaNavBar() {
    return(
        <nav className={styles.navBar}>
            <section className={styles.navBar__section}>
                <article>
                    <label htmlFor="">Categorias: </label>
                    <select name="" id="">
                        <option value="">Todos</option>
                        <option value="">Remeras</option>
                        <option value="">Zapatillas</option>
                        <option value="">Herramientas</option>
                        <option value="">Camperas</option>
                        <option value="">Pantalones</option>
                    </select>
                </article>
                <article>

                </article>
            </section>
        </nav>
    )
}