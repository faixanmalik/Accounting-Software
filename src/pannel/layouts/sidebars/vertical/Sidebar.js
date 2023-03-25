import { React, Fragment, useState } from 'react'
import Logo from "../../logo/Logo";
import { useRouter } from "next/router";
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Menu, MenuItem, SubMenu, Sidebar } from 'react-pro-sidebar';

import {AiOutlineBank, AiOutlineCloseCircle, AiOutlineContacts, AiOutlineFundProjectionScreen, AiOutlineShoppingCart, AiOutlineTeam, AiOutlineUser, AiOutlineUserSwitch } from 'react-icons/ai'
import { BiFingerprint, BiHomeAlt, BiPurchaseTagAlt, BiUserCheck, BiUserCircle } from 'react-icons/bi'
import {MdOutlineInventory2, MdProductionQuantityLimits} from 'react-icons/md'
import {IoPieChartSharp, IoBusinessOutline} from 'react-icons/io5'
import {HiOutlineCash, HiOutlineDocumentReport, HiOutlineReceiptTax} from 'react-icons/hi'

import {HiOutlineBanknotes} from 'react-icons/hi2'

import {BsBank, BsChatQuote, BsShop} from 'react-icons/bs'
import {FiShoppingBag} from 'react-icons/fi'
import {FaToriiGate} from 'react-icons/fa'
import {TbFileInvoice} from 'react-icons/tb'
import {RiBankCardLine, RiBankLine, RiBillLine} from 'react-icons/ri'
import {SlCalender} from 'react-icons/sl'





