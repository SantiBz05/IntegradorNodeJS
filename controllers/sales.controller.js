const { Model } = require('sequelize')
const {Sales, Product, Users } = require('../models')

const getAllSales = async (req, res) => {
    
    try {
        const sales = await Sales.findAll({ 
            include: [Users, Product]
        })    
        res.status(200).json({data:sales, message:'ventas obtenidas correctamente'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error al obtener las ventas'})
    }
}

module.exports = {
    getAllSales
}