'use client'
import Link from 'next/link';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { getAllProducts } from './productsQuery';
import { initializeApp } from 'firebase/app';
import styles from './CardTienda.module.css';
const firebaseConfig = {
    apiKey: "AIzaSyDRZu2-vVF7E_5jAjTS8la9tqlapofky-4",
    authDomain: "dealdress-90f47.firebaseapp.com",
    projectId: "dealdress-90f47",
    storageBucket: "dealdress-90f47.appspot.com",
    messagingSenderId: "377143023164",
    appId: "1:377143023164:web:7647ff34278d9248ce1539"
};
initializeApp(firebaseConfig);
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const db= getFirestore();
        getAllProducts(db)
            .then((item) =>{
                setProducts(item)
            })
    },[])
    useEffect(() =>{
      setTimeout(() =>{
        setLoading(false);
      },1000)  
    })

    const renderProducts = () => (
        products?.map(item => (
            <section className={styles.cardProduct} key={item.id}>
                <article>
                    <div>
                        <img src={item.image}/>
                        <h2>{item.nombre}</h2>
                        <p>$ {item.precio}</p>
                    </div>
                    <div className={styles.cardProduct__link}>
                        <button>Agregar al carrito</button>
                        <Link href={`/tienda/${item.id}`}>👁Ver mas detalles</Link>
                    </div>
                </article>
            </section>
        ))
    )
    return(
        <>
            {loading ? <h1>Cargando productos...</h1> : renderProducts()}
        </>
    )
}

export default ProductList;