'use client'
import { getFirestore } from 'firebase/firestore';
import {React, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { useParams } from 'next/navigation'
import { getProductById } from '../components/productsQuery';
import Link from 'next/link';
import styles from './InfoProduct.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckMoving } from '@fortawesome/free-solid-svg-icons';
const firebaseConfig = {
  apiKey: "AIzaSyDRZu2-vVF7E_5jAjTS8la9tqlapofky-4",
  authDomain: "dealdress-90f47.firebaseapp.com",
  projectId: "dealdress-90f47",
  storageBucket: "dealdress-90f47.appspot.com",
  messagingSenderId: "377143023164",
  appId: "1:377143023164:web:7647ff34278d9248ce1539"
};
initializeApp(firebaseConfig);
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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
      <div className={styles.historyProductInfo}>
        <Link href='/tienda'>
          <span>TIENDA - </span>
        </Link>
        <span>{product.nombre}</span>
      </div>
      <div className={styles.infoProduct}>
        <img src={product?.image}/>
        <div className={styles.intInfoProduct}>
          <h1>{product?.nombre}</h1>
          <p>$ {product?.precio}</p>
          <p>Modelo: {product?.modelo}</p>
          <div>
            <p>ENVIOS POR <a href="https://www.andreani.com/#!/personas">ANDREANI</a><FontAwesomeIcon icon={faTruckMoving} /></p>
          </div>
          <div className={styles.tallesInfoProduct}>
            <label htmlFor="">Talle:</label>
          </div>
          <br />
          <br />
          <div>
            <button>agregar al carrito</button>
          </div>
          <br />
          <br />
          <br />
          <span>Vas a poder sumar y restar cantidades en el carrito.</span>
        </div>
      </div>
    </div>
)
  return(
    <>
      {loading ? <h2>Cargando item...</h2> : renderProducts()}
    </>
)
}
export default Product;