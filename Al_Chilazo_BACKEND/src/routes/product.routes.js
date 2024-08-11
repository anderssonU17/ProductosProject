'use strict';

const { Router } = require('express');
const { check } = require('express-validator');
const { validateParams } = require('../middlewares/validate-params');
const { validateJWT } = require('../middlewares/validate-jwt');
const { createProduct,
        readProduct,
        updateProduct,
        deleteProduct } = require('../controllers/product.controller');

const api = Router();

// Crear Producto
api.post('/createProduct', [
    validateJWT,
    //check('image', 'La imagen es obligatoria').isArray().notEmpty(),
    check('nameProduct', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    check('existence', 'La existencia es necesaria porfavor coloca un valor').not().isEmpty(),    
    validateParams,
], createProduct);

// Listar Productos
api.get('/readProducts', validateJWT, readProduct);

// Editar Producto
api.put('/updateProduct/:id', [
    validateJWT,
    check('id', 'El ID es obligatorio').isMongoId(),
    validateParams,
], updateProduct);

// Eliminar Producto
api.delete('/deleteProduct/:id', [
    validateJWT,
    check('id', 'El ID es obligatorio').isMongoId(),
    validateParams,
], deleteProduct);

module.exports = api;