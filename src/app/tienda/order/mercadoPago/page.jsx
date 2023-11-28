'use client'
import React, { useState} from 'react';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { useCarrito } from "../../components/CarritoContext";
import { useDescuento } from '../../components/descuentoContext';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import styles from './ordenMercadoPago.module.css';
import axios from "axios";
import Swal from 'sweetalert2';
export default function MercadoPago () {
  const { descuentoAplicado } = useDescuento(); // Utiliza el contexto de descuento
  const firebaseConfig = {
    apiKey: "AIzaSyDRZu2-vVF7E_5jAjTS8la9tqlapofky-4",
    authDomain: "dealdress-90f47.firebaseapp.com",
    projectId: "dealdress-90f47",
    storageBucket: "dealdress-90f47.appspot.com",
    messagingSenderId: "377143023164",
    appId: "1:377143023164:web:7647ff34278d9248ce1539"
  };
  initializeApp(firebaseConfig);
    const [preferenceId, setPreferenceId] = useState();
    const { carrito } = useCarrito();
    initMercadoPago('APP_USR-5e06b7fc-5e06-4627-b504-fa7f833a133b');
    const createPreference = async () => {
        try{
          const response = await axios.post("http://dealdress.vercel.app/tienda/order/mercadoPago/", {
            description: "Carrito de compras",
            price: totalPrecio,
            quantity: 1,
          });                   
          const { id } = response.data;
          return id;
        }catch (error) {
          console.log(error);
        }
      };
      let totalPrecio = carrito.reduce((acumulador, producto) => {
        return acumulador + (producto.precio * producto.cantidad);
      }, 0);
    
      // Aplicar el descuento si está activado
      if (descuentoAplicado) {
        totalPrecio *= 0.9; // Aplicar un 10% de descuento
      }
      const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [tel, setTel] = useState('');
  const [direccion, setDireccion] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Obtiene una referencia a la colección "facturacion" en Firestore
      localStorage.clear();
      const db = getFirestore();

      // Agrega un documento a la colección "facturacion" con los datos del formulario
      await addDoc(collection(db, 'facturacion'), {
        carrito,
        totalPrecio,
        nombre,
        correo,
        tel,
        direccion,
        codigoPostal,
      });

      // Limpia el formulario después de guardar los datos
      setNombre('');
      setCorreo('');
      setTel('');
      setDireccion('');
      setCodigoPostal('');
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Formulario enviado.'
      })

      const id = await createPreference();
      if (id) {
        setPreferenceId(id);
      }
    } catch (error) {
      console.error('Error al guardar los datos: ', error);
    }
  };
    return(
        <section className={styles.completeOrden}>
            <h3>COMPLETA LA ORDEN DE COMPRA</h3>
            <div>
            {carrito.length === 0 ? 'Carrito se encuentra vacio...' :
            <div className={styles.mercadoPagoOrden}>
              {carrito.map((student) =>(
                <div key={student.id} className={styles.divOrden}>
                  <img src={student.image} alt={student.nombre} />
                  <div >
                    <h2>{student.nombre}({student.talleSeleccionado})</h2>
                    <p>$ {student.precio}</p>
                    <p>{student.modelo}</p>
                    <div >
                      <p>Unidades: {student.cantidad}</p>
                    </div>
                  </div>
                </div>
              ))}
                <div>
                    <p>Total: $ {totalPrecio}</p>
                </div>
            </div>
            }
            </div>
            <div className={styles.formulario}>
            <form onSubmit={handleSubmit}>
        <label htmlFor="nombre" className={styles['form-label']}>Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={styles['form-input']}
          required
        /><br />

        <label htmlFor="correo" className={styles['form-label']}>Correo Electrónico:</label>
        <input
          type="email"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className={styles['form-input']}
          required
        /><br />

        <label htmlFor="tel" className={styles['form-label']}>Numero de telefono:</label>
        <input
          type='tel'
          id="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          className={styles['form-input']}
          placeholder='INGRESA EL NUMERO SOLAMENTE CON CODIGO DE AREA + NUM'
        /><br />

        <label htmlFor="direccion" className={styles['form-label']}>Dirección:</label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className={styles['form-input']}
          required
        /><br />

        <label htmlFor="codigo_postal" className={styles['form-label']}>Código Postal:</label>
        <input
          type="text"
          id="codigo_postal"
          value={codigoPostal}
          onChange={(e) => setCodigoPostal(e.target.value)}
          className={styles['form-input']}
          required
        /><br />
        <button type="submit" className={styles['submit-button']}>Guardar Datos</button>
      </form>
            </div>
            {preferenceId && <Wallet initialization={{ preferenceId}} />}
        </section>
    )
}