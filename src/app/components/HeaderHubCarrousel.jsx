import styles from './HeaderHub.module.css'
export default function HeaderHubCarrousel() {
    return(
        <section>
            <div  className={styles.carrouselImg}>
                <img src="/CarrouselImg1.png" alt="" />
            </div>
            <marquee behavior="scroll" direction="left" className={styles.headerHubCarrouselMarquee}>
                ENVIAMOS A TODO EL PAIS A DOMICILIO CON ANDREANI !!! 🚛🚛🚛 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </marquee>
        </section>
    )
}