import React from 'react'
import Gateway from './Gateway';

const Form = () => {
  return (
    <div className='border-4 flex flex-col h-full items-center border-yellow-600'>
    <h1 className='py-5 text-xl text-center font-bold '>Gateway Deployement Section</h1>
      <Gateway />
    </div>
  )
}

export default Form