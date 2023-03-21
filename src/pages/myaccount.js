import { React, useEffect, useState }from 'react'
import Head from 'next/head';


import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Myaccount() {

  useEffect(() => {
    const myUser = JSON.parse(localStorage.getItem('myUser'))
    if(!myUser){
        router.push('/')
    }
    if(myUser && myUser.token){
      setUser(myUser)
      setEmail(myUser.email)
      fetchUser(myUser.token);
    }
  }, [])

  const [user, setUser] = useState({value: null})
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [phoneno, setphoneNo] = useState('')
  const [streetAddress, setstreetAddress] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [npassword, setNpassword] = useState('')
  const [cnpassword, setCnpassword] = useState('')


  const fetchUser = async(token) =>{
    // fetch the data from form to makes a file in local system
    const data = { token: token  };
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

      setFirstname(response.firstname)
      setLastname(response.lastname)
      setEmail(response.email)
      setphoneNo(response.phoneno)
      setState(response.state)
      setstreetAddress(response.streetAddress)
      setZip(response.zip)
  }


  const changeUserPassword = async (e) => {
    e.preventDefault()

    
    // fetch the data from form to makes a file in local system
    const data = { token: user.token, cpassword, npassword, cnpassword  };
    if( npassword !== cnpassword ){
      document.getElementById('checkPassword').innerHTML = "Your Password is not Match!"
    }
    else{
      document.getElementById('checkPassword').innerHTML = ""
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        let response = await res.json()  
        if (response.success === true) {
            toast.success(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
        else {
            toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
        setCpassword('')
        setNpassword('')
        setCnpassword('')
    }
      
    

  }


  const submit = async (e) => {
    e.preventDefault()

    
    // fetch the data from form to makes a file in local system
    const data = { token: user.token, firstname, lastname, phoneno, streetAddress, state, zip  };
   
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()  
      
        if (response.success === true) {
            toast.success(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }

        else {
            toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }

  }



  const handleChange = (e) => {
    if ( e.target.name === 'firstname') {
      setFirstname(e.target.value)
    }
    else if ( e.target.name === 'lastname') {
      setLastname(e.target.value)
    }
    else if ( e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if ( e.target.name === 'phoneno') {
      setphoneNo(e.target.value)
    }
    else if ( e.target.name === 'streetAddress') {
      setstreetAddress(e.target.value)
    }
    else if (e.target.name === 'state') {
      setState(e.target.value)
    }
    else if (e.target.name === 'zip') {
      setZip(e.target.value)
    }
    else if (e.target.name === 'cpassword') {
      setCpassword(e.target.value)
    }
    else if (e.target.name === 'npassword') {
      setNpassword(e.target.value)
    }
    else if (e.target.name === 'cnpassword') {
      setCnpassword(e.target.value)
    }
  }

  
  return (
    <>
    <Head>
      <title>MyAccount_Hunting_Store</title>
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
   </Head>
     {/* React tostify */}
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable theme="light"/>

    <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-10 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
    </div>
    <div className="lg:w-10/12 md:w-2/3 mx-auto">

      {/* Account Details */}
      <h1 className='pb-5 text-xl font-sans font-semibold text-indigo-700'>1. Account Details</h1>
      <form method='POST' onSubmit={submit}>
        <div className="flex flex-wrap -m-2">
          <div className='w-full sm:flex'>
            <div className="p-2 w-full sm:w-1/2">
              <div className="relative">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">First Name</label>
                <input onChange={handleChange} value={firstname} type="text" id="firstname" name="firstname" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-full sm:w-1/2">
              <div className="relative">
                  <label htmlFor="lastname" className="leading-7 text-sm text-gray-600">Last Name</label>
                  <input onChange={handleChange} value={lastname} type="text" id="lastname" name="lastname" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
          </div>
          <div className="p-2 w-full">
            <div className="relative">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              {user && user.token ? <input value={user.email} type="text" className="w-full bg-gray-100 bg-opacity-50 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" readOnly/>: 
              <input onChange={handleChange} value={email} type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" required  />}
            </div>
          </div>
          <div className="p-2 w-full">
            <div className="relative">
              <label htmlFor="phoneno" className="leading-7 text-sm text-gray-600">Phone No</label>
              <input onChange={handleChange} value={phoneno} type="Number" id="phoneno" name="phoneno" className="w-full bg-gray-100 bg-opacity-50 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="+92300-1234567"  />
            </div>
          </div>
          <div className='w-full sm:flex'>
            <div className="p-2 w-full sm:w-1/2">
              <div className="relative">
                <label htmlFor="streetAddress" className="leading-7 text-sm text-gray-600">Street Address</label>
                <input onChange={handleChange} value={streetAddress} type="text" id="streetAddress" name="streetAddress" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-full sm:w-1/2">
              <div className="relative">
                <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                <input onChange={handleChange} value={state} type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-full sm:w-1/2">
              <div className="relative">
                <label htmlFor="zip" className="leading-7 text-sm text-gray-600">Zip</label>
                <input onChange={handleChange} value={zip} type="text" id="zip" name="zip" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

          </div>

          <div className="px-2 mt-3 md:mt-5 w-full bg-gray-50 rounded-md">
            <button type='submit' className="flex ml-auto items-center bg-indigo-600 text-white rounded-xl font-semibold border-0 py-3 px-10 focus:outline-none hover:bg-indigo-700 text-lg mt-4 md:mt-0">Save</button>
          </div>
        </div>
      </form>






      {/* Password Setting */}
      <div className='mt-10'>
        <h1 className='pb-5 text-xl font-sans font-semibold text-indigo-700'>2. Change Password</h1>

        <form method='POST' onSubmit={changeUserPassword}>
        <div className="flex flex-wrap -m-2">
  
          <div className='w-full sm:flex'>
            <div className="p-2 w-full sm:w-1/2">
              <div className="relative">
                <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Current Password</label>
                <input onChange={handleChange} value={cpassword} type="password" id="cpassword" name="cpassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-full sm:w-1/2">
              <div className="relative">
                <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
                <input onChange={handleChange} value={npassword} type="password" id="npassword" name="npassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-full sm:w-1/2">
              <div className="relative">
                <label htmlFor="cnpassword" className="leading-7 text-sm text-gray-600">Confirm New Password</label>
                <input onChange={handleChange} value={cnpassword} type="password" id="cnpassword" name="cnpassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
          </div>
            <h1 id="checkPassword" className= 'text-sm text-red-600 ml-3 sm:ml-auto sm:mr-5 md:mr-0 lg:mr-24 xl:mr-40'></h1>

          <div className="px-2 mt-3 md:mt-5 w-full bg-gray-50 rounded-md">
            <button type='submit' className="flex ml-auto items-center bg-indigo-600 text-white rounded-xl font-semibold border-0 py-3 px-10 focus:outline-none hover:bg-indigo-700 text-lg mt-4 md:mt-0">Save</button>
          </div>
        </div>
        </form>
      </div>
      
    </div>


  </div>
</section>



    
    </>
  )
}





export default Myaccount