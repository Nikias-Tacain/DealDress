'use client'
import { useCarrito } from "../components/CarritoContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './orderPage.module.css';
import Link from "next/link";
import Swal from 'sweetalert2';
export default function OrderCart () {
    const { carrito, borrarItem, increaseQuantity, decreaseQuantity } = useCarrito();
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
      const redirigirAWhatsAppConMensaje = () => {
        // Mensaje que deseas enviar en WhatsApp
        const mensaje = `Mi carrito de compras:\n${carrito.map(item => {
          return `Nombre: ${item.nombre}, Precio: $${item.precio}, Cantidad: ${item.cantidad}, Modelo: ${item.modelo}`;
        }).join('\n')}
        
        
        Quisiera mas informacion sobre los pagos.`;
    
        // Número de teléfono (asegúrate de incluir el código de país)
        const numeroTelefono = "3415075439";
    
        // Crear la URL de WhatsApp con el mensaje
        const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    
        // Redirigir a la URL de WhatsApp
        window.open(urlWhatsApp, '_blank');
      };
      const pagoConfirmado = () => {
        localStorage.clear();
        Swal.fire({
          title: 'Una vez redirijido no vas a poder cambiar el carrito.',
          showDenyButton: true,
          confirmButtonText: 'Transferencia',
          denyButtonText: `MercadoPago`,
        }).then((result) => {
          if (result.isConfirmed) {
            redirigirAWhatsAppConMensaje();
            window.location.href = '/tienda';
          } else if (result.isDenied) {
            alert('Proximamente...')
          }
        })
      };
    return (
      <>
        <section className={styles.modalContent}>
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
              <div>
                <p>Total: $ {totalPrecio}</p>
                <h6>Una vez que le das a PAGAR el carrito se borra y pasamos a la fase final.</h6>
                <div className={styles.buttonsCarrito}>
                  <Link href='/tienda'>
                    <button className={styles.closeButton}>Seguir comprando</button>
                  </Link>
                  <button onClick={pagoConfirmado} className={styles.buyButton}>Pagar</button>
                </div>
              </div>
          </div>
        }
        </section>
      </>
    )
}