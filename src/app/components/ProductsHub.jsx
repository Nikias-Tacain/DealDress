import Link from "next/link"
import styles from './ProductsHub.module.css'
export default function ProductsHub() {
    return(
        <section className={styles.productsHub}>
            <h2>LO MAS VENDIDO</h2>
            <article>
                <div>
                    <h3>Deportivo</h3>
                    <article>
                        <Link href='/tienda'>
                            <p>Ir a la tienda</p>
                        </Link>
                    </article>
                </div>
                <div className={styles.productsHub__accesoDirectoTienda}>
                    <p>no se encontraron productos en estos momentos...</p>
                </div>
            </article>
            <article>
                <div>
                    <h3>Urbano</h3>
                    <article>
                        <Link href='/tienda'>
                            <p>Ir a la tienda</p>
                        </Link>
                    </article>
                </div>
                <div className={styles.productsHub__accesoDirectoTienda}>
                    <p>no se encontraron productos en estos momentos...</p>
                </div>
            </article>
        </section>
    )
}