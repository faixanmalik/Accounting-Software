import React, {Fragment, useEffect, useState} from 'react'
import mongoose from "mongoose";
import moment from 'moment/moment';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Menu, Dialog, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlusCircle } from 'react-icons/ai';
import Voucher from 'models/JournalVoucher';
import Contact from 'models/Contact';
import Charts from 'models/Charts';
import { ProSidebarProvider } from 'react-pro-sidebar';
import FullLayout from '@/panel/layouts/FullLayout';
import Employees from 'models/Employees';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const JournalVoucher = ({ dbVouchers, dbCharts, dbContacts, dbEmployees }) => {
    
    const [open, setOpen] = useState(false)
    const [contacts, setContacts] = useState([])
    const [id, setId] = useState('')
    const [selectedIds, setSelectedIds] = useState([]);

    // authentications
  const [isAdmin, setIsAdmin] = useState(false)
  

    function handleRowCheckboxChange(e, id) {
      if (e.target.checked) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds(selectedIds.filter(rowId => rowId !== id));
      }
    }


    useEffect(() => {
      setContacts(dbContacts, dbEmployees)
      const myUser = JSON.parse(localStorage.getItem('myUser'))
      if(myUser.department === 'Admin'){
        setIsAdmin(true)
      }
    }, [])
    

    // JV
    const [journalDate, setJournalDate] = useState('')
    const [journalNo, setJournalNo] = useState('')
    const [memo, setMemo] = useState('')
    const [attachment, setAttachment] = useState('')
    const [totalDebit, setTotalDebit] = useState(0)
    const [totalCredit, setTotalCredit] = useState(0)
    const [desc, setDesc] = useState('')
    const [name, setName] = useState('')


    // JV
    const [inputList, setInputList] = useState([
      { journalNo, date: journalDate, account: '', credit: 0, debit: 0},
      { journalNo, date: journalDate, account: '', credit: 0, debit: 0},
    ]);

    // JV
    const handleChange = (e) => {
      if(e.target.name === 'journalDate'){
        setJournalDate(e.target.value)
      }
      else if(e.target.name === 'journalNo'){
        setJournalNo(e.target.value)
      }
      else if(e.target.name === 'memo'){
        setMemo(e.target.value)
      }
      else if(e.target.name === 'attachment'){
        setAttachment(e.target.value)
      }
      else if(e.target.name === 'type'){
        setType(e.target.value)
      }
      else if(e.target.name === 'name'){
        setName(e.target.value)
      }
      else if(e.target.name === 'desc'){
        setDesc(e.target.value)
      }
    }

    // JV
    const submit = async(e)=>{
      e.preventDefault()
      
      inputList.forEach(item => {
        item.date = journalDate;
      });

      // fetch the data from form to makes a file in local system
      const data = { totalDebit , totalCredit, inputList, name, desc,  memo, journalDate, journalNo, attachment, type:'JV' };

      if( totalDebit != totalCredit ){
        toast.error("Debit Credit values must be equal" , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      }
      else{
        let res = await fetch(`/api/addVouchers`, {
          method: 'POST',
          headers:{
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


      // total Debit
      var totalDebitValue = 0;
      for (let index = 0; index < inputList.length; index++) {
        totalDebitValue += parseInt(inputList[index].debit);
      }
      setTotalDebit(totalDebitValue);


      // total Credit
      var totalCreditValue = 0;
      for (let index = 0; index < inputList.length; index++) {
        totalCreditValue += parseInt(inputList[index].credit);
      }
      setTotalCredit(totalCreditValue);



    }

    const editEntry = async(id)=>{
      setOpen(true)

      const data = { id, totalDebit, totalCredit, inputList, name, desc, memo, journalDate, journalNo, attachment ,  path: 'journalVoucher'};
      
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

      const data = { selectedIds , path: 'journalVoucher' };
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

    const getData = async (id) =>{
      setOpen(true)

      const data = { id, path: 'journalVoucher' };
      let res = await fetch(`/api/getDataEntry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        let response = await res.json()

        if (response.success === true){
          const dbJournalDate = moment(response.data.journalDate).utc().format('YYYY-MM-DD')
          
          setId(response.data._id)
          setJournalDate(dbJournalDate)
          setJournalNo(response.data.journalNo)
          setInputList(response.data.inputList)
          setTotalDebit(response.data.totalDebit)
          setTotalCredit(response.data.totalCredit)
          setMemo(response.data.memo)
          setName(response.data.name)
          setDesc(response.data.desc)
          setAttachment(response.data.attachment.data)
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
            <h3 className="text-lg font-medium leading-6 text-gray-900">Journal Vouchers</h3>
            <button onClick={()=>{
              setOpen(true)
              setId('')
              setJournalDate('')
              setJournalNo(`JV-${dbVouchers.length + 1}`)
              setInputList([
                {journalNo : `JV-${dbVouchers.length + 1}`, date: journalDate, account: '', credit: 0, debit: 0},
                {journalNo : `JV-${dbVouchers.length + 1}`, date: journalDate, account: '', credit: 0, debit: 0},
              ])
              setMemo('')
              setTotalDebit(0)
              setTotalCredit(0)
              setAttachment('')
              }} 
              className={`${isAdmin === false ? 'cursor-not-allowed': ''} ml-auto bg-blue-800 hover:bg-blue-900 text-white px-14 py-2 rounded-lg`} disabled={isAdmin === false}>
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
                          Voucher No
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Account
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Total Debit
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Total Credit
                      </th>
                      
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dbVouchers.map((item)=>{ 
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
                        <div className='text-sm'>{moment(item.journalDate).utc().format('DD-MM-YYYY')}</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className='text-sm'>{item.name}</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className='text-sm'>{item.inputList[0].account}</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className='text-sm text-black font-semibold'>{parseInt(item.totalDebit).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-3">
                        <div className='text-sm text-black font-semibold'>{parseInt(item.totalCredit).toLocaleString()}</div>
                      </td>
                      <td className="flex items-center px-6 mr-5 py-4 space-x-4">
                        <button type='button' onClick={()=>{getData(item._id)}} 
                            className={`${isAdmin === false ? 'cursor-not-allowed': ''} font-medium text-blue-600 dark:text-blue-500 hover:underline`} disabled={isAdmin === false}>
                            <AiOutlineEdit className='text-lg'/>
                          </button>
                      </td>
                          
                    </tr>})}
                    
                  </tbody>
                </table>
                { dbVouchers.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found!</h1> : ''}
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
                    <form method="POST" onSubmit={submit}>
                      <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">

                          <div className='flex space-x-4 mb-14'>

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
                              />
                            </div>

                            <div className="w-full">
                              <label htmlFor="journalNo" className="block text-sm font-medium text-gray-700">
                                Journal No:
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
                          </div>

                          <div className='flex space-x-4 mb-14'>
                          <div className="w-1/3">
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                  Name
                              </label>
                              <select id="name" name="name" onChange={ handleChange } value={name} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option>select contacts</option>
                                {dbContacts.map((item)=>{
                                  return <option key={item._id} value={item.name}>{item.name} - {item.type}
                                  </option>
                                })}
                              </select>
                            </div> 
                            
                            <div className="w-2/3">
                              <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                                Description:
                              </label>
                              <textarea cols="30" rows="1" type="text"
                                onChange={ handleChange }
                                name="desc"
                                value={desc}
                                id="desc"
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                              </textarea>
                            </div>

                          </div>


                          


                          {inputList.map(( inputList , index)=>{
                            return <div key={index} className='flex space-x-4 my-10 '>
                            <div className="w-1/2">
                              <label htmlFor='account' className="block text-sm font-medium text-gray-700">
                                Account:
                              </label>
                              <select id="account" name="account" onChange={ e => change(e, index) } value={inputList.account} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option>select accounts</option>
                                {dbCharts.map((item)=>{
                                  return <option key={item._id} value={item.accountName}>{item.accountCode} - {item.accountName}</option>
                                })}
                              </select>
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
                              />
                            </div>
                            <button type='button' onClick={addLines}><AiOutlinePlusCircle className='text-lg'/></button>
                          </div>})}
                            
                          <div className='bg-gray-200'>
                            <div className='flex space-x-4 py-2 mt-20 justify-end pr-9 '>
                              <div className="w-36">
                                <label htmlFor="totalDebit" className="block text-sm font-medium text-gray-700">
                                    Total Debit:
                                </label>
                                <input
                                  type="number"
                                  onChange={handleChange}
                                  value = { totalDebit }
                                  name="totalDebit"
                                  id="totalDebit"
                                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  readOnly
                                  />
                              </div>
                              <div className="w-36">
                                <label htmlFor="totalCredit" className="block text-sm font-medium text-gray-700">
                                  Total Credit:
                                </label>
                                <input
                                  type="number"
                                  onChange={handleChange}
                                  value = { totalCredit }
                                  name="totalCredit"
                                  id="totalCredit"
                                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  readOnly
                                  />
                              </div>
                            </div>
                            {/*<h1 id='checkMatch' className='text-sm text-red-500 tracking-wide font-semibold my-auto text-center ml-72'></h1>*/}
                          </div>
                        
                          <div className=" mt-14">
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
  let dbVouchers = await Voucher.find()
  let dbContacts = await Contact.find()
  let dbEmployees = await Employees.find()
  let dbCharts = await Charts.find()

  // Pass data to the page via props
  return {
    props: {
      dbVouchers: JSON.parse(JSON.stringify(dbVouchers)),
      dbContacts: JSON.parse(JSON.stringify(dbContacts)), 
      dbCharts: JSON.parse(JSON.stringify(dbCharts)), 
      dbEmployees: JSON.parse(JSON.stringify(dbEmployees)), 
    }
  }
}   
export default JournalVoucher