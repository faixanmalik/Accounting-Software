import React from 'react'
import Link from 'next/link'


function Cta () {
  return (
    <div className='relative'>

      <div className='absolute z-10 py-5 top-20 sm:top-44 md:top-28 md:left-36 xl:left-44 md:w-2/3 md:ml-10'>
        <h1 className='text-3xl sm:text-4xl font-sans tracking-tight text-white text-center font-semibold'>Level Up Your Desk</h1>
        <p className=' md:w-10/12 mx-auto text-sm sm:text-base px-10 md:px-0 md:text-xl my-4 mb-7 text-center text-gray-200'>Make your desk beautiful and organized. Post a picture to social media and watch it get more likes than life-changing announcements. Reflect on the shallow nature of existance. At least you have a really nice desk setup.</p>
        <div className='mx-auto justify-center flex'>
          <button className='button px-3 sm:w-44 text-sm sm:text-base font-semibold'><Link href={'/items'}>Shop New Arrivals</Link></button>       
        </div>
      </div>
      <div className=''>
        <img className='w-full md:w-11/12 mx-auto h-400 sm:h-500 object-cover object-bottom rounded-md' src="https://images.unsplash.com/photo-1611665858863-398f6cfbfdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGFyayUyMGRlc2t8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="" />
      </div>

    </div>

  )
}

export default Cta