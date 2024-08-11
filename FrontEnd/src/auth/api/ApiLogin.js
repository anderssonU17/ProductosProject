import axios from "axios";
import Swal from 'sweetalert2';
import { URL_GLOBAL } from "../../constant";

const URL = URL_GLOBAL;

export const ApiLogin = async (email, password) => {
    try {
        const response = await axios.post(`${URL}login`, { email, password });
        const token = response.data.token;

        if (token) {
            localStorage.setItem("token", token);
            Swal.fire({
                icon: "success", 
                title: "Inicio de sesión exitoso", 
                text: "Se ha iniciado sesión correctamente"
            }).then(() => {
                // Redirigir a la página de productor
                window.location.href = '/productos';
            });
        }

        return token;
    } catch (error) {
        Swal.fire({
            icon: "error", 
            title: "Algo salió mal", 
            text: "No se ha podido iniciar sesión"
        });
    }
}

export const CreateUser = async (user, email, password, dateOfBirth, phoneNumber ) => {
  try {
      await axios.post(`${URL}createUser`, {
          user: user,
          email: email,
          password: password,
          dateOfBirth: dateOfBirth, 
          phoneNumber: phoneNumber
      })

      Swal.fire({
          icon: "success",
          title: "¡Usuario creado correctamente!",
          showConfirmButton: true,
          confirmButtonText: "OK"
      }).then(() => {
          // Redirigir al login cuando se haya guardado el usuario
          window.location.href = "/login";
      });
      
  } catch (error) {
      // Mostrar mensaje de error si no se guardo en el backend
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.message || "Error al crear el usuario",
          showConfirmButton: true,
          confirmButtonText: "OK"
      });
  }
};

