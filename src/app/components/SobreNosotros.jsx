'use client'
import styles from './MainHub.module.css'
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { getAllPhotos } from '../tienda/components/productsQuery';
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyDRZu2-vVF7E_5jAjTS8la9tqlapofky-4",
    authDomain: "dealdress-90f47.firebaseapp.com",
    projectId: "dealdress-90f47",
    storageBucket: "dealdress-90f47.appspot.com",
    messagingSenderId: "377143023164",
    appId: "1:377143023164:web:7647ff34278d9248ce1539"
};
initializeApp(firebaseConfig);
export default function SobreNosotros() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const db= getFirestore();
        getAllPhotos(db)
            .then((item) =>{
                setProducts(item)
            })
    },[])
    const photosProducts1 = products.filter(item => item.categoriaVisual === 'fila1');
    const photosProducts2 = products.filter(item => item.categoriaVisual === 'fila2');
    return(
        <div className={styles.sobreNosotros}>
            <div id='quienesSomos'>
                <section className={styles.sobreNosotrosEdit}>
                    <section>
                        {photosProducts1.map((item =>(
                            <article key={item.id}>
                                <img src={item.image} alt={item.nombre} />
                            </article>
                        )))}
                    </section>
                    <section>
                        {photosProducts2.map((item =>(
                            <article key={item.id}>
                                <img src={item.image} alt={item.nombre} />
                            </article>
                        )))}
                    </section>
                </section>
            </div>
        </div>
    )
}