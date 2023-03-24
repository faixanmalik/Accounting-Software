import React, {Fragment, useState} from 'react'
import mongoose from "mongoose";
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import dbBusiness from 'models/Business';
import { ProSidebarProvider } from 'react-pro-sidebar';
import FullLayout from '@/pannel/layouts/FullLayout';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Business = ({dbBusiness}) => {


  const [open, setOpen] = useState(false)

  // Add industrys
  const [businessName, setBusinessName] = useState('')
  const [industry, setIndustry] = useState('')
  const [country, setCountry] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')


  // id For delete contact
  const [id, setId] = useState('')
  

  const handleChange = (e) => {
    if(e.target.name === 'businessName'){
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

  const editEntry = async(id)=>{
    setOpen(true)

    const data = { id,  businessName, country, industry, day,  month,  path: 'business'};
    
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/editEntry`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()
      
      if (response.success === true) {
        window.location.reload();
      }
      else {
          toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      }
  }

  const delEntry = async(id)=>{

    const data = { id , path: 'business' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/delEntry`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

      if (response.success === true) {
        window.location.reload();
      }
      else {
        toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      }
    
  }

  const getData = async (id) =>{
    setOpen(true)

    const data = { id, path: 'business' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getDataEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()
      if (response.success === true){
        setId(response.data._id)
        setBusinessName(response.data.businessName)
        setCountry(response.data.country)
        setIndustry(response.data.industry)
        setDay(response.data.day)
        setMonth(response.data.month)
      }
      else {
      toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }
  }

  const submit = async(e)=>{
    e.preventDefault()
    
    // fetch the data from form to makes a file in local system
    const data = { businessName, country, industry, day,  month, path: 'business' };

      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addEntry`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()

    if(response.success === true){
      window.location.reload();
    }
    else {
      toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }
  }


  let days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  let months = ['january', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let countries = [ "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", 
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", 
    "North Macedonia", "Norway", "Oman", "Pakistan","Palau",    "Panama",    "Papua New Guinea",    "Paraguay",    "Peru",    "Philippines",    "Poland",    "Portugal",    "Qatar",    "Romania",    "Russia",    "Rwanda",    "Saint Kitts and Nevis",    "Saint Lucia",    "Saint Vincent and the Grenadines",    "Samoa",    "San Marino",    "Sao Tome and Principe",    "Saudi Arabia",    "Senegal",    "Serbia",    "Seychelles",    "Sierra Leone",    "Singapore",    "Slovakia",    "Slovenia",    "Solomon Islands",    "Somalia",    "South Africa",    "South Sudan",    "Spain",    "Sri Lanka",    "Sudan",    "Suriname",    "Sweden",    "Switzerland",    "Syria",    "Taiwan",    "Tajikistan",    "Tanzania",    "Thailand",    "Timor-Leste",    "Togo",    "Tonga",    "Trinidad and Tobago",    "Tunisia",    
    "Turkey","Turkmenistan","Tuvalu", "Uganda",    "Ukraine",    "United Arab Emirates",    "United Kingdom",    "United States of America",    "Uruguay",    "Uzbekistan",    "Vanuatu",    "Venezuela",    "Vietnam",    "Yemen",    "Zambia",    "Zimbabwe"
  ]
   
  
  



  return (
    <>
    <ProSidebarProvider>
    <style jsx global>{`
        footer {
          display: none;
        }
        header {
          display: none;
        }
      `}</style>
    <FullLayout>
    {/* React tostify */}
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>

    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0 flex">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Manage Businesses</h3>
            <button onClick={()=>{ 
              setOpen(true), 
              setBusinessName(''), 
              setCountry(''), 
              setIndustry(''), 
              setDay(''), 
              setMonth('')
            }} className='ml-auto bg-blue-800 text-white px-14 py-2 rounded-lg'>
              New
            </button>
          </div>
        </div>
        <div className="mt-2 md:col-span-2 md:mt-0">
          <form method="POST">
            <div className="overflow-hidden shadow sm:rounded-md">
            <div className="overflow-x-auto shadow-sm">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Sr.
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Business Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Business Industry
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Country
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Last Day of Financial Year
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <span className="">Action</span>
                      </th>
                  </tr>
                </thead>

                <tbody>
                  
                  {dbBusiness.map((item, index)=>{
                    return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {index + 1}
                    </td>
                    <td scope="row" className="px-6 py-4 font-semibold text-blue-700 whitespace-nowrap">
                        {item.businessName}
                    </td>
                    <td className="px-6 py-4">
                        {item.industry}
                    </td>
                    <td className="px-6 py-4">
                        {item.country}
                    </td>
                    <td className="px-6 py-4">
                        {item.day}-{item.month}
                    </td>
                    <td className="px-6 py-4">
                      <Menu as="div" className=" inline-block text-left">
                        <div>
                          <Menu.Button className="z-0">
                            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                          </Menu.Button>
                        </div>
                        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                          <Menu.Items className="absolute right-20 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1 z-20">
                              
                              <Menu.Item>{({ active }) => (
                                  <div onClick={()=>{getData(item._id)}} className={classNames(   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 no-underline', 'w-full text-left block px-4 py-2 text-sm hover:no-underline' )}>Edit</div>
                                )}
                              </Menu.Item>
                              <Menu.Item>{({ active }) => (
                                  <div onClick={()=>{delEntry(item._id)}} className={classNames(   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 no-underline', 'w-full text-left block px-4 py-2 text-sm hover:no-underline' )}>Delete</div>
                                )}
                              </Menu.Item>
                         
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>})}

                </tbody>

              </table>
                {dbBusiness.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No Bank Account found</h1> : ''}
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={()=>{setOpen(false)}}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95" enterTo="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 md:scale-100" leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-3xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-6 lg:right-8" onClick={() => setOpen(false)}>
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  
                  <div className='w-full'>
                    <div className="mt-10 sm:mt-0 w-full">
                      <div className="md:grid md:grid-cols-1 md:gap-6">
                        <div className="md:col-span-1">
                          <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Add a New Business</h3>
                          </div>
                        </div>
                        <div className="mt-2 md:col-span-2 md:mt-0 w-full">
                          <form method="POST" onSubmit={submit}>
                            <div className="overflow-hidden shadow sm:rounded-md">
                              <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-6 gap-6">

                                    <div className="col-span-6 sm:col-span-6">
                                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
                                      <input onChange={handleChange} value={businessName} type="text" name="businessName" id="businessName" autoComplete="businessName" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                                      <input onChange={handleChange} value={industry} type="text" name="industry" id="industry" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-s requiredm"/>
                                    </div>

                                    <div className="col-span-3">
                                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                      <select
                                          onChange={handleChange}
                                          value={country}
                                          id="country"
                                          name="country"
                                          className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        >
                                          <option>select country</option>
                                            {countries.map((item,index)=>{
                                              return <option key={index} value={item}>{item}</option>
                                            })}
                                        </select>
                                    </div>



                                    <div className="col-span-6 sm:col-span-6">
                                      <label htmlFor="days" className="block text-sm font-medium text-gray-700">
                                        Last day of your financial year
                                      </label>
                                      <div className='flex space-x-4'>
                                        <select
                                          onChange={handleChange}
                                          value={day}
                                          id="day"
                                          name="day"
                                          className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                                          className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        >
                                          <option>select month</option>
                                            {months.map((item, index)=>{
                                              return <option key={index} value={item}>{item}</option>
                                            })}
                                        </select>

                                      </div>
                                    </div>


                                </div>
                              </div>
                              <div className="bg-gray-50 space-x-3 px-4 py-3 text-right sm:px-6">
                                <button type='button' onClick={()=>{editEntry(id)}} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save Changes</button>
                                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                            </div>
                            
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div>
                  
                    </div>
                  </div>

                
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </FullLayout>
    </ProSidebarProvider>

    </>
  )
}


export async function getServerSideProps() {
  if (!mongoose.connections[0].readyindustry){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }
  let dbData = await dbBusiness.find()
  

  // Pass data to the page via props
  return {
     props: { 
      dbBusiness: JSON.parse(JSON.stringify(dbData)),
      }
  }
}

export default Business