import styles from './FooterHub.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faHouse } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Image from 'next/image';
export default function FooterHub() {
    return(
        <footer className={styles.footerHub}>
            <section>
                <article>
                    <span>©COPYRIGHT DealDress™ - 2023</span>
                </article>
                <article>
                    <p>Nos podes encontrar en:</p>
                    <a className={styles.linkSocialMedia} href="https://www.instagram.com/dealdress.tiendaonline/" target='_blank'><Image src="/instagram.svg" alt="Estamos en Instagram" width={200} height={60} /></a>
                    <a className={styles.linkSocialMedia} href="https://www.tiktok.com/@dealdressropa" target='_blank'><Image src="/tiktok.svg" alt="Estamos en TikTok" width={200} height={60}/></a>
                    <a className={styles.linkSocialMedia} href="https://www.facebook.com/people/dealdresstiendaonline/100063642266774/" target='_blank'><Image src="/facebook.svg" alt="Estamos en Facebook" width={200} height={60}/></a>
                    <a className={styles.linkSocialMedia} href="https://api.whatsapp.com/send/?phone=5493415075439&text&type=phone_number&app_absent=0" target='_blank'><Image src="/whatsapp.svg" alt="Estamos en WhatsApp" width={200} height={60}/></a>
                </article>
                <article>
                    <p>Contacto:</p>
                    <p><FontAwesomeIcon icon={faPhone}/> 3415075439</p>
                    <p><FontAwesomeIcon icon={faHouse} /> Donado 1500</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> dealdress.ropa@gmail.com</p>
                </article>
                <article className={styles.footerMetodoPago}>
                    <Image src="/MetododePago.webp" alt="Paga con cualquier metodo de pago" width={800} height={150}/>
                </article>
            </section>
        </footer>
    )
}