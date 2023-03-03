// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import BankPayment from 'models/BankPayment';
import BankReceipt from 'models/BankReceipt';
import CashPayment from 'models/CashPayment';
import CashReceipt from 'models/CashReceipt';
import JournalVoucher from 'models/JournalVoucher';


export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { type } = req.body;

        if( type === 'CPV'){
            const { paymentFrom, paymentTo, amount, date, journalNo, desc, account, type, debit, credit } = req.body;
            
            
            let dbCPV = await CashPayment.findOne({ journalNo })

            if( dbCPV ){
                res.status(400).json({ success: false, message: "Already Found!" }) 
            }
            else{
                let newEntry = new CashPayment( { paymentFrom, paymentTo, amount, date, journalNo, desc, account, type,  debit, credit } );
                await newEntry.save();
                
                res.status(200).json({ success: true, message: "Entry Added!" }) 
            }
        }
        else if( type === 'CRV'){
            const { receivedIn, receivedFrom, amount, date, journalNo, desc, account, type, debit, credit } = req.body;
        
            
            let dbCRV = await CashReceipt.findOne({ journalNo })

            if( dbCRV ){
                res.status(400).json({ success: false, message: "Already Found!" }) 
            }
            else{
                let newEntry = new CashReceipt( { receivedIn, receivedFrom, amount, date, journalNo, desc, account, type, debit, credit } );
                await newEntry.save();
                
                res.status(200).json({ success: true, message: "Entry Added !" }) 
            }
        }
        else if( type === 'BPV'){
            const { paymentFrom, paymentTo, amount, date, journalNo, bankBranch, bankAccountNo, desc, account, type, debit, credit } = req.body;

            let dbBPV = await BankPayment.findOne({ journalNo })

            if( dbBPV ){
                res.status(400).json({ success: false, message: "Already Found!" }) 
            }
            else{
                let newEntry = new BankPayment( { paymentFrom, paymentTo, amount, date, journalNo, bankBranch, bankAccountNo, desc, account, type, debit, credit } );
                await newEntry.save();
                
                res.status(200).json({ success: true, message: "Entry Added !" }) 
            }

        }
        else if( type === 'BRV'){
            const { receiptFrom, bankBranch, paymentTo, amount, date, journalNo, desc, bankAccountNo, account, type, debit, credit } = req.body;

            let dbBRV = await BankReceipt.findOne({ journalNo })

            if( dbBRV ){
                res.status(400).json({ success: false, message: "Already Found!" }) 
            }
            else{
                let newEntry = new BankReceipt( { receiptFrom, bankBranch, paymentTo, amount, date, journalNo, desc, bankAccountNo, account, type, debit, credit } );
                await newEntry.save();
                
                res.status(200).json({ success: true, message: "Entry Added !" })
            }
        }
        else if( type === 'JV'){
            const { totalDebit , totalCredit, inputList, memo, journalDate, journalNo, attachment, type } = req.body;

            let dbJV = await JournalVoucher.findOne({ journalNo })

            if( dbJV ){
                res.status(400).json({ success: false, message: "Already Found!" }) 
            }
            else{
                let newEntry = new JournalVoucher( { totalDebit , totalCredit, inputList, memo, journalDate, journalNo, attachment, type } );
                await newEntry.save();
                
                res.status(200).json({ success: true, message: "Entry Added !" }) 
            }
            
        }


        
        else{
            
            res.status(400).json({ success: false, message: "Internal Server Error !" }) 
        }


    }
}