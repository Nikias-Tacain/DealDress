import styles from './FooterHub.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faHouse } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
export default function FooterHub() {
    return(
        <footer className={styles.footerHub}>
            <section>
                <article>
                    <span>©COPYRIGHT DealDress™ - 2023</span>
                </article>
                <article>
                    <p>Nos podes encontrar en:</p>
                    <a   className={styles.linkSocialMedia} href="https://www.instagram.com/dealdress.tiendaonline/" target='_blank'><img src="/instagram.svg" alt="Estamos en Instagram" /></a>
                    <a   className={styles.linkSocialMedia} href="https://www.tiktok.com/@dealdressropa" target='_blank'><img src="/tiktok.svg" alt="Estamos en TikTok"/></a>
                    <a   className={styles.linkSocialMedia} href="https://www.facebook.com/people/dealdresstiendaonline/100063642266774/" target='_blank'><img src="/facebook.svg" alt="Estamos en Facebook"/></a>
                    <a   className={styles.linkSocialMedia} href="https://api.whatsapp.com/send/?phone=5493415075439&text&type=phone_number&app_absent=0" target='_blank'><img src="/whatsapp.svg" alt="Estamos en WhatsApp"/></a>
                </article>
                <article>
                    <p>Contacto:</p>
                    <p><FontAwesomeIcon icon={faPhone}/> 3415075439</p>
                    <p><FontAwesomeIcon icon={faHouse} /> Donado 1500</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> dealdress.ropa@gmail.com</p>
                </article>
                <article className={styles.footerMetodoPago}>
                    <img src="/MetododePago.webp" alt="Paga con cualquier metodo de pago" />
                </article>
            </section>
        </footer>
    )
}