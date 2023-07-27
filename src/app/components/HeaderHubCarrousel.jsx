import styles from './HeaderHub.module.css'
export default function HeaderHubCarrousel() {
    return(
        <section>
            <article className={styles.headerHubCarrousel}>

            </article>
            <marquee behavior="scroll" direction="left" className={styles.headerHubCarrouselMarquee}>
                ENVIOS GRATIS EN ROSARIO !!! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ENVIAMOS A TODO EL PAIS A DOMICILIO CON ADREANI 🚛 !!! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </marquee>
        </section>
    )
}