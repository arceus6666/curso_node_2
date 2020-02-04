const argv = require('./config/yargs').argv;
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const main = async () => {
  // const resCiudad = await lugar.getLugares(argv.ciudad);
  // const resClima = await clima.getClima(resCiudad.lat, resCiudad.lng);
  const ciudades = await [
    await lugar.getLugares(argv.ciudad1),
    await lugar.getLugares(argv.ciudad2),
  ];
  const climas = [];
  const result = [];

  for (let i = 0; i < 2; i++) {
    climas[i] = [];
    for (let j = 0; j < ciudades[i].length; j++) {
      climas[i][j] = await clima.getClima(ciudades[i][j].lat, ciudades[i][j].lon);
    }
  }

  let k = 0;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < ciudades[i].length; j++) {
      result[k] = await {
        nombre: ciudades[i][j].name,
        temperatura: climas[i][j].main.temp,
        sensacion_termica: climas[i][j].main.feels_like
      }
      k++;
    }
  }

  // console.log(JSON.stringify(result, null, 2));
  return JSON.stringify(result, null, 2);
}

main().then(response => {
  console.log(response)
}).catch(err => console.log(`main err:\n${err}`));

