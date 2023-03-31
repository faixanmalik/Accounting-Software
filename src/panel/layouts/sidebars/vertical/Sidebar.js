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
import {FiShoppingBag, FiUserPlus, FiUsers} from 'react-icons/fi'
import {FaToriiGate} from 'react-icons/fa'
import {TbFileInvoice} from 'react-icons/tb'
import {RiBankCardLine, RiBankLine, RiBillLine} from 'react-icons/ri'
import {SlCalender} from 'react-icons/sl'
import { Link } from 'react-feather';





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
                              Business Setup
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Vouchers
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Employees
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Reports
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-2">
                              <a href={'/panel/businessSetup/chartsOfAccount'} className='no-underline text-gray-500 font-semibold text-base'>Charts of Accounts</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/panel/vouchers/journalVoucher'} className='no-underline text-gray-500 font-semibold text-base'>Journal Voucher</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/panel/payroll/employees'} className='no-underline text-gray-500 font-semibold text-base'>Employee</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/panel/financialManagment/reports/generalLedger'} className='no-underline text-gray-500 font-semibold text-base'>General Ledger</a>
                            </td>
                          </tr>

                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-2">
                              <a href={'/panel/businessSetup/contactList'} className='no-underline text-gray-500 font-semibold text-base'>Contact List</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/panel/vouchers/cashPaymentVoucher'} className='no-underline text-gray-500 font-semibold text-base'>Cash Payment Voucher</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/panel/userManagment/addRole'} className='no-underline text-gray-500 font-semibold text-base'>Role</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/panel/financialManagment/reports/contactTransactionSummary'} className='no-underline text-gray-500 font-semibold text-base'>Contact Transaction</a>
                            </td>
                          </tr>


                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-2">
                              <a href={'/panel/businessSetup/productAndServices'} className='no-underline text-gray-500 font-semibold text-base'>Product and Services</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/panel/vouchers/cashReceiptVoucher'} className='no-underline text-gray-500 font-semibold text-base'>Cash Receipt Voucher</a>
                            </td>
                            <td className="px-6 py-2"></td>
                            <td className="px-6 py-2">
                              <a href={'/panel/financialManagment/reports/trialBalance'} className='no-underline text-gray-500 font-semibold text-base'>Trial Balance</a>
                            </td>
                          </tr>


                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-2">
                              <a href={'/panel/businessSetup/bankAccount'} className='no-underline text-gray-500 font-semibold text-base'>Bank Account</a>
                            </td>
                            <td className="px-6 py-2">
                              <a href={'/panel/vouchers/bankPaymentVoucher'} className='no-underline text-gray-500 font-semibold text-base'>Bank Payment Voucher</a>
                            </td>
                            <td className="px-6 py-2"></td>
                            <td className="px-6 py-2">
                              <a href={'/panel/financialManagment/reports/profitAndLoss'} className='no-underline text-gray-500 font-semibold text-base'>Profit and Loss</a>
                            </td>
                          </tr>

                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-2"></td>
                            <td className="px-6 py-2">
                              <a href={'/panel/vouchers/bankReceiptVoucher'} className='no-underline text-gray-500 font-semibold text-base'>Bank Receipt Voucher</a>
                            </td>
                            <td className="px-6 py-2"></td>
                            <td className="px-6 py-2">
                              <a href={'/panel/financialManagment/reports/balanceSheet'} className='no-underline text-gray-500 font-semibold text-base'>Balance Sheet</a>
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
          <button onClick={() => { setOpen(true) }} className='bg-blue-800 hover:bg-blue-900 mb-2 font-semibold text-white px-24 py-2 rounded-lg'>New</button>
        </div>
        
        <Menu>
          <MenuItem icon={<BiHomeAlt className='text-lg'/>} className={ location === '/panel' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'} href="/panel" >
            Dashboard
          </MenuItem>
    
          <SubMenu label="User Managment" icon={<AiOutlineUser className='text-lg'/>}>
            <MenuItem href="/panel/userManagment/addRole" icon={<BiUserCheck className='text-lg'/>} className={ location === '/panel/userManagment/addRole' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Add Role
            </MenuItem>
            {/*<MenuItem href="/panel/userManagment/userRights" icon={<BiUserCheck className='text-lg'/>} className={ location === '/panel/userManagment/userRights' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              User Rights
            </MenuItem>*/}
          </SubMenu>

          <SubMenu label="Business Setup" icon={<IoBusinessOutline className='text-lg'/>}>
            <MenuItem href="/panel/businessSetup/chartsOfAccount" icon={<IoPieChartSharp className='text-lg'/>} className={ location === '/panel/businessSetup/chartsOfAccount' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Charts of Accounts
            </MenuItem>
            <MenuItem href="/panel/businessSetup/contactList" icon={<AiOutlineContacts className='text-lg'/>} className={ location === '/panel/businessSetup/contactList' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Contact List
            </MenuItem>
            <MenuItem href="/panel/businessSetup/productAndServices" icon={<MdProductionQuantityLimits className='text-lg'/>} className={ location === '/panel/businessSetup/productAndServices' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Product and Services
            </MenuItem>
            <MenuItem href="/panel/businessSetup/bankAccount" icon={<BsBank className='text-lg'/>} className={ location === '/panel/businessSetup/bankAccounts' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Bank Accounts
            </MenuItem>
          </SubMenu>
        
          <SubMenu label="Vouchers" icon={<RiBankCardLine className='text-lg'/>}>
            <MenuItem href="/panel/vouchers/cashPaymentVoucher" icon={<HiOutlineCash className='text-lg'/>} className={ location === '/panel/purchaseModule/purchaseOrder' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Cash Payment Voucher
            </MenuItem>
            <MenuItem href="/panel/vouchers/cashReceiptVoucher" icon={<HiOutlineBanknotes className='text-lg'/>} className={ location === '/panel/purchaseModule/inwardGatePass' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Cash Receipt Voucher
            </MenuItem>
            <MenuItem href="/panel/vouchers/bankPaymentVoucher" icon={<RiBankLine className='text-lg'/>} className={ location === '/panel/purchaseModule/inwardGatePass' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Bank Payment Voucher
            </MenuItem>
            <MenuItem href="/panel/vouchers/bankReceiptVoucher" icon={<AiOutlineBank className='text-lg'/>} className={ location === '/panel/purchaseModule/inwardGatePass' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Bank Receipt Voucher
            </MenuItem>
            <MenuItem href="/panel/vouchers/journalVoucher" icon={<MdOutlineInventory2 className='text-lg'/>} className={ location === '/panel/purchaseModule/purchaseOverview' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Journal Voucher
            </MenuItem> 
          </SubMenu>

          <SubMenu label="Payroll" icon={<FiUserPlus className='text-lg'/>}>
            <MenuItem href="/panel/payroll/employees" icon={<FiUsers className='text-lg'/>} className={ location === '/panel/payroll/employees' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Employees
            </MenuItem>
          </SubMenu>
          
          <SubMenu label="Reports" icon={<HiOutlineDocumentReport className='text-lg'/>}>
            <MenuItem href="/panel/financialManagment/reports/generalLedger" icon={<HiOutlineDocumentReport className='text-lg'/>} className={ location === '/panel/financialManagment/reports/generalLedger' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              General Ledger
            </MenuItem>
            <MenuItem href="/panel/financialManagment/reports/contactTransactionSummary" icon={<HiOutlineDocumentReport className='text-lg'/>} className={ location === '/panel/financialManagment/reports/contactTransactionSummary' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Contact Transaction
            </MenuItem>
            <MenuItem href="/panel/financialManagment/reports/trialBalance" icon={<HiOutlineDocumentReport className='text-lg'/>} className={ location === '/panel/financialManagment/reports/trialBalance' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Trial Balance
            </MenuItem>
            <MenuItem href="/panel/financialManagment/reports/profitAndLoss" icon={<HiOutlineDocumentReport className='text-lg'/>} className={ location === '/panel/financialManagment/reports/profitAndLoss' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
              Profit And Loss
            </MenuItem>
            <MenuItem href="/panel/financialManagment/reports/balanceSheet" icon={<HiOutlineDocumentReport className='text-lg'/>} className={ location === '/panel/financialManagment/reports/balanceSheet' ?  'text-indigo-700 bg-zinc-50 font-semibold' : 'text-gray-600 font-semibold'}>
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
