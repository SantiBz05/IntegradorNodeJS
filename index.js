const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/home', (req, res) => {
  res.send('¡Hola mundo desde Node!');
});

app.post('/saludo', (req, res) => {
  const { nombre } = req.body;
  res.json({ mensaje: `Hola ${nombre}, bienvenido a la api`, status: 200 });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en localhost: ${port}`);
});
