import React from 'react'
import Link from 'next/link'

function Carosel() {
  return (
    <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 md:px-10 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-5xl text-3xl mb-4 font-medium text-gray-900">Hunting_Store</h1>
            <h1 className="text-lg sm:text-2xl mb-4 font-semibold text-gray-900">A Hunting_Store By a Hunting_Store</h1>
            <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
            <div className="flex justify-center">
              <button className="inline-flex items-center bg-indigo-600 text-white rounded-xl font-semibold border-0 py-2 px-5 focus:outline-none hover:bg-indigo-700 text-base mt-4 md:mt-0 "><Link href={"/signup"}>Sign Up</Link></button>
              <button className="ml-4 inline-flex items-center bg-indigo-600 text-white rounded-xl font-semibold border-0 py-2 px-5 focus:outline-none hover:bg-indigo-700 text-base mt-4 md:mt-0 "><Link href={"/contact"}>Contact US</Link></button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src="https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNob3BwaW5nJTIwc3RvcmV8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"/>
          </div>
        </div>
      </section>
  )
}

export default Carosel;