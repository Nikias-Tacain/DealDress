import styles from './TiendaNavBar.module.css'
import Image from 'next/image';
export default function CarrouselImgs() {
    return(
        <section className={styles.bannerTienda}>
            <Image src="/headerTienda.png" alt="banner tienda" width={2000} height={300}/>
            <marquee behavior="scroll" direction="left" className={styles.headerHubCarrouselMarquee}>
                PEDIDOS MAYORISTAS - CONTACTAR POR WHATSAPP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </marquee>
        </section>
    )
}