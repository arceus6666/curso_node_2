const instCiudad = require('../config/axios').instCiudad;

const getLugares = async (ciudad) => {
  const response = await instCiudad.get('/', {
    params: {
      location: ciudad
    }
  });
  if (response.data.Results.length < 1) {
    throw new Error('No hay datos disponibles de la ciudad');
  }
  const results = response.data.Results;
  const data = results.length < 4 ? results : results.slice(0,3);

  return data;
}

module.exports = {
  getLugares
}