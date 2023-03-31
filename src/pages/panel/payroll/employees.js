import React, {Fragment, useEffect, useRef, useState} from 'react'
import mongoose from "mongoose";
import moment from 'moment/moment';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Employee from 'models/Employees';
import { ProSidebarProvider } from 'react-pro-sidebar';
import FullLayout from '@/panel/layouts/FullLayout';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

import { BiExport, BiImport } from 'react-icons/bi';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import {read, utils} from 'xlsx';
import Role from 'models/Role';

const Employees = ({dbEmployee, dbRole}) => {

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
  const [selectedIds, setSelectedIds] = useState([]);

  // authentications
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const myUser = JSON.parse(localStorage.getItem('myUser'))
    if(myUser.department === 'Admin'){
      setIsAdmin(true)
    }
  }, []);


  function handleRowCheckboxChange(e, id) {
    if (e.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(rowId => rowId !== id));
    }
  }

  const tableRef = useRef(null);
  const hiddenFileInput = React.useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target.result;
      const workbook = read(binaryData,{type:'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = utils.sheet_to_json(worksheet, {header: 1});

      const header = ['sr','name', 'designation', 'siteName', 'basicPay']

      const heads = header.map(head => ({title:head , entry: head}))
      parsedData.splice(0,1)
      convertToJson(header, parsedData)
    };
    reader.readAsBinaryString(file);
  }

  const convertToJson = (header, data)=>{
    const row = [];
    data.forEach(element => {
      const rowData = {};
      element.forEach((element, index) => {
        rowData[header[index]] = element;
      });
      row.push(rowData);
    });
    importEntries(row)
  }

  const importEntries = async(row)=>{
    const data = { row, path:'employees', importEntries:'importEntries' };
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

  const delEntry = async()=>{

    const data = { selectedIds , path: 'employees' };
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
              }} 
              className={`${isAdmin === false ? 'cursor-not-allowed': ''} ml-auto bg-blue-800 hover:bg-blue-900 text-white px-14 py-2 rounded-lg`} disabled={isAdmin === false}>
               New
            </button>
          </div>  
        </div>
        <div className="mt-2 md:col-span-2 md:mt-0">
          
          <div className='flex items-center space-x-2 mb-1'>
            <div>
              <DownloadTableExcel
                filename="Employee"
                sheet="Employee"
                currentTableRef={tableRef.current}>
                <button type="button" className="text-blue-800 flex hover:text-white border-2 border-blue-800 hover:bg-blue-800 font-semibold rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2">
                  Export
                  <BiExport className='text-lg ml-2'/>
                </button>
              </DownloadTableExcel>
            </div>
            <div className=''>
              <button type="button" onClick={handleClick} 
                className={`${isAdmin === false ? 'cursor-not-allowed': ''} text-blue-800 flex hover:text-white border-2 border-blue-800 hover:bg-blue-800 font-semibold rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2`} disabled={isAdmin === false}>
                  Import
                <BiImport className='text-lg ml-2'/>
              </button>
              <input type="file"
                ref={hiddenFileInput}
                onChange={handleFileChange}
                style={{display:'none'}} 
              /> 
            </div>
            <div className=''>
              <button type="button" onClick={delEntry}
              className={`${isAdmin === false ? 'cursor-not-allowed': ''} text-blue-800 flex hover:text-white border-2 border-blue-800 hover:bg-blue-800 font-semibold rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2`} disabled={isAdmin === false}
              >
                Delete
                <AiOutlineDelete className='text-lg ml-2'/>
              </button>
            </div>

          </div>

          <form method="POST">
            <div className="overflow-hidden shadow sm:rounded-md">
            <div className="overflow-x-auto shadow-sm">
              <table className="w-full text-sm text-left text-gray-500" ref={tableRef}>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        </div>
                      </th>
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
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" onChange={e => handleRowCheckboxChange(e, item._id)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      </div>
                    </td>
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
                    <td className="flex items-center px-6 mr-5 py-4 space-x-4">
                      <button type='button' onClick={()=>{getData(item._id)}} 
                        className= {`${isAdmin === false ? 'cursor-not-allowed': ''} font-medium text-blue-600 dark:text-blue-500 hover:underline" `} disabled={isAdmin === false}><AiOutlineEdit className='text-lg'/></button>
                    </td>
                  </tr>})}
                </tbody>

              </table>
                {dbEmployee.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found</h1> : ''}
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
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Add Employee</h3>
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
                                        {dbRole.map((item)=>{return <option value={item.roleName}>{item.roleName}</option>})}
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
                                        <option value={'Other'}>Other</option>
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
  let dbRole = await Role.find()
  
  // Pass data to the page via props
  return {
     props: {
      dbEmployee: JSON.parse(JSON.stringify(dbEmployee)),
      dbRole: JSON.parse(JSON.stringify(dbRole)),
    }
  }
}

export default Employees