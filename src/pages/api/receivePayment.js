// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ReceivePayment from '../../../models/ReceivePayment'


export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { customerName, email, phoneNo , paymentDate, paymentReceived,referenceNo, memo, attachment } = req.body;
        let newRecvPayment = new ReceivePayment( { customerName, email, phoneNo , paymentDate, paymentReceived, referenceNo, memo, attachment } );
        await newRecvPayment.save();
        
        res.status(200).json({ success: true, message: "Payment Received !" }) 
        }

    }