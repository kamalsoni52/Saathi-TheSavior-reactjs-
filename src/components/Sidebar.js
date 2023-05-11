import React from 'react'
import { Link } from 'react-router-dom'
const MenuList = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Deploy", link: "/Deploy" }
]

const Sidebar = () => {
    return (
        <div className='h-full flex flex-col'>
            <div>
                <h1 className='font-bold text-2xl py-5 text-center '>Saathi-The Savior</h1>
            </div>
            <ul className=' flex-grow  flex flex-col justify-center items-center font-semibold text-white gap-5  bg-gray-600'>
                {MenuList.map((menu) => (
                    <li key={menu.id} className="  hover:shadow-lg hover:bg-gray-500 rounded-lg duration-300  p-2"><Link to={menu.link}>{menu.name}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar