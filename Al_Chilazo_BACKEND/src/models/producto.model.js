'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    image: {
        type: [String], 
        required: false
    },
    nameProduct: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
        min: 0
    },
    existence: {
        type: Number,  
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productoSchema);
