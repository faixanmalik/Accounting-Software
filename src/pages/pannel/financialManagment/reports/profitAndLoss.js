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
import moment from 'moment';


const ProfitAndLoss = ({ dbJournalVoucher, dbCashPayment, dbCashReceipt, dbBankPayment, dbBankReceipt, dbCharts, name }) => {


    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [newBalance, setNewBalance] = useState([])

    const [grossProfit, setGrossProfit] = useState(0);
    const [profitFromOperations, setProfitFromOperations] = useState(0)
    const [profitBeforeTax, setProfitBeforeTax] = useState(0)
    




    useEffect(() => {
        submit()
        ProfitLossBalance()

    }, [])
    

    
    let balance = [];
    const submit = ()=>{
        dbCharts.forEach(element => {

            let dbAllEntries = [];
            let allVouchers = [];
            
            if(element.accountName != 'Cash' && element.accountName != 'Bank'){
                allVouchers = allVouchers.concat(dbJournalVoucher, dbBankPayment, dbBankReceipt, dbCashPayment, dbCashReceipt);
            
                const dbAll = allVouchers.filter((data) => {


                    if(data.type === 'CPV' || data.type === 'CRV' || data.type === 'BPV' || data.type === 'BRV'){
                        if (data.account === `${element.accountName}`) {
                            if(fromDate && toDate){
                                const dbDate = moment(data.date).format('YYYY-MM-DD')
                                return dbDate >= fromDate && dbDate <= toDate;
                            }
                            else{
                                return data.account;
                            }
                        }
                    }
                    else {
                        const journal = data.inputList.filter((data)=>{
                            if (data.account === `${element.accountName}`) {
                                if(fromDate && toDate){
                                    const dbDate = moment(data.date).format('YYYY-MM-DD')
                                    return dbDate >= fromDate && dbDate <= toDate;
                                }
                                else{
                                    return data.account;
                                }
                            }
                        })
                        dbAllEntries = dbAllEntries.concat(journal);
                    }
                })
                dbAllEntries = dbAllEntries.concat(dbAll);
            }
            else if(element.accountName === 'Cash'){
                allVouchers = allVouchers.concat( dbCashPayment, dbCashReceipt );
                const newCash = allVouchers.filter((data)=>{

                    if(fromDate && toDate){
                        const dbDate = moment(data.date).format('YYYY-MM-DD')
                        return dbDate >= fromDate && dbDate <= toDate;
                    }
                    else{
                        return data.account;
                    }
                })
                dbAllEntries = dbAllEntries.concat(newCash);
            }
            else if(element.accountName === 'Bank'){
                allVouchers = allVouchers.concat( dbBankPayment, dbBankReceipt );
                const newBank = allVouchers.filter((data)=>{
                    if(fromDate && toDate){
                        const dbDate = moment(data.date).format('YYYY-MM-DD')
                        return dbDate >= fromDate && dbDate <= toDate;
                    }
                    else{
                        return data.account;
                    }
                })
                dbAllEntries = dbAllEntries.concat(newBank);
            }

            // Date filter
            dbAllEntries.sort((a, b) => new Date(a.date) - new Date(b.date));


            dbAllEntries.forEach(item => {
                if(element.accountName != 'Cash' && element.accountName != 'Bank'){
                    if(item.type === 'CPV' || item.type === 'BPV'){
                        item.debit = item.amount;
                        item.credit = 0;
                    }
                }
                else{
                    if(item.type === 'CPV' || item.type === 'BPV'){
                        item.credit = item.amount;
                        item.debit = 0;
                    }
                }
            });


       
            // Balance
            let result = [];
            if(dbAllEntries.length > 0){
                const initalCreditEntry = parseInt(dbAllEntries[0].credit);
                let initialBalance = initalCreditEntry;
                
                for (let index = 0; index < dbAllEntries.length; index++) {

                    const currentCreditEntry = parseInt(dbAllEntries[index].credit);
                    const currentDebitEntry = parseInt(dbAllEntries[index].debit);
                    
                    if(index <= 0){
                        let totalBalance;

                        if(element.account === 'Incomes' || element.account === 'Equity' || element.account === 'Liabilities'){
                            totalBalance = currentCreditEntry - currentDebitEntry;
                        }
                        else{ 
                            totalBalance = currentDebitEntry - currentCreditEntry;
                        }

                        initialBalance = totalBalance;
                        result.push(totalBalance)
                    }
                    else{
                        let totalBalance;
                        if(element.account === 'Incomes' || element.account === 'Equity' || element.account === 'Liabilities'){
                            totalBalance = initialBalance + currentCreditEntry - currentDebitEntry;
                        }
                        else{
                            totalBalance = initialBalance + currentDebitEntry - currentCreditEntry;
                        }
                        
                        initialBalance = totalBalance;
                        result.push(totalBalance);
                    }
                }
            }
            balance.push(result);
        });
        
        setNewBalance(balance)
        
    }



    const handleChange = (e) => {
        if (e.target.name === 'fromDate') {
            setFromDate(e.target.value)
        }
        else if (e.target.name === 'toDate') {
            setToDate(e.target.value)
        }
    }

    
    
    const ProfitLossBalance = async()=>{

        let administrationArray = [];
        let salesArray = [];
        let costOfGoodsSoldArray = [];
        let distributionExpensesArray = [];
        let financeCostArray = [];


        {dbCharts.map((item,index) => {
            
            if(item.subAccount === 'Revenue'){
                let sales = balance[index] && balance[index][balance[index].length-1]
                if(sales){
                    salesArray.push(sales)
                }
                else{
                    salesArray.push(0)
                }
            }
            else if(item.subAccount === 'Cost of sales'){
                let costOfGoodsSold = balance[index] && balance[index][balance[index].length-1]
                if(costOfGoodsSold){
                    costOfGoodsSoldArray.push(costOfGoodsSold)
                }
                else{
                    costOfGoodsSoldArray.push(0)
                }
            }
            else if(item.subAccount === 'Administration Expenses'){
                let administrationExpenses = balance[index] && balance[index][balance[index].length-1]
                if(administrationExpenses){
                    administrationArray.push(administrationExpenses)
                }
                else{
                    administrationArray.push(0)
                }
            }
            else if(item.subAccount === 'Distribution Expenses'){
                let distributionExpenses = balance[index] && balance[index][balance[index].length-1]
                if(distributionExpenses){
                    distributionExpensesArray.push(distributionExpenses)
                }
                else{
                    distributionExpensesArray.push(0)
                }
            }
            else if(item.subAccount === 'Finance Cost'){
                let financeCost = balance[index] && balance[index][balance[index].length-1]
                if(financeCost){
                    financeCostArray.push(financeCost)
                }
                else{
                    financeCostArray.push(0)
                }
            }
        })


        setGrossProfit(parseInt(salesArray) - parseInt(costOfGoodsSoldArray))

        let Expenses =  parseInt(administrationArray) + parseInt(distributionExpensesArray)
        setProfitFromOperations(grossProfit - Expenses)

        setProfitBeforeTax(profitFromOperations - parseInt(financeCostArray))
    }}


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
                        <button onClick={submit} type='button' className='bg-blue-800 text-white px-10 h-10 mt-4 rounded-lg'>Update</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="md:col-span-1">
            <div className="px-4 mt-4 sm:px-0 flex">
                <h3 className="text-lg mx-auto font-black tracking-wide leading-6 text-blue-800">Profit & Loss Summary</h3>
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
                                        Account Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Account
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount
                                    </th>
                                </tr>
                            </thead>


                            
                            {/* All Vouchers */}
                            {dbCharts.map((item,index) => {

                            // Array sorting with nameOrder order
                            const nameOrder = ['Revenue', 'Cost of sales', 'Administration Expenses', 'Distribution Expenses', 'Finance Cost']; 
                            dbCharts.sort((a, b) => nameOrder.indexOf(a.subAccount) - nameOrder.indexOf(b.subAccount));


                            if(item.subAccount === 'Revenue' || item.subAccount === 'Cost of sales' ||item.subAccount === 'Administration Expenses' ||item.subAccount === 'Distribution Expenses' ||item.subAccount === 'Finance Cost' ){
                            return <tbody key={index}>
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-3">
                                        <div className='font-semibold'>{item.accountName}</div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className='text-black font-semibold'>{item.subAccount}</div>
                                    </td>
                                    <td className="px-6 py-3 text-blue-700 font-bold">
                                        {newBalance[index] && newBalance[index][newBalance[index].length-1] && Math.abs(newBalance[index][newBalance[index].length-1]).toLocaleString()}
                                    </td>
                                </tr>

                            
                                {item.subAccount === 'Cost of sales'
                                ? <tr className="flex float-right -mr-96 bg-slate-100 px-4 py-3 sm:px-6">
                                    <td className={`text-sm ${grossProfit > 0 ? 'text-green-700' : 'text-red-700' } -mr-32`}>Gross {grossProfit > 0 ? 'Profit' : 'loss'};
                                        <span className='font-bold ml-1'>${ grossProfit }</span>
                                    </td>
                                </tr>: ''}


                                {item.subAccount === 'Distribution Expenses'
                                ? <tr className="flex float-right -mr-96 bg-slate-100 px-4 py-3 sm:px-6">
                                    <td className={`text-sm ${profitFromOperations > 0 ? 'text-green-700' : 'text-red-700' } -mr-32`}>{profitFromOperations > 0 ? 'Profit' : 'loss'} From Operations:
                                        <span className='font-bold ml-1'>${ profitFromOperations }</span>
                                    </td>
                                </tr>: ''}


                                {item.subAccount === 'Finance Cost'
                                ? <tr className="flex float-right -mr-96 bg-slate-100 px-4 py-3 sm:px-6">
                                    <td className={`text-sm ${profitBeforeTax > 0 ? 'text-green-700' : 'text-red-700' } -mr-32`}>{profitBeforeTax > 0 ? 'Profit' : 'loss'} Before Tax:
                                        <span className='font-bold ml-1'>${ profitBeforeTax }</span>
                                    </td>
                                </tr>: ''}

                            </tbody>
                            }})}



                            {/*{profitFromOperEntry.map((item,index) => {


                                let firstEntry= 0;
                                if(profitFromOperEntry.length - 1 === index){
                                    if(newBalance[index]){
                                        let fEntry = newBalance[index][newBalance[index].length-1];
                                        if(fEntry === undefined){
                                            firstEntry += 0;
                                        }
                                        else{
                                            firstEntry += fEntry;
                                        }
                                    }
                                }


                                let secondEntry = 0;
                                if(newBalance[1]){
                                    let sEntry = newBalance[1][newBalance[1].length-1];
                                    if(sEntry === undefined){
                                        secondEntry += 0;
                                    }
                                    else{
                                        secondEntry += sEntry;
                                    }
                                }


                                return <tbody key={index}>

                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-3">
                                        <div className='font-semibold'>{item.accountName}</div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className='text-black font-semibold'>{item.subAccount}</div>
                                    </td>
                                    <td className="px-6 py-3 text-blue-700 font-bold">
                                        {newBalance[index] && newBalance[index][newBalance[index].length-1] && Math.abs(newBalance[index][newBalance[index].length-1]).toLocaleString()}
                                    </td>
                                </tr>

                            
                                {profitFromOperEntry.length-1 === index ? <tr className="flex -mr-96 float-right bg-slate-100 px-4 py-3 sm:px-6">
                                    <h1 className='text-sm text-green-700 -mr-32'>Profit From Operations:
                                        <span className='font-bold ml-1'>${ firstEntry - secondEntry }</span>
                                    </h1>
                                </tr>: ''}
                                    
                            </tbody>})}




                            {profitBeforeTaxEntry.map((item,index) => {

                                let firstEntry= 0;
                                if(newBalance[0]){
                                    let fEntry = newBalance[0][newBalance[0].length-1];
                                    if(fEntry === undefined){
                                        firstEntry += 0;
                                    }
                                    else{
                                        firstEntry += fEntry;
                                    }
                                }

                                let secondEntry = 0;
                                if(newBalance[1]){
                                    let sEntry = newBalance[1][newBalance[1].length-1];
                                    if(sEntry === undefined){
                                        secondEntry += 0;
                                    }
                                    else{
                                        secondEntry += sEntry;
                                    }
                                }

                            return <tbody key={index}>

                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-3">
                                        <div className='font-semibold'>{item.accountName}</div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className='text-black font-semibold'>{item.subAccount}</div>
                                    </td>
                                    <td className="px-6 py-3 text-blue-700 font-bold">
                                        {newBalance[index] && newBalance[index][newBalance[index].length-1] && Math.abs(newBalance[index][newBalance[index].length-1]).toLocaleString()}
                                    </td>
                                </tr>

                            
                                {profitBeforeTaxEntry.length-1 === index ? <tr className="flex -mr-96 float-right bg-slate-100 px-4 py-3 sm:px-6">
                                    <h1 className='text-sm text-green-700 -mr-32'>Profit Before Tax:
                                        <span className='font-bold ml-1'>${ firstEntry - secondEntry }</span>
                                    </h1>
                                </tr>: ''}
                                    
                            </tbody>})}*/}



                        </table>

                        { dbCharts.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found!</h1> : ''}
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

export default ProfitAndLoss