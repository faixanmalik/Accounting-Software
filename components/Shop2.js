import React from 'react'
import Link from 'next/link'
import { AiOutlineArrowRight } from 'react-icons/ai';



const products = [
    {
      id: 1,
      href: '#',
      imageSrc: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
      imageAlt: "Front of men's Basic Tee in black.",
    },
    {
      id: 2,
      href: '#',
      imageSrc: 'https://i.pinimg.com/474x/03/f8/aa/03f8aa3f2b59311fe234418308c83dd3.jpg',
      imageAlt: "Front of men's Basic Tee in black."
    },
    {
      id: 3,
      href: '#',
      imageSrc: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
      imageAlt: "Front of men's Basic Tee in black."
    },
    {
      id: 4,
      href: '#',
      imageSrc: 'https://images.unsplash.com/photo-1556227127-3f92597d4764?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8b3ZlcmNvYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
      imageAlt: "Front of men's Basic Tee in black."
    }
  ]


function Shop2() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <h2 className="text-xl md:text-2xl font-sans font-bold tracking-tight text-gray-900">Shop by Collection</h2>
            <Link href={'/items'} className='font-semibold text-sm md:text-base flex items-center text-indigo-700 hover:text-indigo-800'>Browse all collections <AiOutlineArrowRight className='ml-1'/></Link>
          </div>
      
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }


export default Shop2