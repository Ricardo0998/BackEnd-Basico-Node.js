const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const query = req.query;

    res.json({
        ok: true,
        msg: 'get usuarios - controlador',
        query
    });
};

const usuariosPost = (req = request, res = response) => {
    const { nombre, edad } = req.body;
    
    res.json({
        ok: true,
        msg: 'post usuarios - controlador',
        body: `${nombre} ${edad}`
    });
};

const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    
    res.json({
        ok: true,
        msg: 'put usuarios - controlador',
        id: `${id}`
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut
}