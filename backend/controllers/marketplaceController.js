const Product = require('../models/productModel')

// Get all products
// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//     console.log('Products fetched:', products)
//     res.status(200).json({ success: true, data: products })
//   } catch (error) {
//     console.error('Error fetching products:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching products',
//       error: error.message,
//     })
//   }
// }



const getProducts = async (req, res) => {
  try {
    const { category, sort, priceRange, region } = req.query

    const query = {}
    if (category) query.category = category
    if (region) query.region = region
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number)
      query.price = { $gte: min, $lte: max }
    }

    const sortOption = {}
    if (sort) {
      const [key, order] = sort.split(':')
      sortOption[key] = order === 'desc' ? -1 : 1
    }

    const products = await Product.find(query).sort(sortOption)
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message,
    })
  }
}

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category })
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products by category',
      error: error.message,
    })
  }
}

// Add a new product
const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body)
    const savedProduct = await product.save()
    res.status(201).json({ success: true, data: savedProduct })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding product',
      error: error.message,
    })
  }
}

// Get recommendations
// const getRecommendations = async (req, res) => {
//   try {
//     const { preferences, region } = req.query

//     const query = {}
//     if (region) query.region = region
//     if (preferences) {
//       const preferenceArray = preferences.split(',')
//       query.$or = [
//         { category: { $in: preferenceArray } },
//         { price: { $lte: 100 } }, // Example for budget-friendly
//       ]
//     }

//     const recommendations = await Product.find(query)
//     res.status(200).json({ success: true, data: recommendations })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching recommendations',
//       error: error.message,
//     })
//   }
// }
const getRecommendations = async (req, res) => {
  try {
    const { preferences, region, sort } = req.query

    const query = {}
    if (region) query.region = region
    if (preferences) {
      const preferenceArray = preferences.split(',')
      query.$or = [
        { category: { $in: preferenceArray } },
        { price: { $lte: 100 } },
      ]
    }

    const sortOption = {}
    if (sort) {
      const [key, order] = sort.split(':')
      sortOption[key] = order === 'desc' ? -1 : 1
    }

    const recommendations = await Product.find(query).sort(sortOption)
    res.status(200).json({ success: true, data: recommendations })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recommendations',
      error: error.message,
    })
  }
}

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' })
    }
    res.status(200).json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message,
    })
  }
}

// Delete product by ID
const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' })
    }
    res
      .status(200)
      .json({ success: true, message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message,
    })
  }
}

module.exports = {
  getProducts,
  getProductsByCategory,
  addProduct,
  getRecommendations,
  getProductById,
  deleteProductById,
}
