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
        <button>TODOS</button>
    </Link>
    <Link href={'/mujerUrbano'}>
        <button>MUJER - URBANO</button>
    </Link>
    <Link href={'/hombreUrbano'}>
        <button>HOMBRE - URBANO</button>
    </Link>
    <Link href={'/tienda/#'}>
        <button onClick={toggleCategoriasDeportivo}>DEPORTIVO ↓</button>
    </Link>
    <Link href={'/calzado'}>
        <button>CALZADO</button>
    </Link>
    <Link href={'/otros'}>
        <button>OTROS</button>
    </Link>
    <Link href={'/ofertas'}>
        <button>OFERTAS</button>
    </Link>
  </div>
</div>
)}
{mostrarCategoriasDeportivas && (
<div className={styles.categoriasDeslizantesDeportivo}>
  <div>
    <button>HOMBRE</button>
    <button>MUJER</button>
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