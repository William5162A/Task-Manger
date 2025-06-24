import React from 'react'

const Header = () => {
  return (
    <div className={'flex flex-col items-center select-none'}>
      <h1 className={'text-blue-600 text-4xl font-bold'}>
          Task Manager
      </h1>
      <p className={'text-gray-400 mt-3 text-2xl'}>
        Organize your work efficiently
      </p>
    </div>
  )
}
export default Header
