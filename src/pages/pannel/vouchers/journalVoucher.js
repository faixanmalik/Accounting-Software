import React, {Fragment, useState} from 'react'
import mongoose from "mongoose";
import moment from 'moment/moment';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Menu, Dialog, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Voucher from 'models/JournalVoucher';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const JournalVoucher = ({ dbVouchers }) => {

    const [open, setOpen] = useState(false)
    const [id, setId] = useState('')

    // JV
    const [journalDate, setJournalDate] = useState('')
    const [journalNo, setJournalNo] = useState('')
    const [account, setAccount] = useState('')
    const [debit, setDebit] = useState('')
    const [credit, setCredit] = useState('')
    const [desc, setDesc] = useState('')
    const [name, setName] = useState('')
    const [memo, setMemo] = useState('')
    const [attachment, setAttachment] = useState('')


  // JV
  const [inputList, setInputList] = useState([
    {account: '', desc: '', name: '' , credit: '', debit: ''},
    {account: '', desc: '', name: '' , credit: '', debit: ''},
  ]);

  // JV
  const handleChange = (e) => {
  
    if(e.target.name === 'account'){
      setAccount(e.target.value)
    }
    else if(e.target.name === 'name'){
      setName(e.target.value)
    }
    else if(e.target.name === 'debit'){
      setDebit(e.target.value)
    }
    else if(e.target.name === 'credit'){
      setCredit(e.target.value)
    }
    else if(e.target.name === 'journalDate'){
      setJournalDate(e.target.value)
    }
    else if(e.target.name === 'journalNo'){
      setJournalNo(e.target.value)
    }
    else if(e.target.name === 'memo'){
      setMemo(e.target.value)
    }
    else if(e.target.name === 'desc'){
      setDesc(e.target.value)
    }
    else if(e.target.name === 'attachment'){
      setAttachment(e.target.value)
    }
    else if(e.target.name === 'type'){
      setType(e.target.value)
    }
  }

  // JV
  const submit = async(e)=>{
    e.preventDefault()

    // fetch the data from form to makes a file in local system
    const data = { inputList, memo, journalDate, journalNo, attachment, type:'JV' };

    if( inputList[0].debit != inputList[0].credit ){
      toast.error("Debit Credit values must be equal" , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }
    else{
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
      
  }

  // JV
  const addLines = () => {
    setInputList([...inputList,
      {account: '', desc: '', name: '' , credit: '', debit: '' },
    ])
  }

  // JV
  const change = (e, index) => {
    const values = [...inputList];
    values[index][e.target.name] = e.target.value;
    setInputList(values);
  }

  const editEntry = async(id)=>{
    setOpen(true)

    const data = { id, transactionType, igpDate, deliveryChallanNo, venderName,  poNumber, poDate, VehicleNo, driverName, remarks, item, poQty, receivedQty ,  editPath: 'manageVouchers'};
    
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/editEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()
      console.log(response)
      
        if (response.success === true) {
          //window.location.reload();
        }
        else {
          toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
      
    
  }

  const delEntry = async(id)=>{

    const data = { id , delPath: 'manageVouchers' };
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

    const data = { id, getDataPath: 'journalVoucher' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getDataEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

      if (response.success === true){
        //const dbigpDate = moment(response.data.igpDate).utc().format('YYYY-MM-DD')
        
        setId(response.data._id)
        setJournalNo(response.data.journalNo)
        //setInputList.account(response.data.inputList[0].account)
        //setInputList.account(response.data.inputList[0].debit)
        //setInputList.account(response.data.inputList[0].credit)
        //setInputList.account(response.data.inputList[0].desc)
        //setInputList.account(response.data.inputList[0].name)
        setMemo(response.data.memo)
        setAttachment(response.data.attachment.data)
        setType(response.data.type)
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
                <h3 className="text-lg font-medium leading-6 text-gray-900">Journal Vouchers</h3>
                <button onClick={()=>{
                  setOpen(true)
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
                              Sr
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Voucher No
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Voucher Date
                          </th>
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
                              Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dbVouchers.map((item, index)=>{ 
                        return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                          <th scope="row" className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                            {index + 1}
                          </th>
                          <td className="px-6 py-3">
                            {item.journalNo}
                          </td>
                          <td className="px-6 py-3">
                            {moment(item.journalDate).utc().format('YYYY-MM-DD')}
                          </td>
                          <td className="px-6 py-3">
                            {item.inputList[0].account}
                          </td>
                          <td className="px-6 py-3">
                            {item.inputList[0].debit}
                          </td>
                          <td className="px-6 py-3">
                            {item.inputList[0].credit}
                          </td>
                          <td className="px-6 py-3">
                            {item.inputList[0].name}
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
                    {dbVouchers.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found</h1> : ''}
                  </div>
                  
                  {!dbVouchers.length === 0  ? <div className="bg-slate-100 px-4 py-3 text-right sm:px-6">
                    <h1 className='text-sm text-indigo-700 mr-48'>Total Amount: $100</h1>
                  </div>: ''}

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
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="">
        
        
                                    <div className='flex space-x-4'>
                                    <div className="w-full">
                                        <label htmlFor="journalDate" className="block text-sm font-medium text-gray-700">
                                        Journal Date:
                                        </label>
                                        <input
                                        type="date"
                                        onChange={handleChange}
                                        name="journalDate"
                                        id="journalDate"
                                        value={journalDate}
                                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                        />
                                    </div>
        
                                    <div className="w-full">
                                        <label htmlFor="journalNo" className="block text-sm font-medium text-gray-700">
                                        Journal No:
                                        </label>
                                        <input
                                        type="number"
                                        onChange={handleChange}
                                        name="journalNo"
                                        value={journalNo}
                                        id="journalNo"
                                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    </div>
        
        
                                {/* Account Lines*/}
                                {inputList.map(( inputList , index)=>{
                                    return <div key={index} className='flex space-x-4 my-10 '>
                                    <div className="">
                                    <label htmlFor='account' className="block text-sm font-medium text-gray-700">
                                        Account:
                                    </label>
                                    <input
                                        onChange={ e=> change(e, index) }
                                        value={ inputList.account }
                                        type="text"
                                        name='account'
                                        id="account"
                                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    </div>
                                    <div className="">
                                    <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                                        Description:
                                    </label>
                                    <textarea cols="30" rows="1" type="text"
                                        onChange={ e=> change(e, index) }
                                        name="desc"
                                        value={inputList.desc}
                                        id="desc"
                                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </textarea>
                                    </div>
                                    <div className="">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        onChange={ e=> change(e, index) }
                                        value={inputList.name}
                                        name="name"
                                        id="name"
                                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    </div>     
                                    <div className="">
                                    <label htmlFor="debit" className="block text-sm font-medium text-gray-700">
                                        Debit:
                                    </label>
                                    <input
                                        type="number"
                                        onChange={ e=> change(e, index) }
                                        value={ inputList.debit }
                                        name="debit"
                                        id="debit"
                                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    </div>
                                    <div className="">
                                    <label htmlFor="credit" className="block text-sm font-medium text-gray-700">
                                        Credit:
                                    </label>
                                    <input
                                        type="number"
                                        onChange={ e=> change(e, index) }
                                        value = { inputList.credit }
                                        name="credit"
                                        id="credit"
                                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                    />
                                    </div>
                                <button onClick={addLines}><AiOutlinePlusCircle className='text-lg'/>
                                </button>
                                </div>})}
        
        
                                    <div className="">
                                    <label htmlFor="memo" className="block text-sm font-medium text-gray-700">
                                        Memo:
                                    </label>
                                    <textarea cols="30" rows="4" type="text"
                                        name="memo"
                                        onChange={handleChange}
                                        id="memo"
                                        value={memo}
                                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </textarea>
                                    </div>
                                    
                                    <div className="mt-7">
                                    <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">
                                        Attachment:
                                    </label>
                                    <input
                                        type="file"
                                        onChange={handleChange}
                                        name="attachment"
                                        value={attachment}
                                        id="attachment"
                                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        multiple
                                    />
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
    
        </>
      )
    }



export async function getServerSideProps() {
    if (!mongoose.connections[0].readyState){
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI)
    }
    let dbVouchers = await Voucher.find()
    
        
    // Pass data to the page via props
    return {
        props: { dbVouchers: JSON.parse(JSON.stringify(dbVouchers)) } 
        }
    }
    
export default JournalVoucher