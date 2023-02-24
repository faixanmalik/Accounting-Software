import React, {Fragment, useState} from 'react'
import mongoose from "mongoose";
import moment from 'moment/moment';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Contact from 'models/Contact';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const ContactList = ({dbContact, dbCustomer, dbSupplier, dbEmployee}) => {

  // Filter Usestates
  const [all, setAll] = useState(dbContact)
  const [allContacts, setAllContacts] = useState(dbContact)
  const [customer, setCustomer] = useState(dbCustomer)
  const [supplier, setSupplier] = useState(dbSupplier)
  const [employee, setEmployee] = useState(dbEmployee)

  const [open, setOpen] = useState(false)

  // Add States
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [country, setCountry] = useState('United States')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [taxRigNo, setTaxRigNo] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [terms, setTerms] = useState('Due on receipt')
  const [openingBalance, setOpeningBalance] = useState('')
  const [date, setDate] = useState('')


  // id For delete contact
  const [id, setId] = useState('')
  

  const handleChange = (e) => {
  
    if(e.target.name === 'name'){
      setName(e.target.value)
    }
    else if(e.target.name === 'type'){
      setType(e.target.value)
    }
    else if(e.target.name === 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.name === 'phoneNo'){
      setPhoneNo(e.target.value)
    }
    else if(e.target.name === 'country'){
      setCountry(e.target.value)
    }
    else if(e.target.name === 'streetAddress'){
      setStreetAddress(e.target.value)
    }
    else if(e.target.name === 'city'){
      setCity(e.target.value)
    }
    else if(e.target.name === 'state'){
      setState(e.target.value)
    }
    else if(e.target.name === 'zip'){
      setZip(e.target.value)
    }
    else if(e.target.name === 'taxRigNo'){
      setTaxRigNo(e.target.value)
    }
    else if(e.target.name === 'paymentMethod'){
      setPaymentMethod(e.target.value)
    }
    else if(e.target.name === 'terms'){
      setTerms(e.target.value)
    }
    else if(e.target.name === 'openingBalance'){
      setOpeningBalance(e.target.value)
    }
    else if(e.target.name === 'date'){
      setDate(e.target.value)
    }
  }

  const editEntry = async(id)=>{
    setOpen(true)

    const data = { id, name, type,  email, phoneNo, country, streetAddress, city, state, zip, taxRigNo, paymentMethod, terms , openingBalance, date ,  editPath: 'contactList'};
    
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/editEntry`, {
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

  const delEntry = async(id)=>{

    const data = { id , delPath: 'contactList' };
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

    const data = { id, getDataPath: 'contactList' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getDataEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

      const date = moment(response.contact.date).utc().format('YYYY-MM-DD')
      if (response.success === true){

        setId(response.contact._id)
        setName(response.contact.name)
        setType(response.contact.type)
        setEmail(response.contact.email)
        setPhoneNo(response.contact.phoneNo)
        setCountry(response.contact.country)
        setStreetAddress(response.contact.streetAddress)
        setCity(response.contact.city)
        setState(response.contact.state)
        setZip(response.contact.zip)
        setTaxRigNo(response.contact.taxRigNo)
        setTerms(response.contact.terms)
        setOpeningBalance(response.contact.openingBalance)
        setPaymentMethod(response.contact.paymentMethod)
        setDate(date)
      }
  }

  const submit = async(e)=>{
    e.preventDefault()
    
    // fetch the data from form to makes a file in local system
    const data = { name, type,  email, phoneNo, country, streetAddress, city, state, zip, taxRigNo, paymentMethod, terms , openingBalance, date };
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addContact`, {
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

  return (
    <>
    {/* React tostify */}
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>

    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0 flex">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Contact List</h3>
            <button onClick={()=>{ setOpen(true), setName(''), setEmail(''), setPhoneNo(''), setCountry('United States'), setStreetAddress(''), setCity(''), setState(''), setZip(''), setTaxRigNo(''), setTerms('Due on receipt'), setOpeningBalance(''), setPaymentMethod('Cash'), setDate('')}} className='ml-auto bg-blue-800 text-white px-14 py-2 rounded-lg'>
               New
            </button>
          </div>
          <div className='flex space-x-7 ml-5 mt-4 font-bold text-sm'>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setAll(allContacts)}}>All Accounts</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setAll(customer)}}>Customer</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setAll(supplier)}}>Supplier</button>
            <button className='text-indigo-600 hover:text-indigo-800' onClick={()=>{setAll(employee)}}>Employee</button>
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
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Phone no
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
                  
                  {Object.keys(all).map((item, index)=>{
                    return <tr key={all[item]._id} className="bg-white border-b hover:bg-gray-50">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {index + 1}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {all[item].name}
                    </td>
                    <td className="px-6 py-4">
                        {all[item].type}
                    </td>
                    <td className="px-6 py-4">
                        {all[item].email}
                    </td>
                    <td className="px-6 py-4">
                        {all[item].phoneNo}
                    </td>
                    <td className="px-6 py-4">
                        {all[item].openingBalance}
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
                                  <div onClick={()=>{getData(all[item]._id)}} className={classNames(   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 no-underline', 'w-full text-left block px-4 py-2 text-sm hover:no-underline' )}>Edit</div>
                                )}
                              </Menu.Item>
                              <Menu.Item>{({ active }) => (
                                  <div onClick={()=>{delEntry(all[item]._id)}} className={classNames(   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 no-underline', 'w-full text-left block px-4 py-2 text-sm hover:no-underline' )}>Delete</div>
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
                {all.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found</h1> : ''}
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
                    <div className="mt-10 sm:mt-0 w-full">
                      <div className="md:grid md:grid-cols-1 md:gap-6">
                        <div className="md:col-span-1">
                          <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Add Contact</h3>
                          </div>
                        </div>
                        <div className="mt-2 md:col-span-2 md:mt-0 w-full">
                          <form method="POST" onSubmit={submit}>
                            <div className="overflow-hidden shadow sm:rounded-md">
                              <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-6 gap-6">

                                  <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                                    <input type="name" onChange={handleChange} name="name" id="name" value={name} placeholder='John Doe' className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                  </div>
                            
                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">Contact Type:</label>
                                      <select id="type" name="type" onChange={handleChange} value={type} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option>Select Contact Type</option>
                                        <option value={'Customer'}>Customer</option>
                                        <option value={'Supplier'}>Supplier</option>
                                        <option value={'Employee'}>Employee</option>
                                      </select>
                                    </div>


                                    <div className="col-span-6 sm:col-span-4">
                                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                      <input onChange={handleChange} value={email} type="text" name="email" id="email" autoComplete="email" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                      <input onChange={handleChange} value={phoneNo} type="number" name="phoneNo" id="phoneNo" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                      <select id="country" name="country" onChange={handleChange} value={country} autoComplete="country" className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option value={'United States'}>United States</option>
                                        <option value={'Canada'}>Canada</option>
                                        <option value={'Mexico'}>Mexico</option>
                                      </select>
                                    </div>

                                    <div className="col-span-6">
                                      <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
                                      <input onChange={handleChange} value={streetAddress} type="text" name="streetAddress" id="streetAddress" autoComplete="streetAddress" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"  required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                      <input onChange={handleChange} value={city} type="text" name="city" id="city" autoComplete="address-level2" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-s requiredm"
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                                      <input onChange={handleChange} value={state} type="text" name="state" id="state" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-s requiredm"
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                                      <input onChange={handleChange} value={zip} type="number" name="zip" id="zip" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                      <label htmlFor="taxRigNo" className="block text-sm font-medium text-gray-700">Tax Reg.No</label>
                                      <input onChange={handleChange} value={taxRigNo} type="number" name="taxRigNo" id="taxRigNo" autoComplete="taxRigNo" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Prefered Payment Method</label>
                                      <select id="paymentMethod" name="paymentMethod" onChange={handleChange} value={paymentMethod} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" required>
                                        <option value={'Cash'}>Cash</option>
                                        <option value={'Cheque'}>Cheque</option>
                                        <option value={'Credit Card'}>Credit Card</option>
                                        <option value={'Direct Debit'}>Direct Debit</option>
                                      </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="terms" className="block text-sm font-medium text-gray-700">Terms</label>
                                      <select id="terms" name="terms" onChange={handleChange} value={terms} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" required>
                                        <option value={'Due on receipt'}>Due on receipt</option>
                                        <option value={'Net 15'}>Net 15</option>
                                        <option value={'Net 30'}>Net 30</option>
                                        <option value={'Net 60'}>Net 60</option>
                                      </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                      <label htmlFor="openingBalance" className="block text-sm font-medium text-gray-700">Opening Balance</label>
                                      <input onChange={handleChange} value={openingBalance} type="number" name="openingBalance" id="openingBalance" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date
                                      </label>
                                      <input onChange={handleChange} value={date} type="date" name="date" id="date" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
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
                    </div>

                    <div>
                  
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
  let dbContact = await Contact.find()
  let dbCustomer = await Contact.find({type: "Customer"})
  let dbSupplier = await Contact.find({type: "Supplier"})
  let dbEmployee = await Contact.find({type: "Employee"})
  

  // Pass data to the page via props
  return {
     props: { 
      dbContact: JSON.parse(JSON.stringify(dbContact)),
      dbCustomer: JSON.parse(JSON.stringify(dbCustomer)),
      dbSupplier: JSON.parse(JSON.stringify(dbSupplier)),
      dbEmployee: JSON.parse(JSON.stringify(dbEmployee)),
      }
  }
}

export default ContactList