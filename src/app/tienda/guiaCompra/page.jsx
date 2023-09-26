'use client'
import Image from "next/image"
import styles from './guiaCompra.module.css';
import Link from "next/link";
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { getAllGuiaCompra } from "../components/productsQuery";
import { initializeApp } from 'firebase/app';
const GuiaCompra = ()=>{
    const [products, setProducts] = useState([]);
    const firebaseConfig = {
        apiKey: "AIzaSyDRZu2-vVF7E_5jAjTS8la9tqlapofky-4",
        authDomain: "dealdress-90f47.firebaseapp.com",
        projectId: "dealdress-90f47",
        storageBucket: "dealdress-90f47.appspot.com",
        messagingSenderId: "377143023164",
        appId: "1:377143023164:web:7647ff34278d9248ce1539"
    };
    initializeApp(firebaseConfig);

    useEffect(() => {
        const db= getFirestore();
        getAllGuiaCompra(db)
            .then((item) =>{
                setProducts(item)
            })
    },[])
    return(
        <section className={styles.guiaCompra}>
            <article className={styles.tittleGuiaCompra}>
                <h2>GUIA DE COMPRA</h2>
                <p>DealDress te proporciona una guia detallada de como realizar una compra en el sitio web.</p>
            </article>
            <div>
                <h3>⚪PASO 1</h3>
                {products.map(item =>(
                <div>
                    <p>{item.paso1Texto1}</p>
                    <br />
                    <p>{item.paso1Texto2}</p>
                    <article>
                        <Image src="/imgTiendaGuia.png" alt="guiaImagen1" width={1100} height={520}/>
                    </article>
                </div>
                ))}
                <h3>⚪EXTRA</h3>
                {products.map(item =>(
                <div>
                <p>{item.extra}</p>
                <article>
                    <Image src="/imgTiendaGuiaCategorias.png" alt="guiaImagen2" width={1100} height={520}/>
                </article>
                </div>
                ))}
                <h3>⚪PASO 2</h3>
                {products.map(item=>(
                    <div>
                    <p>{item.paso2}</p>
                    <article>
                        <Image src="/imgTiendaGuiaOrder.png" alt="guiaImagen3" width={1100} height={520}/>
                    </article>
                </div>
                ))}
                <h3>⚪PASO 3</h3>
                {products.map(item=>(
                    <div>
                    <p>{item.paso3}</p>
                    <article>
                        <Image src="/imgTiendaGuiaOrderPago.png" alt="guiaImagen4" width={1100} height={520}/>
                    </article>
                </div>
                ))}
                <div>
                    <Link href='/tienda'>
                        <button className={styles.buttonGuiaCompraTienda}>Tienda</button>
                    </Link>
                </div>
            </div>
            
        </section>
    )
}

export default GuiaCompra;