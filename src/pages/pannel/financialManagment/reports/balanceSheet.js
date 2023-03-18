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


const BalanceSheet = ({ dbJournalVoucher, dbCashPayment, dbCashReceipt, dbBankPayment, dbBankReceipt, dbCharts, name }) => {


    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [newBalance, setNewBalance] = useState([])
    const [charts, setCharts] = useState([])

    const [totalAssets, setTotalAssets] = useState(0);
    const [totalEquity, setTotalEquity] = useState(0)
    const [totalLiabilities, setTotalLiabilities] = useState(0)
    const [totalEquityAndLiabilities, setTotalEquityAndLiabilities] = useState(0)

    const [profitBeforeTax, setProfitBeforeTax] = useState(0)
    
    const [fDate, setFDate] = useState('')
    const [tDate, setTDate] = useState('')
    

    useEffect(() => {
      submit()
    }, [])
    


    let balance = [];
    const submit = ()=>{
        if(fromDate && toDate){
            setFDate(moment(fromDate).format('D MMM YYYY'))
            setTDate(moment(toDate).format('D MMM YYYY'))
        }


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
        setCharts(dbCharts)
        ProfitLossBalance()
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

        // thats for balance sheet balance entries
        let fixedAssetsArray = [];
        let currentAssetsArray = [];
        let equityArray = [];
        let nonCurrentLiabilitiesArray = [];
        let currentLiabilitiesArray = [];


        // thats for profit from profit and loss statement
        let administrationArray = [];
        let salesArray = [];
        let costOfGoodsSoldArray = [];
        let distributionExpensesArray = [];
        let financeCostArray = [];



        {dbCharts.map((item,index) => {
            // thats for calculating cureent balance sheet balance
            if(item.subAccount === 'Fixed Assets'){
                let fixedAssets = balance[index] && balance[index][balance[index].length-1]
                if(fixedAssets){
                    fixedAssetsArray.push(fixedAssets)
                }
                else{
                    fixedAssetsArray.push(0)
                }
            }
            else if(item.subAccount === 'Current Assets'){
                let currentAssets = balance[index] && balance[index][balance[index].length-1]
                if(currentAssets){
                    currentAssetsArray.push(currentAssets)
                }
                else{
                    currentAssetsArray.push(0)
                }
            }
            else if(item.subAccount === 'Equity'){
                let equity = balance[index] && balance[index][balance[index].length-1]
                if(equity){
                    equityArray.push(equity)
                }
                else{
                    equityArray.push(0)
                }
            }
            else if(item.subAccount === 'Non-Current Liability'){
                let nonCurrentLiabilities = balance[index] && balance[index][balance[index].length-1]
                if(nonCurrentLiabilities){
                    nonCurrentLiabilitiesArray.push(nonCurrentLiabilities)
                }
                else{
                    nonCurrentLiabilitiesArray.push(0)
                }
            }
            else if(item.subAccount === 'Current Liability'){
                let currentLiabilities = balance[index] && balance[index][balance[index].length-1]
                if(currentLiabilities){
                    currentLiabilitiesArray.push(currentLiabilities)
                }
                else{
                    currentLiabilitiesArray.push(0)
                }
            }


            // thats for calculating previous balance
            else if(item.subAccount === 'Revenue'){
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


        // thats for calculating current balancesheet balance
        let fixedAssetsSum = 0;
        fixedAssetsArray.forEach(element => {
            fixedAssetsSum += parseInt(element)
        });

        let currentAssetsSum = 0;
        currentAssetsArray.forEach(element => {
            currentAssetsSum += parseInt(element)
        });

        let equitySum = 0;
        equityArray.forEach(element => {
            equitySum += parseInt(element)
        });


        let nonCurrentLiabilitiesSum = 0;
        nonCurrentLiabilitiesArray.forEach(element => {
            nonCurrentLiabilitiesSum += parseInt(element)
        });


        let currentLiabilities = 0;
        currentLiabilitiesArray.forEach(element => {
            currentLiabilities += parseInt(element)
        });



        // thats for calculating previous balance
        let salesSum = 0;
        salesArray.forEach(element => {
            salesSum += parseInt(element)
        });

        let costOfGoodsSoldSum = 0;
        costOfGoodsSoldArray.forEach(element => {
            costOfGoodsSoldSum += parseInt(element)
        });

        let administrationSum = 0;
        administrationArray.forEach(element => {
            administrationSum += parseInt(element)
        });


        let distributionSum = 0;
        distributionExpensesArray.forEach(element => {
            distributionSum += parseInt(element)
        });


        let financeCostSum = 0;
        financeCostArray.forEach(element => {
            financeCostSum += parseInt(element)
        });


        // calculate Total profit 
        
        let next = (parseInt(salesSum) - parseInt(costOfGoodsSoldSum)) -
        (parseInt(administrationSum) + parseInt(distributionSum)) - parseInt(financeCostSum)
        setProfitBeforeTax(next)


        // // calculate current Total entries 
        setTotalAssets(parseInt(fixedAssetsSum) + parseInt(currentAssetsSum))

        let totalEquity = next + parseInt(Math.abs(equitySum));
        setTotalEquity(totalEquity);
        setTotalLiabilities( parseInt(Math.abs(nonCurrentLiabilitiesSum)) + parseInt(Math.abs(currentLiabilities)) )

        setTotalEquityAndLiabilities( parseInt(Math.abs(totalEquity)) + (parseInt(Math.abs(nonCurrentLiabilitiesSum)) + parseInt(Math.abs(currentLiabilities)) ) )




        
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
                <h3 className="text-lg mx-auto font-black tracking-wide leading-6 text-blue-800">
                    Balance Sheet Summary
                    {fDate && tDate &&
                        <span className='text-sm ml-1'>({fDate} to {tDate})</span>
                    }
                </h3>
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
                            {/*{newBalance.length != 0 &&  dbCharts.map((item,index) => {*/}
                            {dbCharts.map((item,index) => {
                                // Array sorting with nameOrder order
                                let nameOrder = ['Fixed Assets', 'Current Assets', 'Equity', 'Non-Current Liability', 'Current Liability']; 

                                dbCharts.sort((a, b) => {
                                    const aIndex = nameOrder.indexOf(a.subAccount);
                                    const bIndex = nameOrder.indexOf(b.subAccount);
                                    if (aIndex === -1 || bIndex === -1) {
                                      return 0; // fallback to no sorting
                                    }
                                    return aIndex - bIndex;
                                  });

                                  


                                  const equityIndex = dbCharts.findIndex((obj) => obj.subAccount === 'Equity');
                                  const nonCurrentLiabilitiesIndex = dbCharts.findIndex((obj) => obj.subAccount === 'Non-Current Liability');
                                  

                                  let lastIndex = -1;

                                    for (let i = dbCharts.length - 1; i >= 0; i--) {
                                    if (dbCharts[i].subAccount === 'Current Liability') {
                                        lastIndex = i;
                                        break;
                                    }
                                    }


                                
                            if(item.subAccount === 'Fixed Assets' 
                            || item.subAccount === 'Current Assets' 
                            ||item.subAccount === 'Equity' 
                            ||item.subAccount === 'Non-Current Liability' 
                            ||item.subAccount === 'Current Liability' ){
                            return <tbody key={index}>
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-3 font-semibold">
                                        {item.accountName}
                                    </td>
                                    <td className="px-6 py-3 text-black font-semibold">
                                        {item.subAccount}
                                    </td>
                                    {item.accountName === 'Profit for the year' ? <td className="px-6 py-3 text-blue-700 font-bold">
                                        {profitBeforeTax.toLocaleString()}
                                    </td>:
                                    <td className="px-6 py-3 text-blue-700 font-bold">
                                        {newBalance[index] && newBalance[index][newBalance[index].length-1] && Math.abs(newBalance[index][newBalance[index].length-1]).toLocaleString()}
                                    </td>}

                                </tr>

                            
                                {index === equityIndex - 1
                                ? <tr className="flex float-right -mr-96 bg-slate-100 px-4 py-3 sm:px-6">
                                    <td className={`text-sm ${totalAssets > 0 ? 'text-green-700' : 'text-red-700' } -mr-32`}>Total Assets:
                                        <span className='font-bold ml-1'>${ totalAssets.toLocaleString() }</span>
                                    </td>
                                </tr>: ''}


                                {index === nonCurrentLiabilitiesIndex - 1
                                ? <tr className="flex float-right -mr-96 bg-slate-100 px-4 py-3 sm:px-6">
                                    <td className={`text-sm ${totalEquity > 0 ? 'text-green-700' : 'text-red-700' } -mr-32`}>Total Equity:
                                        <span className='font-bold ml-1'>${ totalEquity.toLocaleString() }</span>
                                    </td>
                                </tr>: ''}


                                {index === lastIndex
                                ? <tr className="flex float-right -mr-96 bg-slate-100 px-4 py-3 sm:px-6">
                                    <td className={`text-sm ${totalLiabilities > 0 ? 'text-red-700' : 'text-green-700' } -mr-32`}>Total Liabilities:
                                        <span className='font-bold ml-1'>${ totalLiabilities.toLocaleString() }</span>
                                    </td>
                                </tr>: ''}
                            </tbody>
                            }})}
                        </table>


                            {charts.length != 0 ? <div className="flex justify-around border-t-2 border-slate-200 pt-5 bg-slate-100 p-4 text-right sm:px-6">
                                <h1 className={`text-sm ${totalAssets === totalEquityAndLiabilities ? 'text-green-700' : 'text-red-700'} ml-auto mr-32`}>Total Assets: 
                                    <span className={`font-bold ml-1 `}>${totalAssets.toLocaleString()}</span>
                                </h1>
                                <h1 className={`text-sm ${totalAssets === totalEquityAndLiabilities ? 'text-green-700' : 'text-red-700'} mr-10`}>Total Equity & Liabilities: 
                                    <span className='font-bold ml-1'>${totalEquityAndLiabilities.toLocaleString()}</span>
                                </h1>
                            </div>: ''}
                        { charts.length === 0  ? <h1 className='text-red-600 text-center text-base my-3'>No data found!</h1> : ''}
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

export default BalanceSheet