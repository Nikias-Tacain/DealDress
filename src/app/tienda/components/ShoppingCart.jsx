'use client'
import React, { useState, useEffect } from 'react';
import styles from './ShoppingCartModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
let carrito = [];

export const handleButtonClick = (product) => {
  const existingProduct = carrito.find(p => p.nombre === product.nombre);
  if (existingProduct) {
    // Si el producto ya existe, aumentar la cantidad
    existingProduct.cantidad += 1;
  } else {
    // Si el producto no existe, agregarlo a la lista con cantidad 1
    carrito.push({image: product.image ,nombre: product.nombre, precio: product.precio , modelo: product.modelo , cantidad: product.cantidad});
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
};
const ShoppingCartModal = () => {
  useEffect(() => {
    // Intenta recuperar el carrito del localStorage al cargar la página
    const storedCart = localStorage.getItem('carrito');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      parsedCart.forEach(item => {
        carrito.push(item);
      });
    }
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const totalPrecio = carrito.reduce((acumulador, producto) => {
    return acumulador + (producto.precio * producto.cantidad);
  }, 0);
  const sumarCantidad = (product) =>{
    product.cantidad += 1;
  }
  const restarCantidad = (product) =>{
    if (product.cantidad > 1) {
      product.cantidad -= 1;
    }
  }
  const borrarTodo = () =>{
    carrito = [];
  }
  const borrarItem = (prodId) =>{
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
  }
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
                    <p>Cantidad: {student.cantidad}</p>
                  </div>
                  <div className={styles.contentButtons}>
                    <button onClick={() => borrarItem()}><FontAwesomeIcon icon={faX} style={{color: "#ff1100",}} /></button>
                    <button onClick={() => sumarCantidad(student)}>+</button>
                    <button onClick={() => restarCantidad(student)}>-</button>
                  </div>
                </div>
              ))}
              <div className={styles.carritoIntTotal}>
                <p>Total: $ {totalPrecio}</p>
              </div>
              </div>
            }
            <div className={styles.buttons}>
              <p style={{ display: carrito.length === 0 ? 'none' : 'block' }}>Importante: Guardar los cambios ocasionados asi seran reflejados en el carrito.</p>
              <button className={styles.buttonBorrarCarrito} style={{ display: carrito.length === 0 ? 'none' : 'block' }} onClick={() => borrarTodo()}><FontAwesomeIcon icon={faTrashCan} /></button>
              <button className={styles.closeButton} onClick={toggleModal}>Guardar</button>
              <button className={styles.buyButton} style={{ display: carrito.length === 0 ? 'none' : 'block' }}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartModal;
