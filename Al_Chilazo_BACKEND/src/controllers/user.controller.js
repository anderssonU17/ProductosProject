'use strict';

const Usuario = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/create-jwt');

// Crear Usuarios
const createUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).send({
                message: `Un usuario ya usa el email ${email}`,
                ok: false,
                usuario,
            });
        }

        usuario = new Usuario(req.body);

        // Encriptación de contraseña
        const salt = await bcrypt.genSalt();
        usuario.password = await bcrypt.hash(password, salt);

        // Guardar usuario
        usuario = await usuario.save();

        // Crear Token
        let token;
        try {
            token = await generateJWT(usuario.id, usuario.user, usuario.email);
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error al generar el token',
                error,
            });
        }

        res.status(200).send({
            message: `Usuario ${usuario.user} creado correctamente`,
            ok: true,
            usuario,
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'No se pudo crear el usuario.',
        });
    }
}

// Listar Usuarios
const readUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({
            ok: true,
            usuarios,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'No se pudo obtener la lista de usuarios.',
        });
    }
}

// Editar Usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { user, email, password, dateOfBirth, phoneNumber } = req.body;

    try {
        let usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado.',
            });
        }

        // Si se cambia la contraseña, encriptarla
        if (password) {
            const salt = await bcrypt.genSalt();
            usuario.password = await bcrypt.hash(password, salt);
        }

        // Actualizar solo los campos presentes en la solicitud
        if (user !== undefined) usuario.user = user;
        if (email !== undefined) usuario.email = email;
        if (dateOfBirth !== undefined) usuario.dateOfBirth = dateOfBirth;
        if (phoneNumber !== undefined) usuario.phoneNumber = phoneNumber;

        // Guardar cambios
        usuario = await usuario.save();

        res.status(200).json({
            ok: true,
            usuario,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'No se pudo actualizar el usuario.',
        });
    }
}

// Eliminar Usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        let usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado.',
            });
        }

        await Usuario.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            message: 'Usuario eliminado correctamente.',
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'No se pudo eliminar el usuario.',
        });
    }
}

// Iniciar sesión
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por email
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                message: 'Correo electrónico o contraseña incorrectos.',
            });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, usuario.password);

        if (!isMatch) {
            return res.status(400).json({
                ok: false,
                message: 'Correo electrónico o contraseña incorrectos.',
            });
        }

        // Generar token
        const token = await generateJWT(usuario.id, usuario.user, usuario.email);

        res.status(200).json({
            ok: true,
            message: 'Inicio de sesión exitoso.',
            usuario,
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Error al iniciar sesión.',
        });
    }
}

//Vista Usuario
const getUser = async (req = request, res = response) => {
    try {
      const usuario = req.user; // El usuario se establece en el middleware validateJWT
  
      if (!usuario) {
        return res.status(404).json({
          ok: false,
          message: "Usuario no encontrado.",
        });
      }
  
      res.status(200).json({
        ok: true,
        usuario,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        message: "Error al obtener el usuario.",
      });
    }
};

module.exports = {  createUser,
                    readUsers, 
                    updateUser, 
                    deleteUser, 
                    loginUser,
                    getUser };