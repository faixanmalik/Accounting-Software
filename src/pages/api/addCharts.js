// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Charts from '../../../models/Charts'


export default async function handler(req, res) {

    if (req.method == 'POST'){
        
        const { accountCode, accountName, account, balance , asof, desc, subAccount } = req.body;
      
        let dbChart = await Charts.findOne({accountCode})
        
        if(dbChart){
            res.status(400).json({ success: false, message: "Already In Charts of accounts!" }) 
        }
        else{
            let newCharts = new Charts( { account, accountCode, accountName, balance , asof, desc, subAccount } );
            await newCharts.save();
        
            res.status(200).json({ success: true, message: "New Charts of Account Added!" }) 

        }

            
    }
}