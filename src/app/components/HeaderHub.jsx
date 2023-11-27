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
                <p>SHORT</p>
            </Link>
            <Link href={'/contactoDeporte'}>
                <p>DEPORTE DE CONTACTO</p>
            </Link>
            <Link href={'/fittnesHombre'}>
                <p>FITTNES</p>
            </Link>
            <Link href={'/remerasCamperasHombre'}>
                <p>REMERAS Y CAMPERAS</p>
            </Link>
            <Link href={'/pantalonesDeportivoHombre'}>
                <p>PANTALONES</p>
            </Link>
        </div>
)}
    <p onClick={toggleCategoriasDeportivoMujer}>MUJER ↓</p>
    {mostrarCategoriasDeportivasMujer && (
        <div className={styles.categoriaDesplizanteDeportivoHombre}>
            <Link href={'/topMujer'}>
                <p>TOP</p>
            </Link>
            <Link href={'/calzasMujer'}>
                <p>CALZAS</p>
            </Link>
            <Link href={'/remerasMujer'}>
                <p>REMERAS</p>
            </Link>
            <Link href={'/buzosCamperasMujer'}>
                <p>BUZOS Y CAMPERAS</p>
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