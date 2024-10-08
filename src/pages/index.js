import Head from "next/head";
import mongoose from "mongoose";
import Product from '../../models/Product';
import Contact from "../../models/Contact";
import Charts from "models/Charts";
import CashReceipt from "models/CashReceipt";
import CashPayment from "models/CashPayment";
import BankReceipt from "models/BankReceipt";
import BankPayment from "models/BankPayment";
import JournalVoucher from "models/JournalVoucher";
import Login from "./login";


export default function Home({}) {


  return (
    <>
      <Head>
        <title>Accounting_Software</title>
        <meta name="description" content="Generated by erp system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Login/>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
  }
  let customer = await Contact.find({"type": "Customer"})
  let supplier = await Contact.find({"type": "Supplier"})
  let employees = await Contact.find({"type": "Employee"})
  let product = await Product.find()
  let dbCharts = await Charts.find()
  let dbCashReceipt = await CashReceipt.find()
  let dbCashPayment = await CashPayment.find()
  let dbBankReceipt = await BankReceipt.find()
  let dbBankPayment = await BankPayment.find()
  let dbJournalVoucher = await JournalVoucher.find()
   
  // Pass data to the page via props
  return {
     props: {
      customer: JSON.parse(JSON.stringify(customer)),
      product: JSON.parse(JSON.stringify(product)),
      supplier: JSON.parse(JSON.stringify(supplier)),
      employees: JSON.parse(JSON.stringify(employees)),
      dbCharts: JSON.parse(JSON.stringify(dbCharts)),
      dbCashReceipt: JSON.parse(JSON.stringify(dbCashReceipt)),
      dbCashPayment: JSON.parse(JSON.stringify(dbCashPayment)),
      dbBankReceipt: JSON.parse(JSON.stringify(dbBankReceipt)),
      dbBankPayment: JSON.parse(JSON.stringify(dbBankPayment)),
      dbJournalVoucher: JSON.parse(JSON.stringify(dbJournalVoucher)),
     }
    }
}