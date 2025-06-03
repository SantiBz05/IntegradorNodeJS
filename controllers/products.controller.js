const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../data/products.json')

const { Product } = require('../models')

const readProducts = () => {
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

let products = readProducts()

const writeProducts = (products) => {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2))
}

// GET ALL
const getProducts = async (req, res) => {
  try {
      const products = await Product.findAll()
      res.status(200).json({ data: products, message: 'Productos obtenidos de manera exitosa' })      
  }catch (error) {
      res.status(500).json({ message: 'Error al obtener prodcutos' })
  }
}

// const getProducts = (req, res) => {
//   res.json({ data: products, status: 200, message: 'Productos obtenidos de manera exitosa' })
// }

// GET by Id
const getProductById = (req, res) => {
  const product = products.find(item => item.id === parseInt(req.params.id))
  if (!product) return res.json({ status: 404, message: 'Producto no encontrado' })
  res.json({ data: product, status: 200, message: 'Producto encontrado correctamente' })
}

// POST
const createProduct = (req, res) => {
  const { name, price, color } = req.body
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    color
  }
  products.push(newProduct)
  writeProducts(products)
  res.json({ data: newProduct, status: 201, message: 'Producto creado exitosamente' })
}

// PUT
const updateProduct = (req, res) => {
  const product = products.find(item => item.id === parseInt(req.params.id))
  if (!product) return res.json({ status: 404, message: 'Producto no encontrado' })

  const { name, price, color } = req.body
  product.name = name || product.name
  product.price = price || product.price
  product.color = color || product.color
  writeProducts(products)
  res.json({ data: product, status: 200, message: 'Producto editado correctamente' })
}

// DELETE
const deleteProduct = (req, res) => {
  const product = products.find(item => item.id === parseInt(req.params.id))
  if (!product) return res.json({ status: 404, message: 'Producto no encontrado' })
  products = products.filter(item => item.id !== product.id)
  writeProducts(products)
  res.json({ data: product, status: 200, message: 'Producto eliminado correctamente' })
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}