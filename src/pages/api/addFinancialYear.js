// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import FinancialYear from "models/FinancialYear";


export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { yearName, startDate, endDate , status } = req.body;

        let newFinancialYear = new FinancialYear({ yearName, startDate, endDate , status } );
        await newFinancialYear.save();
        
        res.status(200).json({ success: true, message: "New Financial Year Added !"}) 
        }

    }