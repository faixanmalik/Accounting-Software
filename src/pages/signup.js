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
      router.push('/pannel')
    }
  }, [])



  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [industry, setIndustry] = useState('')
  const [country, setCountry] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')


  let days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  let months = ['january', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let countries = [ "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", 
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", 
    "North Macedonia", "Norway", "Oman", "Pakistan","Palau",    "Panama",    "Papua New Guinea",    "Paraguay",    "Peru",    "Philippines",    "Poland",    "Portugal",    "Qatar",    "Romania",    "Russia",    "Rwanda",    "Saint Kitts and Nevis",    "Saint Lucia",    "Saint Vincent and the Grenadines",    "Samoa",    "San Marino",    "Sao Tome and Principe",    "Saudi Arabia",    "Senegal",    "Serbia",    "Seychelles",    "Sierra Leone",    "Singapore",    "Slovakia",    "Slovenia",    "Solomon Islands",    "Somalia",    "South Africa",    "South Sudan",    "Spain",    "Sri Lanka",    "Sudan",    "Suriname",    "Sweden",    "Switzerland",    "Syria",    "Taiwan",    "Tajikistan",    "Tanzania",    "Thailand",    "Timor-Leste",    "Togo",    "Tonga",    "Trinidad and Tobago",    "Tunisia",    
    "Turkey","Turkmenistan","Tuvalu", "Uganda",    "Ukraine",    "United Arab Emirates",    "United Kingdom",    "United States of America",    "Uruguay",    "Uzbekistan",    "Vanuatu",    "Venezuela",    "Vietnam",    "Yemen",    "Zambia",    "Zimbabwe"
  ]


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
    else if(e.target.name === 'businessName'){
      setBusinessName(e.target.value)
    }
    else if(e.target.name === 'country'){
      setCountry(e.target.value)
    }
    else if(e.target.name === 'industry'){
      setIndustry(e.target.value)
    }
    else if(e.target.name === 'day'){
      setDay(e.target.value)
    }
    else if(e.target.name === 'month'){
      setMonth(e.target.value)
    }
  }


  const submit = async (e) => {
    e.preventDefault()
    

    // fetch the data from form to makes a file in local system
    const data = { firstname, lastname, email, password, confirmpassword, businessName, country, industry, day,  month };
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
        <title>SignUp_Accounting_Software</title>
        <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
    <form action="POST" onSubmit={submit}>
    

    {/* React tostify */}
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>

      <div className="bg-grey-lighter min-h-screen flex flex-col py-12">
        <div className="container min-h-screen md:max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black md:max-w-md">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
              <div className='flex space-x-2'>
                <input type="text" onChange={handleChange} value={firstname} className="bg-gray-100 bg-opacity-50 mb-3 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-2 resize-none leading-6 transition-colors duration-200 ease-in-out" name="firstname" placeholder="First Name"/>
                <input type="text" onChange={handleChange} value={lastname} className="bg-gray-100 bg-opacity-50 mb-3 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-2 resize-none leading-6 transition-colors duration-200 ease-in-out" name="lastname" placeholder="Last Name"/>
              </div>
                <input type="text" onChange={handleChange} value={businessName} className="bg-gray-100 bg-opacity-50 mb-3 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-2 resize-none leading-6 transition-colors duration-200 ease-in-out" name="businessName" placeholder="Business Name"/>
                <input type="text" onChange={handleChange} value={industry} className="bg-gray-100 bg-opacity-50 mb-3 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-2 resize-none leading-6 transition-colors duration-200 ease-in-out" name="industry" placeholder="Industry"/>
             

              <div className="">
                <select
                    onChange={handleChange}
                    value={country}
                    id="country"
                    name="country"
                    className="bg-gray-100 bg-opacity-50 mb-3 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-slate-400 p-2 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  >
                    <option>select country</option>
                      {countries.map((item,index)=>{
                        return <option key={index} value={item}>{item}</option>
                      })}
                  </select>
              </div>

             
                <label htmlFor="days" className="block mt-2 text-sm font-medium text-gray-700">
                  Last day of your financial year:
                </label>
              <div className='flex space-x-4 mb-2'>
                <select
                  onChange={handleChange}
                  value={day}
                  id="day"
                  name="day"
                  className="bg-gray-100 bg-opacity-50 mb-3 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-slate-400 p-2 resize-none leading-6 transition-colors duration-200 ease-in-out"
                >
                  <option>select day</option>
                    {days.map((item,index)=>{
                      return <option key={index} value={item}>{item}</option>
                    })}
                </select>
                <select
                  onChange={handleChange}
                  value={month}
                  id="month"
                  name="month"
                  className="bg-gray-100 bg-opacity-50 mb-3 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-slate-400 p-2 resize-none leading-6 transition-colors duration-200 ease-in-out"
                >
                  <option>select month</option>
                    {months.map((item, index)=>{
                      return <option key={index} value={item}>{item}</option>
                    })}
                </select>

              </div>


            <input type="text" onChange={handleChange} value={email} className="bg-gray-100 bg-opacity-50 mb-3 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-2 resize-none leading-6 transition-colors duration-200 ease-in-out" name="email" placeholder="Email"/>
            <input type="password" onChange={handleChange} value={password} className="bg-gray-100 bg-opacity-50 mb-3 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-2 resize-none leading-6 transition-colors duration-200 ease-in-out" name="password" placeholder="Password"/>
            <input type="password" onChange={handleChange} value={confirmpassword} className="bg-gray-100 bg-opacity-50 w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 p-2 resize-none leading-6 transition-colors duration-200 ease-in-out" name="confirmpassword" placeholder="Confirm Password"/>
            <h1 id="checkPassword" className= 'text-sm text-red-600 '></h1>

            <button type="submit" className="w-full mt-4 text-center py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 focus:outline-none my-1">Create Account</button>
      
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
