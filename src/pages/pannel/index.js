import Head from "next/head";
import { Col, Row } from "reactstrap";
import SalesChart from "@/pannel/components/dashboard/SalesChart";
import CustomerComponent from "@/pannel/components/dashboard/CustomerComponent";
import TodayOverview from "@/pannel/components/dashboard/TodayOverview";
import TopCards from "@/pannel/components/dashboard/TopCards";
import SupplierComponent from "@/pannel/components/dashboard/Supplier";
import ProductsComponent from "@/pannel/components/dashboard/Products";
import mongoose from "mongoose";
import Product from 'models/Product';
import Contact from "models/Contact";
import Charts from "models/Charts";
import CashReceipt from "models/CashReceipt";
import CashPayment from "models/CashPayment";
import BankReceipt from "models/BankReceipt";
import BankPayment from "models/BankPayment";
import JournalVoucher from "models/JournalVoucher";
import AssetsChart from "@/pannel/components/dashboard/AssetsChart";
import { ProSidebarProvider } from "react-pro-sidebar";
import FullLayout from "@/pannel/layouts/FullLayout";


export default function Home({customer, product, supplier, employees, dbCharts, dbJournalVoucher, dbBankPayment, dbBankReceipt, dbCashPayment, dbCashReceipt}) {

  const noOfCustomers = customer.length;
  const noOfProducts = product.length;
  const noOfSuppliers = supplier.length;
  const noOfEmployees = employees.length;

  return (
    <>
    <ProSidebarProvider>
    <style jsx global>{`
        footer {
          display: none;
        }
        header {
          display: none;
        }
      `}</style>
    <FullLayout>
      <Head>
        <title>ERP System</title>
        <meta name="description" content="Generated by erp system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <div>
        {/***Top Cards***/}
        <Row>
          <Col sm="6" lg="3">
            <TopCards
              bg="bg-light-danger text-danger"
              href='/pannel/businessSetup/productAndServices'
              title="Products"
              subtitle="Total Products"
              amount={noOfProducts}
              icon="bi bi-bag"
            />
          </Col>
          <Col sm="6" lg="3">
            <TopCards
              bg="bg-light-success text-success"
              href='/pannel/businessSetup/contactList'
              title="Customer"
              subtitle="Total Customer"
              amount={noOfCustomers}
              icon="bi bi-people"
            />
          </Col>
          <Col sm="6" lg="3">
            <TopCards
              bg="bg-light-warning text-warning"
              href='/pannel/businessSetup/contactList'
              title="Supplier"
              subtitle="Total Supplier"
              amount={noOfSuppliers}
              icon="bi bi-basket3"
            />
          </Col>
          <Col sm="6" lg="3">
            <TopCards
              bg="bg-light-info text-into"
              href='/pannel/financialManagment/reports/profitAndLoss'
              title="Employees"
              subtitle="Total employee"
              amount={noOfEmployees}
              icon="bi bi-people"
            />
          </Col>
        </Row>
        {/***Sales & Feed***/}
        <Row>
          <Col sm="12" lg="12">
            <SalesChart dbCharts={dbCharts} dbJournalVoucher={dbJournalVoucher} dbBankPayment={dbBankPayment} dbBankReceipt={dbBankReceipt} dbCashPayment={dbCashPayment} dbCashReceipt={dbCashReceipt}/>
          </Col>
        </Row>

        <Row>
          <Col sm="12" lg="12">
            <AssetsChart dbCharts={dbCharts} dbJournalVoucher={dbJournalVoucher} dbBankPayment={dbBankPayment} dbBankReceipt={dbBankReceipt} dbCashPayment={dbCashPayment} dbCashReceipt={dbCashReceipt}/>
          </Col>
        </Row>



        {/* That add may be in future */}
        {/***Table ***/}
        {/*<Row>
          <Col lg="6" xxl="8" sm="12">
            <CustomerComponent />
          </Col>
          <Col lg="6" xxl="8" sm="12">
            <ProductsComponent />  
          </Col>
        </Row>

        <Row>
          <Col lg="6" xxl="8" sm="12">
            <SupplierComponent />
          </Col>
          <Col lg="6" xxl="8" sm="12">
          <TodayOverview />
          </Col>
        </Row>*/}


      </div>
      </main>
      </FullLayout>
      </ProSidebarProvider>
    </>
  )
}


export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
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