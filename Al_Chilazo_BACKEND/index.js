'use strict'

const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require("cors");
const { connection } = require("./src/database/connection");
const user = require('./src/routes/user.routes');
const producto = require('./src/routes/product.routes')

connection();

app.use(express.urlencoded({extended: false}));

app.use(express.json());
app.use(cors());
app.use('/api', user,
                producto
            )

app.listen(port, () =>{
    console.log(`The server is connected to the port ${port}`)
})