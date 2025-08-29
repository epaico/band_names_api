const express = require('express');
const path = require('path');
require('dotenv').config();

//express
const app = express();

const server = require('http').createServer(app);
module.exports.io= require('socket.io')(server);
require('./sockets/socket');



//Archivos estaticos
const pathPublic = path.resolve(__dirname, 'public');
console.log('pathPublic :', pathPublic);
app.use(express.static(pathPublic));

server.listen(process.env.PORT, (error ) => {
    if(error) throw new Error(error);

    console.log('api listen port ', process.env.PORT);
});