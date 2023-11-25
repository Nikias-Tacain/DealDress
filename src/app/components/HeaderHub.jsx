'use client'
import React, {useState} from 'react';
import styles from './HeaderHub.module.css'
import Link from 'next/link';
import Image from 'next/image';
import ShoppingCartModal from '../tienda/components/ShoppingCart';

const HeaderHub = () => {
    const [mostrarCategorias, setMostrarCategorias] = useState(false);
    const [mostrarCategoriasDeportivas, setMostrarCategoriasDeportivas] = useState(false);

    const toggleCategorias = () => {
        setMostrarCategorias(!mostrarCategorias);
    };

    const toggleCategoriasDeportivo =() =>{
        setMostrarCategoriasDeportivas(!mostrarCategoriasDeportivas);
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
    <p>HOMBRE</p>
    <p>MUJER</p>
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
        <header className={styles.headerHub}>
            <Link href='/'>
                <Image src="/iconoDealDress.png" alt="Logo Deal Dress" width={350} height={350}/>
            </Link>
        </header>
    </div>
</section>
  )
}

export default HeaderHub;