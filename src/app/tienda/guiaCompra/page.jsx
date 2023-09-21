import Image from "next/image"
import styles from './guiaCompra.module.css';
import Link from "next/link";
export default function GuiaCompra() {
    return(
        <section className={styles.guiaCompra}>
            <article className={styles.tittleGuiaCompra}>
                <h2>GUIA DE COMPRA</h2>
                <p>DealDress te proporciona una guia detallada de como realizar una compra en el sitio web.</p>
            </article>
            <div>
                <h3>⚪PASO 1</h3>
                <div>
                    <p>Agregar los productos al carrito, <strong>Si queres tener una vista previa mas detallada del producto te invitamos a presionar la imagen del articulo.</strong></p>
                    <p>Una vez agregar se va a sumar actumaticamente el producto elegido al carrito donde vas a poder cambiar las unidades que quieras adquirir.</p>
                    <article>
                        <Image src="/imgTiendaGuia.png" alt="guiaImagen1" width={1100} height={520}/>
                    </article>
                </div>
                <h3>⚪EXTRA</h3>
                <div>
                    <p>Podes cambiar la categoria de la tienda para filtrar dependiendo que quieras ver !!!</p>
                    <article>
                        <Image src="/imgTiendaGuiaCategorias.png" alt="guiaImagen2" width={1100} height={520}/>
                    </article>
                </div>
                <h3>⚪PASO 2</h3>
                <div>
                    <p>En este apartado observaras los productos que se agregan al carrito donde vas a poder aumentar o disminuir la cantidad de prendas de un mismo articulo, eliminar directamente el producto del carrito o eliminar todo el carrito.</p>
                    <article>
                        <Image src="/imgTiendaGuiaOrder.png" alt="guiaImagen3" width={1100} height={520}/>
                    </article>
                </div>
                <h3>⚪PASO 3</h3>
                <div>
                    <p>Este apartado veras la orden de compra y los metodos de pago disponibles (Tranferencia y MercadoPago). </p>
                    <article>
                        <Image src="/imgTiendaGuiaOrderPago.png" alt="guiaImagen4" width={1100} height={520}/>
                    </article>
                </div>
                <div>
                    <Link href='/tienda'>
                        <button className={styles.buttonGuiaCompraTienda}>Tienda</button>
                    </Link>
                </div>
            </div>
            
        </section>
    )
}