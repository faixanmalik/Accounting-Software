import React, { useEffect, useState } from 'react'
import mongoose from "mongoose";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CashReceipt from 'models/CashReceipt';
import CashPayment from 'models/CashPayment';
import BankReceipt from 'models/BankReceipt';
import BankPayment from 'models/BankPayment';
import JournalVoucher from 'models/JournalVoucher';
import Charts from 'models/Charts';


const TrialBalance = ({ dbJournalVoucher, dbCashPayment, dbCashReceipt, dbBankPayment, dbBankReceipt, dbCharts }) => {

    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [dbAccount, setDbAccount] = useState(false)
    const [balance, setBalance] = useState([])



    useEffect(() => {
        balanceAmount()
    }, []);




    
    let All = [];
    let allVouchers = [];
    allVouchers = allVouchers.concat(dbJournalVoucher, dbBankPayment, dbBankReceipt, dbCashPayment, dbCashReceipt);


    dbCharts.forEach(element => {
        let dbAllEntries = [];

        if(element.accountName != 'Cash' && element.accountName != 'Bank'){


            // Data filter
            const dbAll = allVouchers.filter((data) => {

                if(data.account){
                    if (data.account === `${element.accountName}`) {
                        return data.account;
                    }
                }
                else {
                    const journal = data.inputList.filter((data)=>{
                        if (data.account === `${element.accountName}`) {
                            return data.account;
                        }
                    })
                    dbAllEntries = dbAllEntries.concat(journal);
                }
            })
            dbAllEntries = dbAllEntries.concat(dbAll);

        }
        //else if(element.accountName === 'Cash'){
        //    allVouchers = allVouchers.concat( dbCashPayment, dbCashReceipt );
        //    dbAllEntries = dbAllEntries.concat(allVouchers);
        //}
        //else if(element.accountName === 'Bank'){
        //    allVouchers = allVouchers.concat( dbBankPayment, dbBankReceipt );
        //    dbAllEntries = dbAllEntries.concat(allVouchers);
        //}

        // Date filter
        dbAllEntries.sort((a, b) => new Date(a.date) - new Date(b.date));

        All.push(dbAllEntries);
        console.log(dbAllEntries);
    });




    const balanceAmount = async()=>{

        let result = [];
        if(All.length > 0){
            const initalCreditEntry = parseInt(All[0][0].credit);
            let initialBalance = initalCreditEntry;
            
            for (let index = 0; index < All.length; index++) {

                const currentCreditEntry = parseInt(All[index][index] && All[index][index].credit);

                const currentDebitEntry = parseInt(All[index][index] && All[index][index].credit);
                
                if(index <= 0){
                    let totalBalance;
                    if(dbAccount === true){
                        totalBalance = currentCreditEntry - currentDebitEntry;
                    }
                    else if(dbAccount === false){ 
                        totalBalance = currentDebitEntry - currentCreditEntry;
                    }
                    initialBalance = totalBalance;
                    result.push(totalBalance)
                }
                else{
                    let totalBalance;
                    if(dbAccount === true){
                        totalBalance = initialBalance + currentCreditEntry - currentDebitEntry;
                    }
                    else if(dbAccount === false){
                        totalBalance = initialBalance + currentDebitEntry - currentCreditEntry;
                    }
                    
                    initialBalance = totalBalance;
                    result.push(totalBalance);
                }
            }
            setBalance(result)
            //console.log(result);
        }
    }



    const handleChange = (e) => {
        if (e.target.name === 'fromDate') {
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
                        <button type='button' className='bg-blue-800 text-white px-10 h-10 mt-4 rounded-lg'>Update</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="md:col-span-1">
            <div className="px-4 mt-4 sm:px-0 flex">
                <h3 className="text-lg mx-auto font-black tracking-wide leading-6 text-blue-800">Trial Balance Summary</h3>
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
                                        Debit
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Credit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {/* All Vouchers */}
                                {dbCharts.map((item,index) => {

                                    return <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-3">
                                            <div className='text-black font-semibold'>{item.accountName}</div>
                                        </td>
                                        <td className="px-6 py-3 text-blue-700 font-bold">
                                            {dbAccount === false && "false"}

                                            {/*{dbAccount === false && balance[index] && balance[index].toLocaleString()}*/}
                                        </td>
                                        <td className="px-6 py-3 text-blue-700 font-bold">
                                            {dbAccount === true && "truee"}

                                            {/*{dbAccount === true && balance[index] && balance[index].toLocaleString()}*/}
                                        </td>
                                    </tr>
                                })}
                                {/*{dbAllEntries.map((item,index) => {

                                    if(dbAllEntries.length - 1 === index){
                                    return <tr key={item.journalNo} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-3">
                                            <div className='text-black font-semibold'>{account}</div>
                                        </td>
                                        <td className="px-6 py-3 text-blue-700 font-bold">
                                            {dbAccount === false && balance[index] && balance[index].toLocaleString()}
                                        </td>
                                        <td className="px-6 py-3 text-blue-700 font-bold">
                                            {dbAccount === true && balance[index] && balance[index].toLocaleString()}
                                        </td>
                                    </tr>}
                                })}*/}
                            </tbody>
                        </table>
                        {/*{ dbAllEntries.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found!</h1> : ''}*/}
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

export default TrialBalance