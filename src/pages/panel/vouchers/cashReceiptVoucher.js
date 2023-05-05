import React, {Fragment, useEffect, useState} from 'react'
import mongoose from "mongoose";
import moment from 'moment/moment';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Menu, Dialog, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Vouchers from 'models/CashReceipt';
import Contact from 'models/Contact';
import Charts from 'models/Charts';
import { ProSidebarProvider } from 'react-pro-sidebar';
import FullLayout from '@/panel/layouts/FullLayout';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const CashReceiptVoucher = ({ dbVouchers, dbContacts, dbCharts }) => {


  const [open, setOpen] = useState(false)
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
  

  // Cash Receipt
  const [date, setDate] = useState('')
  const [journalNo, setJournalNo] = useState('')
  const [receivedIn, setReceivedIn] = useState('')
  const [receivedFrom, setReceivedFrom] = useState('')
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [account, setAccount] = useState('')


  // Cash Receipt
  const handleChange = (e) => {
    
    if(e.target.name === 'receivedIn'){
      setReceivedIn(e.target.value)
    }
    else if(e.target.name === 'receivedFrom'){
      setReceivedFrom(e.target.value)
    }
    else if(e.target.name === 'date'){
      setDate(e.target.value)
    }
    else if(e.target.name === 'journalNo'){
      setJournalNo(e.target.value)
    }
    else if(e.target.name === 'amount'){
      setAmount(e.target.value)
    }
    else if(e.target.name === 'desc'){
      setDesc(e.target.value)
    }
    else if(e.target.name === 'account'){
      setAccount(e.target.value)
    }
  }


  // Submit CRV
  const submit = async(e)=>{
    e.preventDefault()

    // fetch the data from form to makes a file in local system
    const data = { receivedIn, receivedFrom, amount, date, journalNo, desc, account, type:'CRV', debit: amount, credit: 0 };

    let res = await fetch(`/api/addVouchers`, {
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

    const data = { id, path: 'cashReceiptVoucher' };
    let res = await fetch(`/api/getDataEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

      if (response.success === true){
        const dbDate = moment(response.data.date).utc().format('YYYY-MM-DD')
        
        setId(response.data._id)
        setDate(dbDate)
        setJournalNo(response.data.journalNo)
        setReceivedIn(response.data.receivedIn)
        setReceivedFrom(response.data.receivedFrom)
        setDesc(response.data.desc)
        setAmount(response.data.amount)
        setAccount(response.data.account)
      }
  }

  const editEntry = async(id)=>{
    setOpen(true)

    const data = { id, receivedIn, receivedFrom, amount, date, journalNo, desc , account, path: 'cashReceiptVoucher'};
    
    let res = await fetch(`/api/editEntry`, {
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

    const data = { selectedIds , path: 'cashReceiptVoucher' };
    let res = await fetch(`/api/delEntry`, {
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
              <h3 className="text-lg font-medium leading-6 text-gray-900">Cash Receipt Vouchers</h3>
              <button onClick={()=>{
                setOpen(true)
                setId('')
                setDate('')
                setJournalNo(`CRV-${dbVouchers.length + 1}`)
                setReceivedIn('')
                setReceivedFrom('')
                setDesc('')
                setAmount('')
                setAccount('')
                }} className='ml-auto bg-blue-800 hover:bg-blue-900 text-white px-14 py-2 rounded-lg'>
                  New
              </button>
            </div>
          </div>
          <div className="mt-2 md:col-span-2 md:mt-0">
            <button button type="button" onClick={delEntry}
              className={`${isAdmin === false ? 'cursor-not-allowed': ''} text-blue-800 flex hover:text-white border-2 border-blue-800 hover:bg-blue-800 font-semibold rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2`} disabled={isAdmin === false}
              >
                Delete
                <AiOutlineDelete className='text-lg ml-2'/>
            </button>
            <form method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                
                <div className="overflow-x-auto shadow-sm">
                  <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cash Receipt No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Account
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Received From
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dbVouchers.map((item, index)=>{ 
                      return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" onChange={e => handleRowCheckboxChange(e, item._id)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          </div>
                        </td>
                        <td className="px-6 py-3">
                          <div className='text-sm text-black font-semibold'>{item.journalNo}</div>
                        </td>
                        <td className="px-6 py-3">
                          <div className='text-sm'>{moment(item.date).utc().format('DD-MM-YYYY')}</div>
                        </td>
                        <td className="px-6 py-3">
                          <div className='text-sm'>{item.account}</div>
                        </td>
                        <td className="px-6 py-3">
                          <div className='text-sm'>{item.receivedFrom}</div>
                        </td>
                        <td className="px-6 py-3">
                          <div className='text-sm text-black font-semibold'>{parseInt(item.amount).toLocaleString()}</div>
                        </td>
                        <td className="flex items-center px-6 mr-5 py-4 space-x-4">
                          <button type='button' onClick={()=>{getData(item._id)}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><AiOutlineEdit className='text-lg'/></button>
                        </td>
                            
                      </tr>})}
                      
                    </tbody>
                  </table>
                    {dbVouchers.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found!</h1> : ''}
                </div>
                {/*{!dbVouchers.length === 0  ? <div className="bg-slate-100 px-4 py-3 text-right sm:px-6">
                  <h1 className='text-sm text-indigo-700 mr-48'>Total Amount: $100</h1>
                </div>: ''}*/}
                
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
                      <form method="POST" onSubmit={submit}>
                          <div className="overflow-idden shadow sm:rounded-md">
                          <div className="bg-white px-4 py-5 sm:p-6">
                              <div className="grid grid-cols-6 gap-6">

                              <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="journalNo" className="block text-sm font-medium text-gray-700">
                                  Cash Receipt No:
                                </label>
                                <input
                                  type="text"
                                  onChange={handleChange}
                                  name="journalNo"
                                  value={journalNo}
                                  id="journalNo"
                                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  readOnly
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                Voucher Date:
                                </label>
                                <input
                                  type="date"
                                  onChange={handleChange}
                                  name="date"
                                  id="date"
                                  value={date}
                                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>

                              

                              <div className="col-span-6 sm:col-span-4">
                                <label htmlFor="account" className="block text-sm font-medium text-gray-700">
                                  Charts of Accounts:
                                </label>
                                <select id="account" name="account" onChange={handleChange} value={account} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                  <option>select accounts</option>
                                  {dbCharts.map((item)=>{
                                      return <option key={item._id} value={item.accountName}>{item.accountCode} - {item.accountName}</option>
                                  })}
                                </select>
                              </div>

                              <div className="col-span-6 sm:col-span-2">
                                <label htmlFor="receivedIn" className="block text-sm font-medium text-gray-700">
                                Received In:
                                </label>
                                <select id="receivedIn" name="receivedIn" onChange={handleChange} value={receivedIn} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                  <option>select received in</option>
                                  <option value={'Cash'}>Cash</option>
                                  <option value={'Petty Cash'}>Petty Cash</option>
                                </select>
                              </div>


                              

                              <div className="col-span-6 sm:col-span-4">
                                <label htmlFor="receivedFrom" className="block text-sm font-medium text-gray-700">
                                  Received From:
                                </label>
                                <select id="receivedFrom" name="receivedFrom" onChange={handleChange} value={receivedFrom} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                  <option>select contacts</option>
                                  {dbContacts.map((item)=>{
                                      return <option key={item._id} value={item.name}>{item.name}</option>
                                  })}
                                </select>
                              </div>

                              

                              

                              <div className="col-span-6 sm:col-span-2">
                                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                  Amount:
                                  </label>
                                  <input
                                  type="number"
                                  onChange={handleChange}
                                  name="amount"
                                  id="amount"
                                  value={amount}
                                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                              </div>


                              <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                                <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                                Description:
                                </label>
                                <textarea cols="30" rows="1" type="text"
                                  name="desc"
                                  id="desc"
                                  onChange={handleChange}
                                  value={desc}
                                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </textarea>
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
  let dbVouchers = await Vouchers.find()
  let dbContacts = await Contact.find()
  let dbCharts = await Charts.find()
  
      
  // Pass data to the page via props
  return {
      props: { 
      dbVouchers: JSON.parse(JSON.stringify(dbVouchers)),
      dbContacts: JSON.parse(JSON.stringify(dbContacts)),
      dbCharts: JSON.parse(JSON.stringify(dbCharts)),
      } 
      }
  }
    
export default CashReceiptVoucher