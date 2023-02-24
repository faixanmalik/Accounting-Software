import React, {Fragment, useState, useEffect} from 'react'
import mongoose from "mongoose";
import moment from 'moment/moment';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Product from 'models/Product';
import Contact from 'models/Contact';
import Charts from 'models/Charts';
import Purchase from 'models/PurchaseOrder';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const PurchaseOrder = ({ dbProducts, dbContacts, dbAccounts, dbPurchaseOrder }) => {

  const [open, setOpen] = useState(false)

  // Add States
  const [contact, setContact] = useState('')
  const [date, setDate] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [orderNo, setOrderNo] = useState('')
  const [reference, setReference] = useState('')
  const [currency, setCurrency] = useState('')
  const [amountsAre, setAmountsAre] = useState('Tax Exclusive')
  const [item, setItem] = useState('')
  const [desc, setDesc] = useState('')
  const [qty, setQty] = useState([])
  const [unitPrice, setUnitPrice] = useState([])
  const [discount, setDiscount] = useState('')
  const [account, setAccount] = useState('')
  const [taxRate, setTaxRate] = useState('')
  const [amount, setAmount] = useState([])
 

  
  // id For delete contact
  const [id, setId] = useState('')

  const totalAmount = ()=>{
    return setAmount(+(qty * unitPrice))     
  }
  
  const handleChange = (e) => {
  
    if(e.target.name === 'contact'){
      setContact(e.target.value)
    }
    else if(e.target.name === 'date'){
      setDate(e.target.value)
    }
    else if(e.target.name === 'deliveryDate'){
      setDeliveryDate(e.target.value)
    }
    else if(e.target.name === 'orderNo'){
      setOrderNo(e.target.value)
    }
    else if(e.target.name === 'reference'){
      setReference(e.target.value)
    }
    else if(e.target.name === 'currency'){
      setCurrency(e.target.value)
    }
    else if(e.target.name === 'amountsAre'){
      setAmountsAre(e.target.value)
    }
    else if(e.target.name === 'item'){
      setItem(e.target.value)
    }
    else if(e.target.name === 'desc'){
      setDesc(e.target.value)
    }
    else if(e.target.name === 'qty'){
      setQty(e.target.value)
    }
    else if(e.target.name === 'unitPrice'){
      setUnitPrice(e.target.value)
    }
    else if(e.target.name === 'discount'){
      setDiscount(e.target.value)
    }
    else if(e.target.name === 'account'){
      setAccount(e.target.value)
    }
    else if(e.target.name === 'taxRate'){
      setTaxRate(e.target.value)
    }
    else if(e.target.name === 'amount'){
      
      console.log('main amoutn hon');
      setAmount(totalAmount())
    }
    else {
      console.log('please select a tax rate')
    }
  }

  const editEntry = async(id)=>{
    setOpen(true)

    const data = { id, contact, date, deliveryDate, orderNo,  reference, currency, amountsAre, item,  desc, qty, unitPrice, discount, account , taxRate, amount ,  editPath: 'purchaseOrder'};
    
    console.log(data)

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/editEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()
      
        if (response.success === true) {
          //window.location.reload();
        }
        else {
          toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
      
    
  }

  const delEntry = async(id)=>{

    const data = { id , delPath: 'purchaseOrder' };
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

    const data = { id, getDataPath: 'purchaseOrder' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getDataEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

      const dbDate = moment(response.data.date).utc().format('YYYY-MM-DD')
      const dbDelDate = moment(response.data.deliveryDate).utc().format('YYYY-MM-DD')
      if (response.success === true){

        setId(response.data._id)
        setContact(response.data.contact)
        setDate(dbDate)
        setDeliveryDate(dbDelDate)
        setOrderNo(response.data.orderNo)
        setReference(response.data.reference)
        setCurrency(response.data.currency)
        setAmountsAre(response.data.amountsAre)
        setItem(response.data.item)
        setDesc(response.data.desc)
        setQty(response.data.qty)
        setUnitPrice(response.data.unitPrice)
        setDiscount(response.data.discount)
        setAccount(response.data.account)
        setTaxRate(response.data.taxRate)
        setAmount(response.data.amount)
      }
  }

  const submit = async(e)=>{
    e.preventDefault()
    totalAmount()
    
    // fetch the data from form to makes a file in local system
    const data = { contact, date, deliveryDate, orderNo,  reference, currency, amountsAre, item,  desc, qty, unitPrice, discount, account , taxRate, amount };

    console.log(data);

      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addPurchaseOrder`, {
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
  const dataLayerUpdate=(e)=>{
    
  }
  return (
    <>
    {/* React tostify */}
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>

    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0 flex">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Purchase Orders</h3>
            <button onClick={()=>{ 
              setOpen(true)
              setContact('')
              setDate('')
              setDeliveryDate('')
              setOrderNo('')
              setReference('')
              setCurrency('')
              setAmountsAre('Tax Exclusive')
              setItem('')
              setDesc('')
              setQty('')
              setUnitPrice('')
              setDiscount('')
              setAccount('')
              setTaxRate('')
              setAmount('')
  
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
                          Order No
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Reference
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Supplier
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Date raised
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Delivery date
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <span className="">Action</span>
                      </th>
                  </tr>
                </thead>

                <tbody>
                  
                  {dbPurchaseOrder.map((item, index)=>{
                    return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {index + 1}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {item.orderNo}
                    </td>
                    <td className="px-6 py-4">
                        {item.reference}
                    </td>
                    <td className="px-6 py-4">
                        {item.contact}
                    </td>
                    <td className="px-6 py-4">
                        {moment(item.date).utc().format('DD-MM-YYYY')}
                    </td>
                    <td className="px-6 py-4">
                        {moment(item.deliveryDate).utc().format('DD-MM-YYYY')}
                    </td>
                    <td className="px-6 py-4">
                        {item.amount}
                    </td>
                    <td className="px-6 py-4">
                        {item.status}
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
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-7xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-6 lg:right-8" onClick={() => setOpen(false)}>
                    <span className="sr-only">Close</span>  
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  
                  <div className=''>
                    <h1 className='text-xl mb-5'>Add Purchase Order</h1>

                      <form method="POST" onSubmit={submit}>

                        <div className='flex w-full flex-wrap items-center space-x-5 space-y-2 '>
                          <div className="w-64">
                            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact:</label>
                            <select id="contact" name="contact" onChange={handleChange} value={contact} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                              <option>Select Contact</option>
                                {dbContacts.map((item)=>{return <option key={item._id} value={item.name}>{item.name}</option>})}
                            </select>
                          </div>

                          <div className="w-44">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                            <input onChange={handleChange} value={date} type="date" name="date" id="date" className="mt-1 p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                          </div>

                          <div className="w-44">
                            <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700">Delivery Date:</label>
                            <input onChange={handleChange} value={deliveryDate} type="date" name="deliveryDate" id="deliveryDate" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                          </div>

                          

                          <div className="w-40">
                            <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">Order Number:</label>
                            <input onChange={handleChange} value={orderNo} type="number" name="orderNo" id="orderNo" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                          </div>

                          <div className="w-44">
                            <label htmlFor="reference" className="block text-sm font-medium text-gray-700">Reference:</label>
                            <input onChange={handleChange} value={reference} type="text" name="reference" id="reference" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                          </div>


                        </div>

                        <div className='flex items-center my-4'>
                          <div className="w-64">
                            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency:</label>
                            <select id="currency" name="currency" onChange={handleChange} value={currency} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                              <option>Select Currency</option>
                              <option value={'PKR'}>Pakistani Rupees (PKR)</option>
                            </select>
                          </div>

                          <div className="ml-auto w-60">
                            <label htmlFor="amountsAre" className="block text-sm font-medium text-gray-700">Amount are:</label>
                            <select id="amountsAre" name="amountsAre" onChange={handleChange} value={amountsAre} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" >
                              <option value={'Tax Exclusive'}>Tax Exclusive</option>
                              <option value={'Tax Inclusive'}>Tax Inclusive</option>
                              <option value={'No Tax'}>No Tax</option>
                            </select>
                          </div>

                        </div>

                        <div className='flex items-center space-x-4 my-5 pt-10'>
                          <div className="w-36">
                            <label htmlFor="item" className="text-sm font-medium text-gray-700">Item:</label>
                            <select id="item" name="item" onChange={handleChange} value={item} className="block w-full mt-1 py-2 rounded-md border border-gray-300 bg-white px-1 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" >
                            <option>Select Item</option>
                              {dbProducts.map((item)=>{return <option key={item._id} value={item.name}>{item.code} - {item.name}</option>})}
                            </select>
                          </div>

                          <div className="w-32">
                            <label htmlFor="desc" className="text-sm font-medium text-gray-700">Description:</label>
                            <input onChange={handleChange} value={desc} type="text" name="desc" id="desc" className="block w-full mt-1 py-2 px-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"  />
                          </div>

                          <div className="w-24">
                            <label htmlFor="qty" className="text-sm font-medium text-gray-700">Quantity:</label>
                            <input onChange={handleChange} value={qty} type="number" name="qty" id="qty" className="block w-full mt-1 py-2 px-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                          </div>

                          <div className="w-24">
                            <label htmlFor="unitPrice" className="text-sm font-medium text-gray-700">Unit Price:</label>
                            <input onChange={handleChange} value={unitPrice} type="number" name="unitPrice" id="unitPrice" className="block w-full mt-1 py-2 px-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                          </div>

                          <div className="w-24">
                            <label htmlFor="discount" className="text-sm font-medium text-gray-700">Discount:</label>
                            <input onChange={handleChange} value={discount} type="number" name="discount" id="discount" className="block w-full mt-1 py-2 px-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                          </div>

                          <div className="w-44">
                            <label htmlFor="account" className="text-sm font-medium text-gray-700">Account:</label>
                            <select id="account" name="account" onChange={handleChange} value={account} className="block w-full mt-1 py-2 px-1 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" >
                              <option>Select Account</option>
                                {dbAccounts.map((item)=>{return <option key={item._id} value={item.accountName}>{item.accountCode} - {item.accountName}</option>})}
                            </select>
                          </div>

                          <div className="w-40">
                            <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700">Tax Rate:</label>
                            <select id="taxRate" name="taxRate" onChange={handleChange} value={taxRate} className="block w-full mt-1 py-2 px-1 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" >
                              <option>Select Tax Rate</option>
                              <option value='None'>None</option>
                              <option value='Sales Tax on Imports(0%)'>Sales Tax on Imports(0%)</option>
                              <option value='Tax Exempt(0%)'>Tax Exempt(0%)</option>
                              <option value='Tax on Purchases(0%)'>Tax on Purchases(0%)</option>
                              <option value='Tax on Sales(0%)'>Tax on Sales(0%)</option>
                            </select>
                          </div>

                          <div className="w-32 text-center bg-gray-100">
                            <label htmlFor="amount" className="text-sm font-medium  text-gray-700">Amount:</label>
                            <input onChange={handleChange} value={unitPrice * qty} type="number" name="amount" id="amount" className="block bg-gray-100 text-center w-full mt-1 py-2 px-1 text-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                          </div>

                        </div>

                        <div className="bg-gray-50 space-x-3 px-4 py-3 text-right sm:px-6">
                            <button type='button' onClick={()=>{editEntry(id)}} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save Changes</button>
                            <button onClick={dataLayerUpdate} type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
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
  let dbProducts = await Product.find()
  let dbContacts = await Contact.find()
  let dbAccounts = await Charts.find()
  let dbPurchaseOrder = await Purchase.find()


  // Pass data to the page via props
  return {
     props: {
        dbProducts: JSON.parse(JSON.stringify(dbProducts)),
        dbContacts: JSON.parse(JSON.stringify(dbContacts)),
        dbAccounts: JSON.parse(JSON.stringify(dbAccounts)),
        dbPurchaseOrder: JSON.parse(JSON.stringify(dbPurchaseOrder)),
      }
  }
}

export default PurchaseOrder