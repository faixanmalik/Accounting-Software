import { React, useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import Forgot from '../models/Forgot'


import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function ForgotPage({dbuser}) {
    const router = useRouter()
    const { token } = router.query
    const [email, setEmail] = useState('')
    const [npassword, setNpassword] = useState('')
    const [cnpassword, setCnpassword] = useState('')



    const handleChange = (e) => {
        if ( e.target.name === 'email') {
          setEmail(e.target.value)
        }
        else if ( e.target.name === 'npassword') {
          setNpassword(e.target.value)
        }
        else if ( e.target.name === 'cnpassword') {
          setCnpassword(e.target.value)
        }
      }
    
    
    
    const sendEmailDetails = async (e) => {
        e.preventDefault()
    
        
        // fetch the data from form to makes a file in local system
        const data = { email };
          let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sendemail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          let response = await res.json()
            setEmail('')
    
            if (response.success === true) {
                toast.success(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
            }
    
            else {
                toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
            }
    
    }


    const setPassword = async (e) => {
        e.preventDefault()

        if( npassword !== cnpassword ){
            document.getElementById('checkPassword').innerHTML = "Your Password is not Match!"
          }
        else{
            document.getElementById('checkPassword').innerHTML = ""
            // fetch the data from form to makes a file in local system
            const data = { npassword, cnpassword , token };
              let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/setpassword`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
          let response = await res.json()    
    
            if (response.success === true) {
                toast.success("Your Password has been changes successfully" , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
            }
    
            else {
                toast.error("Internal Server Error" , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
            }
        }
    }
    
    
  return (
    <>
    <Head>
      <title>Reset_Hunting_Store</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>
   {/* React tostify */}
   <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 className="text-center text-2xl font-bold text-indigo-700 mb-5">Hunting_Store</h1>  
            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">

            { dbuser && <div>
                <form method='POST' onSubmit={setPassword}>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">New Password</label>
                <input id='npassword' name='npassword' onChange={handleChange} value={npassword} type="password" className="bg-gray-100 bg-opacity-50 resize-none text-gray-700 outline-none border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full transition-colors duration-200 ease-in-out" />

                <label className="font-semibold text-sm text-gray-600 pb-1 block">Confirm New Password</label>
                <input id='cnpassword' name='cnpassword' onChange={handleChange} value={cnpassword} type="password" className="bg-gray-100 bg-opacity-50 resize-none text-gray-700 outline-none border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full transition-colors duration-200 ease-in-out" />
                <h1 id="checkPassword" className= 'text-sm text-red-600 mb-5'></h1>
        
                <button type="submit" className="w-full text-center py-2 bg-indigo-700 text-white rounded-xl font-semibold hover:bg-blue-800 focus:outline-none my-1">
                    <span className="inline-block mr-2">Submit</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
            </form>
            </div>}



            { dbuser === null  && <form method='POST' onSubmit={sendEmailDetails}>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                <input onChange={handleChange} value={email} id='email' name='email' type="text" className="bg-gray-100 bg-opacity-50 resize-none text-gray-700 outline-none border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full transition-colors duration-200 ease-in-out" required />
                
        
                <button type="submit" className="w-full text-center py-2 bg-indigo-700 text-white rounded-xl font-semibold hover:bg-blue-800 focus:outline-none my-1">
                    <span className="inline-block mr-2">Submit</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
            </form>}



            </div>
           
            <div className="p-5">
                <div className="grid grid-cols-3 gap-1">
                    <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">MailUp</button>
                    <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Google</button>
                    <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Github</button>
                </div>
            </div>
                <div className="py-5">
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
            <div className="py-5">
                <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="inline-block ml-1"><Link href={"/"}>Back to Hunting_Store.com</Link></span>
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}



export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState){
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI)
    }

    let dbuser = await Forgot.findOne({token: context.query.token})


  return {
    props: { dbuser: JSON.parse(JSON.stringify(dbuser)) } 
   }

}

export default ForgotPage