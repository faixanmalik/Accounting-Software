import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";


import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Signup() {

  const router = useRouter();

  useEffect(() => {
    if(localStorage.getItem("token")){
        router.push('/')
    }
  }, [])



  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')


  const handleChange = (e) => {
    if (e.target.name === 'firstname') {
      setFirstname(e.target.value)
    }
    else if (e.target.name === 'lastname') {
      setLastname(e.target.value)
    }
    else if (e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name === 'confirmpassword') {
      setConfirmpassword(e.target.value)
    }
  }




  const submit = async (e) => {
    e.preventDefault()
    

    // fetch the data from form to makes a file in local system
    const data = { firstname, lastname, email, password, confirmpassword };
    if( password !== confirmpassword ){
      document.getElementById('checkPassword').innerHTML = "Your Password is not Match!"
    }
    else{
      document.getElementById('checkPassword').innerHTML = ""
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let response = await res.json();
        if (response.success === true) {
          toast.success(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
          setTimeout(() => {
            router.push(`${process.env.NEXT_PUBLIC_HOST}/login`);
          }, 1500);
        }
        else{
          toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
          setTimeout(() => {
            router.push(`${process.env.NEXT_PUBLIC_HOST}/login`);
          }, 1500);
        }

        setFirstname('')
        setLastname('')
        setEmail('')
        setPassword('')
        setConfirmpassword('')

    }
  }



  return (

    <>
    <Head>
        <title>SignUp_Hunting_Store</title>
        <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
    <form action="POST" onSubmit={submit}>
    

    {/* React tostify */}
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>


      <div className="bg-grey-lighter min-h-screen flex flex-col py-12">
        <div className="container min-h-screen max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <input type="text" onChange={handleChange} value={firstname} className="bg-gray-100 bg-opacity-50 mb-4 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-3 resize-none leading-6 transition-colors duration-200 ease-in-out" name="firstname" placeholder="First Name"/>
            <input type="text" onChange={handleChange} value={lastname} className="bg-gray-100 bg-opacity-50 mb-4 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-3 resize-none leading-6 transition-colors duration-200 ease-in-out" name="lastname" placeholder="Last Name"/>
            <input type="text" onChange={handleChange} value={email} className="bg-gray-100 bg-opacity-50 mb-4 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-3 resize-none leading-6 transition-colors duration-200 ease-in-out" name="email" placeholder="Email"/>
            <input type="password" onChange={handleChange} value={password} className="bg-gray-100 bg-opacity-50 mb-4 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-3 resize-none leading-6 transition-colors duration-200 ease-in-out" name="password" placeholder="Password"/>
            <input type="password" onChange={handleChange} value={confirmpassword} className="bg-gray-100 bg-opacity-50 mb-1 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-3 resize-none leading-6 transition-colors duration-200 ease-in-out" name="confirmpassword" placeholder="Confirm Password"/>
            <h1 id="checkPassword" className= 'text-sm text-red-600 '></h1>

            <button type="submit" className="w-full mt-4 text-center py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 focus:outline-none my-1">Create Account</button>
      
            <div className="text-center text-sm text-grey-dark mt-4">By signing up, you agree to the
              <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">Terms of Service</a>{" "}and
              <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">Privacy Policy</a>
            </div>


          </div>

          <div className="text-grey-dark mt-6">Already have an account?
            <Link className="no-underline border-b border-blue text-blue" href={'login'}>Log in</Link>.
          </div>
        </div>
      </div>
    </form>
    </>
  );
}

export default Signup;
