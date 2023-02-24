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
            const { receivedIn, cashInHand, receivedFrom, amount, date, refNo, details, balance } = req.body;
            
            let dbCPV = await CashPayment.findOne({ refNo })

            if( dbCPV ){
                res.status(400).json({ success: false, message: "Already Found!" }) 
            }
            else{
                let newEntry = new CashPayment( { receivedIn, cashInHand, receivedFrom, amount, date, refNo, details, balance } );
                await newEntry.save();
                
                res.status(200).json({ success: true, message: "Entry Added!" }) 
            }
        }
        else if( type === 'CRV'){
            const { receivedIn, cashInHand, receivedFrom, amount, date, refNo, details, balance } = req.body;
            
            let dbCRV = await CashReceipt.findOne({ refNo })

            if( dbCRV ){
                res.status(400).json({ success: false, message: "Already Found!" }) 
            }
            else{
                let newEntry = new CashReceipt( { receivedIn, cashInHand, receivedFrom, amount, date, refNo, details, balance } );
                await newEntry.save();
                
                res.status(200).json({ success: true, message: "Entry Added !" }) 
            }
        }
        else if( type === 'BPV'){
            const { receivedIn, cashInHand, receivedFrom, amount, date, refNo, details, balance } = req.body;
            
            let newEntry = new BankReceipt( { receivedIn, cashInHand, receivedFrom, amount, date, refNo, details, balance } );
            await newEntry.save();
            
            res.status(200).json({ success: true, message: "Entry Added !" }) 
        }
        else if( type === 'BRV'){
            const { receivedIn, cashInHand, receivedFrom, amount, date, refNo, details, balance } = req.body;
            
            let newEntry = new BankPayment( { receivedIn, cashInHand, receivedFrom, amount, date, refNo, details, balance } );
            await newEntry.save();
            
            res.status(200).json({ success: true, message: "Entry Added !" }) 
        }
        else if( type === 'JV'){
            const { inputList, memo, journalDate, journalNo, attachment, type } = req.body;
            
            let newEntry = new JournalVoucher( { inputList, memo, journalDate, journalNo, attachment, type } );
            await newEntry.save();
            
            res.status(200).json({ success: true, message: "Entry Added !" }) 
        }


        
        else{
            
            res.status(400).json({ success: false, message: "Internal Server Error !" }) 
        }


    }
}