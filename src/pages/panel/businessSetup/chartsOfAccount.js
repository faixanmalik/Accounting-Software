import React, { useState, Fragment, useEffect, useRef } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Charts from 'models/Charts';
import mongoose from 'mongoose';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment/moment'
import { ProSidebarProvider } from 'react-pro-sidebar';
import FullLayout from '@/panel/layouts/FullLayout';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

import { BiExport, BiImport } from 'react-icons/bi';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import {XLSX, read, utils} from 'xlsx';



const ChartsOfAccounts = ({dbAllCharts}) => {

  const tableRef = useRef(null);
  const [open, setOpen] = useState(false)

  // Filter Usestates
  const [allCharts, setallCharts] = useState(dbAllCharts)
  const [filterCharts, setFilterCharts] = useState('allCharts')

  // authentications
  const [isAdmin, setIsAdmin] = useState(false)


  useEffect(() => {
    const all = dbAllCharts.filter((data) => {
      if(filterCharts === 'allCharts'){
        return data.account;
      }
      else{
        if(data.account === `${filterCharts}`){
          return data.account;
        }
      }
    })
    setallCharts(all)


    const myUser = JSON.parse(localStorage.getItem('myUser'))
    if(myUser.department === 'Admin'){
      setIsAdmin(true)
    }
  }, [filterCharts]);



  // Forms Usestates
  const [accountCode, setAccountCode] = useState('')
  const [accountName, setAccountName] = useState('')
  const [account, setAccount] = useState('')
  const [subAccount, setSubAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [asof, setAsof] = useState('')
  const [desc, setDesc] = useState('')

  const [selectedIds, setSelectedIds] = useState([]);
  

  function handleRowCheckboxChange(e, id) {
    if (e.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(rowId => rowId !== id));
    }
  }

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

      const header = ['accountCode','accountName', 'account', 'subAccount' , 'balance']
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
      importEntries(row);
  }

  const importEntries = async(row)=>{
    const data = { row, path:'chartsOfAccounts', importEntries:'importEntries' };
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

  const subAcc = ()=>{
    if (account === 'Assets'){
      setSubAccount('Fixed Assets')
    }
    else if(account === 'Liabilities'){
      setSubAccount('Non-Current Liabilities')
    }
    else if(account === 'Equity'){
      setSubAccount('Equity')
    }
    else if(account === 'Expenses'){
      setSubAccount('Administration Expenses')
    }
    else if(account === 'Incomes'){
      setSubAccount('Revenue')
    }
  }

  const handleChange = (e) => {
    
    if(e.target.name === 'accountCode'){
      setAccountCode(e.target.value)
    }
    else if(e.target.name === 'account'){
      setAccount(e.target.value)
    }
    else if(e.target.name === 'accountName'){
      setAccountName(e.target.value)
    }
    else if(e.target.name === 'subAccount'){
      setSubAccount(e.target.value)
    }
    else if(e.target.name === 'balance'){
      setBalance(e.target.value)
    }
    else if(e.target.name === 'asof'){
      setAsof(e.target.value)
    }
    else if(e.target.name === 'referenceNo'){
      setReferenceNo(e.target.value)
    }
    else if(e.target.name === 'paymentReceived'){
      setPaymentReceived(e.target.value)
    }
    else if(e.target.name === 'desc'){
      setDesc(e.target.value)
    } 
  }

  const getData = async (id) =>{
    setOpen(true)

    const data = { id, path: 'chartsOfAccounts' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getDataEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()
      const date = moment(response.charts.asof).utc().format('YYYY-MM-DD')

      if (response.success === true){
        setAccountCode(response.charts.accountCode)
        setAccount(response.charts.account)
        setAccountName(response.charts.accountName)
        setSubAccount(response.charts.subAccount)
        setBalance(response.charts.balance)
        setAsof(date)
        setDesc(response.charts.desc)
      }
      else{
        toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light", });
      }

  }
  
  const delEntry = async()=>{

    const data = { selectedIds, path: 'chartsOfAccounts' };

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

  const editEntry = async(e)=>{
    e.preventDefault();

    const data = { accountCode, account, accountName, balance , asof,  desc, subAccount , path:'chartsOfAccounts' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/editEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

      if (response.success === true){
        window.location.reload();
      }
      else {
        toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light", });
    }
      
    
  }

  const submit = async(e)=>{
    subAcc();
    e.preventDefault()

    // fetch the data from form to makes a file in local system
    const data = { account, accountCode, accountName, balance , asof,  desc, subAccount, path:'chartsOfAccounts'};

      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()
    
        if (response.success === true) {
          setOpen(false)
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
            <h3 className="text-lg font-medium leading-6 text-gray-900">Charts of Accounts</h3>
            <button onClick={()=>{
              setOpen(true)
              setAccountCode(''),
              setAccountName(''),
              setAccount(''),
              setSubAccount(''),
              setBalance(''),
              setAsof(''),
              setDesc('')
            }}
            className={`${isAdmin === false ? 'cursor-not-allowed': ''} ml-auto bg-blue-800 hover:bg-blue-900 text-white px-14 py-2 rounded-lg`} disabled={isAdmin === false}>
            New
            </button>
          </div>
          <div className='flex mt-4 space-x-7 ml-5 font-bold text-sm'>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setFilterCharts('allCharts')}}>All Accounts</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setFilterCharts('Assets')}}>Assets</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setFilterCharts('Liabilities')}}>Liabilites</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setFilterCharts('Equity')}}>Equity</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setFilterCharts('Incomes')}}>Incomes</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setFilterCharts('Expenses')}}>Expenses</button>
          </div>
        </div>
        <div className="mt-2 md:col-span-2 md:mt-0">
        <div className='flex items-center space-x-2 mb-1'>
            <div>
              <DownloadTableExcel
                filename="Charts Of Accounts"
                sheet="Charts Of Accounts"
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
                            Account code
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Account Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Account
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sub Account
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
                    
                    {allCharts.map((item)=>{
                      return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">

                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input id="checkbox-table-search-1" type="checkbox" onChange={e => handleRowCheckboxChange(e, item._id)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        </div>
                      </td>
                      <td scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap">
                          {item.accountCode}
                      </td>
                      <td className="px-6 py-1">
                        <span className='text-base block text-gray-800 font-semibold -mb-1 mt-1'>{item.accountName}</span>
                        <span className='text-xs block'>{item.desc}</span>
                      </td>
                      <td className="px-6 py-1">
                          {item.account}
                      </td>
                      <td className="px-6 py-1">
                          {item.subAccount}
                      </td>
                      <td className="px-6 py-1">
                          {item.balance}
                      </td>
                      <td className="flex items-center px-6 mr-5 py-4 space-x-4">
                        <button type='button' onClick={()=>{getData(item._id)}} 
                         className= {`${isAdmin === false ? 'cursor-not-allowed': ''} font-medium text-blue-600 dark:text-blue-500 hover:underline" `} disabled={isAdmin === false}><AiOutlineEdit className='text-lg'/></button>
                      </td>
                    </tr>})}

                  </tbody>

                </table>
                  {allCharts.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found</h1> : ''}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={setOpen}>
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
                  <div className="mt-10 sm:mt-0 w-full">
                    <div className="md:grid md:grid-cols-1 md:gap-6">
                      <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">Charts of Accounts</h3>
                        </div>
                      </div>
                      <div className="mt-2 md:col-span-2 md:mt-0">
                        <form method="POST" onSubmit={submit}>
                          <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="bg-white px-4 py-5 sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-2">
                                  <label htmlFor="accountCode" className="block text-sm font-medium text-gray-700">
                                    Account Code
                                  </label>
                                  <input onChange={handleChange} value={accountCode} type="number" name="accountCode" id="accountCode" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                  {/* <p className='text-xs'>hello 10 world account code</p> */}
                                </div>
                                
                                <div className="col-span-6 sm:col-span-3">
                                  <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">
                                    Account Name:
                                  </label>
                                  <input onChange={handleChange} value={accountName} type="text" name="accountName" id="accountName" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                  {/* <p className='text-xs'>hello 10 world account code</p> */}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                  <label htmlFor="account" className="block text-sm font-medium text-gray-700">
                                    Account:
                                  </label>
                                  <select id="account" name="account" onChange={handleChange} value={account} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    <option>Select Account Type</option>
                                    <option value={'Assets'}>Assets</option>
                                    <option value={'Liabilities'}>Liabilities</option>
                                    <option value={'Equity'}>Equity</option>
                                    <option value={'Expenses'}>Expenses</option>
                                    <option value={'Incomes'}>Incomes</option>
                                  </select>
                                </div>


                                <div className="col-span-6 sm:col-span-3">
                                  <label htmlFor="subAccount" className="block text-sm font-medium text-gray-700">
                                    Sub Account
                                  </label>
                                  <select id="subAccount" name="subAccount" onChange={handleChange} value={subAccount} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">

                                    {/* Assets */}
                                    <option>Select Sub-Account</option>
                                    <option value={'Fixed Assets'}>Fixed Assets</option>
                                    <option value={'Current Assets'}>Current Assets</option>
                                    <option value={'Non-Current Liability'}>Non-Current Liability</option>
                                    <option value={'Current Liability'}>Current Liability</option>
                                    <option value={'Equity'}>Equity</option>
                                    <option value={'Administration Expenses'}>Administration Expenses</option>
                                    <option value={'Distribution Expenses'}>Distribution Expenses</option>
                                    <option value={'Cost of sales'}>Cost of sales</option>
                                    <option value={'Finance Cost'}>Finance Cost</option>
                                    <option value={'Revenue'}>Revenue</option>
                                    <option value={'Other Income'}>Other Income</option>
                                  </select>
                                </div>
                                
                                
                                <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                                  <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                                    Description:
                                  </label>
                                  <textarea cols="30" rows="3" type="text"
                                    name="desc"
                                    id="desc"
                                    onChange={handleChange}
                                    value={desc}
                                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                  </textarea>
                                </div>


                                <div className="col-span-6 sm:col-span-2">
                                  <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
                                    Balance:
                                  </label>
                                  <input
                                    type="number"
                                    onChange={handleChange}
                                    name="balance"
                                    id="balance"
                                    value={balance}
                                    autoComplete="balance"
                                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                
                                
                                <div className="col-span-6 sm:col-span-2">
                                  <label htmlFor="asof" className="block text-sm font-medium text-gray-700">
                                    As of:
                                  </label>
                                  <input
                                    type="date"
                                    onChange={handleChange}
                                    name="asof"
                                    id="asof"
                                    value={asof}
                                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                  />
                                </div>

                              </div>

                            </div>
                            <div className="bg-gray-50 space-x-3 px-4 py-3 text-right sm:px-6">
                              <button type='button' onClick={editEntry} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save Changes</button>
                              <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                            </div>
                          </div>
                          
                        </form>
                      </div>
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
  let allCharts = await Charts.find()


  // Pass data to the page via props
  return {
     props: { 
      dbAllCharts: JSON.parse(JSON.stringify(allCharts))
    } 
    }
}

export default ChartsOfAccounts