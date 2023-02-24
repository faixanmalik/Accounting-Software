// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from '../../../models/Product'


export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { code, name, purchaseStatus, costPrice, purchaseAccount, purchaseTaxRate, purchaseDesc , salesStatus,  salesPrice, salesAccount, salesTaxRate, salesDesc  } = req.body;
        let newProduct = new Product( { code, name, purchaseStatus, costPrice, purchaseAccount, purchaseTaxRate, purchaseDesc , salesStatus,  salesPrice, salesAccount, salesTaxRate, salesDesc  } );
        await newProduct.save();
        
        res.status(200).json({ success: true, message: "New Product Added !"}) 
        }

    }