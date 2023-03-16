import React, { useEffect, useState } from 'react'
import mongoose from "mongoose";
import moment from 'moment/moment';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CashReceipt from 'models/CashReceipt';
import CashPayment from 'models/CashPayment';
import BankReceipt from 'models/BankReceipt';
import BankPayment from 'models/BankPayment';
import JournalVoucher from 'models/JournalVoucher';
import Charts from 'models/Charts';
import Contact from 'models/Contact';


const ContactTransactionSummary = ({ dbJournalVoucher, dbCashPayment, dbCashReceipt, dbBankPayment, dbBankReceipt, dbContacts }) => {

    // Cash Receipt
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('') 
    const [sortBy, setsortBy] = useState('')
    const [contact, setContact] = useState('')
    const [dbAccount, setDbAccount] = useState(false)
    const [newEntry, setNewEntry] = useState([])



    let dbAllEntries = [];
    const submit = ()=>{

        let allVouchers = [];

        if(contact){
            allVouchers = allVouchers.concat(dbJournalVoucher, dbBankPayment, dbBankReceipt, dbCashPayment, dbCashReceipt);

            // Data filter
            const dbAll = allVouchers.filter((data) => {

                if(data.type === 'CRV'){
                    if (data.receivedFrom === `${contact}`) {

                        if(fromDate && toDate){
                            const dbDate = moment(data.date).format('YYYY-MM-DD')

                            return dbDate >= fromDate && dbDate <= toDate;
                        }
                        else{
                            return data.receivedFrom;
                        }
                    }
                }
                else if(data.type === 'CPV'){
                    if (data.paymentFrom === `${contact}`) {
                        if(fromDate && toDate){
                            const dbDate = moment(data.date).format('YYYY-MM-DD')
                            return dbDate >= fromDate && dbDate <= toDate;
                        }
                        else{
                            return data.paymentFrom;
                        }
                    }
                }
                else if(data.type === 'BRV' || data.type === 'BPV'){
                    if (data.paymentTo === `${contact}`) {
                        if(fromDate && toDate){
                            const dbDate = moment(data.date).format('YYYY-MM-DD')
                            return dbDate >= fromDate && dbDate <= toDate;
                        }
                        else{
                            return data.paymentTo;
                        }
                    }
                }
                else {
                    const journal = data.inputList.filter((data)=>{
                        if (data.name === `${contact}`) {
                            if(fromDate && toDate){
                                const dbDate = moment(data.date).format('YYYY-MM-DD')
                                return dbDate >= fromDate && dbDate <= toDate;
                            }
                            else{
                                return data.name;
                            }
                        }
                    })
                    dbAllEntries = dbAllEntries.concat(journal);
                }
            })
            dbAllEntries = dbAllEntries.concat(dbAll);
        }
        
        // Date filter
        dbAllEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
        setNewEntry(dbAllEntries)
    }







    const handleChange = (e) => {
        if (e.target.name === 'contact') {
            setContact(e.target.value)
        }
        else if (e.target.name === 'fromDate') {
            setFromDate(e.target.value)
        }
        else if (e.target.name === 'toDate') {
            setToDate(e.target.value)
        }
    }
    



    return (
    <>
    {/* React tostify */}
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

    <div className='w-full'>
        <form method="POST">
            <div className="overflow-idden shadow sm:rounded-md">
                <div className="bg-white px-4 sm:p-3">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-1">
                            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">
                                From:
                            </label>
                            <input
                                type="date"
                                onChange={handleChange}
                                name="fromDate"
                                id="fromDate"
                                value={fromDate}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-1">
                            <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">
                                To:
                            </label>
                            <input
                                type="date"
                                onChange={handleChange}
                                name="toDate"
                                id="toDate"
                                value={toDate}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                                Contacts:
                            </label>
                            <select id="contact" name="contact" onChange={handleChange} value={contact} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option>select contact</option>
                                {dbContacts.map((item) => {
                                    return <option key={item._id} value={item.name}>{item.name}</option>
                                })}
                            </select>
                        </div>
                        <button onClick={submit} type='button' className='bg-blue-800 text-white px-10 h-10 mt-4 rounded-lg'>Update</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="md:col-span-1">
            <div className="px-4 mt-4 sm:px-0 flex">
                <h3 className="text-lg mx-auto font-black tracking-wide leading-6 text-blue-800">Contact Transaction Summary</h3>
            </div>
        </div>
        <div className="md:col-span-2">
            <form method="POST">
                <div className="overflow-hidden shadow sm:rounded-md">

                    <div className="overflow-x-auto shadow-sm">
                        <table className="w-full text-sm text-left text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Voucher No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Account
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Debit
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Credit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {/* All Vouchers */}
                                {newEntry.map((item, index) => {

                                    return <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-3">
                                            {item.journalNo}
                                        </td>
                                        <td className="px-6 py-3 text-blue-700 font-bold">
                                            {item.receivedFrom || item.paymentTo || item.paymentFrom  || item.name}
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='text-black font-semibold'>{item.account}</div>
                                            <div className='text-xs'>{item.desc}</div>
                                        </td>
                                        
                                        <td className="px-6 py-3">
                                            {!item.type && moment(item.date).format('DD-MM-YYYY')}
                                            {item.type && moment(item.date).utc().format('DD-MM-YYYY')}
                                        </td>
                                        <td className="px-6 py-3">
                                            {parseInt(item.debit).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-3">
                                            {parseInt(item.credit).toLocaleString()}
                                        </td>
                                        
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        { newEntry.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found!</h1> : ''}
                    </div>
                </div>
            </form>
        </div>
    </div>
    </>
    )
}

export async function getServerSideProps() {
    if (!mongoose.connections[0].readyState) {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI)
    }
    let dbCashReceipt = await CashReceipt.find()
    let dbCashPayment = await CashPayment.find()
    let dbBankReceipt = await BankReceipt.find()
    let dbBankPayment = await BankPayment.find()
    let dbJournalVoucher = await JournalVoucher.find()
    let dbContacts = await Contact.find()


    // Pass data to the page via props
    return {
        props: {
            dbCashReceipt: JSON.parse(JSON.stringify(dbCashReceipt)),
            dbCashPayment: JSON.parse(JSON.stringify(dbCashPayment)),
            dbBankReceipt: JSON.parse(JSON.stringify(dbBankReceipt)),
            dbBankPayment: JSON.parse(JSON.stringify(dbBankPayment)),
            dbJournalVoucher: JSON.parse(JSON.stringify(dbJournalVoucher)),
            dbContacts: JSON.parse(JSON.stringify(dbContacts)),
        }
    }
}

export default ContactTransactionSummary