const {io} = require('../index');

io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('message', (payload) => {
        console.log(payload);
    });

     client.on('canal_mensaje', (payload) => {
        console.log('escuchando canal_mensaje');
        console.log(payload);
        client.broadcast.emit('nuevo_mensaje', payload);
    });
});
