import React from 'react'
import Maps from './Maps'
import Info from './Info'

const Dashboard = (props) => {
    return (
        <div className=' border-4 flex flex-row h-full border-green-500 '>
            <div className='flex flex-col w-[75%]'>
                <h1 className='py-5 text-center text-xl font-semibold'>Dashboard</h1>
                <Maps clicked={props.clicked} />
            </div>
            <div className='w-[25%]'>
                <Info
                    gateid = {props.gateid}
                    temp={props.temp}
                    huma={props.huma}
                    wat={props.wat}
                />
            </div>
        </div>
    )
}

export default Dashboard