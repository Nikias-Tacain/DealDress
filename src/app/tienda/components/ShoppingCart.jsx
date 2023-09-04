'use client'
import React, { useState } from 'react';
import styles from './ShoppingCartModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useCarrito } from './CarritoContext';
import Link from 'next/link';
const ShoppingCartModal = () => {
  const { carrito, clearCarrito, borrarItem, increaseQuantity, decreaseQuantity } = useCarrito();
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleRemoveClick = (productId) => {
    borrarItem(productId);
  };
  const handleIncreaseClick = (productId) => {
    increaseQuantity(productId);
  };

  const handleDecreaseClick = (productId) => {
    decreaseQuantity(productId);
  };
  const totalPrecio = carrito.reduce((acumulador, producto) => {
    return acumulador + (producto.precio * producto.cantidad);
  }, 0);
  return (
    <div>
      <button className={styles.openButton} onClick={toggleModal}>
        Carrito <FontAwesomeIcon icon={faCartShopping} /> {carrito.length}
      </button>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Carrito de Compras</h3>
            {carrito.length === 0 ? 'Carrito se encuentra vacio...' : 
              <div className={styles.carritoInt}>
              {carrito.map((student) =>(
                <div key={student.id} className={styles.carritoIntProduct}>
                  <img src={student.image} alt={student.nombre} />
                  <div className={styles.carritoIntSection}>
                    <h2>{student.nombre}</h2>
                    <p>$ {student.precio}</p>
                    <p>{student.modelo}</p>
                    <div className={styles.sectionControlls}>
                      <span onClick={() => handleIncreaseClick(student.id)}>+</span>
                      <p>{student.cantidad}</p>
                      <span onClick={() => handleDecreaseClick(student.id)}>-</span>
                    </div>
                  </div>
                  <div className={styles.contentButtons}>
                    <span onClick={() => handleRemoveClick(student.id)}><FontAwesomeIcon icon={faTrashCan} /></span>
                  </div>
                </div>
              ))}
              <div className={styles.carritoIntTotal}>
                <p>Total: $ {totalPrecio}</p>
              </div>
              </div>
            }
            <div className={styles.buttons}>
              <button className={styles.buttonBorrarCarrito} style={{ display: carrito.length === 0 ? 'none' : 'block'}} onClick={clearCarrito}><FontAwesomeIcon icon={faTrashCan} /></button>
              <button className={styles.closeButton} onClick={toggleModal}>Cerrar</button>
              <Link href='/tienda/order'>
                <button className={styles.buyButton} style={{ display: carrito.length === 0 ? 'none' : 'block'}}>Confirmar</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartModal;
