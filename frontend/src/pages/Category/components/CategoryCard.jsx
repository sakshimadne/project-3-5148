import React, { useState } from 'react'

const CategoryCard = ({ category, isRecommended }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div>
      {/* Card */}
      <div className='bg-white border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center transform transition-transform hover:scale-105 hover:shadow-2xl relative'>
        {isRecommended && (
          <div className='absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
            Recommended
          </div>
        )}
        <h2 className='text-xl font-semibold text-gray-800 mb-3 text-center'>
          {category.name}
        </h2>
        <p className='text-sm text-gray-500 text-center mb-6'>
          {category.description}
        </p>
        <button
          onClick={openModal}
          className='bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transition'
        >
          View Products
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white rounded-lg p-6 w-96 shadow-xl'>
            <h2 className='text-2xl font-bold mb-4'>{category.name}</h2>
            <p className='text-gray-600 mb-4'>{category.description}</p>
            <ul className='list-disc list-inside mb-4'>
              {category.items.map((item, index) => (
                <li key={index} className='text-gray-800'>
                  {item}
                </li>
              ))}
            </ul>
            <p className='text-gray-700 mb-2'>Price: ${category.price}</p>
            <p className='text-gray-700 mb-4'>Region: {category.region}</p>
            <button
              onClick={closeModal}
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryCard
