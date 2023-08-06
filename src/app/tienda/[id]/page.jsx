'use client'
import { getFirestore } from 'firebase/firestore';
import {React, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { useParams } from 'next/navigation'
import { getProductById } from '../components/productsQuery';
import Link from 'next/link';
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
    <div>
      <div>
        <Link href='/tienda'>
          <span>TIENDA - </span>
        </Link>
        <span>{product.nombre}</span>
      </div>
      <h1>{product?.nombre}</h1>
      <p>$ {product?.precio}</p>
    </div>
)
  return(
    <>
      {loading ? <h2>Cargando item...</h2> : renderProducts()}
    </>
)
}
export default Product;