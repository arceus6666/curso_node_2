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
  // console.log(JSON.stringify(ciudades, null, 2))
  const climas = [
    // await clima.getClima(ciudades[0][0].lat, ciudades[0][0].lon),
    // await clima.getClima(ciudades[0][1].lat, ciudades[0][1].lon),
    // await clima.getClima(ciudades[0][2].lat, ciudades[0][2].lon),
    // await clima.getClima(ciudades[1][0].lat, ciudades[1][0].lon),
    // await clima.getClima(ciudades[1][1].lat, ciudades[1][1].lon),
    // await clima.getClima(ciudades[1][2].lat, ciudades[1][2].lon)
  ];

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


  // const result = [
  //   {
  //     nombre: ciudades[0][0],
  //     temperatura: climas[0].main.temp,
  //     sensacion_termica: climas[0].main.feels_like
  //   },
  //   {
  //     nombre: ciudades[0][1],
  //     temperatura: climas[1].main.temp,
  //     sensacion_termica: climas[1].main.feels_like
  //   },
  //   {
  //     nombre: ciudades[0][2],
  //     temperatura: climas[2].main.temp,
  //     sensacion_termica: climas[2].main.feels_like
  //   },
  //   {
  //     nombre: ciudades[1][0],
  //     temperatura: climas[3].main.temp,
  //     sensacion_termica: climas[3].main.feels_like
  //   },
  //   {
  //     nombre: ciudades[1][1],
  //     temperatura: climas[4].main.temp,
  //     sensacion_termica: climas[4].main.feels_like
  //   },
  //   {
  //     nombre: ciudades[1][2],
  //     temperatura: climas[5].main.temp,
  //     sensacion_termica: climas[5].main.feels_like
  //   },
  // ];
  // await ciudades[0].forEach(async c => {
  //   // console.log(`c: ${c.name}`)
  //   const cl = await clima.getClima(c.lat, c.lon).catch(err => console.log(err));
  //   // console.log(cl)
  //   await result.push({
  //     nombre: c.name,
  //     temperatura: cl.main.temp,
  //     sensacion_termica: cl.main.feels_like
  //   });
  // });
  // await ciudades[1].forEach(async c => {
  //   const cl = await clima.getClima(c.lat, c.lon).catch(err => console.log(err));
  //   await result.push({
  //     nombre: c.name,
  //     temperatura: cl.main.temp,
  //     sensacion_termica: cl.main.feels_like
  //   });
  // });

  // console.log(JSON.stringify(result, null, 2));
  return JSON.stringify(result, null, 2);
}

main().then(response => {
  console.log(response)
}).catch(err => console.log(`main err:\n${err}`));

// lugar.getLugares(argv.ciudad).then(result => {
//   // console.log(JSON.stringify(result, null, 2));
//   clima.getClima(result.lat, result.lng).then(response => {
//     console.log(response);
//   }).catch(err => console.log(err));
// }).catch(err => console.log(err));

