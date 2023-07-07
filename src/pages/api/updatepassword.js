import User from 'models/User'
import connectDb from 'middleware/mongoose'
import CryptoJS from 'crypto-js';
import Employees from 'models/Employees';
// Jwt token
var jwt = require('jsonwebtoken');


const handler = async (req,res)=>{

    if (req.method == 'POST'){
        
        let token = req.body.token;

        let user = jwt.verify(token, process.env.JWT_SECRET)
        let dbuser = await User.findOne({email: user.email})
        
        if(dbuser){

            const bytes  = CryptoJS.AES.decrypt(dbuser.password, process.env.CRYPTOJS_SECRET);
            const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

            if( decryptedPassword == req.body.cpassword ){
                await User.findOneAndUpdate({email: dbuser.email}, {password: CryptoJS.AES.encrypt(req.body.npassword, process.env.CRYPTOJS_SECRET).toString()} )

                res.status(200).json({ success: true , message: "New Password Set!" })
            }
            else{
                res.status(400).json({ success: false , message: "Wrong Password!" })
            }

        }
        else{
            let employee = await Employees.findOne({email: user.email})
            
            if( employee.password == req.body.cpassword ){
                await Employees.findOneAndUpdate({email: employee.email}, {password: req.body.npassword} )

                res.status(200).json({ success: true , message: "New Password Set!" })
            }
            else{
                res.status(400).json({ success: false , message: "Wrong Password!" })
            }

        }

    }
    else{
        res.status(400).json({ success: false , message: "Some error occured!" })
    }

  

}
export default connectDb(handler);