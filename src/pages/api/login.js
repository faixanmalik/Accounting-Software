import User from 'models/User'
import connectDb from 'middleware/mongoose'
import Employees from 'models/Employees';
// Crypto JS
var CryptoJS = require("crypto-js");
// Jwt token
var jwt = require('jsonwebtoken');


const handler = async (req,res)=>{
    if (req.method == 'POST'){
        let user = await User.findOne({"email": req.body.email})
        
        if (user){
            // Decryptossword
            var bytes  = CryptoJS.AES.decrypt(user.password, process.env.CRYPTOJS_SECRET);
            var encryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.email === user.email && req.body.password === encryptedPassword){
                let token = jwt.sign({ email:user.email, name:user.name}, process.env.JWT_SECRET);
                res.status(200).json({ success: true, message: "Succesfully Log In!", token, email:user.email, businessName: user.businessName, department: 'Admin' })
            }
            else{
                res.status(400).json({ success: false, message: "Invalid Credentials!" })
            }
        }
        else{
            let employee = await Employees.findOne({"email": req.body.email})
            if(employee){
                if (req.body.email === employee.email && req.body.password === employee.password){
                    let token = jwt.sign({ email:employee.email, name:employee.name}, process.env.JWT_SECRET);
                    res.status(200).json({ success: true, message: "Succesfully Log In!", token, email:employee.email, name:employee.name, department: employee.department })
                }
                else{
                    res.status(400).json({ success: false, message: "Invalid Credentials!" })
                }

            }
            else{
                res.status(400).json({ success: "none" , message: "No user Found!" })
            }
        }
    }
    else{
        res.status(400).json({ success: false, message: "Internal Server Error!" }) 
    }
}

export default connectDb(handler);