// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Estimate from '../../../models/Estimate'


export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { customerName, email , estimateDate, expirationDate, estimateNo, product, qty, rate, totalAmount, desc, billingAddress, attachment } = req.body;
        let newEstimate = new Estimate( { customerName, email , estimateDate, expirationDate, estimateNo, product, qty, rate, totalAmount, desc, billingAddress, attachment } );
        await newEstimate.save();
        
        res.status(200).json({ success: true, message: "Estimate Added !" }) 
        }

    }