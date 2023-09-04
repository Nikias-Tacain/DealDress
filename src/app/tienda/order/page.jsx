'use client'
import { useCarrito } from "../components/CarritoContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
export default function OrderCart () {
    const { carrito, clearCarrito, borrarItem, increaseQuantity, decreaseQuantity } = useCarrito();
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
        <>
           <section>
           <div >
              {carrito.map((student) =>(
                <div key={student.id} >
                  <img src={student.image} alt={student.nombre} />
                  <div >
                    <h2>{student.nombre}</h2>
                    <p>$ {student.precio}</p>
                    <p>{student.modelo}</p>
                    <div >
                      <span onClick={() => handleIncreaseClick(student.id)}>+</span>
                      <p>{student.cantidad}</p>
                      <span onClick={() => handleDecreaseClick(student.id)}>-</span>
                    </div>
                  </div>
                  <div >
                    <span onClick={() => handleRemoveClick(student.id)}><FontAwesomeIcon icon={faTrashCan} /></span>
                  </div>
                </div>
              ))}
              <div>
                <p>Total: $ {totalPrecio}</p>
              </div>
              </div>
           </section>
        </>
    )
}