const express = require('express')
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a base de datos
        this.database();

        // Middelewares
        this.middelewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async database() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server corriendo en puerto: ', this.port);
        })
    }

    middelewares() {
        // CORS
        this.app.use(cors())
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
    }
}

module.exports = Server;