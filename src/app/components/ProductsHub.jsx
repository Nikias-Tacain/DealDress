'use client'
import Link from "next/link"
import styles from './ProductsHub.module.css'
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { getAllProducts, getAllPhotos } from "../tienda/components/productsQuery";
import { initializeApp } from 'firebase/app';
const ProductsHub = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyDRZu2-vVF7E_5jAjTS8la9tqlapofky-4",
        authDomain: "dealdress-90f47.firebaseapp.com",
        projectId: "dealdress-90f47",
        storageBucket: "dealdress-90f47.appspot.com",
        messagingSenderId: "377143023164",
        appId: "1:377143023164:web:7647ff34278d9248ce1539"
    };
    initializeApp(firebaseConfig);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const db= getFirestore();
        getAllProducts(db)
            .then((item) =>{
                setProducts(item)
            })
    },[])
    const [productsSlongan, setProductsSlogan] = useState([]);
    useEffect(() => {
        const db= getFirestore();
        getAllPhotos(db)
            .then((item) =>{
                setProductsSlogan(item)
            })
    },[])
    const deportivoProducts = products.filter(item => item.categoriaVisual === 'deportivo');
    const urbanoProducts = products.filter(item => item.categoriaVisual === 'urbano');
    const renderProducts = () => (
        <section className={styles.productsHub}>
            <h2>LO MAS VENDIDO</h2>
            <article>
                <div className={styles.productsHub__div}>
                    <h3>DEPORTIVO</h3>
                    <article>
                        <Link href='/tienda'>
                            <p>IR A LA TIENDA</p>
                        </Link>
                    </article>
                </div>
                <div className={styles.productsHub__accesoDirectoTienda}>
                    {deportivoProducts.map((item) =>(
                        <section key={item.id}>
                            <div className={styles.productsHub__img}>
                                <Link href={`/tienda/${item.id}`}>
                                    <img src={item.image} alt={item.nombre} />
                                </Link>
                            </div>
                            <div>
                                <h2>{item.nombre}</h2>
                                <p>{item.modelo}</p>
                            </div>
                        </section>
                    ))}
                </div>
            </article>
            <fieldset className={styles.sobreNosotros__info}>
                <legend>Deal Dress Tienda Online</legend>
                {productsSlongan.map((item =>(
                    <section key={item.id}>
                        <p key={item.id}>{item.textHome}</p>
                        <p key={item.id}>{item.textHome2}</p>
                    </section>
                )))}
                <article>
                    <Link href='/tienda'>
                        <p>INGRESAR A LA TIENDA</p>
                    </Link>
                </article>
            </fieldset>
            <article>
                <div className={styles.productsHub__div}>
                    <h3>URBANO</h3>
                    <article>
                        <Link href='/tienda'>
                            <p>IR A LA TIENDA</p>
                        </Link>
                    </article>
                </div>
                <div className={styles.productsHub__accesoDirectoTienda}>
                    {urbanoProducts.map((item) =>(
                        <section key={item.id}>
                            <div className={styles.productsHub__img}>
                                <Link href={`/tienda/${item.id}`}>
                                    <img src={item.image} alt={item.nombre} />
                                </Link>
                            </div>
                            <div>
                                <h2>{item.nombre}</h2>
                                <p>{item.modelo}</p>
                            </div>
                        </section>
                    ))}
                </div>
            </article>
        </section>
    )
    return(
        <div>
            {renderProducts()}
        </div>
    )
}
export default ProductsHub;