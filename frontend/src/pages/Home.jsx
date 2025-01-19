import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CategoryCard from '../components/CategoryCard'

const Home = () => {
  const [categories, setCategories] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [filters, setFilters] = useState({
    region: '',
    sort: '',
    priceRange: '',
  })

  // Fetch Categories with filters
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const queryParams = new URLSearchParams(filters).toString()
        const response = await fetch(
          `http://localhost:5000/api/marketplace?${queryParams}`
        )
        const data = await response.json()
        setCategories(data.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [filters])

  // Fetch Recommendations with filters
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const queryParams = new URLSearchParams({
          preferences: 'budget-friendly',
          ...filters,
        }).toString()
        const response = await fetch(
          `http://localhost:5000/api/marketplace/recommendations?${queryParams}`
        )
        const data = await response.json()
        setRecommendations(data.data)
      } catch (error) {
        console.error('Error fetching recommendations:', error)
      }
    }
    fetchRecommendations()
  }, [filters])

  return (
    <div className='container mx-auto px-6 py-10'>
      <h1 className='text-5xl font-extrabold text-gray-800 text-center mb-10'>
        Categories
      </h1>

      {/* Filter and Sort Section */}
      <div className='flex justify-center mb-8'>
        <select
          className='border p-2 rounded mr-4'
          onChange={(e) => setFilters({ ...filters, region: e.target.value })}
        >
          <option value=''>All Regions</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
          <option value='North America'>North America</option>
        </select>
        <select
          className='border p-2 rounded mr-4'
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value=''>Sort by</option>
          <option value='price:asc'>Price: Low to High</option>
          <option value='price:desc'>Price: High to Low</option>
        </select>
        <select
          className='border p-2 rounded'
          onChange={(e) =>
            setFilters({ ...filters, priceRange: e.target.value })
          }
        >
          <option value=''>All Prices</option>
          <option value='0-50'>Below $50</option>
          <option value='50-100'>$50 - $100</option>
          <option value='100-200'>$100 - $200</option>
        </select>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))
        ) : (
          <p className='text-gray-500 text-center col-span-full'>
            No categories found. Please add some data.
          </p>
        )}
      </div>

      {/* Recommendations Section */}
      <h2 className='text-3xl font-bold text-gray-800 mt-16 mb-8'>
        Personalized Recommendations
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {recommendations.length > 0 ? (
          recommendations.map((recommendation) => (
            <CategoryCard
              key={recommendation._id}
              category={recommendation}
              isRecommended
            />
          ))
        ) : (
          <p className='text-gray-500 text-center col-span-full'>
            No recommendations found.
          </p>
        )}
      </div>
    </div>
  )
}

export default Home
