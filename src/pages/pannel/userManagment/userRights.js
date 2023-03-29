import React, {Fragment, useRef, useState} from 'react'
import mongoose from "mongoose";
import moment from 'moment/moment';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Employee from 'models/Employees';
import { ProSidebarProvider } from 'react-pro-sidebar';
import FullLayout from '@/pannel/layouts/FullLayout';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import PanelUser from 'models/PanelUser';


const UserRights = ({dbEmployee, dbPanelUser}) => {

  const [open, setOpen] = useState(false)

  // Add States
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [role, setRole] = useState('')



  // id For delete contact
  const [id, setId] = useState('')
  const [selectedIds, setSelectedIds] = useState([]);

  function handleRowCheckboxChange(e, id) {
    if (e.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(rowId => rowId !== id));
    }
  }

  

  const handleChange = (e) => {
  
    if(e.target.name === 'name'){
      setName(e.target.value)
    }
    else if(e.target.name === 'role'){
      setRole(e.target.value)
    }
    else if(e.target.name === 'userId'){
      setUserId(e.target.value)
    }
  }

  const editEntry = async(id)=>{
    setOpen(true)

    const data = { id, name, userId, role, path:'user' }
    
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

  const delEntry = async()=>{

    const data = { selectedIds , path: 'user' };
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

    const data = { id, path: 'user' };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getDataEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

      
      if (response.success === true){
        setId(response.data._id)
        setName(response.data.name)
        setRole(response.data.role)
        setUserId(response.data.userId)
      }
  }

  const submit = async(e)=>{
    e.preventDefault()
    
    // fetch the data from form to makes a file in local system
    const data = { name, userId, role, path:'user' };
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
            <h3 className="text-lg font-medium leading-6 text-gray-900">Manage Users</h3>
            <button onClick={()=>{
              setOpen(true), 
              setName('')
              setRole('')
              setUserId('')
              }} className='ml-auto bg-blue-800 hover:bg-blue-900 text-white px-14 py-2 rounded-lg'>
               New
            </button>
          </div>  
        </div>
        <div className="mt-2 md:col-span-2 md:mt-0">
          
          <div className='flex items-center space-x-2 mb-1'>
           
            <div className=''>
              <button type="button" onClick={delEntry} className="text-blue-800 flex hover:text-white border-2 border-blue-800 hover:bg-blue-800 font-semibold rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2">
                Delete
                <AiOutlineDelete className='text-lg ml-2'/>
              </button>
            </div>
          </div>

          <form method="POST">
            <div className="overflow-hidden shadow sm:rounded-md">
            <div className="overflow-x-auto shadow-sm">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Sr.
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          User Id:
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Role
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <span className="">Action</span>
                      </th>
                  </tr>
                </thead>

                <tbody>
                  
                  {dbPanelUser.map((item, index)=>{
                    return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" onChange={e => handleRowCheckboxChange(e, item._id)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      </div>
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {index + 1}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {item.name}
                    </td>
                    <td className="px-6 py-4">
                        {item.userId}
                    </td>
                    <td className="px-6 py-4">
                        {item.role}
                    </td>
                    <td className="flex items-center px-6 mr-5 py-4 space-x-4">
                      <button type='button' onClick={()=>{getData(item._id)}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><AiOutlineEdit className='text-lg'/></button>
                    </td>
                  </tr>})}
                </tbody>

              </table>
                {dbEmployee.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found</h1> : ''}
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
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Add User</h3>
                          </div>
                        </div>
                        <div className="mt-2 md:col-span-2 md:mt-0 w-full">
                          <form method="POST" onSubmit={submit}>
                            <div className="overflow-hidden shadow sm:rounded-md">
                              <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-6 gap-6">


                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User Id:</label>
                                      <input onChange={handleChange} value={userId} type="number" name="userId" id="userId" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                                      <select id="name" name="name" onChange={handleChange} value={name} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option>Select Employee</option>
                                        {dbEmployee.map((item)=>{ return <option value={item.name}>{item.name}</option>})}
                                      </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">Assign Role:</label>
                                      <select id="role" name="role" onChange={handleChange} value={role} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option>Select Role</option>
                                        <option value={'Admin'}>Admin</option>
                                        <option value={'Accountant'}>Accountant</option>
                                        <option value={'Store Incharge'}>Store Incharge</option>
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
  let dbEmployee = await Employee.find()
  let dbPanelUser = await PanelUser.find()
  
  // Pass data to the page via props
  return {
     props: {
      dbEmployee: JSON.parse(JSON.stringify(dbEmployee)),
      dbPanelUser: JSON.parse(JSON.stringify(dbPanelUser)),
    }
  }
}

export default UserRights