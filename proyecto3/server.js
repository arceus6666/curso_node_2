const express = require('express');
const hbs = require('hbs');

const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const app = express();

const port = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/node_modules', express.static(`${__dirname}/node_modules/`));

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('mayusculas', (texto) => {
  return texto.toUpperCase();
});

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  console.log(req.query);
  const persona = {
    nombre: 'Daniel',
    apellido: 'Mendoza'
  }
  res.send(persona);
});

app.post('/bye', (req, res) => {
  res.send('Bye Mundo!');
});

app.get('/clima', async (req, res) => {

  const resCiudad = await lugar.getLugares(req.query.c);
  const resClima = await clima.getClima(resCiudad.lat, resCiudad.lng);

  // res.send(resClima);
  const data = {
    ciudad: resCiudad.ciudad,
    temperatura: resClima.main.temp,
    sensacion: resClima.main.feels_like
  }
  // console.log(resCiudad, resClima)
  res.render('clima', data);
});

app.post('/lugar', async (req, res) => {

  const resCiudad = await lugar.getLugares(req.body.ciudad);
  // const resClima = await clima.getClima(resCiudad.lat, resCiudad.lng);

  res.send(resCiudad);
});

app.get('/home', (req, res) => {
  const data = {
    personas: [
      {
        nombre: 'Daniel',
        apellido: 'Mendoza'
      },
      {
        nombre: 'qwe',
        apellido: 'asd'
      },
      {
        nombre: 'asd',
        apellido: 'qwe'
      },
      {
        nombre: 'zxc',
        apellido: 'vbn'
      },
    ]
  }
  res.render('index', data);
});

app.get('/usuario', (req, res) => {
  const user = req.query.u;
  const pass = req.query.p;
  res.render('nueva', { user, pass });
});

app.get('/view/lugar', (req, res) => {
  res.render('lugar');
});

app.get('/view/clima', (req, res) => {
  res.render('clima');
});

app.listen(port, () => {
  console.log(`Servidor escuchando el puerto ${port}`);
});