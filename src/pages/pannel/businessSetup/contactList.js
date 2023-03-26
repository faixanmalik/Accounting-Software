import React, {Fragment, useEffect, useState, useRef} from 'react'
import mongoose from "mongoose";
import moment from 'moment/moment';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Contact from 'models/Contact';
import { ProSidebarProvider } from 'react-pro-sidebar';
import FullLayout from '@/pannel/layouts/FullLayout';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

import { BiExport, BiImport } from 'react-icons/bi';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import {XLSX, read, utils} from 'xlsx';


const ContactList = ({dbContact}) => {

  const [open, setOpen] = useState(false)
  const [accounts, setAccounts] = useState(dbContact)

  // Add States
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [country, setCountry] = useState('United States')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [taxRigNo, setTaxRigNo] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [terms, setTerms] = useState('Due on receipt')
  const [openingBalance, setOpeningBalance] = useState('')
  const [date, setDate] = useState('')


  const [allContact, setAllContact] = useState(dbContact)
  const [filterCharts, setFilterCharts] = useState('allContacts')


  useEffect(() => {
    const all = dbContact.filter((data) => {
      if(filterCharts === 'allContacts'){
        return data.type;
      }
      else{
        if(data.type === `${filterCharts}`){
          return data.type;
        }
      }
    })
    setAllContact(all)
  }, [filterCharts]);


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

      const header = ['sr','bankBranch', 'accountTitle', 'accountNo', 'accountType' , 'chartsOfAccount']

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
    setAccounts([...accounts, ...row])
  }

  const importEntries = async(row)=>{
    const data = { row, path:'bankAccount', importEntries:'importEntries' };
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



  // id For delete contact
  const [id, setId] = useState('')
  const [selectedIds, setSelectedIds] = useState([]);

  function handleRowCheckboxChange(e, id) {
    if (e.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(rowId => rowId !== id));
    }
  }
  

  const handleChange = (e) => {
  
    if(e.target.name === 'name'){
      setName(e.target.value)
    }
    else if(e.target.name === 'type'){
      setType(e.target.value)
    }
    else if(e.target.name === 'email'){
      setEmail(e.target.value)
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
    else if(e.target.name === 'taxRigNo'){
      setTaxRigNo(e.target.value)
    }
    else if(e.target.name === 'paymentMethod'){
      setPaymentMethod(e.target.value)
    }
    else if(e.target.name === 'terms'){
      setTerms(e.target.value)
    }
    else if(e.target.name === 'openingBalance'){
      setOpeningBalance(e.target.value)
    }
    else if(e.target.name === 'date'){
      setDate(e.target.value)
    }
  }

  const editEntry = async(id)=>{
    setOpen(true)

    const data = { id, name, type,  email, phoneNo, country, streetAddress, city, state, zip, taxRigNo, paymentMethod, terms , openingBalance, date ,  path: 'contactList'};
    
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

    const data = { selectedIds , path: 'contactList' };
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

    const data = { id, path: 'contactList' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getDataEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

      const date = moment(response.contact.date).utc().format('YYYY-MM-DD')
      if (response.success === true){
        setId(response.contact._id)
        setName(response.contact.name)
        setType(response.contact.type)
        setEmail(response.contact.email)
        setPhoneNo(response.contact.phoneNo)
        setCountry(response.contact.country)
        setStreetAddress(response.contact.streetAddress)
        setCity(response.contact.city)
        setState(response.contact.state)
        setZip(response.contact.zip)
        setTaxRigNo(response.contact.taxRigNo)
        setTerms(response.contact.terms)
        setOpeningBalance(response.contact.openingBalance)
        setPaymentMethod(response.contact.paymentMethod)
        setDate(date)
      }
  }

  const submit = async(e)=>{
    e.preventDefault()
    
    // fetch the data from form to makes a file in local system
    const data = { name, type,  email, phoneNo, country, streetAddress, city, state, zip, taxRigNo, paymentMethod, terms , openingBalance, date, path:'contactList' };
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
            <h3 className="text-lg font-medium leading-6 text-gray-900">Contact List</h3>
            <button onClick={()=>{ setOpen(true), setName(''), setEmail(''), setPhoneNo(''), setCountry('United States'), setStreetAddress(''), setCity(''), setState(''), setZip(''), setTaxRigNo(''), setTerms('Due on receipt'), setOpeningBalance(''), setPaymentMethod('Cash'), setDate('')}} className='ml-auto bg-blue-800 text-white px-14 py-2 rounded-lg'>
               New
            </button>
          </div>
          <div className='flex space-x-7 ml-5 mt-4 font-bold text-sm'>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setFilterCharts('allContacts')}}>All Accounts</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setFilterCharts('Customer')}}>Customer</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setFilterCharts('Supplier')}}>Supplier</button>
          </div>
        </div>
        <div className="mt-2 md:col-span-2 md:mt-0">


          <div className='flex items-center space-x-2 mb-1'>
            <div>
              <DownloadTableExcel
                filename="Contact List"
                sheet="Contact List"
                currentTableRef={tableRef.current}>
                <button type="button" className="text-blue-800 flex hover:text-white border-2 border-blue-800 hover:bg-blue-800 font-semibold rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2">
                  Export
                  <BiExport className='text-lg ml-2'/>
                </button>

              </DownloadTableExcel>
            </div>
            <div className=''>
              <button type="button" onClick={handleClick} className="text-blue-800 flex hover:text-white border-2 border-blue-800 hover:bg-blue-800 font-semibold rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2">
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
              <button type="button" onClick={delEntry} className="text-blue-800 flex hover:text-white border-2 border-blue-800 hover:bg-blue-800 font-semibold rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2">
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
                          Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Phone no
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Balance
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <span className="">Action</span>
                      </th>
                  </tr>
                </thead>

                <tbody>
                  
                  {allContact.map((item, index)=>{
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
                        {item.type}
                    </td>
                    <td className="px-6 py-4">
                        {item.email}
                    </td>
                    <td className="px-6 py-4">
                        {item.phoneNo}
                    </td>
                    <td className="px-6 py-4">
                        {item.openingBalance}
                    </td>
                    <td className="flex items-center px-6 mr-5 py-4 space-x-4">
                      <button type='button' onClick={()=>{getData(item._id)}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><AiOutlineEdit className='text-lg'/></button>
                    </td>
                  </tr>})}

                </tbody>

              </table>
                {allContact.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found</h1> : ''}
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

                                  <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                                    <input type="name" onChange={handleChange} name="name" id="name" value={name} placeholder='John Doe' className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                  </div>
                            
                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">Contact Type:</label>
                                      <select id="type" name="type" onChange={handleChange} value={type} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option>Select Contact Type</option>
                                        <option value={'Customer'}>Customer</option>
                                        <option value={'Supplier'}>Supplier</option>
                                      </select>
                                    </div>


                                    <div className="col-span-6 sm:col-span-4">
                                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                      <input onChange={handleChange} value={email} type="text" name="email" id="email" autoComplete="email" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                      <input onChange={handleChange} value={phoneNo} type="number" name="phoneNo" id="phoneNo" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                      <select id="country" name="country" onChange={handleChange} value={country} autoComplete="country" className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option value={'United States'}>United States</option>
                                        <option value={'Canada'}>Canada</option>
                                        <option value={'Mexico'}>Mexico</option>
                                      </select>
                                    </div>

                                    <div className="col-span-6">
                                      <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
                                      <input onChange={handleChange} value={streetAddress} type="text" name="streetAddress" id="streetAddress" autoComplete="streetAddress" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"  required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                      <input onChange={handleChange} value={city} type="text" name="city" id="city" autoComplete="address-level2" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-s requiredm"
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                                      <input onChange={handleChange} value={state} type="text" name="state" id="state" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-s requiredm"
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                                      <input onChange={handleChange} value={zip} type="number" name="zip" id="zip" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                      <label htmlFor="taxRigNo" className="block text-sm font-medium text-gray-700">Tax Reg.No</label>
                                      <input onChange={handleChange} value={taxRigNo} type="number" name="taxRigNo" id="taxRigNo" autoComplete="taxRigNo" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Prefered Payment Method</label>
                                      <select id="paymentMethod" name="paymentMethod" onChange={handleChange} value={paymentMethod} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" required>
                                        <option value={'Cash'}>Cash</option>
                                        <option value={'Cheque'}>Cheque</option>
                                        <option value={'Credit Card'}>Credit Card</option>
                                        <option value={'Direct Debit'}>Direct Debit</option>
                                      </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="terms" className="block text-sm font-medium text-gray-700">Terms</label>
                                      <select id="terms" name="terms" onChange={handleChange} value={terms} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" required>
                                        <option value={'Due on receipt'}>Due on receipt</option>
                                        <option value={'Net 15'}>Net 15</option>
                                        <option value={'Net 30'}>Net 30</option>
                                        <option value={'Net 60'}>Net 60</option>
                                      </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                      <label htmlFor="openingBalance" className="block text-sm font-medium text-gray-700">Opening Balance</label>
                                      <input onChange={handleChange} value={openingBalance} type="number" name="openingBalance" id="openingBalance" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date
                                      </label>
                                      <input onChange={handleChange} value={date} type="date" name="date" id="date" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
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
  let dbContact = await Contact.find()
  let dbCustomer = await Contact.find({type: "Customer"})
  let dbSupplier = await Contact.find({type: "Supplier"})
  

  // Pass data to the page via props
  return {
     props: { 
      dbContact: JSON.parse(JSON.stringify(dbContact)),
      dbCustomer: JSON.parse(JSON.stringify(dbCustomer)),
      dbSupplier: JSON.parse(JSON.stringify(dbSupplier)),
      }
  }
}

export default ContactList