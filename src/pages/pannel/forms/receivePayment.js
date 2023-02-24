import React, { useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ReceivePayment = () => {

  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [paymentDate, setPaymentDate] = useState('')
  const [paymentReceived, setPaymentReceived] = useState('')
  const [referenceNo, setReferenceNo] = useState('')
  const [memo, setMemo] = useState('')
  const [attachment, setAttachment] = useState('')



  const handleChange = (e) => {
    
    if(e.target.name === 'customerName'){
      setCustomerName(e.target.value)
    }
    else if(e.target.name === 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.name === 'phoneNo'){
      setPhoneNo(e.target.value)
    }
    else if(e.target.name === 'paymentDate'){
      setPaymentDate(e.target.value)
    }
    else if(e.target.name === 'referenceNo'){
      setReferenceNo(e.target.value)
    }
    else if(e.target.name === 'paymentReceived'){
      setPaymentReceived(e.target.value)
    }
    else if(e.target.name === 'memo'){
      setMemo(e.target.value)
    }
    else if(e.target.name === 'attachment'){
      setAttachment(e.target.value)
    }
    
  }

  const submit = async(e)=>{
    e.preventDefault()

    
    // fetch the data from form to makes a file in local system
    const data = { customerName, email, phoneNo , paymentDate, paymentReceived,referenceNo, memo, attachment };

      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/receivePayment`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

        setCustomerName('')
        setEmail('')
        setPhoneNo('')
        setPaymentDate('')
        setPaymentReceived('')
        setReferenceNo('')
        setMemo('')
        setAttachment('')

        if (response.success === true) {
            toast.success(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
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
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recive Payment</h3>
          </div>
        </div>
        <div className="mt-2 md:col-span-2 md:mt-0">
          <form method="POST" onSubmit={submit}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">


                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                      Customer Name:
                    </label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="customerName"
                      value={customerName}
                      id="customerName"
                      autoComplete="customerName"
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      onChange={handleChange}
                      value={email}
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">
                      Phone No:
                    </label>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="phoneNo"
                      id="phoneNo"
                      value={phoneNo}
                      autoComplete="phoneNo"
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700">
                      Payment Date:
                    </label>
                    <input
                      type="date"
                      onChange={handleChange}
                      name="paymentDate"
                      id="paymentDate"
                      value={paymentDate}
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  
                  
                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="paymentReceived" className="block text-sm font-medium text-gray-700">
                       Amount Received:
                    </label>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="paymentReceived"
                      value={paymentReceived}
                      id="paymentReceived"
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="referenceNo" className="block text-sm font-medium text-gray-700">
                       Reference No:
                    </label>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="referenceNo"
                      value={referenceNo}
                      id="referenceNo"
                      autoComplete="referenceNo"
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                 
                
                  <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                    <label htmlFor="memo" className="block text-sm font-medium text-gray-700">
                      Memo:
                    </label>
                    <textarea cols="30" rows="3" type="text"
                      name="memo"
                      id="memo"
                      onChange={handleChange}
                      value={memo}
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    </textarea>
                  </div>
                  <div className="col-span-6 sm:col-span-2">
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
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  
    <div className="hidden sm:block" aria-hidden="true">
      <div className="py-5">
        <div className="border-t border-gray-200" />
      </div>
    </div>

      
    </>
  )
}

export default ReceivePayment