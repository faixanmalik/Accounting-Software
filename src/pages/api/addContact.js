// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Contact from "models/Contact";

export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { name, type, email, phoneNo, country, streetAddress, city, state, zip, taxRigNo, paymentMethod, terms , openingBalance, date } = req.body;
        let newContact = new Contact( { name, type, email, phoneNo, country, streetAddress, city, state, zip, taxRigNo, paymentMethod, terms , openingBalance, date } );
        await newContact.save();
        
        res.status(200).json({ success: true, message: "New Contact Added !" }) 
        }

    }