'use client'
import React, {useState} from 'react';
import styles from './HeaderHub.module.css'
import Link from 'next/link';
import ShoppingCartModal from '../tienda/components/ShoppingCart';

const HeaderHub = () => {
    const [mostrarCategorias, setMostrarCategorias] = useState(false);
    const [mostrarCategoriasDeportivas, setMostrarCategoriasDeportivas] = useState(false);
    const [mostrarCategoriasDeportivasHombre, setMostrarCategoriasDeportivasHombre] = useState(false);
    const [mostrarCategoriasDeportivasMujer, setMostrarCategoriasDeportivasMujer] = useState(false);

    const toggleCategorias = () => {
        setMostrarCategorias(!mostrarCategorias);
    };

    const toggleCategoriasDeportivo =() =>{
        setMostrarCategoriasDeportivas(!mostrarCategoriasDeportivas);
    }
    const toggleCategoriasDeportivoHombre =() =>{
        setMostrarCategoriasDeportivasHombre(!mostrarCategoriasDeportivasHombre);
    }
    const toggleCategoriasDeportivoMujer =() =>{
        setMostrarCategoriasDeportivasMujer(!mostrarCategoriasDeportivasMujer);
    }
  return (
    <section>
    <div>
        <div className={styles.varHeader}>
            <div className={styles.varHeaderDiv}>
                <img src="/bars-solid.svg" alt="" className={styles.barList} onClick={toggleCategorias}/>
            </div>
            <ShoppingCartModal />
        </div>
        <div>
        {mostrarCategorias && (
<div className={styles.categoriasDeslizantes}>
  <div>
  <Link href={'/tienda'}>
        <p>TODOS</p>
    </Link>
    <Link href={'/mujerUrbano'}>
        <p>MUJER - URBANO</p>
    </Link>
    <Link href={'/hombreUrbano'}>
        <p>HOMBRE - URBANO</p>
    </Link>
    <p onClick={toggleCategoriasDeportivo}>DEPORTIVO ↓</p>
    {mostrarCategoriasDeportivas && (
<div className={styles.categoriasDeslizantesDeportivo}>
  <div>
    <p onClick={toggleCategoriasDeportivoHombre}>HOMBRE ↓</p>
    {mostrarCategoriasDeportivasHombre && (
        <div className={styles.categoriaDesplizanteDeportivoHombre}>
            <Link href={'/shortHombre'}>
                <span>SHORT</span>
            </Link>
            <Link href={'/contactoDeporte'}>
                <span>DEPORTE DE CONTACTO</span>
            </Link>
            <Link href={'/fittnesHombre'}>
                <span>FITTNES</span>
            </Link>
            <Link href={'/remerasCamperasHombre'}>
                <span>REMERAS Y CAMPERAS</span>
            </Link>
            <Link href={'/pantalonesDeportivoHombre'}>
                <span>PANTALONES</span>
            </Link>
        </div>
)}
    <p onClick={toggleCategoriasDeportivoMujer}>MUJER ↓</p>
    {mostrarCategoriasDeportivasMujer && (
        <div className={styles.categoriaDesplizanteDeportivoHombre}>
            <Link href={'/topMujer'}>
                <span>TOP</span>
            </Link>
            <Link href={'/calzasMujer'}>
                <span>CALZAS</span>
            </Link>
            <Link href={'/remerasMujer'}>
                <span>REMERAS</span>
            </Link>
            <Link href={'/buzosCamperasMujer'}>
                <span>BUZOS Y CAMPERAS</span>
            </Link>
        </div>
)}
  </div>
</div>
)}
    <Link href={'/calzado'}>
        <p>CALZADO</p>
    </Link>
    <Link href={'/otros'}>
        <p>OTROS</p>
    </Link>
    <Link href={'/ofertas'}>
        <p>OFERTAS</p>
    </Link>
    <Link href={'/#metodosPagoDisplay'}>
        <p>METODOS DE PAGO</p>
    </Link>
    <Link href={'/#politicaCambio'}>
        <p>POLÍTICA  DE CAMBIO</p>
    </Link>
  </div>
</div>
)}
        </div>
    </div>
</section>
  )
}

export default HeaderHub;