// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import BankAccount from "models/BankAccount";

export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { bankBranch, accountNo, accountType, accountDesc, accountTitle, chartsOfAccount,  borrowingLimit } = req.body;
        let newBankAccount = new BankAccount( { bankBranch, accountNo, accountType, accountDesc, accountTitle, chartsOfAccount,  borrowingLimit } );
        await newBankAccount.save();
        res.status(200).json({ success: true, message: "New Account Added !" }) 
        }

    }