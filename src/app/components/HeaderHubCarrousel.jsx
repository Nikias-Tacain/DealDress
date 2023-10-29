import styles from './HeaderHub.module.css'
import Image from 'next/image';
export default function HeaderHubCarrousel() {
    return(
        <section>
            <div  className={styles.carrouselImg}>
                <Image src="/header.png" alt="Imagen portada" width={1000} height={500}/>
            </div>
            <div className={styles.headerHubCarrouselMarquee}>
            <marquee behavior="scroll" direction="left">
                ENVIAMOS A TODO EL PAIS A DOMICILIO CON ANDREANI !!! 🚛🚛🚛 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </marquee>
            </div>
        </section>
    )
}