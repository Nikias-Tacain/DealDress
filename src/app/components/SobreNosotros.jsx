import styles from './MainHub.module.css'
export default function SobreNosotros() {
    return(
        <div className={styles.sobreNosotros}>
            <h2 id='quienesSomos'>¿QUIENES SOMOS?</h2>
            <div>
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
                    <legend>Deal Dress</legend>
                    <p>Somos una empresa dedicada a la indumentaria deportiva, el proyecto nacio a partir de la necesidad que vimos en la gente de vestir prendas a buen precio  a la hora de realizar actividad fisica, nos destacamos por la comodidad y la variedad.</p>
                    <button>Ingreso a la tienda</button>
                </fieldset>
            </div>
        </div>
    )
}