import styles from './MainHub.module.css'
import Link from 'next/link'
export default function SobreNosotros() {
    return(
        <div className={styles.sobreNosotros}>
            <div id='quienesSomos'>
                <section>
                    <article>
                        <img src="/ComboEverlast.webp" alt="Combo Everlast" />
                        <img src="/RemeraVenom.webp" alt="Remera Venom" />
                        <img src="/ConjuntoDeportivo.webp" alt="Conjunto Deportivo" />
                        <img src="/BotasEverlast.webp" alt="Botas Everlast Negras" />
                        <img src="/BotasEverlastRosas.webp" alt="Botas Everlast Rosas y Amarillas" />
                        <img src="/BoxerHombre.webp" alt="Boxer de Hombre" />
                    </article>
                    <article>
                        <img src="/RemeraEverlast.webp" alt="Remera Everlast" />
                        <img src="/JordanBotas.webp" alt="Jordan Botas" />
                        <img src="/Joggin.webp" alt="Joggins" />
                        <img src="/CamperaEverlast.webp" alt="Campera Everlast" />
                        <img src="/ConjuntoMujer.webp" alt="Conjunto de Mujer" />
                        <img src="/BolsoMujer.webp" alt="Bolsos de Mujer" />
                    </article>
                </section>
                <fieldset className={styles.sobreNosotros__info}>
                    <legend>Deal Dress Tienda Online</legend>
                    <p>Nos destacamos por la amplia variedad de indumentaria y calzados.</p>
                    <article>
                        <Link href='/tienda'>
                            <p>Ingresar a la tienda</p>
                        </Link>
                    </article>
                </fieldset>
            </div>
        </div>
    )
}