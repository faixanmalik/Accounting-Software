// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import BankAccount from 'models/BankAccount';
import Contact from 'models/Contact';
import Product from 'models/Product';
import Charts from 'models/Charts'
import JournalVoucher from 'models/JournalVoucher';
import BankPayment from 'models/BankPayment';
import BankReceipt from 'models/BankReceipt';
import CashPayment from 'models/CashPayment';
import CashReceipt from 'models/CashReceipt';
import Business from 'models/Business';
import Employees from 'models/Employees';


export default async function handler(req, res) {

    if (req.method == 'POST'){

        const { getDataPath, path } = req.body;


        if( getDataPath === 'chartsOfAccounts'){
            const { id } = req.body;
            let charts = await Charts.findById(id)
            if(charts){
                res.status(200).json({ success: true, charts}) 
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }

        else if( getDataPath === 'contactList' ){
            const { id } = req.body;
            let contact = await Contact.findById(id)
            if(contact){
                res.status(200).json({ success: true, contact}) 
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }

        }
        else if( getDataPath === 'productAndServices' ){
            const { id } = req.body;
            let product = await Product.findById(id)
            if(product){
                res.status(200).json({ success: true, product}) 
            } 
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }

        }
        else if( getDataPath === 'bankAccount' ){
            const { id } = req.body;
            let bankAccount = await BankAccount.findById(id)
            if(bankAccount){
                res.status(200).json({ success: true, bankAccount}) 
            } 
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }

        }
        
        else if( getDataPath === 'cashPaymentVoucher' ){
            const { id } = req.body;
            let data = await CashPayment.findById(id)
            if(data){
                res.status(200).json({ success: true, data}) 
            } 
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }

        else if( getDataPath === 'cashReceiptVoucher' ){
            const { id } = req.body;
            let data = await CashReceipt.findById(id)
            if(data){
                res.status(200).json({ success: true, data}) 
            } 
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else if( getDataPath === 'bankPaymentVoucher' ){
            const { id } = req.body;
            let data = await BankPayment.findById(id)
            if(data){
                res.status(200).json({ success: true, data}) 
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else if( getDataPath === 'bankReceiptVoucher' ){
            const { id } = req.body;
            let data = await BankReceipt.findById(id)
            if(data){
                res.status(200).json({ success: true, data}) 
            } 
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else if( getDataPath === 'journalVoucher' ){
            const { id } = req.body;
            let data = await JournalVoucher.findById(id)

            if(data){
                res.status(200).json({ success: true, data}) 
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else if( path === 'business' ){
            const { id } = req.body;
            let data = await Business.findById(id)

            if(data){
                res.status(200).json({ success: true, data}) 
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }
        else if( path === 'employees' ){
            const { id } = req.body;
            let data = await Employees.findById(id)

            if(data){
                res.status(200).json({ success: true, data}) 
            }
            else{
                res.status(400).json({ success: false, message: "Internal server error!" }) 
            }
        }


        
        
    }

    else{
        res.status(400).json({ success: false, message: "Some Error Occured !" }) 
    }

}
