const express = require('express')
const router = express.Router()
const {
    getAllSales
} = require('../controllers/sales.controller')

router.get('/', getAllSales)
// router.get('/:id', getProductById)
// router.post('/', createProduct)
// router.put('/:id', updateProduct)
// router.delete('/:id', deleteProduct)

module.exports = router
