import React from 'react'
import Link from 'next/link'

function Hero () {
  return (
    <div className=''>
      <div className='absolute py-5 top-28 sm:top-52 md:top-2/4 md:left-36 xl:left-44 md:w-2/3 md:ml-10'>
        <h1 className='text-3xl sm:text-4xl md:text-6xl font-sans tracking-tight text-white text-center font-semibold'>New arrivals are here</h1>
        <p className='text-sm md:w-10/12 mx-auto sm:text-base px-5 md:px-0 md:text-xl my-3 text-center text-gray-100'>The new arrivals have, well, newly arrived. Check out the latest options from our summer small-batch release while they're still in stock.</p>
        <div className='mx-auto justify-center flex'>
          <button className='button px-3 sm:w-44 md:mt-3 text-sm sm:text-base font-semibold'><Link href={'/items'}>Shop New Arrivals</Link></button>       
        </div>
      </div>
        <img className='w-full h-80 sm:h-500 md:h-650' src="../image.jpg" alt="" />
    </div>
  )
}

export default Hero