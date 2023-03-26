// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import BankAccount from 'models/BankAccount';
import Charts from 'models/Charts';
import Contact from 'models/Contact';
import Employees from 'models/Employees';
import Product from 'models/Product';


export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { path } = req.body;

        if( path === 'employees'){
            const { name, fatherName, dob, email, cnic,  phoneNo, citizenship, gender, maritalStatus, designation, department, workShift, workHour, employmentMode, payPolicy, basicPay, paymentMode, status, hireDate, siteName, joiningDate, country, streetAddress, city, state, zip } = req.body;

            let newEntry = new Employees( { name, fatherName, dob, email, cnic,  phoneNo, citizenship, gender, maritalStatus, designation, department, workShift, workHour, employmentMode, payPolicy, basicPay, paymentMode, status, hireDate, siteName, joiningDate, country, streetAddress, city, state, zip } );
            await newEntry.save();
            res.status(200).json({ success: true, message: "Entry Added!" }) 
        }
        else if( path === 'chartsOfAccounts'){
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
        else if( path === 'bankAccount'){
            const { bankBranch, accountNo, accountType, accountDesc, accountTitle, chartsOfAccount,  borrowingLimit } = req.body;

            let newBankAccount = new BankAccount( { bankBranch, accountNo, accountType, accountDesc, accountTitle, chartsOfAccount,  borrowingLimit } );
            await newBankAccount.save();
            res.status(200).json({ success: true, message: "New Account Added !" }) 
        }

        
        else if( path === 'contactList'){
            const { name, type, email, phoneNo, country, streetAddress, city, state, zip, taxRigNo, paymentMethod, terms , openingBalance, date } = req.body;

            let newContact = new Contact( { name, type, email, phoneNo, country, streetAddress, city, state, zip, taxRigNo, paymentMethod, terms , openingBalance, date } );
            await newContact.save();
            res.status(200).json({ success: true, message: "New Contact Added !" }) 
        }
        else if( path === 'productAndServices'){
            const { code, name, purchaseStatus, costPrice, purchaseAccount, purchaseTaxRate, purchaseDesc , salesStatus,  salesPrice, salesAccount, salesTaxRate, salesDesc  } = req.body;
            
            let newProduct = new Product( { code, name, purchaseStatus, costPrice, purchaseAccount, purchaseTaxRate, purchaseDesc , salesStatus,  salesPrice, salesAccount, salesTaxRate, salesDesc  } );
            await newProduct.save();
            res.status(200).json({ success: true, message: "New Product Added !"}) 
        }



        
        else{
            
            res.status(400).json({ success: false, message: "Internal Server Error !" }) 
        }


    }
}