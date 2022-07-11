const express = require('express');
const app = express();
const PORT = 8080;
let visitas = 0;

const server = app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en el servidor ${error}`));

app.get('/', (req, res) => {
  res.send({ mensaje: 'Bienvenidos al servidor express'});
})

app.get('/visitas', (req, res) => {
  res.send({ mensaje: 'visitas: ' + visitas++});
})

app.get('/fyh', (req, res) => {
  let d = new Date();
  res.send({ mensaje: 'Fecha y hora: ' + d.toLocaleString()});
})
