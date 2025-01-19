const express = require('express')
const {
  getProducts,
  getProductsByCategory,
  addProduct,
  getRecommendations,
  getProductById,
  deleteProductById,
} = require('../controllers/marketplaceController')



const router = express.Router()


router.get('/', getProducts)
router.get('/category/:category', getProductsByCategory)
router.post('/', addProduct)
router.get('/recommendations', getRecommendations)
router.get('/:id', getProductById)
router.delete('/:id', deleteProductById)

module.exports = router
