import React, {Fragment, useState, useEffect} from 'react'
import mongoose, { setDriver } from "mongoose";
import moment from 'moment/moment';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Contact from 'models/Contact';
import Purchase from 'models/PurchaseOrder';
import IGatePass from 'models/InwardGatePass';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const InwardGatePass = ({ dbContacts, dbPurchaseOrder, dbInwardGatePass }) => {

  const [open, setOpen] = useState(false)

  // Add States
  const [id, setId] = useState('')
  const [transactionType, setTransactionType] = useState('')
  const [igpDate, setIgpDate] = useState('')
  const [deliveryChallanNo, setDeliveryChallanNo] = useState('')
  const [venderName, setVenderName] = useState('')
  const [poNumber, setPoNumber] = useState('')
  const [poDate, setPoDate] = useState('')
  const [VehicleNo, setVehicleNo] = useState('')
  const [driverName, setDriverName] = useState('')
  const [remarks, setRemarks] = useState('')
  const [item, setItem] = useState('')
  const [poQty, setPoQty] = useState('')
  const [receivedQty, setReceivedQty] = useState('')

  
  const handleChange = (e) => {
    if(e.target.name === 'transactionType'){
      setTransactionType(e.target.value)
    }
    else if(e.target.name === 'igpDate'){
      setIgpDate(e.target.value)
    }
    else if(e.target.name === 'deliveryChallanNo'){
      setDeliveryChallanNo(e.target.value)
    }
    else if(e.target.name === 'venderName'){
      setVenderName(e.target.value)
    }
    else if(e.target.name === 'poNumber'){
      setPoNumber(e.target.value)
    }
    else if(e.target.name === 'poDate'){
      setPoDate(e.target.value)
    }
    else if(e.target.name === 'VehicleNo'){
      setVehicleNo(e.target.value)
    }
    else if(e.target.name === 'driverName'){
      setDriverName(e.target.value)
    }
    else if(e.target.name === 'remarks'){
      setRemarks(e.target.value)
    }
    else if(e.target.name === 'item'){
      setItem(e.target.value)
    }
    else if(e.target.name === 'poQty'){
      setPoQty(e.target.value)
    }
    else if(e.target.name === 'receivedQty'){
      setReceivedQty(e.target.value)
    }
  }

  const editEntry = async(id)=>{
    setOpen(true)

    const data = { id, transactionType, igpDate, deliveryChallanNo, venderName,  poNumber, poDate, VehicleNo, driverName, remarks, item, poQty, receivedQty ,  editPath: 'inwardGatePass'};
    
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
          window.location.reload();
        }
        else {
          toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
      
    
  }

  const delEntry = async(id)=>{

    const data = { id , delPath: 'inwardGatePass' };
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

    const data = { id, getDataPath: 'InwardGatePass' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getDataEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

      if (response.success === true){
        const dbigpDate = moment(response.data.igpDate).utc().format('YYYY-MM-DD')
        const dbPoDate = moment(response.data.poDate).utc().format('YYYY-MM-DD')
        
        setId(response.data._id)
        setTransactionType(response.data.transactionType)
        setIgpDate(dbigpDate)
        setDeliveryChallanNo(response.data.deliveryChallanNo)
        setVenderName(response.data.venderName)
        setPoNumber(response.data.poNumber)
        setPoDate(dbPoDate)
        setVehicleNo(response.data.VehicleNo)
        setDriverName(response.data.driverName)
        setRemarks(response.data.remarks)
        setItem(response.data.item)
        setPoQty(response.data.poQty)
        setReceivedQty(response.data.receivedQty)
      }
  }

  const submit = async(e)=>{
    e.preventDefault()
    
    // fetch the data from form to makes a file in local system
    const data = { transactionType, igpDate, deliveryChallanNo, venderName,  poNumber, poDate, VehicleNo, driverName, remarks, item, poQty, receivedQty };

      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addInwardGatePass`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()
      console.log(response)

      if(response.success === true){
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

    <div className="mt-10 sm:mt-0 rounded-md">
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0 flex">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Inward Gate Pass</h3>
            <button onClick={()=>{ 
              setOpen(true)
              setTransactionType('')
              setIgpDate('')
              setDeliveryChallanNo('')
              setVenderName('')
              setPoNumber('')
              setPoDate('')
              setVehicleNo('')
              setDriverName('')
              setRemarks('')
              setItem('')
              setPoQty('')
              setReceivedQty('')
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
                          Delivery Challan No
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Vender
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Item
                      </th>
                      <th scope="col" className="px-6 py-3">
                          P.O.Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Received Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Driver
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Vehicle No
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <span className="">Action</span>
                      </th>
                  </tr>
                </thead>

                <tbody>
                  
                  {dbInwardGatePass.map((item, index)=>{
                    return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                    <td scope="row" className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {index + 1}
                    </td>
                    <td scope="row" className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {item.deliveryChallanNo}
                    </td>
                    <td className="px-6 py-3">
                        {item.venderName}
                    </td>
                    <td className="px-6 py-3">
                        {item.item}
                    </td>
                    <td className="px-6 py-3">
                        {moment(item.poDate).utc().format('DD-MM-YYYY')}
                    </td>
                    <td className="px-6 py-3">
                        {item.receivedQty}
                    </td>
                    <td className="px-6 py-3">
                        {item.driverName}
                    </td>
                    <td className="px-6 py-3">
                        {item.VehicleNo}
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
                {dbPurchaseOrder.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>Not found</h1> : ''}
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
                <div className="relative flex items-center overflow-hidden bg-white px-10 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-6 lg:right-8" onClick={() => setOpen(false)}>
                    <span className="sr-only">Close</span>  
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  
                  <div className=''>
                    <h1 className='text-xl mb-5'>Add Inward Gate Pass</h1>

                    <form method="POST" onSubmit={submit} className=''>

                      <div className='flex w-full flex-wrap items-center space-x-6 space-y-2 '>


                        <div className="w-1/2">
                            <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700">Transaction Type:</label>
                            <select id="transactionType" name="transactionType" onChange={handleChange} value={transactionType} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option>Select Transaction Type</option>
                                <option value='[GP] Inward Gate Pass'>[GP] Inward Gate Pass</option>
                            </select>
                        </div>

                        <div className="w-52">
                            <label htmlFor="igpDate" className="block text-sm font-medium text-gray-700">IGP Date:
                            </label>
                            <input onChange={handleChange} value={igpDate} type="date" name="igpDate" id="igpDate" className="mt-1 p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div className="w-44">
                            <label htmlFor="deliveryChallanNo" className="block text-sm font-medium text-gray-700">Delivery Challan No:
                            </label>
                            <input onChange={handleChange} value={deliveryChallanNo} type="number" name="deliveryChallanNo" id="deliveryChallanNo" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                      </div>


                      <div className='flex my-4 w-full flex-wrap items-center space-x-5 space-y-2 '>

                        <div className="w-96">
                            <label htmlFor="venderName" className="block text-sm font-medium text-gray-700">Vender Name:</label>
                            <select id="venderName" name="venderName" onChange={handleChange} value={venderName} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option>Select Vender Name</option>

                                {dbContacts.map((item)=>{
                                  return <option key={item._id} value={item.name}>{item.name}</option>
                                })}
                                
                            </select>
                        </div>


                        
                        <div className="w-56">
                            <label htmlFor="poNumber" className="block text-sm font-medium text-gray-700">P.O. No:</label>
                            <select id="poNumber" name="poNumber" onChange={handleChange} value={poNumber} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option>Select P.O. No</option>

                                {dbPurchaseOrder.map((item)=>{
                                  if( venderName === item.contact){
                                    return <option key={item._id} value={item.orderNo}>{item.orderNo}</option>
                                  }
                                })}
                                
                            </select>
                        </div>

                        <div className="w-56">
                            <label htmlFor="poDate" className="block text-sm font-medium text-gray-700">P.O. Date:</label>
                            <input onChange={handleChange} value={poDate} type="date" name="poDate" id="poDate" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        
                      </div>


                      <div className='flex my-4 w-full flex-wrap items-center space-x-5 space-y-2 '>

                    
                        <div className="w-56">
                            <label htmlFor="VehicleNo" className="block text-sm font-medium text-gray-700">Vehical No:</label>
                            <input onChange={handleChange} value={VehicleNo} type="number" name="VehicleNo" id="VehicleNo" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div className="w-56">
                            <label htmlFor="driverName" className="block text-sm font-medium text-gray-700">Driver Name:</label>
                            <input onChange={handleChange} value={driverName} type="text" name="driverName" id="driverName" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div className="w-96">
                            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks:</label>
                            <input onChange={handleChange} value={remarks} type="text" name="remarks" id="remarks" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                      </div>


                      <div className='flex items-center space-x-4 my-5 pt-5'>

                        <div className="w-1/2">
                            <label htmlFor="item" className="text-sm font-medium text-gray-700">Item Name:</label>
                            <select id="item" name="item" onChange={handleChange} value={item} className="block w-full mt-1 py-2 rounded-md border border-gray-300 bg-white px-1 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" >
                            <option>Select Item</option>
                                {dbPurchaseOrder.map((item)=>{
                                  if( venderName == item.contact && poNumber == item.orderNo){
                                    return <option key={item._id} value={item.item}>{item.item}</option>
                                  }
                                })}
                            </select>
                        </div>

                        <div className="w-1/4">
                          <label htmlFor="poQty" className="text-sm font-medium text-gray-700">P.O. Qty:</label>
                          <select id="poQty" name="poQty" onChange={handleChange} value={poQty} className="block w-full mt-1 py-2 rounded-md border border-gray-300 bg-white px-1 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" >
                          <option>Select Item</option>
                              {dbPurchaseOrder.map((item)=>{
                                if( venderName == item.contact && poNumber == item.orderNo){
                                  return <option key={item._id} value={item.qty}>{item.qty}</option>
                                }
                              })}
                          </select>
                        </div>





                        <div className="w-1/4">
                          <label htmlFor="receivedQty" className="text-sm font-medium text-gray-700">Received Qty:</label>
                          <input onChange={handleChange} value={receivedQty} type="number" name="receivedQty" id="receivedQty" className="block w-full mt-1 py-2 px-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                        </div>


                      </div>

                      <div className="bg-gray-50 space-x-3 px-4 py-3 text-right sm:px-6">
                          <button type='button' onClick={()=>{editEntry(id)}} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save Changes</button>
                          <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
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
  let dbContacts = await Contact.find()
  let dbPurchaseOrder = await Purchase.find()
  let dbInwardGatePass = await IGatePass.find()


  // Pass data to the page via props
  return {
     props: {
        dbContacts: JSON.parse(JSON.stringify(dbContacts)),
        dbPurchaseOrder: JSON.parse(JSON.stringify(dbPurchaseOrder)),
        dbInwardGatePass: JSON.parse(JSON.stringify(dbInwardGatePass)),
      }
  }
}

export default InwardGatePass