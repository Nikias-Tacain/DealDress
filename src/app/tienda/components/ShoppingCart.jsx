'use client'
import React, { useState } from 'react';
import styles from './ShoppingCartModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useCarrito } from './CarritoContext';
import { useDescuento } from './descuentoContext';
import Link from 'next/link';
const ShoppingCartModal = ({ valorSeleccionado }) => {
  const { carrito, clearCarrito, borrarItem, increaseQuantity, decreaseQuantity } = useCarrito();
  const { descuentoAplicado, toggleDescuento } = useDescuento(); // Utiliza el contexto de descuento
  const [isOpen, setIsOpen] = useState(false);
  const [codigoDescuento, setCodigoDescuento] = useState('');
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const aplicarDescuento = () => {
    // Verificar si el código de descuento es válido (por ejemplo, "Descuento")
    if (codigoDescuento.toLowerCase() === 'FELIZMAMA') {
      toggleDescuento(); // Activa o desactiva el descuento
    } else {
      alert('Código de descuento inválido');
    }
  };

  let totalPrecio = carrito.reduce((acumulador, producto) => {
    return acumulador + (producto.precio * producto.cantidad);
  }, 0);

  // Aplicar el descuento si está activado
  if (descuentoAplicado) {
    totalPrecio *= 0.9; // Aplicar un 10% de descuento
  }

  const handleRemoveClick = (productId) => {
    borrarItem(productId);
  };
  const handleIncreaseClick = (productId) => {
    increaseQuantity(productId);
  };

  const handleDecreaseClick = (productId) => {
    decreaseQuantity(productId);
  };
  return (
    <div>
      <button className={styles.openButton} onClick={toggleModal}>
        CARRITO <FontAwesomeIcon icon={faCartShopping} /> {carrito.length}
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
                    <h2>{student.nombre}({valorSeleccionado})</h2>
                    <p>$ {student.precio}</p>
                    <p>{student.modelo}</p>
                    <div className={styles.sectionControlls}>
                      <span onClick={() => handleDecreaseClick(student.id)}>-</span>
                      <p>{student.cantidad}</p>
                      <span onClick={() => handleIncreaseClick(student.id)}>+</span>
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
              <div>
                <label className={styles.label}>¿ Tienes un codigo de descuento ? </label>
                <input
                  type="text"
                  value={codigoDescuento}
                  placeholder='CODIGO DESCUENTO'
                   onChange={(e) => setCodigoDescuento(e.target.value)}
                />
                <button onClick={aplicarDescuento} className={styles.button}>Enviar</button>
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
