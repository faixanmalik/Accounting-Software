// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Invoice from '../../../models/Invoice'


export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { customerName, email,  billingAddress, creditNoteDate, creditNoteNo,  product, qty, rate, totalAmount, desc, attachment } = req.body;
        let newInvoice = new Invoice( { customerName, email,  billingAddress, creditNoteDate, creditNoteNo,  product, qty, rate, totalAmount, desc, attachment } );
        await newInvoice.save();
        
        res.status(200).json({ success: true, message: "New Invoice Added !" }) 
        }

    }