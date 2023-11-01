'use client'
import styles from './TiendaNavBar.module.css';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { getAllImagesPortada } from './productsQuery';
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
export default function CarrouselImgs() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const db= getFirestore();
        getAllImagesPortada(db)
            .then((item) =>{
                setProducts(item)
            })
    },[])
    return(
        <section className={styles.bannerTienda}>
            {products.map((item =>(
                            <div key={item.id}>
                                <img src={item.image} alt='' />
                            </div>
            )))}
            <div className={styles.headerHubCarrouselMarquee}>
                <marquee behavior="scroll" direction="left">
                    PEDIDOS MAYORISTAS - CONTACTAR POR WHATSAPP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </marquee>
            </div>
        </section>
    )
}