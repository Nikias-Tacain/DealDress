'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';

const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

// Toast reusable
const createToast = (icon, title) => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon,
    title,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
};

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  // LocalStorage - cargar al iniciar
  useEffect(() => {
    const storedCarrito = localStorage.getItem('carrito');
    if (storedCarrito) {
      setCarrito(JSON.parse(storedCarrito));
    }
  }, []);

  // LocalStorage - guardar al modificar
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const handleButtonClick = useCallback((product) => {
    setCarrito((prevCarrito) => {
      const index = prevCarrito.findIndex(
        (p) => p.id === product.id && p.talleSeleccionado === product.talleSeleccionado
      );

      if (index !== -1) {
        const updated = [...prevCarrito];
        updated[index] = {
          ...updated[index],
          cantidad: updated[index].cantidad + 1,
        };
        createToast('info', 'El producto se encuentra agregado. Se suma su cantidad.');
        return updated;
      } else {
        createToast('success', 'Producto agregado al carrito.');
        return [
          ...prevCarrito,
          {
            id: product.id,
            image: product.image,
            nombre: product.nombre,
            talleSeleccionado: product.talleSeleccionado,
            precio: product.precio,
            modelo: product.modelo,
            cantidad: 1,
          },
        ];
      }
    });
  }, []);

  // ✅ Borrar con confirmación
  const clearCarrito = useCallback(() => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se borrará todo el carrito!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        setCarrito([]);
        Swal.fire('Borrado', 'El carrito se borró completamente', 'success');
      }
    });
  }, []);

  // ✅ Borrar sin confirmación (usado en /success)
  const clearCarritoSinConfirmacion = useCallback(() => {
    setCarrito([]);
  }, []);

  const eliminarProductoDelCarrito = useCallback((productoAEliminar) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter(
        (p) =>
          !(p.id === productoAEliminar.id && p.talleSeleccionado === productoAEliminar.talleSeleccionado)
      )
    );
  }, []);

  const aumentarCantidad = useCallback((productoAAumentar) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((p) =>
        p.id === productoAAumentar.id && p.talleSeleccionado === productoAAumentar.talleSeleccionado
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      )
    );
  }, []);

  const disminuirCantidad = useCallback((productoADisminuir) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((p) => {
        if (p.id === productoADisminuir.id && p.talleSeleccionado === productoADisminuir.talleSeleccionado) {
          return { ...p, cantidad: Math.max(1, p.cantidad - 1) };
        }
        return p;
      })
    );
  }, []);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        handleButtonClick,
        clearCarrito,
        clearCarritoSinConfirmacion,
        eliminarProductoDelCarrito,
        aumentarCantidad,
        disminuirCantidad,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
