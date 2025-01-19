import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProductDetail = () => {
  const { id } = useParams() // Get the product ID from the URL
  const [product, setProduct] = useState(null)

  useEffect(() => {
    // Fetch product details by ID
    axios
      .get(`http://localhost:5000/api/marketplace/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error('Error fetching product:', error))
  }, [id])

  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
      <p className='text-xl'>{product.description}</p>
      <ul className='list-disc ml-5 mt-4'>
        {product.items &&
          product.items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      <p className='text-lg mt-4'>Price: ${product.price}</p>
      <p className='text-lg'>Region: {product.region}</p>
    </div>
  )
}

export default ProductDetail
