const argv = require('./config/yargs').argv;
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const main = async () => {
  const ciudades = await [
    await lugar.getLugares(argv.ciudad1),
    await lugar.getLugares(argv.ciudad2),
  ];
  // const resCiudad = await lugar.getLugares(argv.ciudad);
  const result = [];
  ciudades[0].forEach(async c => {
    console.log(`c: ${c.name}`)
    const cl = await clima.getClima(c.lat, c.lng).catch(err=>console.log('err'))
    console.log(cl)
    await result.push({
      nombre: c.name,
      temperatura: cl.main.temp,
      sensacion_termica: cl.main.feels_like
    });
  })
  // const resClima = await clima.getClima(resCiudad.lat, resCiudad.lng);
  return result;
}

main().then(response => {
  console.log(JSON.stringify(response, null, 2))
}).catch(err => console.log(err));

// lugar.getLugares(argv.ciudad).then(result => {
//   // console.log(JSON.stringify(result, null, 2));
//   clima.getClima(result.lat, result.lng).then(response => {
//     console.log(response);
//   }).catch(err => console.log(err));
// }).catch(err => console.log(err));

