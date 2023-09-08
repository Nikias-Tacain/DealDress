import styles from './HeaderHub.module.css'
import Image from 'next/image';
export default function HeaderHubCarrousel() {
    return(
        <section>
            <div  className={styles.carrouselImg}>
                <Image src="/carrouselImg.webp" alt="Imagen portada" width={1000} height={500}/>
            </div>
            <marquee behavior="scroll" direction="left" className={styles.headerHubCarrouselMarquee}>
                ENVIAMOS A TODO EL PAIS A DOMICILIO CON ANDREANI !!! 🚛🚛🚛 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </marquee>
        </section>
    )
}