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
                    <p>Redes:</p>
                    <a className={styles.linkSocialMedia} href="https://www.instagram.com/dealdress.tiendaonline/" target='_blank'>Instagram</a>
                </article>
                <article>
                    <p>Contacto:</p>
                    <p><FontAwesomeIcon icon={faHouse} /> Donado 1500</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> dealdress.ropa@gmail.com</p>
                    <p><FontAwesomeIcon icon={faPhone}/> 3415075439</p>
                </article>
                <article>
                    <img src="/MetodosdePago.webp" alt="Paga con cualquier metodo de pago" />
                </article>
            </section>
        </footer>
    )
}