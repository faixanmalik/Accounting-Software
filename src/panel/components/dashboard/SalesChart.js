import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";
import moment from 'moment/moment';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesChart = ({dbCharts, dbJournalVoucher, dbBankPayment, dbBankReceipt, dbCashPayment, dbCashReceipt}) => {


  const [monthlyGrossProfit, setMonthlyGrossProfit] = useState([])
  const [monthlySales, setMonthlySales] = useState([])


  useEffect(() => {
    junFunction()
    .then(() => febFunction())
    .then(() => marFunction())
    .then(() => aprilFunction())
    .then(() => mayFunction())
    .then(() => juneFunction())
    .then(() => julyFunction())
    .then(() => augFunction())
    .then(() => sepFunction())
    .then(() => octFunction())
    .then(() => novFunction())
    .then(() => decFunction())
  }, [])



  const junFunction = async()=>{
    let fromDate = '2023-01-01';
    let toDate = '2023-01-31';
    submit(fromDate, toDate)
  }
  const marFunction = async()=>{
    let fromDate = '2023-03-01';
    let toDate = '2023-03-31';
    submit(fromDate, toDate)
  }
  
  const febFunction = async()=>{
    let fromDate = '2023-02-01';
    let toDate = '2023-02-31';
    submit(fromDate, toDate)
  }
  
  const aprilFunction = async()=>{
    let fromDate = '2023-04-01';
    let toDate = '2023-04-31';
    submit(fromDate, toDate)
  }
  const mayFunction = async()=>{
    let fromDate = '2023-05-01';
    let toDate = '2023-05-31';
    submit(fromDate, toDate)
  }
  const juneFunction = async()=>{
    let fromDate = '2023-06-01';
    let toDate = '2023-06-31';
    submit(fromDate, toDate)
  }
  const julyFunction = async()=>{
    let fromDate = '2023-07-01';
    let toDate = '2023-07-31';
    submit(fromDate, toDate)
  }
  const augFunction = async()=>{
    let fromDate = '2023-08-01';
    let toDate = '2023-08-31';
    submit(fromDate, toDate)
  }
  const sepFunction = async()=>{
    let fromDate = '2023-09-01';
    let toDate = '2023-09-31';
    submit(fromDate, toDate)
  }
  const octFunction = async()=>{
    let fromDate = '2023-10-01';
    let toDate = '2023-10-31';
    submit(fromDate, toDate)
  }
  const novFunction = async()=>{
    let fromDate = '2023-11-01';
    let toDate = '2023-11-31';
    submit(fromDate, toDate)
  }
  const decFunction = async()=>{
    let fromDate = '2023-12-01';
    let toDate = '2023-12-31';
    submit(fromDate, toDate);
    monthly(monthlyGp);
  }

  let monthlyGp = [];
  let monthlySale = []
  const submit = (fromDate, toDate)=>{
    let balance = [];
    
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
                    let totalBalance = 0;

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

    
    let salesArray = [];
    let costOfGoodsSoldArray = [];
    
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
    })

    // individual Calculate
    let salesSum = 0;
    salesArray.forEach(element => {
        salesSum += parseInt(element)
    });

    let costOfGoodsSoldSum = 0;
    costOfGoodsSoldArray.forEach(element => {
        costOfGoodsSoldSum += parseInt(element)
    });

    // Total calculate
    var gp = parseInt(salesSum) - parseInt(costOfGoodsSoldSum);
    var sale = Math.abs(parseInt(salesSum))


    }
    monthlyGp.push(gp)
    monthlySale.push(sale)
    }

    const monthly = (monthlyGp)=>{
      setMonthlyGrossProfit(monthlyGp)
      setMonthlySales(monthlySale)
    }

  const chartoptions = {
    series: [
      {
        name: "Sale",
        data: monthlySales,
      },
      {
        name: "Gross Profit",
        data: monthlyGrossProfit,
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
        borderColor: "rgba(0,0,0,0.1)",
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Sales Report
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        />
      </CardBody>
    </Card>
  );
};

export default SalesChart;