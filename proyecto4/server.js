const dotenv = require('dotenv');
const app = require('./config/express');
const mongoose = require('./config/db');

dotenv.config();

app.use('/usuarios', require('./routes/usuario'));
// app.use('/', require('./routes/lenguaje'));

app.listen(process.env.NODE_PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.NODE_PORT}.`);
});
