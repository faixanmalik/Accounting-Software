import User from 'models/User'
import connectDb from 'middleware/mongoose'

// Jwt token
var jwt = require('jsonwebtoken');

const handler = async (req,res)=>{

    if (req.method == 'POST'){
        
        let token = req.body.token;
        let user = jwt.verify(token, process.env.JWT_SECRET);
        let dbuser = await User.findOne({"email": user.email})
    
        // working
        const {firstname, lastname, email, phoneno ,streetAddress, state, zip} = dbuser

        res.status(200).json({ success: true , firstname, lastname, email, phoneno,streetAddress, state, zip })
    }
    else{
        res.status(400).json({ success: false , message: "No user Found!" })
    }

}
export default connectDb(handler);