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


const GeneralLedger = ({ dbJournalVoucher, dbCashPayment, dbCashReceipt, dbBankPayment, dbBankReceipt, dbCharts }) => {



    



    // Cash Receipt
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('') 
    const [sortBy, setsortBy] = useState('')
    const [account, setAccount] = useState('')
    const [dbAccount, setDbAccount] = useState(false)



    


    useEffect(() => {
        const dbchart = dbCharts.filter((data) => {
            if (data.accountName === `${account}`) {
                return data.account;
            }
        })
        
        if(!dbchart.length == 0){
            if(dbchart[0].account === 'Incomes' || dbchart[0].account === 'Equity' || dbchart[0].account === 'Liabilities'){
                setDbAccount(true)
            }
            else{
                setDbAccount(false)
            }
        }
    }, [account])




    let dbAllEntries = [];
    let allVouchers = [];

    if(account != 'Cash' && account != 'Bank' ){
        
        allVouchers = allVouchers.concat(dbJournalVoucher, dbBankPayment, dbBankReceipt, dbCashPayment, dbCashReceipt);

        const dbAll = allVouchers.filter((data) => {
            if(data.account){
                if (data.account === `${account}`) {
                    return data.account;
                }
            }
            else {
                const journal = data.inputList.filter((data)=>{
                    if (data.account === `${account}`) {
                        return data.account;
                    }
                })
                dbAllEntries = dbAllEntries.concat(journal);
            }
        })
        dbAllEntries = dbAllEntries.concat(dbAll);
    }



    
    const handleChange = (e) => {
        if (e.target.name === 'sortBy') {
            setsortBy(e.target.value)
        }
        else if (e.target.name === 'account') {
            setAccount(e.target.value)
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
                <div className="bg-white px-4 sm:p-5">
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
                            <label htmlFor="account" className="block text-sm font-medium text-gray-700">
                                Account:
                            </label>
                            <select id="account" name="account" onChange={handleChange} value={account} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option>select</option>
                                {dbCharts.map((item) => {
                                    return <option key={item._id} value={item.accountName}>{item.accountCode} - {item.accountName}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-span-6 sm:col-span-1">
                            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
                                Sort by:
                            </label>
                            <select id="sortBy" name="sortBy" onChange={handleChange} value={sortBy} className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option>select</option>
                                <option value={'Account Name'}>Account Name</option>
                                <option value={'Account Code'}>Account Code</option>
                            </select>
                        </div>
                        <button className='bg-blue-800 text-white px-10 h-10 mt-4 rounded-lg'>Update</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="md:col-span-1">
            <div className="px-4 mt-10 sm:px-0 flex">
                <h3 className="text-lg mx-auto font-bold leading-6 text-blue-800">General Ledger Summary</h3>
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
                                        Account
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Voucher No
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
                                    <th scope="col" className="px-6 py-3">
                                        Balance
                                    </th>
                                </tr>
                            </thead>
                            <tbody>


                                {/* Cash Entries */}
                                {account === 'Cash' ? dbCashReceipt.map((item) => {
                                    return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-3">
                                            {item.account}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.journalNo}
                                        </td>
                                        <td className="px-6 py-3">
                                            {moment(item.date).utc().format('DD-MM-YYYY')}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.debit}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.credit}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.balance}
                                        </td>
                                    </tr>
                                }) : "" }
                                {account === 'Cash' ? dbCashPayment.map((item) => {
                                    return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">

                                        <td className="px-6 py-3">
                                            {item.account}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.journalNo}
                                        </td>
                                        <td className="px-6 py-3">
                                            {moment(item.date).utc().format('DD-MM-YYYY')}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.debit}
                                        </td>
                                        <td className="px-6 py-3">
                                             {item.credit}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.balance}
                                        </td>
                                    </tr>
                                }) : "" }


                                {/* Bank Entries */}
                                {account === 'Bank' ? dbBankReceipt.map((item) => {
                                    return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">

                                        <td className="px-6 py-3">
                                            {item.account}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.journalNo}
                                        </td>
                                        <td className="px-6 py-3">
                                            {moment(item.date).utc().format('DD-MM-YYYY')}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.debit}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.credit}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.balance}
                                        </td>
                                    </tr>
                                }) : "" }
                                {account === 'Bank' ? dbBankPayment.map((item) => {
                                    return <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-3">
                                            {item.account}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.journalNo}
                                        </td>
                                        <td className="px-6 py-3">
                                            {moment(item.date).utc().format('DD-MM-YYYY')}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.debit}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.credit}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.balance}
                                        </td>
                                    </tr>
                                }) : "" }




                                {/* All Vouchers */}
                                {dbAllEntries.map((item) => {
                                    return <tr key={item.journalNo} className="bg-white border-b hover:bg-gray-50">

                                        <td className="px-6 py-3">
                                            <div>{item.account}</div>
                                            <div>{item.desc}</div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div>{item.journalNo}</div>
                                        </td>
                                        <td className="px-6 py-3">
                                            {moment(item.date).utc().format('DD-MM-YYYY')}
                                        </td>



                                        {/* Currently  */}
                                        <td className="px-6 py-3">
                                            {item.amount ? item.journalNo === 'CRV-1' ? item.amount : 0  : item.debit}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.amount ? item.journalNo === 'CRV-1' ? 0 : item.amount : item.credit}
                                        </td>
                                        <td className="px-6 py-3">

                                            {dbAccount === true ?    item.credit-item.debit   :   item.debit-item.credit}
                                            
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                        {/*{ dbJournalVoucher.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found</h1> : ''}*/}
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
    let dbCharts = await Charts.find()


    // Pass data to the page via props
    return {
        props: {
            dbCashReceipt: JSON.parse(JSON.stringify(dbCashReceipt)),
            dbCashPayment: JSON.parse(JSON.stringify(dbCashPayment)),
            dbBankReceipt: JSON.parse(JSON.stringify(dbBankReceipt)),
            dbBankPayment: JSON.parse(JSON.stringify(dbBankPayment)),
            dbJournalVoucher: JSON.parse(JSON.stringify(dbJournalVoucher)),
            dbCharts: JSON.parse(JSON.stringify(dbCharts)),
        }
    }
}

export default GeneralLedger