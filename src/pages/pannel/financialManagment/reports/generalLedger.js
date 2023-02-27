import React, {Fragment, useState} from 'react'
import mongoose from "mongoose";
import moment from 'moment/moment';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Menu, Dialog, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CashReceipt from 'models/CashReceipt';
import CashPayment from 'models/CashPayment';
import BankReceipt from 'models/BankReceipt';
import BankPayment from 'models/BankPayment';
import JournalVoucher from 'models/JournalVoucher';
import Charts from 'models/Charts';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const GeneralLedger = ({ dbJournalVoucher, dbCashPayment, dbCashReceipt, dbBankPayment, dbBankReceipt, dbCharts }) => {

    //console.log(dbCashReceipt)

    // Cash Receipt
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [sortBy, setsortBy] = useState('')
  const [account, setAccount] = useState('')
  const [totalBalance, setTotalBalance] = useState('')


  



    let dbCashEntries = [];
    for (var i = 0; i < dbCashReceipt.length; i++) { 
        if (dbCashReceipt[i].receivedIn === "Cash") { 
            dbCashEntries.push(dbCashReceipt[i]) ;
        }
    }

    // total Amount
    var totalValue = 0;
    for (let index = 0; index < dbCashEntries.length; index++) {
        totalValue += parseInt(dbCashEntries[index].amount);
    }
    {()=>{setTotalBalance(totalValue)}}
    //console.log(totalValue)










  


  // Cash Receipt
  const handleChange = (e) => {
    
    if(e.target.name === 'sortBy'){
      setsortBy(e.target.value)
    }
    else if(e.target.name === 'account'){
      setAccount(e.target.value)
    }
    else if(e.target.name === 'fromDate'){
      setFromDate(e.target.value)
    }
    else if(e.target.name === 'toDate'){
      setToDate(e.target.value)
    }
  }

  // Submit CRV
  const submit = async(e)=>{
    e.preventDefault()

    // fetch the data from form to makes a file in local system
    const data = { sortBy, account, toDate, fromDate, type:'generalLedger' };

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addVouchers`, {
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

    const data = { id, getDataPath: 'cashReceiptVoucher' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getDataEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

      if (response.success === true){
        const dbfromDate = moment(response.data.fromDate).utc().format('YYYY-MM-DD')
        
        setId(response.data._id)
        setFromDate(dbfromDate)
        setsortBy(response.data.sortBy)
        setAccount(response.data.account)
        setDetails(response.data.details)
        setToDate(response.data.toDate)
      }
  }

  return (
    <>
    {/* React tostify */}
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
  
    <div className='w-full'>
        <form method="POST" onSubmit={submit}>
            <div className="overflow-idden shadow sm:rounded-md">
            <div className="bg-white px-4 sm:p-5">
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-1">
                        <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">
                            From:
                        </label>
                        <input
                            type="date"
                            onChange={handleChange}
                            name="fromDate"
                            id="fromDate"
                            value={fromDate}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-1">
                        <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">
                            To:
                        </label>
                        <input
                            type="date"
                            onChange={handleChange}
                            name="toDate"
                            id="toDate"
                            value={toDate}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                        <label htmlFor="account" className="block text-sm font-medium text-gray-700">
                            Account:
                        </label>
                        <select id="account" name="account" onChange={handleChange} value={account} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option>select</option>
                            {dbCharts.map((item)=>{
                                  return <option key={item._id} value={item.accountName}>{item.accountCode} - {item.accountName}</option>
                                })}
                        </select>
                    </div>
                    <div className="col-span-6 sm:col-span-1">
                        <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
                            Sort by:
                        </label>
                        <select id="sortBy" name="sortBy" onChange={handleChange} value={sortBy} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option>select</option>
                            <option value={'Account Name'}>Account Name</option>
                            <option value={'Account Code'}>Account Code</option>
                        </select>
                    </div>
                    <button className='bg-blue-800 text-white px-10 h-10 mt-4 rounded-lg'>Update</button>
                </div>
            </div>
            </div>
        </form>
    </div>

    <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="md:col-span-1">
            <div className="px-4 mt-10 sm:px-0 flex">
                <h3 className="text-lg font-medium leading-6 text-gray-900">General Ledger Summary</h3>
            </div>
        </div>
        <div className="md:col-span-2">
            <form method="POST">
                <div className="overflow-hidden shadow sm:rounded-md">
                
                <div className="overflow-x-auto shadow-sm">
                    <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                        
                        <th scope="col" className="px-6 py-3">
                            Account
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Debit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Credit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Balance
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dbCashEntries.map((item)=>{ 
                        return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
    
                        <td className="px-6 py-3">
                            {item.details}
                        </td>
                        <td className="px-6 py-3">
                            {item.amount}
                        </td>
                        <td className="px-6 py-3">
                            {item.totalCredit}
                        </td>
                        <td className="px-6 py-3">
                            { totalValue }
                        </td>
                        <td className="px-6 py-3">
                            {moment(item.date).utc().format('YYYY-MM-DD')}
                        </td>
                        <td className="px-6 py-3">
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
                    {/*{ dbJournalVoucher.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found</h1> : ''}*/}
                </div>

                </div>
            </form>
        </div>
    </div>
    </>
    )
  }

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }
  let dbCashReceipt = await CashReceipt.find()
  let dbCashPayment = await CashPayment.find()
  let dbBankReceipt = await BankReceipt.find()
  let dbBankPayment = await BankPayment.find()
  let dbJournalVoucher = await JournalVoucher.find()
  let dbCharts = await Charts.find()
  
      
  // Pass data to the page via props
  return {
      props: { 
        dbCashReceipt: JSON.parse(JSON.stringify(dbCashReceipt)),
        dbCashPayment: JSON.parse(JSON.stringify(dbCashPayment)),
        dbBankReceipt: JSON.parse(JSON.stringify(dbBankReceipt)),
        dbBankPayment: JSON.parse(JSON.stringify(dbBankPayment)),
        dbJournalVoucher: JSON.parse(JSON.stringify(dbJournalVoucher)),
        dbCharts: JSON.parse(JSON.stringify(dbCharts)),
      } 
      }
  }
    
export default GeneralLedger