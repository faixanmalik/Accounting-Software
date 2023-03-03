import React, {useState, Fragment} from 'react'
import Product from 'models/Product';
import mongoose from "mongoose";
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Menu, Dialog, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import Charts from 'models/Charts';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ProductAndServices = ({product, charts}) => {

  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')


  const [code, setCode] = useState('')
  const [name, setName] = useState('')

  const [purchaseStatus, setPurchaseStatus] = useState('')
  
  const [costPrice, setCostPrice] = useState('')
  const [purchaseAccount, setPurchaseAccount] = useState('')
  const [purchaseTaxRate, setPurchaseTaxRate] = useState('')
  const [purchaseDesc, setPurchaseDesc] = useState('')
  
  
  const [salesStatus, setSalesStatus] = useState('')
  const [salesPrice, setSalesPrice] = useState('')
  const [salesAccount, setSalesAccount] = useState('')
  const [salesTaxRate, setSalesTaxRate] = useState('')
  const [salesDesc, setSalesDesc] = useState('')


  const handleChange = (e) => {
    if(e.target.name === 'code'){
      setCode(e.target.value)
    }
    else if(e.target.name === 'name'){
      setName(e.target.value)
    }
    else if(e.target.name === 'purchaseStatus'){
      setPurchaseStatus(e.target.value)
    }
    
    else if(e.target.name === 'costPrice'){
      setCostPrice(e.target.value)
    }
    else if(e.target.name === 'purchaseAccount'){
      setPurchaseAccount(e.target.value)
    }
    else if(e.target.name === 'purchaseTaxRate'){
      setPurchaseTaxRate(e.target.value)
    }
    else if(e.target.name === 'purchaseDesc'){
        setPurchaseDesc(e.target.value)
    }

    else if(e.target.name === 'salesStatus'){
      setSalesStatus(e.target.value)
    }
    else if(e.target.name === 'salesPrice'){
      setSalesPrice(e.target.value)
    }
    else if(e.target.name === 'salesAccount'){
      setSalesAccount(e.target.value)
    }
    else if(e.target.name === 'salesTaxRate'){
      setSalesTaxRate(e.target.value)
    }
    else if(e.target.name === 'salesDesc'){
        setSalesDesc(e.target.value)
    }
    

  }

  const submit = async(e)=>{
    e.preventDefault()

    // fetch the data from form to makes a file in local system
    const data = { code, name, purchaseStatus, costPrice, purchaseAccount, purchaseTaxRate, purchaseDesc , salesStatus,  salesPrice, salesAccount, salesTaxRate, salesDesc  };

      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addProduct`, {
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

    const data = { id, getDataPath: 'productAndServices' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getDataEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

      if (response.success === true){
        setId(response.product._id)

        setCode(response.product.code)
        setName(response.product.name)

        setCostPrice(response.product.costPrice)
        setPurchaseAccount(response.product.purchaseAccount)
        setPurchaseTaxRate(response.product.purchaseTaxRate)
        setPurchaseDesc(response.product.purchaseDesc)

        setSalesPrice(response.product.salesPrice)
        setSalesAccount(response.product.salesAccount)
        setSalesTaxRate(response.product.salesTaxRate)
        setSalesDesc(response.product.salesDesc)
      }
      else{
        toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light", });
      }
  }

  const delEntry = async(id)=>{

    const data = { id, delPath: 'productAndServices' };

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

  const editEntry = async(id)=>{

    const data = { id, code, name, purchaseStatus, costPrice, purchaseAccount, purchaseTaxRate, purchaseDesc , salesStatus,  salesPrice, salesAccount, salesTaxRate, salesDesc , editPath: 'productAndServices' };
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
  

  return (
    <>
    {/* React tostify */}
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>

    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0 flex">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Product and Services</h3>
            <button onClick={
                ()=>{
                    setOpen(true);
                    setCode('');
                    setName('');
                    setCostPrice('');
                    setPurchaseAccount('');
                    setPurchaseTaxRate('');
                    setPurchaseDesc('');
                    setSalesPrice('');
                    setSalesAccount('');
                    setSalesTaxRate('');
                    setSalesDesc('');
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
                            SL
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Code
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cost Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sale Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                    {product.map((item, index)=>{
                    return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {index + 1}
                    </th>
                    <td className="px-6 py-3">
                        {item.code}
                    </td>
                    <td className="px-6 py-3">
                        {item.name}
                    </td>
                    <td className="px-6 py-3">
                        ${item.costPrice}
                    </td>
                    <td className="px-6 py-3">
                        ${item.salesPrice}
                    </td>
                    <td className="px-6 py-3">
                        {item.qty}
                    </td>
                    <td className="px-6 py-3">
                        <Menu as="div" className=" inline-block text-left">
                        <div>
                            <Menu.Button className="z-0">
                            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                        </div>
                        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                            <Menu.Items className="absolute right-16 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1 z-20">
                                <Menu.Item>{({ active }) => (
                                    <div onClick={()=>{getData(item._id)}} className={classNames(   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 no-underline', 'block px-4 py-2 text-sm hover:no-underline' )}>Edit</div>
                                )}
                                </Menu.Item>
                                <Menu.Item>{({ active }) => (
                                    <div onClick={()=>{delEntry(item._id)}} className={classNames(   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 no-underline', 'block px-4 py-2 text-sm hover:no-underline' )}>Delete</div>
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
            {product.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found</h1> : ''}
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


                  <form method="POST" onSubmit={submit} className='w-full'>
                    <div className="overflow-hidden shadow sm:rounded-md">
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                              Code (required)
                            </label>
                            <input
                              value={code}
                              onChange={handleChange}
                              type="text"
                              name="code"
                              id="code"
                              autoComplete="given-name"
                              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              required
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Name
                            </label>
                            <input
                              value={name}
                              onChange={handleChange}
                              type="text"
                              name="name"
                              id="name"
                              autoComplete="given-name"
                              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              required
                            />
                          </div>
                          <div className='col-span-6 sm:col-span-6 mt-10'>
                            <div className="flex space-x-3 items-center">
                                <input type="checkbox" value={purchaseStatus}   name="purchaseStatus" id="purchaseStatus" className='w-5 h-5' />
                                <label htmlFor="purchaseStatus" className="block text-lg  font-medium text-gray-700">
                                    Purchase
                                </label>
                            </div>
                            <h1 className='text-xs'>Add item to bills, purchase orders, and other purchase transactions</h1>
                          </div>
                          <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="costPrice" className="block text-sm font-medium text-gray-700">
                              Cost Price
                            </label>
                            <input
                              value={costPrice}
                              onChange={handleChange}
                              type="text"
                              name="costPrice"
                              id="costPrice"
                              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="purchaseAccount" className="block text-sm font-medium text-gray-700">
                              Purchase Account
                            </label>
                            <select
                              onChange={handleChange}
                              value={purchaseAccount}
                              id="purchaseAccount"
                              name="purchaseAccount"
                              className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                                <option>Select purchase account</option>
                              {charts.map((item)=>{
                                return <option key={item.accountCode} value={item.accountName}>{item.accountCode} - {item.accountName}</option>
                              })}

                            </select>
                          </div>
                          <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="purchaseTaxRate" className="block text-sm font-medium text-gray-700">
                              Tax rate
                            </label>
                            <select
                              onChange={handleChange}
                              value={purchaseTaxRate}
                              id="purchaseTaxRate"
                              name="purchaseTaxRate"
                              className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              <option>Select Tax Rate</option>
                              <option value={'None'}>None</option>
                              <option value={'Sales Tax on imports'}>Sales Tax on imports</option>
                              <option value={'Tax Exempt'}>Tax Exempt</option>
                              <option value={'Tax on Purchases'}>Tax on Purchases</option>
                              <option value={'Tax on Sales'}>Tax on Sales</option>
                            </select>
                          </div>
                          <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                            <label htmlFor="purchaseDesc" className="block text-sm font-medium text-gray-700">
                              Description
                            </label>
                            <textarea cols="30" rows="1" type="text"
                              onChange={handleChange}
                              value={purchaseDesc}
                              name="purchaseDesc"
                              id="purchaseDesc"
                              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            </textarea>
                          </div>


                          <div className='col-span-6 sm:col-span-6 mt-10'>
                            <div className="flex space-x-3 items-center">
                                <input type="checkbox" value={salesStatus} name="salesStatus" id="salesStatus" className='w-5 h-5' />
                                <label htmlFor="salesStatus" className="block text-lg  font-medium text-gray-700">
                                    Sales
                                </label>
                            </div>
                            <h1 className='text-xs'>Add item to invoices, quotes, and other sales transactions</h1>
                          </div>
                          <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="salesPrice" className="block text-sm font-medium text-gray-700">
                              Sale Price
                            </label>
                            <input
                              value={salesPrice}
                              onChange={handleChange}
                              type="text"
                              name="salesPrice"
                              id="salesPrice"
                              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="salesAccount" className="block text-sm font-medium text-gray-700">
                              Sales Account
                            </label>
                            <select
                              onChange={handleChange}
                              value={salesAccount}
                              id="salesAccount"
                              name="salesAccount"
                              className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                                <option>Select Sales account</option>
                              {charts.map((item)=>{
                                return <option key={item.accountCode} value={item.accountName}>{item.accountCode} - {item.accountName}</option>
                              })}

                            </select>
                          </div>
                          <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="salesTaxRate" className="block text-sm font-medium text-gray-700">
                              Tax rate
                            </label>
                            <select
                              onChange={handleChange}
                              value={salesTaxRate}
                              id="salesTaxRate"
                              name="salesTaxRate"
                              className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              <option>Select Tax Rate</option>
                              <option value={'None'}>None</option>
                              <option value={'Sales Tax on imports'}>Sales Tax on imports</option>
                              <option value={'Tax Exempt'}>Tax Exempt</option>
                              <option value={'Tax on Purchases'}>Tax on Purchases</option>
                              <option value={'Tax on Sales'}>Tax on Sales</option>
                            </select>
                          </div>
                          <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                            <label htmlFor="salesDesc" className="block text-sm font-medium text-gray-700">
                              Description
                            </label>
                            <textarea cols="30" rows="1" type="text"
                              onChange={handleChange}
                              value={salesDesc}
                              name="salesDesc"
                              id="salesDesc"
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
  let product = await Product.find()
  let chartsOfAccount = await Charts.find()

   
  // Pass data to the page via props
  return {
     props: { 
        product: JSON.parse(JSON.stringify(product)),
        charts: JSON.parse(JSON.stringify(chartsOfAccount)),
    } 
    }
}

export default ProductAndServices