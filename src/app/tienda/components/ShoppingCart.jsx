'use client'
import React, { useState } from 'react';
import styles from './ShoppingCartModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const ShoppingCartModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className={styles.openButton} onClick={toggleModal}>
        Carrito <FontAwesomeIcon icon={faCartShopping} />
      </button>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Carrito de Compras</h3>
            {/* Aquí puedes agregar contenido relacionado con el carrito de compras */}
            <button className={styles.closeButton} onClick={toggleModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartModal;
