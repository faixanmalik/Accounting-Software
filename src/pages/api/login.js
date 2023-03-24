import User from 'models/User'
import connectDb from 'middleware/mongoose'
// Crypto JS
var CryptoJS = require("crypto-js");
// Jwt token
var jwt = require('jsonwebtoken');


const handler = async (req,res)=>{
    if (req.method == 'POST'){
        let user = await User.findOne({"email": req.body.email})
        console.log(user)

        if (user){
            // Decryptossword
            var bytes  = CryptoJS.AES.decrypt(user.password, process.env.CRYPTOJS_SECRET);
            var encryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.email === user.email && req.body.password === encryptedPassword){
                var token = jwt.sign({ email:user.email, name:user.name}, process.env.JWT_SECRET);
                res.status(200).json({ success: true, message: "Succesfully Log In!", token, email:user.email, businessName: user.businessName })
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
export default connectDb(handler);