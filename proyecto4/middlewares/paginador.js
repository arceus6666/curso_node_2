const paginador = (req, res, next) => {
  let p = parseInt(req.query.p);
  let r = parseInt(req.query.r);
  p = isNaN(p) || p < 1 ? 1 : p;
  r = isNaN(r) || r < 1 ? 5 : r;
  req.paginacion = {
    p: p - 1,
    r: r
  };
  // console.log(p, r);
  next();
}

module.exports = paginador;