import React from 'react'
import Head from 'next/head';
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const router = useRouter()  

  useEffect(() => {
    if(localStorage.getItem("myUser")){
      router.push('/panel')
    }
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const submit = async (e) => {
    e.preventDefault()
    
    // fetch the data from form to makes a file in local system
    const data = { email, password };

      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()
      if (response.success === true) {
        toast.success(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });

        if(response.businessName){
          localStorage.setItem('myUser', JSON.stringify({token: response.token, email: response.email, businessName:response.businessName, department:response.department}))
        }
        else{
          localStorage.setItem('myUser', JSON.stringify({token: response.token, email: response.email, name: response.name, department:response.department }))
        }
        setTimeout(() => {
          router.push(`${process.env.NEXT_PUBLIC_HOST}/panel`);
        }, 1500);
      }
      if (!response.success == true){
        toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      }
      if (response.success == "none"){
        toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        setTimeout(() => {
          router.push(`${process.env.NEXT_PUBLIC_HOST}/signup`);
        }, 1500);
      }
      setEmail('')
      setPassword('')
  }

  const handleChange = (e) => {
    if ( e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }


  return (
   <> 
   <Head>
      <title>Login_Accounting_Software</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>
  {/* React tostify */}
  <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable theme="light"/>
    <div className="min-h-screen bg-grey-lighter flex flex-col justify-center sm:py-4">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">

            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-7">

              <form method='POST' onSubmit={submit}>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                <input onChange={handleChange} value={email} name="email" id='email' type="text" className="bg-gray-100 bg-opacity-50 resize-none text-gray-700 outline-none border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 rounded-lg px-3 py-2 mt-1 mb-4 text-sm w-full transition-colors duration-200 ease-in-out" />
                
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                <input onChange={handleChange} value={password} name="password" id='password' type="password" className="bg-gray-100 bg-opacity-50 resize-none text-gray-700 outline-none border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 rounded-lg px-3 py-2 mt-1 mb-4 text-sm w-full transition-colors duration-200 ease-in-out" />
 
                <button type="submit" className="w-full text-center py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold hover:bg-green-dark focus:outline-none my-1">
                    <span className="inline-block mr-2">Login</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </form>
            </div>
           
            <div className="p-3">
                <div className="grid grid-cols-3 gap-1">
                    <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">MailUp</button>
                    <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Google</button>
                    <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Github</button>
                </div>
            </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                        <Link href={"/forgot"}><span className="inline-block ml-1">Forgot Password</span></Link>
                    </button>
                </div>
                <div className="text-center sm:text-right whitespace-nowrap">
                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-bottom	">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="inline-block ml-1">Help</span>
                    </button>
                </div>
              </div>
            </div>
            <div className="py-1">
                <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="inline-block ml-1"><Link href={"/"}>Back to Accounting_Software</Link></span>
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>

    </>  
  )
}

export default Login