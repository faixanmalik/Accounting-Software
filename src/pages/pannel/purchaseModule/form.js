<form method="POST" onSubmit={submit} className=''>

                      <div className='flex w-full flex-wrap items-center space-x-5 space-y-2 '>

                        <div className="w-52">
                            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Contact:</label>
                            <select id="siteName" name="siteName" onChange={handleChange} value={siteName} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option>Select Site Name</option>
                                <option value='Lahore'>Lahore</option>
                            </select>
                        </div>

                        <div className="w-64">
                            <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700">Transaction Type:</label>
                            <select id="transactionType" name="transactionType" onChange={handleChange} value={transactionType} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option>Select Transaction Type</option>
                                <option value='[GP] Inward Gate Pass'>[GP] Inward Gate Pass</option>
                            </select>
                        </div>

                        <div className="w-44">
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
                                    if(item.type === 'Supplier'){
                                        return <option key={item._id} value={'PKR'}>{item.name}</option>
                                    }
                                })}
                                
                            </select>
                        </div>

                        <div className="w-56">
                            <label htmlFor="poNumber" className="block text-sm font-medium text-gray-700">P.O. No:</label>
                            <input onChange={handleChange} value={poNumber} type="text" name="poNumber" id="poNumber" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
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
                        <div className="w-96">
                            <label htmlFor="item" className="text-sm font-medium text-gray-700">Item</label>
                            <select id="item" name="item" onChange={handleChange} value={item} className="block w-full mt-1 py-2 rounded-md border border-gray-300 bg-white px-1 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" >
                            <option>Select Item</option>
                                {dbProducts.map((item)=>{return <option key={item._id} value={item.name}>{item.code} - {item.name}</option>})}
                            </select>
                        </div>

                        <div className="w-36">
                            <label htmlFor="unit" className="text-sm font-medium text-gray-700">Unit:</label>
                            <input onChange={handleChange} value={unit} type="number" name="unit" id="unit" className="block w-full mt-1 py-2 px-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div className="w-36">
                            <label htmlFor="poQty" className="text-sm font-medium text-gray-700">P.O. Quantity:</label>
                            <input onChange={handleChange} value={poQty} type="number" name="poQty" id="poQty" className="block w-full mt-1 py-2 px-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div className="w-36">
                            <label htmlFor="receivedQty" className="text-sm font-medium text-gray-700">Received Qty:</label>
                            <input onChange={handleChange} value={receivedQty} type="number" name="receivedQty" id="receivedQty" className="block w-full mt-1 py-2 px-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                        </div>

                      </div>

                      <div className="bg-gray-50 space-x-3 px-4 py-3 text-right sm:px-6">
                          <button type='button' onClick={()=>{editEntry(id)}} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save Changes</button>
                          <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                      </div>


                    </form>