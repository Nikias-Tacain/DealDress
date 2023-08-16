'use client'
import React, { useState } from 'react';
import styles from './ShoppingCartModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { carrito } from './carrito';
const ShoppingCartModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button className={styles.openButton} onClick={toggleModal}>
        Carrito <FontAwesomeIcon icon={faCartShopping} /> {carrito.length}
      </button>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Carrito de Compras</h3>
            <div className={styles.carritoInt}>
              {carrito.length === 0 ? 'Carrito vacío' : carrito.map((producto) => (
                <div key={producto.id} className={styles.carritoIntProduct}>
                  <img src={producto.image} alt={producto.nombre} />
                  <div className={styles.carritoIntSection}>
                    <h2>{producto.nombre}</h2>
                    <p>$ {producto.precio}</p>
                    <p>{producto.modelo}</p>
                  </div>
                </div>
              ))}
              <div className={styles.carritoIntTotal}>
                  
              </div>
            </div>
            <div className={styles.buttons}>
              <button className={styles.closeButton} onClick={toggleModal}>Cerrar</button>
              <button className={styles.buyButton} style={{ display: carrito.length=== 0 ? 'none' : 'block' }}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartModal;
