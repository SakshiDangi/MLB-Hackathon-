import React from 'react'
import Image from 'next/image'
import profilePic from '../public/logo.png'
import { FaGlobe, FaSearch } from "react-icons/fa";


export default function Header() {
  return (
    <div className='flex '>
    <div className='ml-8 pt-10 bg-red'>
      <div className='flex'>
        <Image
        className='w-8'
        src={profilePic}
        alt="Logo of the MAJOR LEAGUE BASEBALL"
        />  
        <p className='text-xs font-semibold tracking-tighter '>M L B</p>
      </div>
      <p className="text-xs font-semibold ">BASEBALL</p>
      <p className="text-xs font-semibold">ANALYTICS</p>
    </div>
    <div className='flex w-1/2 my-10 ml-4  gap-2'>
      <input
        type="text"
        id="search"
        className="border-2 outline-none sm:text-sm focus:ring-gray-500 focus:border-gray-500 w-full rounded-full p-2.5 bg-gray-600 border-gray-800 placeholder-gray-500 text-black"
      />
      <button
        type="submit"
        className="w-fit flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-full text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <FaGlobe size={24} />
      </button>
    </div>

    </div>
  )
}
