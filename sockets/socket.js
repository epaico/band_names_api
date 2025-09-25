const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
bands.addBand(new Band('Grupo 5'));
bands.addBand(new Band('Agua Marina'));
bands.addBand(new Band('Los Chapis'));
bands.addBand(new Band('Hermanos Yaipen'));

io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('bandas_activas', bands.bands);    

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('message', (payload) => {
        console.log(payload);
    });

    client.on('votar_banda', (payload) => {
       bands.voteBand(payload.id);
       io.emit('bandas_activas', bands.bands);
    });

    client.on('nueva_banda', (payload) => {
       bands.addBand(new Band(payload.name));
       io.emit('bandas_activas', bands.bands);
    });

    client.on('eliminar_banda', (payload) => {
       bands.deleteBand(payload.id);
       io.emit('bandas_activas', bands.bands);
    });

});
