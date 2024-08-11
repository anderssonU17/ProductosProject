import axios from 'axios';
import Swal from "sweetalert2";
import { URL_GLOBAL } from "../../constant";

const URL = URL_GLOBAL;

export const getOwnUser = async (token) => {
    try {
      const response = await axios.get(`${URL}viewUser`, {
        headers: { 'x-token': token }
      });
      return response.data.usuario;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || 'Error al obtener el usuario',
        confirmButtonText: "OK"
      }).then(r => {
        if (r.isConfirmed && error.response?.data?.message === 'El token ha expirado') {
          localStorage.removeItem('token');
          window.location.href = '/';
        }
      });
    }
  };
  
  export const updateUser = async (id, userData, token) => {
    try {
      const response = await axios.put(`${URL}updateUser/${id}`, userData, {
        headers: { 'x-token': token }
      });
      return response.data.usuario;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal',
        text: error.response?.data?.message || 'No se pudo actualizar el usuario',
      });
      if (error.response?.data?.message === 'El token ha expirado') {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
      console.error("Error al actualizar el usuario:", error);
      return null;
    }
  };
  
  export const deleteUser = async (id, token) => {
    try {
      await axios.delete(`${URL}deleteuser/${id}`, {
        headers: { 'x-token': token }
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal',
        text: error.response?.data?.message || 'No se pudo eliminar el usuario',
      });
      if (error.response?.data?.message === 'El token ha expirado') {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
      console.error("Error al eliminar el usuario:", error);
    }
  };

// Función para listar todos los usuarios
export const listUsers = async () => {
    try {
        const response = await axios.get(`${URL}/readUsers`);
        return response.data.usuarios;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        throw error;
    }
};
