'use strict'

const Producto = require('../models/producto.model');

// Crear Producto
const createProduct = async (req, res) => {
    const { nameProduct, description, price, image, existence } = req.body;

    // Validar que el precio esté en quetzales (Q) o dólares ($)
    // if (!/^(Q|\$)\d+(\.\d{1,2})?$/.test(price)) {
    //     return res.status(400).json({
    //         ok: false,
    //         message: 'El precio debe estar en quetzales (Q) o dólares ($).',
    //     });
    // }

    try {
        const nuevoProducto = new Producto({ nameProduct, description, price, image, existence });

        // Guardar el producto
        await nuevoProducto.save();

        res.status(201).json({
            ok: true,
            message: 'Producto creado correctamente',
            producto: nuevoProducto
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'No se pudo crear el producto.',
            error: error.message,
        });
    }
};

// Listar Productos
const readProduct = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json({
            ok: true,
            productos,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'No se pudieron obtener los productos.',
        });
    }
};

// Editar Producto
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nameProduct, description, price, image, existence } = req.body;

    try {
        let producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                message: 'Producto no encontrado.',
            });
        }

        // Actualizar solo los campos que el usuario desea modificar
        producto.nameProduct = nameProduct || producto.nameProduct;
        producto.description = description || producto.description;
        producto.price = price || producto.price;
        producto.image = image || producto.image;
        producto.existence = existence || producto.existence;

        // Guardar cambios
        producto = await producto.save();

        res.status(200).json({
            ok: true,
            producto,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'No se pudo actualizar el producto.',
        });
    }
};

// Eliminar Producto
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findByIdAndDelete(id);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                message: 'Producto no encontrado.',
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Producto eliminado correctamente.',
            producto,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'No se pudo eliminar el producto.',
        });
    }
};

module.exports = {  createProduct,
                    readProduct,
                    updateProduct,
                    deleteProduct
                };