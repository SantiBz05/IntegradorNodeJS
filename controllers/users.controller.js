const { Users } = require('../models');

// GET ALL
const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json({ data: users, message: 'Usuarios obtenidos de manera exitosa' });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
}

// GET by ID
const getUserById = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ data: user, message: 'Usuario encontrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar el usuario' });
  }
}

// POST
const createUser = async (req, res) => {
  const { name, lastname, email, age } = req.body;
  try {
    if (!name || !lastname || !email || !age) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const newUser = await Users.create({ name, lastname, email, age });
    res.status(201).json({ data: newUser, message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se creó el usuario' });
  }
}

// PUT
const updateUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { name, lastname, email, age } = req.body;

    const updatedData = {
      name: name || user.name,
      lastname: lastname || user.lastname,
      email: email || user.email,
      age: age || user.age
    };

    await Users.update(updatedData, {
      where: { id: req.params.id }
    });

    const updatedUser = await Users.findByPk(req.params.id);

    res.status(200).json({ data: updatedUser, message: 'Usuario editado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se editó el usuario' });
  }
}

// DELETE
const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await Users.destroy({ where: { id: req.params.id } });

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se eliminó el usuario' });
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
