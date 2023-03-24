// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Charts from 'models/Charts';
import Contact from 'models/Contact';
import Product from 'models/Product';
import BankAccount from 'models/BankAccount';
import CashPayment from 'models/CashPayment';
import CashReceipt from 'models/CashReceipt';
import BankPayment from 'models/BankPayment';
import BankReceipt from 'models/BankReceipt';
import JournalVoucher from 'models/JournalVoucher';


export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { delPath, path } = req.body;

        if(delPath === 'chartsOfAccounts'){
            const { id } = req.body;

            await Charts.findByIdAndDelete( id )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 

        }
        else if (delPath === 'contactList'){
            const { id } = req.body;
            
            await Contact.findByIdAndDelete( id )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }
        else if (delPath === 'productAndServices'){
            const { id } = req.body;
            
            await Product.findByIdAndDelete( id )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }
        else if (delPath === 'bankAccount'){
            const { id } = req.body;
            
            await BankAccount.findByIdAndDelete( id )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }

        else if (delPath === 'cashPaymentVoucher'){
            const { id } = req.body;
            
            await CashPayment.findByIdAndDelete( id )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }
        else if (delPath === 'cashReceiptVoucher'){
            const { id } = req.body;
            
            await CashReceipt.findByIdAndDelete( id )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }
        else if (delPath === 'bankPaymentVoucher'){
            const { id } = req.body;
            
            await BankPayment.findByIdAndDelete( id )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }
        else if (delPath === 'bankReceiptVoucher'){
            const { id } = req.body;
            
            await BankReceipt.findByIdAndDelete( id )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }

        else if (delPath === 'journalVoucher'){
            const { id } = req.body;
            
            await JournalVoucher.findByIdAndDelete( id )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }
        else if (path === 'business'){
            const { id } = req.body;
            
            await Business.findByIdAndDelete( id )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }



        else{
            res.status(400).json({ success: false, message: "Some Error Occured !" }) 
        }
    }
    else{
        res.status(400).json({ success: false, message: "Some Error Occured !" }) 
    }}