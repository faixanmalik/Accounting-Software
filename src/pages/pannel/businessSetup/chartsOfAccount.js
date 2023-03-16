import React, { useState, Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Charts from 'models/Charts';
import mongoose from 'mongoose';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment/moment'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const ChartsOfAccounts = ({dbAllCharts, dbAssets, dbLiabilities, dbEquity, dbIncomes, dbExpenses}) => {


  const [open, setOpen] = useState(false)

  // Filter Usestates
  const [allCharts, setAllCharts] = useState(dbAllCharts)
  const [charts, setCharts] = useState(dbAllCharts)
  const [assets, setAssets] = useState(dbAssets)
  const [liabilities, setLiabilities] = useState(dbLiabilities)
  const [equity, setEquity] = useState(dbEquity)
  const [incomes, setIncomes] = useState(dbIncomes)
  const [expenses, setexpenses] = useState(dbExpenses)



  // Forms Usestates
  const [accountCode, setAccountCode] = useState('')
  const [accountName, setAccountName] = useState('')
  const [account, setAccount] = useState('')
  const [subAccount, setSubAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [asof, setAsof] = useState('')
  const [desc, setDesc] = useState('')

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

    const data = { id, getDataPath: 'chartsOfAccounts' };
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

  const delEntry = async(id)=>{

    const data = { id, delPath: 'chartsOfAccounts' };

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

    const data = { accountCode, account, accountName, balance , asof,  desc, subAccount , editPath: 'chartsOfAccounts' };
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
    const data = { account, accountCode, accountName, balance , asof,  desc, subAccount };

      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addCharts`, {
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
            
            className='ml-auto bg-blue-800 text-white px-14 py-2 rounded-lg'>
               New
            </button>
          </div>
          <div className='flex space-x-7 ml-5 mt-4 font-bold text-sm'>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setAllCharts(charts)}}>All Acounts</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setAllCharts(assets)}}>Assets</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setAllCharts(liabilities)}}>Liabilites</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setAllCharts(equity)}}>Equity</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setAllCharts(incomes)}}>Incomes</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setAllCharts(expenses)}}>Expenses</button>
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
                  
                  {Object.keys(allCharts).map((item, index)=>{
                    return <tr key={allCharts[item]._id} className="bg-white border-b hover:bg-gray-50">
                    <td scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap">
                        {index + 1}
                    </td>
                    <td scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap">
                        {allCharts[item].accountCode}
                    </td>
                    <td className="px-6 py-1">
                      <h1 className='text-base text-gray-800 font-semibold -mb-1 mt-1'>{allCharts[item].accountName}</h1>
                      <h1 className='text-xs'>{allCharts[item].desc}</h1>
                    </td>
                    <td className="px-6 py-1">
                        {allCharts[item].account}
                    </td>
                    <td className="px-6 py-1">
                        {allCharts[item].subAccount}
                    </td>
                    <td className="px-6 py-1">
                        {allCharts[item].balance}
                    </td>
                    <td className="px-6 py-1">
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
                                  <div onClick={()=>{getData(allCharts[item]._id)}} className={classNames(   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 no-underline', 'w-full text-left block px-4 py-2 text-sm hover:no-underline' )}>Edit</div>
                                )}
                              </Menu.Item>
                              <Menu.Item>{({ active }) => (
                                  <div onClick={()=>{delEntry(allCharts[item]._id)}} className={classNames(   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 no-underline', 'w-full text-left block px-4 py-2 text-sm hover:no-underline' )}>Delete</div>
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

    </>
  )
}


export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }
  let allCharts = await Charts.find()
  let assets = await Charts.find({account: "Assets"})
  let liabilities = await Charts.find({account: "Liabilities"})
  let equity = await Charts.find({account: "Equity"})
  let expenses = await Charts.find({account: "Expenses"})
  let incomes = await Charts.find({account: "Incomes"})


   
  // Pass data to the page via props
  return {
     props: { 
      dbAllCharts: JSON.parse(JSON.stringify(allCharts)),
      dbAssets: JSON.parse(JSON.stringify(assets)),
      dbLiabilities: JSON.parse(JSON.stringify(liabilities)),
      dbEquity: JSON.parse(JSON.stringify(equity)),
      dbExpenses: JSON.parse(JSON.stringify(expenses)),
      dbIncomes: JSON.parse(JSON.stringify(incomes))
    } 
    }
}

export default ChartsOfAccounts