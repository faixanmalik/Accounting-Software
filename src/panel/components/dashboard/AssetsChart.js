import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";
import moment from 'moment/moment';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AssetsChart = ({dbCharts, dbJournalVoucher, dbBankPayment, dbBankReceipt, dbCashPayment, dbCashReceipt}) => {


  const [monthlyAssets, setMonthlyAssets] = useState([])
  const [monthlyLiabilities, setMonthlyLiabilities] = useState([])


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

  const febFunction = async()=>{
    let fromDate = '2023-02-01';
    let toDate = '2023-02-28';
    submit(fromDate, toDate)
  }

  const marFunction = async()=>{
    let fromDate = '2023-03-01';
    let toDate = '2023-03-31';
    submit(fromDate, toDate)
  }
  
  const aprilFunction = async()=>{
    let fromDate = '2023-04-01';
    let toDate = '2023-04-30';
    submit(fromDate, toDate)
  }
  const mayFunction = async()=>{
    let fromDate = '2023-05-01';
    let toDate = '2023-05-31';
    submit(fromDate, toDate)
  }
  const juneFunction = async()=>{
    let fromDate = '2023-06-01';
    let toDate = '2023-06-30';
    submit(fromDate, toDate)
  }
  const julyFunction = async()=>{
    let fromDate = '2023-07-01';
    let toDate = '2023-07-31';
    submit(fromDate, toDate)
  }
  const augFunction = async()=>{
    let fromDate = '2023-08-01';
    let toDate = '2023-08-30';
    submit(fromDate, toDate)
  }
  const sepFunction = async()=>{
    let fromDate = '2023-09-01';
    let toDate = '2023-09-31';
    submit(fromDate, toDate)
  }
  const octFunction = async()=>{
    let fromDate = '2023-10-01';
    let toDate = '2023-10-30';
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
    monthly(monthlyAssts);
  }
  


  let monthlyAssts = [];
  let monthlyLiabilits = []
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

    
    let currentAssetsArray = [];
    let currentLiabilitiesArray = [];
    
    {dbCharts.map((item,index) => {
        if(item.subAccount === 'Current Assets'){
          let currentAssets = balance[index] && balance[index][balance[index].length-1]
          if(currentAssets){
            currentAssetsArray.push(currentAssets)
          }
          else{
            currentAssetsArray.push(0)
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
    })

    // individual Calculate
    let currentAssetsSum = 0;
    currentAssetsArray.forEach(element => {
        currentAssetsSum += parseInt(element)
    });

    let currentLiabilities = 0;
    currentLiabilitiesArray.forEach(element => {
        currentLiabilities += parseInt(element)
    });

    // Total calculate
    var currentAssets = parseInt(currentAssetsSum)
    var currentLiabilities = Math.abs(parseInt(currentLiabilities))


    }
    monthlyAssts.push(currentAssets)
    monthlyLiabilits.push(currentLiabilities)
    }

    const monthly = (monthlyAssts)=>{
      setMonthlyAssets(monthlyAssts)
      setMonthlyLiabilities(monthlyLiabilits)
    }

  const chartoptions = {
    series: [
      {
        name: "Current-Assets",
        data: monthlyAssets,
      },
      {
        name: "Current-Liabilities",
        data: monthlyLiabilities,
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
    <>
    <Card>
      <CardBody>
        <CardTitle tag="h5" className='font-semibold'>Assets Summary</CardTitle>
        <CardSubtitle className="text-muted font-medium" tag="h6">
          Yearly Assets Report
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="270"
          options={chartoptions.options}
          series={chartoptions.series}
        />
      </CardBody>
    </Card>
    </>
  );
};

export default AssetsChart;