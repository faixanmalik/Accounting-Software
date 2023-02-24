import React, {useState, Fragment} from 'react'
import mongoose from "mongoose";
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Menu, Dialog, Transition } from '@headlessui/react'
import Financial from 'models/FinancialYear';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const FinancialYear = ({financial}) => {

  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')
  const [yearName, setYearName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [status, setStatus] = useState()


  const handleChange = (e) => {
    if(e.target.name === 'yearName'){
      setYearName(e.target.value)
    }
    else if(e.target.name === 'startDate'){
      setStartDate(e.target.value)
    }
    else if(e.target.name === 'endDate'){
      setEndDate(e.target.value)
    }
    else if(e.target.name === 'status'){
      setStatus(e.target.value)
    }
  }

  const submit = async(e)=>{
    e.preventDefault()

    // fetch the data from form to makes a file in local system
    const data = { yearName, status, startDate, endDate };
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addFinancialYear`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

        if (response.success === true) {
          window.location.reload();
          setYearName('')
          setStartDate('')
          setEndDate('')
          setStatus('')
        }
        else {
          toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
  }

  const getData = async (id) =>{
    setOpen(true)

    const data = { id, getDataPath: 'financialYear' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getDataEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()
      const startDate = moment(response.financialYear.startDate).utc().format('YYYY-MM-DD')
      const endDate = moment(response.financialYear.endDate).utc().format('YYYY-MM-DD')

      if (response.success === true){
          setId(response.financialYear._id)
          setYearName(response.financialYear.yearName)
          setStartDate(startDate)
          setEndDate(endDate)
          setStatus(response.financialYear.status)
      }
      else{
        toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light", });
      }
  }

  const delEntry = async(id)=>{

    const data = { id, delPath: 'financialYear' };

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

    const data = { id, yearName, status, startDate, endDate , editPath: 'financialYear' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/editEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()
      console.log(response)
      
      if (response.success === true){
        window.location.reload();

        const sDate = moment(response.editFinancialYear.startDate).utc().format('DD-MM-YYYY')
        const eDate = moment(response.editFinancialYear.endDate).utc().format('DD-MM-YYYY')
        
        setYearName(response.editFinancialYear.yearName)
        setStartDate(sDate)
        setEndDate(eDate)
        setStatus(response.editFinancialYear.status)
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
            <h3 className="text-lg font-medium leading-6 text-gray-900">Financial Years</h3>
            <button onClick={
              ()=>{setOpen(true)
                setYearName('');
                setStartDate('');
                setEndDate('');
                setStatus('');
              }
              } className='ml-auto bg-blue-800 text-white px-14 py-2 rounded-lg'>
             New
            </button>
          </div>
        </div>
        <div className="mt-2 md:col-span-2 md:mt-0">
          <form action="#" method="POST">
            <div className="overflow-hidden shadow sm:rounded-md">
            
            <div className="overflow-x-auto shadow-sm">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            SR
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Year Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Start Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            End Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                  
                  {financial.map((item, index)=>{
                  return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {index + 1}
                    </th>
                    <td className="px-6 py-3">
                        {item.yearName}
                    </td>
                    <td className="px-6 py-3">
                        {moment(item.startDate).utc().format('DD-MM-YYYY')}
                    </td>
                    <td className="px-6 py-3">
                        {moment(item.endDate).utc().format('DD-MM-YYYY')}
                    </td>
                    <td className="px-6 py-3">
                        {item.status}
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
              {financial.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found</h1> : ''}
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
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-3xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-6 lg:right-8" onClick={() => setOpen(false)}>
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <form method="POST" onSubmit={submit} className='w-full'>
                   <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                    
                        <div className="col-span-6 sm:col-span-2">
                          <label htmlFor="yearName" className="block text-sm font-medium text-gray-700">
                            Year Name
                          </label>
                          <input
                            value={yearName}
                            onChange={handleChange}
                            type="text"
                            name="yearName"
                            id="yearName"
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-2">
                          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date:</label>
                          <input type="date" onChange={handleChange} name="startDate" id="startDate" value={startDate} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                        </div>
                        <div className="col-span-6 sm:col-span-2">
                          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date:</label>
                          <input type="date" onChange={handleChange} name="endDate" id="endDate" value={endDate} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                        </div>
                        
                        <div className="col-span-6 sm:col-span-2">
                          <label htmlFor="status" className="block text-sm font-medium text-gray-700">status</label>
                          <select onChange={handleChange} value={status} id="status" name="status" className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" required>
                            <option>Select Status</option>
                            <option value={'Current'}>Current</option>
                            <option value={'Active'}>Active</option>
                            <option value={'Closed'}>Closed</option>
                          </select>
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
  let financial = await Financial.find()
   
  // Pass data to the page via props
  return {
     props: { financial: JSON.parse(JSON.stringify(financial)) } 
    }
}

export default FinancialYear