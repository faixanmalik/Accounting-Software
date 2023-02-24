import React, { useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Estimate = () => {

  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [estimateDate, setEstimateDate] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [estimateNo, setEstimateNo] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [attachment, setAttachment] = useState('')
  const [product, setProduct] = useState('')
  const [qty, setQty] = useState('')
  const [rate, setRate] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [desc, setDesc] = useState('')

  const amount = ()=>{
    setTotalAmount(rate * qty)
  }

  const handleChange = (e) => {
    
    if(e.target.name === 'customerName'){
      setCustomerName(e.target.value)
    }
    else if(e.target.name === 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.name === 'estimateDate'){
      setEstimateDate(e.target.value)
    }
    else if(e.target.name === 'estimateNo'){
      setEstimateNo(e.target.value)
    }
    else if(e.target.name === 'expirationDate'){
      setExpirationDate(e.target.value)
    }
    else if(e.target.name === 'billingAddress'){
      setBillingAddress(e.target.value)
    }
    else if(e.target.name === 'product'){
      setProduct(e.target.value)
    }
    else if(e.target.name === 'qty'){
      setQty(e.target.value)
    }
    else if(e.target.name === 'rate'){
      setRate(e.target.value)
    }
    else if(e.target.name === 'totalAmount'){
      setTotalAmount(e.target.value)
    }
    else if(e.target.name === 'desc'){
      setDesc(e.target.value)
    }
    else if(e.target.name === 'attachment'){
      setAttachment(e.target.value)
    }
    
    amount()
  }

  const submit = async(e)=>{
    e.preventDefault()

    
    // fetch the data from form to makes a file in local system
    const data = { customerName, email , estimateDate, expirationDate, estimateNo, product, qty, rate, totalAmount, desc, billingAddress, attachment };

      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/estimate`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()

        setCustomerName('')
        setEmail('')
        setEstimateDate('')
        setExpirationDate('')
        setEstimateNo('')
        setProduct('')
        setQty('')
        setTotalAmount('')
        setDesc('')
        setExpirationDate('')
        setBillingAddress('')
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
            <h3 className="text-lg font-medium leading-6 text-gray-900">Estimate</h3>
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
                    <label htmlFor="estimateDate" className="block text-sm font-medium text-gray-700">
                      Estimate Date:
                    </label>
                    <input
                      type="date"
                      onChange={handleChange}
                      name="estimateDate"
                      id="estimateDate"
                      value={estimateDate}
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                       Expiration Date:
                    </label>
                    <input
                      type="date"
                      onChange={handleChange}
                      name="expirationDate"
                      value={expirationDate}
                      id="expirationDate"
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="estimateNo" className="block text-sm font-medium text-gray-700">
                       Estimate No:
                    </label>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="estimateNo"
                      value={estimateNo}
                      id="estimateNo"
                      autoComplete="estimateNo"
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                 
                
                  <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                    <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">
                      Billing Address:
                    </label>
                    <textarea cols="30" rows="3" type="text"
                      name="billingAddress"
                      id="billingAddress"
                      onChange={handleChange}
                      value={billingAddress}
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    </textarea>
                  </div>



                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="product" className="block text-sm font-medium text-gray-700">
                      Product:
                    </label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="product"
                      value={product}
                      id="product"
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>



                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="qty" className="block text-sm font-medium text-gray-700">
                       Quantity:
                    </label>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="qty"
                      value={qty}
                      id="qty"
                      autoComplete="qty"
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>


                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
                      Rate:
                    </label>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="rate"
                      value={rate}
                      id="rate"
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>


                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">
                      Total:
                    </label>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="totalAmount"
                      value={rate * qty}
                      id="totalAmount"
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>


                  <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                    <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                      Description:
                    </label>
                    <textarea cols="30" rows="5" type="text"
                      name="desc"
                      id="desc"
                      onChange={handleChange}
                      value={desc}
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

export default Estimate