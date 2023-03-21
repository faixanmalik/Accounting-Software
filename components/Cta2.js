import React from 'react'
import Link from 'next/link'


function Cta2 () {
  return (
    <div className='relative'>

      <div className='absolute z-10 py-5 top-20 sm:top-44 md:top-28 md:left-36 xl:left-44 md:w-2/3 md:ml-10'>
        <h1 className='text-3xl sm:text-4xl font-sans tracking-tight text-white text-center font-semibold'>Simple Productivity</h1>
        <p className=' md:w-10/12 mx-auto text-sm sm:text-base px-10 md:px-0 md:text-xl my-4 mb-7 text-center text-gray-200'>Endless tasks, limited hours, a single piece of paper. Not really a haiku, but we're doing our best here. No kanban boards, burdown charts, or tangled flowcharts with our focus system. Just the undeniable urge to fill empty circles.</p>
        <div className='mx-auto justify-center flex'>
          <button className='button px-3 sm:w-44 text-sm sm:text-base font-semibold'><Link href={'/items'}>Shop Focus</Link></button>       
        </div>
      </div>
      <div className=''>
        <img className='w-full md:w-11/12 mx-auto h-400 sm:h-500 object-cover object-bottom rounded-md' src="https://images.unsplash.com/photo-1631755218195-8d8e7b2c04d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjM1fHxkYXJrJTIwZGVza3xlbnwwfDB8MHx8&auto=format&fit=crop&w=600&q=60" alt="" />
      </div>

    </div>

  )
}

export default Cta2