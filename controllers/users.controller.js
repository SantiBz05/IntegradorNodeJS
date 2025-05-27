const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../data/users.json')

const readUsers = () => {
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

let users = readUsers()

const writeUser = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}

// GET ALL
const getUsers = (req, res) => {
  res.json({ data: users, status: 200, message: 'Usuarios obtenidos de manera exitosa' })
}

// GET by Id
const getUserById = (req, res) => {
  const user = users.find(item => item.id === parseInt(req.params.id))
  if (!user) return res.json({ status: 404, message: 'Usuario no encontrado' })
  res.json({ data: user, status: 200, message: 'Usuario encontrado correctamente' })
}

// POST
const createUser = (req, res) => {
  const newUser = req.body
  newUser.id = users.length + 1
  users.push(newUser)
  writeUser(users)
  res.json({ data: newUser, status: 201, message: 'Usuario creado exitosamente' })
}

// PUT
const updateUser = (req, res) => {
  const user = users.find(item => item.id === parseInt(req.params.id))
  if (!user) return res.json({ status: 404, message: 'Usuario no encontrado' })
  const { name, lastname, email, age } = req.body
  user.name = name || user.name
  user.lastname = lastname || user.lastname
  user.email = email || user.email
  user.age = age || user.age
  writeUser(users)
  res.json({ data: user, status: 200, message: 'Usuario editado correctamente' })
}

// DELETE
const deleteUser = (req, res) => {
  const user = users.find(item => item.id === parseInt(req.params.id))
  if (!user) return res.json({ status: 404, message: 'Usuario no encontrado' })
  users = users.filter(item => item.id !== user.id)
  writeUser(users)
  res.json({ data: user, status: 200, message: 'Usuario eliminado correctamente' })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}