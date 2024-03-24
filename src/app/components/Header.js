import React from 'react'

const Header = ({setShowAddModal}) => {
  return (
    <nav className="my-8">
      <h1 className='font-bold text-xl'>Question Time</h1>
      <button className='border-none rounded-md text-sm py-1 px-12 bg-blue-600 text-white' onClick={()=> setShowAddModal(true)}>Add</button>
    </nav>
  )
}

export default Header
