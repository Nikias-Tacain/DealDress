import styles from './TiendaNavBar.module.css'
import Image from 'next/image';
export default function CarrouselImgs() {
    return(
        <section className={styles.bannerTienda}>
            <Image src="/headerTienda.png" alt="banner tienda" width={2000} height={300}/>
            <div className={styles.headerHubCarrouselMarquee}>
                <marquee behavior="scroll" direction="left">
                    PEDIDOS MAYORISTAS - CONTACTAR POR WHATSAPP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </marquee>
            </div>
        </section>
    )
}