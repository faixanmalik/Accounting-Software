// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Business from 'models/Business';
import Employees from 'models/Employees';


export default async function handler(req, res) {

    if (req.method == 'POST'){
        const { path } = req.body;

        if( path === 'business'){
            const { businessName, country, industry, day,  month } = req.body;
            
            let newEntry = new Business( { businessName, country, industry, day,  month } );
            await newEntry.save();
            
            res.status(200).json({ success: true, message: "Entry Added!" }) 
        
        }
        if( path === 'employees'){
            const { name, fatherName, dob, email, cnic,  phoneNo, citizenship, gender, maritalStatus, designation, department, workShift, workHour, employmentMode, payPolicy, basicPay, paymentMode, status, hireDate, siteName, joiningDate, country, streetAddress, city, state, zip } = req.body;
            
            let newEntry = new Employees( { name, fatherName, dob, email, cnic,  phoneNo, citizenship, gender, maritalStatus, designation, department, workShift, workHour, employmentMode, payPolicy, basicPay, paymentMode, status, hireDate, siteName, joiningDate, country, streetAddress, city, state, zip } );
            await newEntry.save();
            
            res.status(200).json({ success: true, message: "Entry Added!" }) 
        
        }
        
        else{
            
            res.status(400).json({ success: false, message: "Internal Server Error !" }) 
        }


    }
}