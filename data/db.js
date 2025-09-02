const { Sequelize } = require('sequelize')


const sequelize = new Sequelize('Integrador', 'admin', 'admin1234', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize