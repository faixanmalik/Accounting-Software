// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import PurchaseOrder from 'models/PurchaseOrder'


export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { contact, date, deliveryDate, orderNo,  reference, currency, amountsAre, item,  desc, qty, unitPrice, discount, account , taxRate, amount } = req.body ;

        let checkPurchaseOrder = await PurchaseOrder.findOne({orderNo})
     
        if(checkPurchaseOrder){
            res.status(400).json({ success: false, message: "Already found!" }) 
        }
        else{
            let newPurchaseOrder = new PurchaseOrder({ contact, date, deliveryDate, orderNo,  reference, currency, amountsAre, item,  desc, qty, unitPrice, discount, account , taxRate, amount });
            await newPurchaseOrder.save();
            
            res.status(200).json({ success: true, message: "Successfully Added !"}) 

        }
    }

}