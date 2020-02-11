const jwt = require('jsonwebtoken');

const verificaToken = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.get('token'), process.env.SECRET_KEY);
    // console.log(decoded);
    req.usuario = decoded.usuario_id;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: error });
  }
}

module.exports = {
  verificaToken
};