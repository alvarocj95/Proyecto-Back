const jwt = require('jsonwebtoken');


let autenticacion = (req, res, next) => {
    if (req.session && req.session.usuario)
        return next();
    else
        res.redirect('/auth/login');
};

let generarToken = login => jwt.sign({login: login}, process.env.SECRETO, {expiresIn: "2 hours"});

let validarToken = token => {
    try {
        let resultado = jwt.verify(token, process.env.SECRETO);
        return resultado;
    } catch (e) {}
}



module.exports = {
    autenticacion: autenticacion, 
    generarToken: generarToken,
    validarToken: validarToken
};