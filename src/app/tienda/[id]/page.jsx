'use client'
import {React, useEffect, useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { useParams } from 'next/navigation'
import { getProductById } from '../components/productsQuery';
import Link from 'next/link';
import styles from './InfoProduct.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckMoving } from '@fortawesome/free-solid-svg-icons';
import ShoppingCartModal from '../components/ShoppingCart';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import { useCarrito } from '../components/CarritoContext';


const Product = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDRZu2-vVF7E_5jAjTS8la9tqlapofky-4",
    authDomain: "dealdress-90f47.firebaseapp.com",
    projectId: "dealdress-90f47",
    storageBucket: "dealdress-90f47.appspot.com",
    messagingSenderId: "377143023164",
    appId: "1:377143023164:web:7647ff34278d9248ce1539"
  };
  initializeApp(firebaseConfig);
  const { handleButtonClick } = useCarrito();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  useEffect(() => {
    const db = getFirestore();
    getProductById(db, id)
      .then((item) =>{
        setProduct(item)
      })
  }, [id])
  useEffect(() =>{
    setTimeout(() =>{
      setLoading(false);
    },1000)  
  })
  const renderProducts = () => (
    <div className={styles.sectionProductInfo}>
      <div className={styles.sectionProductInfoCarrito}>
        <ShoppingCartModal />
      </div>
      <div className={styles.historyProductInfo}>
        <Link href='/tienda'>
          <span>TIENDA</span>
          <span> - </span>
        </Link>
        <span>{product.nombre}</span>
      </div>
      <div className={styles.infoProduct}>
        <div className={styles.infoProductDiv}>
          <img src={product?.image} alt={product?.nombre}/>
        </div>
        <div className={styles.intInfoProduct}>
          <h1>{product?.nombre}</h1>
          <p>$ {product?.precio}</p>
          <p>Modelo: {product?.modelo}</p>
          <div>
            <p>ENVIOS POR <a href="#">ANDREANI</a><FontAwesomeIcon icon={faTruckMoving} /></p>
          </div>
          <div className={styles.tallesInfoProduct}>
            <label htmlFor="">Talle:</label>
            <div>
              <ul>
                {product.talles.map((size) => (
                  <li key={size}>
                    <input type="checkbox" name="" id="" onClick={() => console.log(size)}/>
                    <span> {size}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <br />
          <br />
          <div className={styles.botonCarrito}>
            <p onClick={() => handleButtonClick(product)}>agregar al carrito</p>
          </div>
          <br />
          <br />
          <br />
          <span>*Contactanos por WhatSapp si compras la misma prenda distinto talle.</span>
        </div>
      </div>
    </div>
  )
  return(
    <>
      {loading ? <h2>Cargando item...</h2> : renderProducts()}
      <FloatingWhatsAppButton />
    </>
)
}
export default Product;