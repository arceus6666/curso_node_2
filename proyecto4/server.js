const dotenv = require('dotenv');
const app = require('./config/express');
const mongoose = require('./config/db');
const verificaToken = require('./middlewares/token').verificaToken;
const verificaUsuario = require('./middlewares/autenticacion');

dotenv.config();

app.use('/usuarios', [verificaToken, verificaUsuario], require('./routes/usuario'));
app.use('/categorias', [verificaToken, verificaUsuario], require('./routes/categoria'));
app.use('/', require('./routes/auth'));
// app.use('/', require('./routes/lenguaje'));

app.listen(process.env.NODE_PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.NODE_PORT}.`);
});
