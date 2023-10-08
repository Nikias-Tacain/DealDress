// CarritoContext.js
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2'

const CarritoContext = createContext();


export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children}) {
  const [carrito, setCarrito] = useState([]);
  useEffect(() => {
    // Obtén el carrito almacenado en localStorage al cargar la página.
    const storedCarrito = localStorage.getItem('carrito');
    if (storedCarrito) {
      setCarrito(JSON.parse(storedCarrito));
    }
  }, []);
  useEffect(() => {
    // Almacena el carrito en localStorage cada vez que cambie.
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);
  const handleButtonClick = (product) => {
    const existingProductIndex = carrito.findIndex(
      (p) => p.id === product.id && p.talleSeleccionado === product.talleSeleccionado
    );
  
    if (existingProductIndex !== -1) {
      // Si el producto ya existe en el carrito (por ID y talleSeleccionado), aumentar la cantidad
      const updatedCarrito = [...carrito];
      updatedCarrito[existingProductIndex].cantidad += 1;
      setCarrito(updatedCarrito);
  
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
  
      Toast.fire({
        icon: 'info',
        title: 'El producto se encuentra agregado. Se suma su cantidad.'
      });
    } else {
      // Si el producto no existe en el carrito (por ID y talleSeleccionado), agregarlo como nuevo
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
  
      Toast.fire({
        icon: 'success',
        title: 'Producto agregado al carrito.'
      });
  
      setCarrito([
        ...carrito,
        {
          id: product.id,
          image: product.image,
          nombre: product.nombre,
          talleSeleccionado: product.talleSeleccionado,
          precio: product.precio,
          modelo: product.modelo,
          cantidad: 1, // Inicializar cantidad en 1 para un nuevo producto
        },
      ]);
    }
  
};
const clearCarrito = () => {
    Swal.fire({
        title: 'Estas seguro?',
        text: "Se borrara todo el carrito !!!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar !'
      }).then((result) => {
        if (result.isConfirmed) {
            setCarrito([]); // Establecer el carrito como un array vacío
          Swal.fire(
            'Borrado',
            'El carrito se borro completamente',
            'success'
          )
        }
    } )
  };
  const eliminarProductoDelCarrito = (productoAEliminar) => {
    // Filtrar el carrito para excluir el producto a eliminar
    const carritoActualizado = carrito.filter(
      (producto) => !(producto.id === productoAEliminar.id && producto.talleSeleccionado === productoAEliminar.talleSeleccionado)
    );
  
    // Actualizar el carrito con la nueva lista de productos
    setCarrito(carritoActualizado);
  
    // Puedes agregar notificaciones u otras lógicas aquí
  };
  
  
  const aumentarCantidad = (productoAAumentar) => {
    const carritoActualizado = carrito.map((producto) => {
      if (producto.id === productoAAumentar.id && producto.talleSeleccionado === productoAAumentar.talleSeleccionado) {
        // Aumentar la cantidad del producto
        producto.cantidad += 1;
      }
      return producto;
    });
  
    setCarrito(carritoActualizado);
  };
  
  const disminuirCantidad = (productoADisminuir) => {
    const carritoActualizado = carrito.map((producto) => {
      if (producto.id === productoADisminuir.id && producto.talleSeleccionado === productoADisminuir.talleSeleccionado) {
        // Reducir la cantidad del producto, asegurándose de que no sea menor que 1
        producto.cantidad = Math.max(1, producto.cantidad - 1);
      }
      return producto;
    });
  
    setCarrito(carritoActualizado);
  };  
  return (
    <CarritoContext.Provider value={{ carrito, handleButtonClick, clearCarrito, eliminarProductoDelCarrito, disminuirCantidad, aumentarCantidad }}>
      {children}
    </CarritoContext.Provider>
  );
}
