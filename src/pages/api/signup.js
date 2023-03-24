import User from 'models/User'
import connectDb from 'middleware/mongoose'
var CryptoJS = require("crypto-js");


const handler = async (req,res)=>{

    if (req.method == 'POST'){
        let user = await User.findOne({"email": req.body.email})
        if (user){
            if (req.body.email === user.email){
                res.status(400).json({ success: false, message: "Already have an account!"})
                }
            }
        else{
            const {firstname, lastname, email, businessName, country, industry, day,  month} = req.body;
            let newuser = new User( {firstname, lastname, email, businessName, country, industry, day,  month , password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTOJS_SECRET).toString()});
            await newuser.save();
            res.status(200).json({ success: true, message: "New User added Succesfully!"})
            }
        }
    }


export default connectDb(handler);