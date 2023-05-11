import React, { useState, useContext, useEffect } from 'react'
import {MyContext} from "./App"





const Info = (props) => {
  const gatewayInfo = useContext(MyContext);

  return (
    <div className='border-2 flex flex-col h-full border-gray-400-500'>
      <h1 className='py-5 text-center text-xl font-semibold '>Information</h1>
      <div className='border-2 border-blue-400'>
        <h1 className='font-bold text-center text-xl pb-3'>Gateway Information  </h1>
        {props.gateid !==null && <h1> Gateway ID: {props.gateid}</h1>}

    
      </div>
      <div className='flex flex-col gap-5 justify-center items-center h-full'>
        <div className=''>
          <h1 className='text-center text-xl font-bold capitalize'>temperature </h1>
          <h1 className='text-center text-lg font-sm text-red-600'> {props.temp}</h1>
        </div>
        <div>
          <h1 className='text-center text-xl font-bold capitalize'>Humadity </h1>
          <h1 className='text-center text-lg font-sm text-red-600'> {props.huma}</h1>
        </div>
        <div>
          <h1 className='text-center text-xl font-bold capitalize'>Water Level </h1>
          <h1 className='text-center text-lg font-sm text-red-600'>{props.wat}</h1>
        </div>
      </div>


    </div>
  )
}

export default Info