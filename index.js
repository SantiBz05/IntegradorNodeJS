const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let usuarios = [
  {id: 1, nombre: 'Santiago', apellido: 'Baez', email:'ejemplo1@gmail.com', edad: 19},
  {id: 2, nombre: 'Facundo', apellido: 'Baez', email:'ejemplo2@gmail.com', edad: 17}
]

// GET ALL
app.get('/usuarios', (req, res) => {
  res.json({ data: usuarios, status:200, message: 'Usuario obtenidos de manera exitosa'})
})

// GET by Id
app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(item => item.id === parseInt(req.params.id))
  if(!usuario) return res.json({ status: 404, message: 'Usuario no encontrado' })
  res.json({ data: usuario, status: 200, message: 'Usuario encontrado correctamente'})
});

// POST
app.post('/usuarios', (req, res) => {
  const nuevoUsuario = req.body
  nuevoUsuario.id = usuarios.length + 1
  usuarios.push(nuevoUsuario)

  res.json({ data: nuevoUsuario, status: 201, message: 'Usuario creado exitosamente' });
});

// PUT
app.put('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(item => item.id === parseInt(req.params.id))
  if(!usuario) return res.json({ status: 404, message: 'Usuario no encontrado' })
  const { nombre, apellido, email, edad} = req.body
  usuario.nombre = nombre || usuario.nombre
  usuario.apellido = apellido || usuario.apellido
  usuario.email = email || usuario.email
  usuario.edad = edad || usuario.edad

  res.json({ data: usuario, status: 200, message: 'Usuario editado correctamente'})
});

// DELETE
app.delete('/usuarios/:id', (req, res) => {
  let usuario = usuarios.find(item => item.id === parseInt(req.params.id))
  if(!usuario) return res.json({ status: 404, message: 'Usuario no encontrado' })
  usuarios = usuarios.filter(item => item.id !== usuario.id)
  res.json({ data: usuario, status: 200, message: 'Usuario eliminado correctamente'})
});

app.listen(port, () => {
  console.log(`Servidor escuchando en localhost: ${port}`);
});
