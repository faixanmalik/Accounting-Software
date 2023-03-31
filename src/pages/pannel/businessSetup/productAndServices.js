import React, {useState, Fragment, useRef, useEffect} from 'react'
import Product from 'models/Product';
import mongoose from "mongoose";
import { XMarkIcon } from '@heroicons/react/24/outline'
import {Dialog, Transition } from '@headlessui/react'
import Link from 'next/link';
import Charts from 'models/Charts';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import FullLayout from '@/pannel/layouts/FullLayout';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

import { BiExport, BiImport } from 'react-icons/bi';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import {XLSX, read, utils} from 'xlsx';



const ProductAndServices = ({product, charts}) => {

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

      const header = ['sr','code', 'name', 'costPrice', 'salesPrice' , 'qty']

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
  }

  const importEntries = async(row)=>{
    const data = { row, path:'productAndServices', importEntries:'importEntries' };
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
    const data = { code, name, purchaseStatus, costPrice, purchaseAccount, purchaseTaxRate, purchaseDesc , salesStatus,  salesPrice, salesAccount, salesTaxRate, salesDesc, path: 'productAndServices'  };

      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addEntry`, {
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

    const data = { id, path: 'productAndServices' };
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

  const delEntry = async()=>{

    const data = { selectedIds, path: 'productAndServices' };

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

    const data = { id, code, name, purchaseStatus, costPrice, purchaseAccount, purchaseTaxRate, purchaseDesc , salesStatus,  salesPrice, salesAccount, salesTaxRate, salesDesc , path: 'productAndServices' };
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
            <h3 className="text-lg font-medium leading-6 text-gray-900">Product and Services</h3>
            <button onClick={()=>{
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
              setSalesDesc('')}} 
              className={`${isAdmin === false ? 'cursor-not-allowed': ''} ml-auto bg-blue-800 hover:bg-blue-900 text-white px-14 py-2 rounded-lg`} disabled={isAdmin === false}>
              New
            </button>
          </div>
        </div>
        <div className="mt-2 md:col-span-2 md:mt-0">
        <div className='flex items-center space-x-2 mb-1'>
            <div>
              <DownloadTableExcel
                filename="Product And Services"
                sheet="Product And Services"
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
                            SR
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
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" onChange={e => handleRowCheckboxChange(e, item._id)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      </div>
                    </td>
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
                    <td className="flex items-center px-6 mr-5 py-4 space-x-4">
                      <button type='button' onClick={()=>{getData(item._id)}} 
                        className= {`${isAdmin === false ? 'cursor-not-allowed': ''} font-medium text-blue-600 dark:text-blue-500 hover:underline" `} disabled={isAdmin === false}><AiOutlineEdit className='text-lg'/></button>
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