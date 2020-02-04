const { instClima } = require('../config/axios');

const getClima = async (lat, lng) => {
  const response = await instClima.get('', {
    params: {
      lat: lat,
      lon: lng
    }
  });
  return response.data;
}

module.exports = {
  getClima
}