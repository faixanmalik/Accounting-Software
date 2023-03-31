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
import Employees from 'models/Employees';
import Role from 'models/Role';


export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { path } = req.body;

        if(path === 'chartsOfAccounts'){
            const { selectedIds } = req.body;
            await Charts.deleteMany( { _id: { $in: selectedIds } } )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }
        else if (path === 'bankAccount'){
            const { selectedIds } = req.body;
            await BankAccount.deleteMany( { _id: { $in: selectedIds } } )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
            
        }
        else if (path === 'contactList'){
            const { selectedIds } = req.body;
            await Contact.deleteMany( { _id: { $in: selectedIds } } )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }
        else if (path === 'productAndServices'){
            const { selectedIds } = req.body;
            await Product.deleteMany( { _id: { $in: selectedIds } } )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }
        
        
        else if (path === 'bankPaymentVoucher'){
            const { selectedIds } = req.body;
            await BankPayment.deleteMany( { _id: { $in: selectedIds } } )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }
        else if (path === 'bankReceiptVoucher'){
            const { selectedIds } = req.body;
            await BankReceipt.deleteMany( { _id: { $in: selectedIds } } )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }


        else if (path === 'cashPaymentVoucher'){
            const { selectedIds } = req.body;
            await CashPayment.deleteMany( { _id: { $in: selectedIds } } )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }
        else if (path === 'cashReceiptVoucher'){
            const { selectedIds } = req.body;
            await CashReceipt.deleteMany( { _id: { $in: selectedIds } } )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }

        else if (path === 'journalVoucher'){
            const { selectedIds } = req.body;
            await JournalVoucher.deleteMany( { _id: { $in: selectedIds } } )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }
        else if (path === 'employees'){
            const { selectedIds } = req.body;
            await Employees.deleteMany( { _id: { $in: selectedIds } } )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }
        else if (path === 'addRole'){
            const { selectedIds } = req.body;
            await Role.deleteMany( { _id: { $in: selectedIds } } )
            res.status(200).json({ success: true, message: "Deleted Successfully !" }) 
        }



        else{
            res.status(400).json({ success: false, message: "Some Error Occured !" }) 
        }
    }
    else{
        res.status(400).json({ success: false, message: "Some Error Occured !" }) 
    }}