// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Contact from 'models/Contact';
import Charts from '../../../models/Charts'
import moment from 'moment';
import Product from 'models/Product';
import BankAccount from 'models/BankAccount';
import CashPayment from 'models/CashPayment';
import CashReceipt from 'models/CashReceipt';
import BankPayment from 'models/BankPayment';
import BankReceipt from 'models/BankReceipt';
import JournalVoucher from 'models/JournalVoucher';
import Employees from 'models/Employees';
import Role from 'models/Role';


export default async function handler(req, res) {

    if (req.method == 'POST'){

        const { path } = req.body;
        
        if(path === 'chartsOfAccounts'){

            const { accountCode, accountName, account, balance , asof, desc, subAccount } = req.body;

            let dbChart = await Charts.findOne({"accountCode": accountCode})
        

            if(dbChart){
                if( accountName == dbChart.accountName && account == dbChart.account && balance == dbChart.balance && desc == dbChart.desc &&  subAccount == dbChart.subAccount){
                        res.status(400).json({ success: false, message: "Already In Charts of accounts!" }) 
                    }
                    else{
                        let editChart =  await Charts.findOneAndUpdate({accountCode: dbChart.accountCode}, {accountName : accountName , account : account , balance : balance , asof : asof , desc : desc , subAccount : subAccount})
                        res.status(200).json({ success: true, message: "Update Successfully!", editChart }) 
                    }
                }
            else{
                res.status(400).json({ success: false, message: "Cannot change Account Code!" }) 
            }
        }
        else if (path === 'contactList'){

            const { id, name, type,  email, phoneNo, country, streetAddress, city, state, zip,
                 taxRigNo, paymentMethod, terms , openingBalance, date  } = req.body;

            let dbContact = await Contact.findById(id)

            if(dbContact){
                if( name === dbContact.name && type === dbContact.type && email === dbContact.email &&  phoneNo === dbContact.phoneNo &&  country === dbContact.country &&  streetAddress === dbContact.streetAddress && city === dbContact.city && state === dbContact.state && zip === dbContact.zip && taxRigNo === dbContact.taxRigNo && paymentMethod === dbContact.paymentMethod && terms === dbContact.terms && openingBalance === dbContact.openingBalance){
                    res.status(400).json({ success: false, message: "Already In Charts of accounts!" }) 
                }
                else{
                    let editContact =  await Contact.findByIdAndUpdate(id, {name : name , type : type , email : email ,phoneNo : phoneNo , country : country , streetAddress : streetAddress, city : city , state : state , zip : zip, taxRigNo : taxRigNo , paymentMethod : paymentMethod , terms : terms, openingBalance : openingBalance, date: date })
                    res.status(200).json({ success: true, message: "Update Successfully!", editContact }) 
                }
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else if (path === 'productAndServices'){
            const { id, code, name, purchaseStatus, costPrice, purchaseAccount, purchaseTaxRate, purchaseDesc , salesStatus,  salesPrice, salesAccount, salesTaxRate, salesDesc } = req.body;
            let dbProduct = await Product.findById(id)

            if(dbProduct){
                if( code === dbProduct.code && name === dbProduct.name && name === dbProduct.name && purchaseStatus === dbProduct.purchaseStatus && costPrice === dbProduct.costPrice && purchaseAccount === dbProduct.purchaseAccount && purchaseTaxRate === dbProduct.purchaseTaxRate && purchaseDesc === dbProduct.purchaseDesc && salesStatus === dbProduct.salesStatus && salesPrice === dbProduct.salesPrice && salesAccount === dbProduct.salesAccount && salesTaxRate === dbProduct.salesTaxRate && salesDesc === dbProduct.salesDesc  ){
                    res.status(400).json({ success: false, message: "Already found!" }) 
                }
                else{
                    let editProduct =  await Product.findByIdAndUpdate(id, { code: code, name: name, purchaseStatus: purchaseStatus, costPrice:costPrice, purchaseAccount: purchaseAccount, purchaseTaxRate: purchaseTaxRate, purchaseDesc:purchaseDesc , salesStatus: salesStatus,  salesPrice: salesPrice, salesAccount:salesAccount, salesTaxRate:salesTaxRate, salesDesc:salesDesc })
                    res.status(200).json({ success: true, message: "Update Successfully!", editProduct }) 
                }
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else if (path === 'bankAccount'){
            const { id,  bankBranch, accountNo, accountType, accountDesc, accountTitle, 
                chartsOfAccount,  borrowingLimit } = req.body;
            let dbBank = await BankAccount.findById(id)

            if(dbBank){
                if( bankBranch === dbBank.bankBranch && accountNo === dbBank.accountNo && accountType === dbBank.accountType && accountDesc === dbBank.accountDesc && accountTitle === dbBank.accountTitle && chartsOfAccount === dbBank.chartsOfAccount && borrowingLimit === dbBank.borrowingLimit ){

                    res.status(400).json({ success: false, message: "Already found!" }) 
                }
                else{
                    await BankAccount.findByIdAndUpdate(id, { bankBranch: bankBranch, accountNo: accountNo, accountType: accountType, accountDesc: accountDesc, accountTitle:accountTitle , chartsOfAccount: chartsOfAccount,  borrowingLimit: borrowingLimit })
                    res.status(200).json({ success: true, message: "Update Successfully!" }) 
                }
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else if (path === 'cashPaymentVoucher'){
            const { id, paymentFrom, paymentTo, amount, date, journalNo, desc, account, debit, credit } = req.body;
            let dbData = await CashPayment.findById(id)
            if(dbData){
                const dbDate = moment(dbData.date).utc().format('YYYY-MM-DD')
                
                if( paymentFrom === dbData.paymentFrom && paymentTo === dbData.paymentTo && amount === dbData.amount && date === dbDate && journalNo === dbData.journalNo && desc === dbData.desc && account === dbData.account && debit === dbData.debit && credit === dbData.credit ){
                    res.status(400).json({ success: false, message: "Already found!" }) 
                }
                else{
                    await CashPayment.findByIdAndUpdate(id, {  paymentFrom: paymentFrom, paymentTo : paymentTo, amount : amount, date : date, journalNo : journalNo, desc : desc, account : account, debit : debit, credit : credit})
                    res.status(200).json({ success: true, message: "Update Successfully!" }) 
                }
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else if (path === 'cashReceiptVoucher'){
            const { id, receivedIn, receivedFrom, amount, date, journalNo, desc, account, debit, credit } = req.body;

            let dbData = await CashReceipt.findById(id)

            if(dbData){
                const dbDate = moment(dbData.date).utc().format('YYYY-MM-DD')
                
                if( receivedIn === dbData.receivedIn && receivedFrom === dbData.receivedFrom && amount === dbData.amount && date === dbDate && journalNo === dbData.journalNo && desc === dbData.desc && account === dbData.account && debit === dbData.debit && credit === dbData.credit){
                    res.status(400).json({ success: false, message: "Already found!" }) 
                }
                else{
                    await CashReceipt.findByIdAndUpdate(id, {  receivedIn: receivedIn, receivedFrom : receivedFrom, amount : amount, date : date, journalNo : journalNo, desc : desc , account : account, debit : debit, credit : credit})
                    res.status(200).json({ success: true, message: "Update Successfully!" }) 
                }
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else if (path === 'bankPaymentVoucher'){
            const { id, paymentFrom, paymentTo, amount, date, journalNo, bankBranch, bankAccountNo, desc, account, debit, credit } = req.body;

            let dbData = await BankPayment.findById(id)

            if(dbData){
                const dbDate = moment(dbData.date).utc().format('YYYY-MM-DD')
                
                if( paymentFrom === dbData.paymentFrom &&  paymentTo === dbData.paymentTo && amount === dbData.amount && bankBranch === dbData.bankBranch && bankAccountNo === dbData.bankAccountNo && date === dbDate && journalNo === dbData.journalNo && desc === dbData.desc && account === dbData.account && debit === dbData.debit && credit === dbData.credit ){
                    res.status(400).json({ success: false, message: "Already found!" }) 
                }
                else{
                    await BankPayment.findByIdAndUpdate(id, {  paymentFrom: paymentFrom, paymentTo : paymentTo, amount : amount, bankBranch : bankBranch,  bankAccountNo : bankAccountNo, date : date, journalNo : journalNo, desc : desc , account : account, debit : debit, credit : credit})
                    res.status(200).json({ success: true, message: "Update Successfully!" }) 
                }
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else if (path === 'bankReceiptVoucher'){
            const { id, receiptFrom, bankBranch, paymentTo, amount, date, journalNo, desc, bankAccountNo, account, debit, credit } = req.body;

            let dbData = await BankReceipt.findById(id)

            if(dbData){
                const dbDate = moment(dbData.date).utc().format('YYYY-MM-DD')
                
                if( receiptFrom === dbData.receiptFrom && bankBranch === dbData.bankBranch && paymentTo === dbData.paymentTo && amount === dbData.amount && date === dbDate && journalNo === dbData.journalNo && desc === dbData.desc && bankAccountNo === dbData.bankAccountNo && account === dbData.account && debit === dbData.debit && credit === dbData.credit){
                    res.status(400).json({ success: false, message: "Already found!" }) 
                }
                else{
                    await BankReceipt.findByIdAndUpdate(id, {  receiptFrom: receiptFrom, bankBranch : bankBranch, paymentTo : paymentTo, amount : amount, date : date, journalNo : journalNo, desc : desc, bankAccountNo : bankAccountNo , account : account, debit : debit, credit : credit})
                    res.status(200).json({ success: true, message: "Update Successfully!" }) 
                }
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else if (path === 'journalVoucher'){
            const { id, totalDebit, totalCredit, inputList , name, desc, memo, journalDate, journalNo, attachment } = req.body;

            let dbData = await JournalVoucher.findById(id)

            let dbInputList = dbData.inputList;

            // check req.body input List
            var account = 0;
            var credit = 0;
            var debit = 0;
            for (let index = 0; index < inputList.length; index++) {
                account = inputList[index].account;
                credit += parseInt(inputList[index].credit);
                debit += parseInt(inputList[index].debit);
            }


            // check database input List
            var dbAccount = 0;
            var dbCredit = 0;
            var dbDebit = 0;
            for (let index = 0; index < dbInputList.length; index++) {
                dbAccount = dbInputList[index].account;
                dbCredit += parseInt(dbInputList[index].credit);
                dbDebit += parseInt(dbInputList[index].debit);
            }

            if(dbData){
                const dbDate = moment(dbData.journalDate).utc().format('YYYY-MM-DD')
                
                if( 
                    memo === dbData.memo 
                    
                    //Input list 
                    && account === dbAccount 
                    && credit === dbCredit 
                    && debit === dbDebit

                    && journalDate === dbDate
                    && journalNo === dbData.journalNo
                    && desc === dbData.desc 
                    && name === dbData.name 
                    && totalDebit === dbData.totalDebit
                    && totalCredit === dbData.totalCredit
                    ){
                    res.status(400).json({ success: false, message: "Already found!" }) 
                }
                else{
                    await JournalVoucher.findByIdAndUpdate(id, { totalDebit:totalDebit , totalCredit:totalCredit,  inputList:inputList, name:name, desc:desc,  memo:memo, journalDate:journalDate, journalNo : journalNo, attachment : attachment})
                    res.status(200).json({ success: true, message: "Update Successfully!" }) 
                }
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else if (path === 'employees'){
            const { id, name, fatherName, dob, email, cnic,  phoneNo, citizenship, gender, 
                maritalStatus, designation, department, workShift, workHour, employmentMode, 
                payPolicy, basicPay, paymentMode, status, hireDate, siteName, joiningDate, 
                country, streetAddress, city, state, zip } = req.body;

            let dbData = await Employees.findById(id)

            if(dbData){
                const dbDob = moment(dbData.dob).utc().format('YYYY-MM-DD')
                const dbHireDate = moment(dbData.hireDate).utc().format('YYYY-MM-DD')
                const dbJoiningDate = moment(dbData.joiningDate).utc().format('YYYY-MM-DD')

                
                if( name === dbData.name  && fatherName === dbData.fatherName  && zip === dbData.zip  && state === dbData.state  && city === dbData.city  && streetAddress === dbData.streetAddress  && country === dbData.country  && joiningDate === dbJoiningDate  && siteName === dbData.siteName  && hireDate === dbHireDate  && status === dbData.status  && paymentMode === dbData.paymentMode  && basicPay === dbData.basicPay  && payPolicy === dbData.payPolicy  && employmentMode === dbData.employmentMode  && workHour === dbData.workHour  && workShift === dbData.workShift  && department === dbData.department  && designation === dbData.designation  
                    && maritalStatus === dbData.maritalStatus && dob === dbDob  && email === dbData.email  && cnic === dbData.cnic  && phoneNo === dbData.phoneNo  && citizenship === dbData.citizenship  && gender === dbData.gender){
                    res.status(400).json({ success: false, message: "Already found!" }) 
                }
                else{
                    await Employees.findByIdAndUpdate(id, {  name: name, fatherName : fatherName, zip : zip, state : state, city : city, streetAddress : streetAddress, country : country, joiningDate : joiningDate , siteName : siteName, hireDate : hireDate, status : status, paymentMode : paymentMode, basicPay : basicPay, payPolicy : payPolicy, employmentMode : employmentMode , workHour : workHour, workShift : workShift, department : department, designation : designation, 
                        maritalStatus : maritalStatus, dob : dob, email : email, cnic : cnic, phoneNo : phoneNo, citizenship : citizenship, gender : gender})
                    res.status(200).json({ success: true, message: "Update Successfully!" }) 
                }
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else if(path === 'addRole'){

            const { id, roleName, roleDesc } = req.body;

            let dbData = await Role.findById(id)

            if(dbData){
                if( roleName == dbData.roleName && roleDesc == dbData.roleDesc){
                        res.status(400).json({ success: false, message: "Already found!" }) 
                    }
                else{
                    await Role.findByIdAndUpdate(id, {  roleName: roleName, roleDesc : roleDesc})
                    res.status(200).json({ success: true, message: "Update Successfully!" }) 
                }
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else{
            res.status(400).json({ success: false, message: "Internal server error !" }) 
        }  
    }
    else{
        res.status(400).json({ success: false, message: "Internal server error !" }) 
    }
}










// if (req.method == 'POST'){
        
//     const { accountCode, accountName, account, balance , asof, desc, subAccount } = req.body;
  
//     let dbChart = await Charts.findOne({accountCode})
    
//     if(dbChart){
//         if( accountName == dbChart.accountName && account == dbChart.account && balance == dbChart.balance && desc == dbChart.desc &&  subAccount == dbChart.subAccount){
//                 res.status(400).json({ success: false, message: "Already In Charts of accounts!" }) 
//             }
//         else{
//             await Charts.findOneAndUpdate({accountCode: dbChart.accountCode}, {accountName : accountName , account : account , balance : balance , asof : asof , desc : desc , subAccount : subAccount})
//             res.status(200).json({ success: true, message: "Update Successfully!",  }) 
//         }
//     }
//     else{
//         let newCharts = new Charts( { account, accountCode, accountName, balance , asof, desc, subAccount } );
//         await newCharts.save();
    
//         res.status(200).json({ success: true, message: "New Charts of Account Added!" }) 

//     }

        
// }