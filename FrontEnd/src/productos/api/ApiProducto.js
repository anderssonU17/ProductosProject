import axios from 'axios';
import Swal from 'sweetalert2';

import { URL_GLOBAL } from "../../constant";

const URL = URL_GLOBAL;

export const getProducts = async () => {
  try {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    // Configuración de la solicitud con el token de autenticación
    const config = {
      headers: {
        'x-token': token,
      },
    };

    // Realizar la solicitud GET a la API
    const response = await axios.get(`${URL}readProducts`, config);

    // Verificar la respuesta y retornar los productos
    if (response.data && response.data.ok && Array.isArray(response.data.productos)) {
      return response.data.productos;  // Cambiar 'products' por 'productos'
    } else {
      console.error("La respuesta no contiene una matriz de productos:", response.data);
      return [];
    }
  } catch (error) {
    // Manejo de errores
    Swal.fire({
      icon: 'error',
      title: 'Algo salió mal',
      text: error.response?.data?.message || 'No se pudieron obtener los productos',
    });

    if (error.response?.data?.message === 'El token ha expirado') {
      localStorage.removeItem('token');
      window.location.href = '/';
    }

    console.error("Error al obtener los productos:", error);
    return [];
  }
};

export const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const config = {
      headers: {
        'x-token': token,
      },
    };

    const response = await axios.post(`${URL}createProduct`, productData, config);

    if (response.data && response.data.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Producto creado',
        text: 'El producto se ha creado correctamente',
      });
      return response.data.producto;
    } else {
      console.error("Error al crear el producto:", response.data);
      return null;
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Algo salió mal',
      text: error.response?.data?.message || 'No se pudo crear el producto',
    });

    if (error.response?.data?.message === 'El token ha expirado') {
      localStorage.removeItem('token');
      window.location.href = '/';
    }

    console.error("Error al crear el producto:", error);
    return null;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const config = {
      headers: {
        'x-token': token,
      },
    };

    const response = await axios.put(`${URL}updateProduct/${id}`, productData, config);

    if (response.data && response.data.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado',
        text: 'El producto se ha actualizado correctamente',
      });
      return response.data.producto;
    } else {
      console.error("Error al actualizar el producto:", response.data);
      return null;
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Algo salió mal',
      text: error.response?.data?.message || 'No se pudo actualizar el producto',
    });

    if (error.response?.data?.message === 'El token ha expirado') {
      localStorage.removeItem('token');
      window.location.href = '/';
    }

    console.error("Error al actualizar el producto:", error);
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const config = {
      headers: {
        'x-token': token,
      },
    };

    const response = await axios.delete(`${URL}deleteProduct/${id}`, config);

    if (response.data && response.data.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: 'El producto se ha eliminado correctamente',
      });
      return true;
    } else {
      console.error("Error al eliminar el producto:", response.data);
      return false;
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Algo salió mal',
      text: error.response?.data?.message || 'No se pudo eliminar el producto',
    });

    if (error.response?.data?.message === 'El token ha expirado') {
      localStorage.removeItem('token');
      window.location.href = '/';
    }

    console.error("Error al eliminar el producto:", error);
    return false;
  }
};

