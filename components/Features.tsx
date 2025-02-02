import React from 'react'
import Image from 'next/image'
import profilePic from '../public/logo.png'
import Footer from './Footer'
import Link from 'next/link'
import ServiceCard from './ServiceCard'

export default function Features() {
  return (
    <div className= 'pt-32'>
      <div className='flex gap-2 justify-center mb-2 items-center'>
        <Image
        src={profilePic}
        alt="Logo of the MAJOR LEAGUE BASEBALL"
        />  
        <h6 className='text-sm'>MAJOR LEAGUE BASEBALL</h6>
      </div>
      <div className='flex justify-center items-center flex-col'>
        <h2 className="text-6xl font-bold text-center">BASEBALL</h2>
        <h2 className="text-6xl font-bold text-center mb-4">ANALYTICS</h2>
        <p className='text-center'>Discover the ultimate MLB fan experience.</p>
        <p className='text-center'>Proudly powered by <span className='font-extrabold'>Google</span> Cloud</p>
        <button
          type="submit"
          className="w-60 mt-4 flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-xl text-white bg-gray-600 hover:bg-gray-800"
        > 
          <Link href="/login">
            Sign In
          </Link>           
        </button>
      </div>
      <ServiceCard />
      <Footer />
    </div>
  )
}

