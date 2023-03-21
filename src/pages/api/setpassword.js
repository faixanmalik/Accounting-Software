import User from 'models/User'
import Forgot from 'models/Forgot';
import connectDb from 'middleware/mongoose'
import CryptoJS from 'crypto-js';
// Jwt token
var jwt = require('jsonwebtoken');


const handler = async (req,res)=>{

    if (req.method == 'POST'){

        let { token, npassword } = req.body;
        
        
        let forgotUser = await Forgot.findOne({token})
        let forgotUserEmail = await forgotUser.email

        await User.findOneAndUpdate({email: forgotUserEmail}, {password: CryptoJS.AES.encrypt(npassword, process.env.CRYPTOJS_SECRET).toString()} )
            res.status(200).json({ success: true , message: "New Password Set!" })
    }
    else{
        res.status(400).json({ success: false , message: "Internal Server Error!" })
    }

}

export default connectDb(handler);