import styles from './TiendaNavBar.module.css'
export default function CarrouselImgs() {
    return(
        <section className={styles.bannerTienda}>
            <img src="/BannerTienda.jpg" alt="banner tienda" />
            <marquee behavior="scroll" direction="left" className={styles.headerHubCarrouselMarquee}>
                PEDIDOS MAYORISTAS - CONTACTAR POR WHATSAPP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </marquee>
        </section>
    )
}