import React, { useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Invoice = () => {

  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [invoiceNo, setInvoiceNo] = useState('')
  const [product, setProduct] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [qty, setQty] = useState('')
  const [rate, setRate] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [desc, setDesc] = useState('')
  const [terms, setTerms] = useState('Due on receipt')
  const [attachment, setAttachment] = useState('')


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
    else if(e.target.name === 'phoneNo'){
      setPhoneNo(e.target.value)
    }
    else if(e.target.name === 'invoiceNo'){
      setInvoiceNo(e.target.value)
    }
    else if(e.target.name === 'invoiceDate'){
      setInvoiceDate(e.target.value)
    }
    else if(e.target.name === 'dueDate'){
      setDueDate(e.target.value)
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
    else if(e.target.name === 'billingAddress'){
      setBillingAddress(e.target.value)
    }
    else if(e.target.name === 'desc'){
      setDesc(e.target.value)
    }
    else if(e.target.name === 'terms'){
      setTerms(e.target.value)
    }
    else if(e.target.name === 'attachment'){
      setAttachment(e.target.value)
    }
    amount();
  }

  const submit = async(e)=>{
    e.preventDefault()

    
    // fetch the data from form to makes a file in local system
    const data = { customerName, email, phoneNo,  billingAddress, terms , invoiceDate, invoiceNo, dueDate, product, qty, rate, totalAmount, desc, attachment };

      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addInvoice`, {
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
        setInvoiceDate('')
        setInvoiceNo('')
        setDueDate('')
        setProduct('')
        setQty('')
        setRate('')
        setTotalAmount('')
        setBillingAddress('')
        setDesc('')
        setTerms('')
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
            <h3 className="text-lg font-medium leading-6 text-gray-900">Add Invoice</h3>
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
                  <div className="col-span-6 sm:col-span-3">
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
                  <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                    <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">
                      Billing Address:
                    </label>
                    <textarea cols="30" rows="4" type="text"
                      name="billingAddress"
                      onChange={handleChange}
                      id="billingAddress"
                      value={billingAddress}
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    </textarea>
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="terms" className="block text-sm font-medium text-gray-700">
                        Terms
                      </label>
                      <select id="terms" name="terms" onChange={handleChange} value={terms} className="mt-1 py-2 block w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        <option value={'Due on receipt'}>Due on receipt</option>
                        <option value={'Net 15'}>Net 15</option>
                        <option value={'Net 30'}>Net 30</option>
                        <option value={'Net 60'}>Net 60</option>
                      </select>
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="invoiceDate" className="block text-sm font-medium text-gray-700">
                      Invoice Date:
                    </label>
                    <input
                      type="date"
                      onChange={handleChange}
                      name="invoiceDate"
                      id="invoiceDate"
                      value={invoiceDate}
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                      Due Date:
                    </label>
                    <input
                      type="date"
                      onChange={handleChange}
                      name="dueDate"
                      id="dueDate"
                      value={dueDate}
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="invoiceNo" className="block text-sm font-medium text-gray-700">
                      Invoice Number:
                    </label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="invoiceNo"
                      id="invoiceNo"
                      value={invoiceNo}
                      autoComplete="invoiceNo"
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
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

export default Invoice