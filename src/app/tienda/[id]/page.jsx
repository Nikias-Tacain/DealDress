'use client'
import {React, useEffect, useState } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { useParams } from 'next/navigation'
import { getProductById } from '../components/productsQuery';
import Link from 'next/link';
import styles from './InfoProduct.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckMoving } from '@fortawesome/free-solid-svg-icons';
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
  const [valorSeleccionado, setValorSeleccionado] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  const handleButtonClickTalla = async (valor) => {
    setValorSeleccionado(valor);

    try {
      // Obtiene una referencia al documento existente del producto
      const productRef = doc(db, 'products', id); // Reemplaza 'tuColeccionDeProductos' con el nombre de tu colección

      // Actualiza el documento con el talle seleccionado
      await updateDoc(productRef, {
        talleSeleccionado: valor,
      });
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar el documento: ', error);
    }
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    const db = getFirestore();
    getProductById(db, id)
      .then((item) =>{
        setProduct(item)
        setLoading(false);
      })
  }, [id])
  
  const renderProducts = () => (
    <div className={styles.sectionProductInfo}>
      <div className={styles.historyProductInfo}>
        <Link href='/tienda'>
          <span>TIENDA</span>
          <span> - </span>
        </Link>
        <span>{product.nombre}</span>
      </div>
      
      <div className={styles.infoProduct}>
      <div className={styles.imagesProductId}>
        {product.image.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image-${index}`}
            style={{ width: '100px', height: '100px', margin: '10px', cursor: 'pointer' }}
            onClick={() => handleImageClick(image)}
          />
        ))}
        </div>
        <div className={styles.infoProductDiv}>
        {selectedImage ? (
          <img src={selectedImage} alt="Selected Image" style={{ width: '100%', height: '100%' }} />
        ) : (
          <img src={product.image} alt="" />
        )}
        </div>
        <div className={styles.intInfoProduct}>
          <h1>{product?.nombre}</h1>
          <p>$ {product?.precio}</p>
          <p>Modelo: {product?.modelo}</p>
          <div className={styles.talles}>
            {Object.keys(product.talles).map((talle, index) => (
              <ul key={index}>
                <button onClick={() => handleButtonClickTalla(product.talles[talle])} style={{
              backgroundColor: valorSeleccionado === product.talles[talle] ? "blue" : "",
              fontWeight: "bold",
            }}>
                  {product.talles[talle]}
                </button>
              </ul>
            ))}
          </div>
          {valorSeleccionado && (
              <p>Talla seleccionada: {valorSeleccionado}</p>
            )}
            <p>Talle: {product?.talleSeleccionado}</p>
          <div>
            <p>ENVIOS POR <a href="#">ANDREANI</a><FontAwesomeIcon icon={faTruckMoving} /></p>
          </div>
          <div className={styles.botonCarrito}>
            <p onClick={() => handleButtonClick(product)}>agregar al carrito</p>
          </div>
          <p>*Una vez elegido el talle espere a que la pagina recargue.</p>
        </div>
      </div>
      <div className={styles.guiaTalles}>
        <h2 id='talles'>TABLA DE TALLES</h2>
        <div>
          <img src={product?.tablaTalles} alt='Tabla talles' />
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