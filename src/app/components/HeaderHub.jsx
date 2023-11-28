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
    const [mostrarCategoriasMetodoPago, setMostrarCategoriasMetodoPago] = useState(false);
    const [mostrarCategoriasPoliticaCambio, setMostrarCategoriasPoliticaCambio] = useState(false);

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
    const toggleCategoriasMetodosPago =() =>{
        setMostrarCategoriasMetodoPago(!mostrarCategoriasMetodoPago);
    }
    const toggleCategoriasPoliticaCambio =() =>{
        setMostrarCategoriasPoliticaCambio(!mostrarCategoriasPoliticaCambio);
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
                <span>DEPORTES DE CONTACTO</span>
            </Link>
            <Link href={'/fittnesHombre'}>
                <span>FITNESS</span>
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
    <p onClick={toggleCategoriasMetodosPago}>METODOS DE PAGO ↓</p>
    {mostrarCategoriasMetodoPago && (
            <div className={styles.categoriaDesplizanteDeportivoHombre}>
             <span>⚫ Efectivo</span>
             <span>⚫ Tarjetas de debito</span>
             <span>⚫ Tarjetas de credito</span>
             <span>⚫ RapiPago / PagoFacil</span>
             <span>⚫ Mercado Pago</span>
             <span>⚫ Transferencia</span>
           </div>
)}
    <p onClick={toggleCategoriasPoliticaCambio}>POLÍTICA  DE CAMBIO ↓</p>
    {mostrarCategoriasPoliticaCambio && (
                <div className={styles.categoriaDesplizanteDeportivoHombre}>
                  <span>⚫ Una vez recibido  tu pedido 72hs para realizar el cambio</span>
                  <span>⚫ Se cambia articulo por artículo</span>
                  <span>⚫ Solo debes abonar el correo</span>
                </div>
)}
  </div>
</div>
)}
        </div>
    </div>
</section>
  )
}

export default HeaderHub;