const Sidebar2 = ({ showMobilemenu }) => {

    
  const router = useRouter();
  const location = router.pathname;
  const [open, setOpen] = useState(false)

  
  

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <button className="text-2xl ml-6 items-center lg:hidden" onClick={showMobilemenu} >
          <AiOutlineCloseCircle />
        </button>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={setOpen}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95" enterTo="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 md:scale-100" leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-5xl">

                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-6 lg:right-8" onClick={() => setOpen(false)}>
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="relative mt-6 w-full overflow-x-auto shadow-sm">
                      <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Customers
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Suppliers
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Employees
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Others
                            </th>

                          </tr>
                        </thead>

                        <tbody>

                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/invoice'} className='no-underline text-gray-500 font-semibold text-base'>Invoice</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/expense'} className='no-underline text-gray-500 font-semibold text-base'>Expense</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/singleTimeActivity'} className='no-underline text-gray-500 font-semibold text-base'>Single time activity</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/bankDeopsit'} className='no-underline text-gray-500 font-semibold text-base'>Bank deposit</a>
                            </td>
                          </tr>

                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/receivePayment'} className='no-underline text-gray-500 font-semibold text-base'>Receive payment</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/cheque'} className='no-underline text-gray-500 font-semibold text-base'>Cheque</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/weeklyTimeSheet'} className='no-underline text-gray-500 font-semibold text-base'>Weekly time sheet</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/transfer'} className='no-underline text-gray-500 font-semibold text-base'>Transfer</a>
                            </td>
                          </tr>


                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/estimate'} className='no-underline text-gray-500 font-semibold text-base'>Estimate</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/bill'} className='no-underline text-gray-500 font-semibold text-base'>Bill</a>
                            </td>
                            <td className="px-6 py-2">

                            </td>
                            <td className="px-6 py-2">
                              <a href={'/pannel/financialManagment/manageVouchers'} className='no-underline text-gray-500 font-semibold text-base'>Journal entry</a>
                            </td>
                          </tr>


                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/creditNote'} className='no-underline text-gray-500 font-semibold text-base'>Credit Note</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/payBills'} className='no-underline text-gray-500 font-semibold text-base'>Pay bills</a>
                            </td>
                            <td className="px-6 py-2">

                            </td>
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/statement'} className='no-underline text-gray-500 font-semibold text-base'>Statement</a>
                            </td>
                          </tr>

                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/salesReceipt'} className='no-underline text-gray-500 font-semibold text-base'>Sales receipt</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/purchaseOrder'} className='no-underline text-gray-500 font-semibold text-base'>Purchase order</a>
                            </td>
                            <td className="px-6 py-2">

                            </td>
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/payDownCreditCard'} className='no-underline text-gray-500 font-semibold text-base'>Pay down credit card</a>
                            </td>
                          </tr>


                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/refundReceipt'} className='no-underline text-gray-500 font-semibold text-base'>Refund receipt</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/supplierCredit'} className='no-underline text-gray-500 font-semibold text-base'>Supplier credit</a>
                            </td>
                            <td className="px-6 py-2">

                            </td>
                            <td className="px-6 py-2">

                            </td>
                          </tr>

                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/delayedCredit'} className='no-underline text-gray-500 font-semibold text-base'>Delayed credit</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/creditCardCredit'} className='no-underline text-gray-500 font-semibold text-base'>Credit card credit</a>
                            </td>
                            <td className="px-6 py-2">

                            </td>
                            <td className="px-6 py-2">

                            </td>
                          </tr>
                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-2">
                              <a href={'/pannel/forms/delayedCharge'} className='no-underline text-gray-500 font-semibold text-base'>Delayed charge</a>
                            </td>
                            <td className="px-6 py-2">

                            </td>
                            <td className="px-6 py-2">

                            </td>
                            <td className="px-6 py-2">

                            </td>
                          </tr>





                        </tbody>
                      </table>
                    </div>

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="pt-4 mt-2">

      <Sidebar width='255px' className='-ml-3'>
      <Menu className='bg-white'>
        <div className='justify-center flex mb-3'>
          <button onClick={() => { setOpen(true) }} className='bg-blue-800 mb-2 font-semibold text-white px-24 py-2 rounded-lg'>New</button>
        </div>
        
        <Menu>
          <MenuItem icon={<BiHomeAlt className='text-lg'/>} className={ location === '/pannel' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'} href="/pannel" >
            Dashboard
          </MenuItem>
    
          <SubMenu label="Business Setup" icon={<IoBusinessOutline className='text-lg'/>}>
            <MenuItem href="/pannel/businessSetup/chartsOfAccount" icon={<IoPieChartSharp className='text-lg'/>} className={ location === '/pannel/businessSetup/chartsOfAccount' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Charts of Accounts
            </MenuItem>
            <MenuItem href="/pannel/businessSetup/contactList" icon={<AiOutlineContacts className='text-lg'/>} className={ location === '/pannel/businessSetup/contactList' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Contact List
            </MenuItem>
            <MenuItem href="/pannel/businessSetup/productAndServices" icon={<MdProductionQuantityLimits className='text-lg'/>} className={ location === '/pannel/businessSetup/productAndServices' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Product and Services
            </MenuItem>
            <MenuItem href="/pannel/businessSetup/bankAccount" icon={<BsBank className='text-lg'/>} className={ location === '/pannel/businessSetup/bankAccounts' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Bank Accounts
            </MenuItem>
          </SubMenu>
        
          <SubMenu label="Vouchers" icon={<RiBankCardLine className='text-lg'/>}>
            <MenuItem href="/pannel/vouchers/cashPaymentVoucher" icon={<HiOutlineCash className='text-lg'/>} className={ location === '/pannel/purchaseModule/purchaseOrder' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Cash Payment Voucher
            </MenuItem>
            <MenuItem href="/pannel/vouchers/cashReceiptVoucher" icon={<HiOutlineBanknotes className='text-lg'/>} className={ location === '/pannel/purchaseModule/inwardGatePass' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Cash Receipt Voucher
            </MenuItem>
            <MenuItem href="/pannel/vouchers/bankPaymentVoucher" icon={<RiBankLine className='text-lg'/>} className={ location === '/pannel/purchaseModule/inwardGatePass' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Bank Payment Voucher
            </MenuItem>
            <MenuItem href="/pannel/vouchers/bankReceiptVoucher" icon={<AiOutlineBank className='text-lg'/>} className={ location === '/pannel/purchaseModule/inwardGatePass' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Bank Receipt Voucher
            </MenuItem>
            <MenuItem href="/pannel/vouchers/journalVoucher" icon={<MdOutlineInventory2 className='text-lg'/>} className={ location === '/pannel/purchaseModule/purchaseOverview' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Journal Voucher
            </MenuItem> 
          </SubMenu>

          <SubMenu label="Payroll" icon={<HiOutlineDocumentReport className='text-lg'/>}>
            <MenuItem href="/pannel/payroll/employees" icon={<HiOutlineDocumentReport className='text-lg'/>} className={ location === '/pannel/payroll/employees' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Employees
            </MenuItem>
          </SubMenu>
          
          <SubMenu label="Reports" icon={<HiOutlineDocumentReport className='text-lg'/>}>
            <MenuItem href="/pannel/financialManagment/reports/generalLedger" icon={<HiOutlineDocumentReport className='text-lg'/>} className={ location === '/pannel/financialManagment/reports/generalLedger' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              General Ledger
            </MenuItem>
            <MenuItem href="/pannel/financialManagment/reports/trialBalance" icon={<HiOutlineDocumentReport className='text-lg'/>} className={ location === '/pannel/financialManagment/reports/trialBalance' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Trial Balance
            </MenuItem>
            <MenuItem href="/pannel/financialManagment/reports/contactTransactionSummary" icon={<HiOutlineDocumentReport className='text-lg'/>} className={ location === '/pannel/financialManagment/reports/contactTransactionSummary' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Contact Transaction
            </MenuItem>
            <MenuItem href="/pannel/financialManagment/reports/profitAndLoss" icon={<HiOutlineDocumentReport className='text-lg'/>} className={ location === '/pannel/financialManagment/reports/profitAndLoss' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Profit And Loss
            </MenuItem>
            <MenuItem href="/pannel/financialManagment/reports/balanceSheet" icon={<HiOutlineDocumentReport className='text-lg'/>} className={ location === '/pannel/financialManagment/reports/balanceSheet' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Balance Sheet
            </MenuItem>
          </SubMenu>
          
        </Menu>
      </Menu>
      </Sidebar>


      </div>
    </div>
  );
};



export default Sidebar2;
