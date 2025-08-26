const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const register = async (req, res) => {
    const { name, lastname, email, age, password, role } = req.body;

    try {
        const userExist = await Users.findOne({ where: { email } });
        if (userExist) return res.status(400).json({ message: 'El usuario ya existe' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            name,
            lastname,
            email,
            age,
            password: hashedPassword,
            role: role || 'cliente'
        });

        res.status(201).json({ message: 'Usuario registrado exitosamente', data: newUser });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al crear el usuario', error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExist = await Users.findOne({ where: { email } });
        if (!userExist) return res.status(400).json({ message: 'Usuario no encontrado' });

        const validPassword = await bcrypt.compare(password, userExist.password);
        if (!validPassword) return res.status(403).json({ message: 'Contraseña incorrecta' });

        const user = {
            id: userExist.id,
            name: userExist.name,
            lastname: userExist.lastname,
            email: userExist.email,
            age: userExist.age,
            role: userExist.role
        };

        const token = jwt.sign({ user: user }, 'secreto1234', { expiresIn: '1h' });

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al loguear el usuario', error: error.message });
    }
};

module.exports = { register, login };
