import React, {Fragment, useState} from 'react'
import mongoose from "mongoose";
import moment from 'moment/moment';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Employee from 'models/Employees';
import { ProSidebarProvider } from 'react-pro-sidebar';
import FullLayout from '@/pannel/layouts/FullLayout';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Employees = ({dbEmployee}) => {

  const [open, setOpen] = useState(false)

  // Add States
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [country, setCountry] = useState('United States')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [gender, setGender] = useState('')
  const [designation, setDesignation] = useState('')
  const [department, setDepartment] = useState('')
  const [dob, setDob] = useState('')
  const [citizenship, setCitizenship] = useState('')
  const [maritalStatus, setMaritalStatus] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [payPolicy, setPayPolicy] = useState('')
  const [basicPay, setBasicPay] = useState('')
  const [employmentMode, setEmploymentMode] = useState('')
  const [paymentMode, setPaymentMode] = useState('')
  const [status, setStatus] = useState('')
  const [workShift, setWorkShift] = useState('')
  const [workHour, setWorkHour] = useState('')
  const [hireDate, setHireDate] = useState('')
  const [cnic, setCnic] = useState('')
  const [siteName, setSiteName] = useState('')
  const [joiningDate, setJoiningDate] = useState('')



  // id For delete contact
  const [id, setId] = useState('')
  

  const handleChange = (e) => {
  
    if(e.target.name === 'name'){
      setName(e.target.value)
    }
    else if(e.target.name === 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.name === 'cnic'){
      setCnic(e.target.value)
    }
    else if(e.target.name === 'joiningDate'){
      setJoiningDate(e.target.value)
    }
    else if(e.target.name === 'siteName'){
      setSiteName(e.target.value)
    }
    else if(e.target.name === 'hireDate'){
      setHireDate(e.target.value)
    }
    else if(e.target.name === 'workHour'){
      setWorkHour(e.target.value)
    }
    else if(e.target.name === 'workShift'){
      setWorkShift(e.target.value)
    }
    else if(e.target.name === 'employmentMode'){
      setEmploymentMode(e.target.value)
    }
    else if(e.target.name === 'status'){
      setStatus(e.target.value)
    }
    else if(e.target.name === 'paymentMode'){
      setPaymentMode(e.target.value)
    }
    else if(e.target.name === 'basicPay'){
      setBasicPay(e.target.value)
    }
    else if(e.target.name === 'designation'){
      setDesignation(e.target.value)
    }
    else if(e.target.name === 'payPolicy'){
      setPayPolicy(e.target.value)
    }
    else if(e.target.name === 'maritalStatus'){
      setMaritalStatus(e.target.value)
    }
    else if(e.target.name === 'fatherName'){
      setFatherName(e.target.value)
    }
    else if(e.target.name === 'citizenship'){
      setCitizenship(e.target.value)
    }
    else if(e.target.name === 'dob'){
      setDob(e.target.value)
    }
    else if(e.target.name === 'department'){
      setDepartment(e.target.value)
    }
    else if(e.target.name === 'phoneNo'){
      setPhoneNo(e.target.value)
    }
    else if(e.target.name === 'country'){
      setCountry(e.target.value)
    }
    else if(e.target.name === 'streetAddress'){
      setStreetAddress(e.target.value)
    }
    else if(e.target.name === 'city'){
      setCity(e.target.value)
    }
    else if(e.target.name === 'state'){
      setState(e.target.value)
    }
    else if(e.target.name === 'zip'){
      setZip(e.target.value)
    }
    else if(e.target.name === 'gender'){
      setGender(e.target.value)
    }
  }

  const editEntry = async(id)=>{
    setOpen(true)

    const data = { id, name, fatherName, dob, email, cnic,  phoneNo, citizenship, gender, maritalStatus, designation, department, workShift, workHour, employmentMode, payPolicy, basicPay, paymentMode, status, hireDate, siteName, joiningDate, country, streetAddress, city, state, zip, path:'employees' }
    
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

    const data = { id , path: 'employees' };
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

    const data = { id, path: 'employees' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getDataEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

      
      if (response.success === true){

        const dDate = moment(response.data.dob).utc().format('YYYY-MM-DD')
        const jDate = moment(response.data.joiningDate).utc().format('YYYY-MM-DD')
        const hDate = moment(response.data.hireDate).utc().format('YYYY-MM-DD')

        setId(response.data._id)
        setName(response.data.name)
        setEmail(response.data.email)
        setCnic(response.data.cnic)
        setJoiningDate(jDate)
        setSiteName(response.data.siteName)
        setHireDate(hDate)
        setWorkHour(response.data.workHour)
        setWorkShift(response.data.workShift)
        setEmploymentMode(response.data.employmentMode)
        setStatus(response.data.status)
        setPaymentMode(response.data.paymentMode)
        setBasicPay(response.data.basicPay)
        setDesignation(response.data.designation)
        setPayPolicy(response.data.payPolicy)
        setMaritalStatus(response.data.maritalStatus)
        setFatherName(response.data.fatherName)
        setCitizenship(response.data.citizenship)
        setDob(dDate)
        setDepartment(response.data.department)
        setPhoneNo(response.data.phoneNo)
        setCountry(response.data.country)
        setStreetAddress(response.data.streetAddress)
        setCity(response.data.city)
        setState(response.data.state)
        setZip(response.data.zip)
        setGender(response.data.gender)
      }
  }

  const submit = async(e)=>{
    e.preventDefault()
    
    // fetch the data from form to makes a file in local system
    const data = { name, fatherName, dob, email, cnic,  phoneNo, citizenship, gender, maritalStatus, designation, department, workShift, workHour, employmentMode, payPolicy, basicPay, paymentMode, status, hireDate, siteName, joiningDate, country, streetAddress, city, state, zip, path:'employees' };
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
            <h3 className="text-lg font-medium leading-6 text-gray-900">Employees</h3>
            <button onClick={()=>{
              setOpen(true), 
              setName('')
              setEmail('')
              setCnic('')
              setJoiningDate('')
              setSiteName('')
              setHireDate()
              setWorkHour('')
              setWorkShift('')
              setEmploymentMode('')
              setStatus('')
              setPaymentMode('')
              setBasicPay('')
              setDesignation('')
              setPayPolicy('')
              setMaritalStatus('')
              setFatherName('')
              setCitizenship('')
              setDob('')
              setDepartment('')
              setPhoneNo('')
              setCountry('')
              setStreetAddress('')
              setCity('')
              setState('')
              setZip('')
              setGender('')
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
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Designation
                      </th>
                      <th scope="col" className="px-6 py-3">
                          SiteName
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Salary
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <span className="">Action</span>
                      </th>
                  </tr>
                </thead>

                <tbody>
                  
                  {dbEmployee.map((item, index)=>{
                    return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {index + 1}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {item.name}
                    </td>
                    <td className="px-6 py-4">
                        {item.designation}
                    </td>
                    <td className="px-6 py-4">
                        {item.siteName}
                    </td>
                    <td className="px-6 py-4">
                        {item.basicPay}
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
                {/*{all.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found</h1> : ''}*/}
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
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-5xl">
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
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Add Contact</h3>
                          </div>
                        </div>
                        <div className="mt-2 md:col-span-2 md:mt-0 w-full">
                          <form method="POST" onSubmit={submit}>
                            <div className="overflow-hidden shadow sm:rounded-md">
                              <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-6 gap-6">

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                                      <input type="text" onChange={handleChange} name="name" id="name" value={name} placeholder='John Doe' className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    <div className="col-span-2">
                                      <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father Name:</label>
                                      <input onChange={handleChange} value={fatherName} type="text" name="fatherName" id="fatherName" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                      <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of birth
                                      </label>
                                      <input onChange={handleChange} value={dob} type="date" name="dob" id="dob" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>
                                    
                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                      <input onChange={handleChange} value={email} type="text" name="email" id="email" autoComplete="email" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    <div className="col-span-2">
                                      <label htmlFor="cnic" className="block text-sm font-medium text-gray-700">Cnic:</label>
                                      <input onChange={handleChange} value={cnic} type="number" name="cnic" id="cnic" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"  required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                      <input onChange={handleChange} value={phoneNo} type="number" name="phoneNo" id="phoneNo" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    


                                    <div className="col-span-6 sm:col-span-2">
                                        <label htmlFor="citizenship" className="block text-sm font-medium text-gray-700">Citizenship:</label>
                                        <input type="text" onChange={handleChange} name="citizenship" id="citizenship" value={citizenship} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
                                      <select id="gender" name="gender" onChange={handleChange} value={gender} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option>Select Gender</option>
                                        <option value={'Admin'}>Male</option>
                                        <option value={'Female'}>Female</option>
                                      </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">Marital Status:</label>
                                      <select id="maritalStatus" name="maritalStatus" onChange={handleChange} value={maritalStatus} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option value={'Single'}>Single</option>
                                        <option value={'Married'}>Married</option>
                                      </select>
                                    </div>

                                    



                            
                                    <div className="col-span-6 sm:col-span-2 mt-3">
                                      <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation:</label>
                                      <select id="designation" name="designation" onChange={handleChange} value={designation} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option>Select Designation </option>
                                        <option value={'Admin Officer'}>Admin officer</option>
                                        <option value={'Account Officer'}>Account officer</option>
                                        <option value={'Store Incharge'}>Store Incharge</option>
                                      </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-2 mt-3">
                                      <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department:</label>
                                      <select id="department" name="department" onChange={handleChange} value={department} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option>Select Department </option>
                                        <option value={'Admin'}>Admin</option>
                                        <option value={'Finance'}>Finance</option>
                                        <option value={'Sales'}>Sales</option>
                                        <option value={'Ops'}>Ops</option>
                                      </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-1 mt-3">
                                      <label htmlFor="workShift" className="block text-sm font-medium text-gray-700">Work Shift:</label>
                                      <select id="workShift" name="workShift" onChange={handleChange} value={workShift} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option value={'Morning'}>Morning</option>
                                        <option value={'Afternoon'}>Afternoon</option>
                                        <option value={'Evening'}>Evening</option>
                                        <option value={'Night'}>Night</option>
                                      </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-1 mt-3">
                                      <label htmlFor="employmentMode" className="block text-sm font-medium text-gray-700">Eployment Mode:</label>
                                      <select id="employmentMode" name="employmentMode" onChange={handleChange} value={employmentMode} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option value={'Full Time'}>Full Time</option>
                                        <option value={'Part Time'}>Part Time</option>
                                      </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-1 mt-3">
                                      <label htmlFor="payPolicy" className="block text-sm font-medium text-gray-700">Pay Policy:</label>
                                      <select id="payPolicy" name="payPolicy" onChange={handleChange} value={payPolicy} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option value={'Hourly'}>Hourly</option>
                                        <option value={'Weekly'}>Weekly</option>
                                        <option value={'Monthly'}>Monthly</option>
                                      </select>
                                    </div>

                                    <div className="col-span-1 mt-3">
                                      <label htmlFor="basicPay" className="block text-sm font-medium text-gray-700">Basic Pay:</label>
                                      <input onChange={handleChange} value={basicPay} type="number" name="basicPay" id="basicPay" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"  required/>
                                    </div>

                                    

                                    <div className="col-span-6 sm:col-span-1 mt-3">
                                      <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700">Payment Mode:</label>
                                      <select id="paymentMode" name="paymentMode" onChange={handleChange} value={paymentMode} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option value={'Cash'}>Cash</option>
                                        <option value={'Cheque'}>Cheque</option>
                                        <option value={'Credit Card'}>Credit Card</option>
                                        <option value={'Internet Banking'}>Internet Banking</option>
                                      </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-1 mt-3">
                                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
                                      <select id="status" name="status" onChange={handleChange} value={status} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option value={'Active'}>Active</option>
                                        <option value={'Inactive'}>Inactive</option>
                                      </select>
                                    </div>

                                    

                                    <div className="col-span-1 mt-3">
                                      <label htmlFor="workHour" className="block text-sm font-medium text-gray-700">Work Hour:</label>
                                      <input onChange={handleChange} value={workHour} type="number" name="workHour" id="workHour" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-1 mt-3">
                                      <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700">Hire Date:
                                      </label>
                                      <input onChange={handleChange} value={hireDate} type="date" name="hireDate" id="hireDate" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                                    </div>

                                    

                                    <div className="col-span-2 mt-3">
                                      <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name:</label>
                                      <input onChange={handleChange} value={siteName} type="text" name="siteName" id="siteName" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"  required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2 mt-3">
                                      <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700">Joining Date:
                                      </label>
                                      <input onChange={handleChange} value={joiningDate} type="date" name="joiningDate" id="joiningDate" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>


                                    <div className="col-span-6 sm:col-span-2 mt-3">
                                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                      <select id="country" name="country" onChange={handleChange} value={country} autoComplete="country" className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option value={'United States'}>United States</option>
                                        <option value={'Canada'}>Canada</option>
                                        <option value={'Mexico'}>Mexico</option>
                                      </select>
                                    </div>



                                    <div className="col-span-6 mt-3">
                                      <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
                                      <input onChange={handleChange} value={streetAddress} type="text" name="streetAddress" id="streetAddress" autoComplete="streetAddress" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                      <input onChange={handleChange} value={city} type="text" name="city" id="city" autoComplete="address-level2" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                                      <input onChange={handleChange} value={state} type="text" name="state" id="state" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                                      <input onChange={handleChange} value={zip} type="number" name="zip" id="zip" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
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
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }
  let dbEmployee = await Employee.find()
  
  // Pass data to the page via props
  return {
     props: {
      dbEmployee: JSON.parse(JSON.stringify(dbEmployee)),
    }
  }
}

export default Employees