// CarritoContext.js
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2'

const CarritoContext = createContext();


export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children, valorSeleccionado }) {
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
    const existingProductIndex = carrito.findIndex((p) => p.id === product.id && p.valorSeleccionado === valorSeleccionado);

    if (existingProductIndex !== -1) {
    // Si el producto ya existe en el carrito (por ID), aumentar la cantidad
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
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'info',
        title: 'El producto se encuentra agregado. Se suma su cantidad.'
    })
  } else {
    // Si el producto no existe en el carrito (por ID), agregarlo como nuevo
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Producto agregado al carrito.'
    })
    setCarrito([
      ...carrito,
      {
        id: product.id,
        image: product.image,
        nombre: product.nombre,
        precio: product.precio,
        modelo: product.modelo,
        cantidad: product.cantidad,
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
  const borrarItem = (productId) => {
    const updatedCarrito = carrito.filter((product) => product.id != productId);
    setCarrito(updatedCarrito);
    // Puedes agregar notificaciones u otras lógicas aquí
  };
  const increaseQuantity = (productId) => {
    const updatedCarrito = carrito.map((product) => {
      if (product.id === productId) {
        return { ...product, cantidad: product.cantidad + 1 };
      }
      return product;
    });
    setCarrito(updatedCarrito);
  };
  const decreaseQuantity = (productId) => {
    const updatedCarrito = carrito.map((product) => {
      if (product.id === productId && product.cantidad > 1) {
        return { ...product, cantidad: product.cantidad - 1 };
      }
      return product;
    });
    setCarrito(updatedCarrito);
  };
  return (
    <CarritoContext.Provider value={{ carrito, handleButtonClick, clearCarrito, borrarItem, increaseQuantity, decreaseQuantity }}>
      {children}
    </CarritoContext.Provider>
  );
}
