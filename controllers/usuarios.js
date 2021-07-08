const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {
    const {desde = 0, limite = 5} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
               .skip(Number(desde))
               .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
};

const usuariosPost = async (req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contrase?a
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    
    res.json({
        usuario
    });
};

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    
    const { _id, password, google, correo, ...resto } = req.body;

    // Validar contra base de datos
    if (password) {
        // Encriptar la contrase?a
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto); 

    res.json({
        usuario
    });
};

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    // Borrado fisicamente
    // const usuario =  await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}