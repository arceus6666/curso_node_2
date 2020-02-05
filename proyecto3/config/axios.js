// 9d9172db4cmsh3c0bc753bf8c0a6p11f189jsn352c86dd9388
const axios = require('axios');

const instCiudad = axios.create({
  baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php',
  headers: {
    "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
    "x-rapidapi-key": "9d9172db4cmsh3c0bc753bf8c0a6p11f189jsn352c86dd9388"
  }
});

const instClima = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather'
});

instClima.interceptors.request.use(config => {
  config.params['appid'] = '332a79b31d6dfcbdb6afca047cc89a78';
  config.params['units'] = 'metric';
  return config;
});

module.exports = { instCiudad, instClima };
