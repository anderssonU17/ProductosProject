'use strict';

const { Router } = require('express');
const { check } = require('express-validator');
const { validateParams } = require('../middlewares/validate-params');
const { validateJWT } = require('../middlewares/validate-jwt');
const { createUser, 
        readUsers, 
        updateUser, 
        deleteUser,
        loginUser,
        getUser } = require('../controllers/user.controller');

const api = Router();

// Crear usuario
api.post('/createUser', [
    check('user', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser igual o mayor a 8 digitos').isLength({ min: 8 }),
    check('dateOfBirth', 'La fecha de nacimiento es obligatoria').not().isEmpty().isDate(),
    check('phoneNumber', 'El número de teléfono es obligatorio').not().isEmpty().isNumeric(),
    validateParams,
], createUser);

// Listar usuarios
api.get('/readUsers', readUsers);

// Editar usuario
api.put('/updateUser/:id', validateJWT, [
    check('user', 'El nombre de usuario es obligatorio').optional().not().isEmpty(),
    check('email', 'El email es obligatorio').optional().isEmail(),
    check('password', 'El password debe ser igual o mayor a 8 digitos').optional().isLength({ min: 8 }),
    check('dateOfBirth', 'La fecha de nacimiento es obligatoria').optional().isDate(),
    check('phoneNumber', 'El número de teléfono es obligatorio').optional().isNumeric(),
    validateParams,
], updateUser);

// Eliminar usuario
api.delete('/deleteuser/:id', validateJWT, deleteUser);

// Iniciar sesión
api.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateParams
], loginUser); // EN UN INICIO DE SESION NO SE PONE TOKEN! 

//Vista usuario
api.get('/viewUser', validateJWT, getUser);

module.exports = api;
