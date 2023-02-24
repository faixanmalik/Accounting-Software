// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import InwardGatePass from 'models/InwardGatePass';


export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { transactionType, igpDate, deliveryChallanNo, venderName,  poNumber, poDate, VehicleNo, driverName, remarks, item, poQty, receivedQty } = req.body;
        let newInwardGatePass = new InwardGatePass( { transactionType, igpDate, deliveryChallanNo, venderName,  poNumber, poDate, VehicleNo, driverName, remarks, item, poQty, receivedQty } );
        await newInwardGatePass.save();
        
        res.status(200).json({ success: true, message: "Added!" }) 
        }

    }