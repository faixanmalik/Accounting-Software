const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname:{type: String, required: true},
    lastname:{type: String, required: true},
    name:{type: String, required: true},
    businessName:{type: String, required: true},
    country:{type: String, required: true},
    industry:{type: String, required: true},
    day:{type: Number },
    month:{type: String, required: true},
    phoneno:{type: Number },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    streetAddress: {type: String  },
    state: { type: String  },
    zip: { type: Number },

  },{timestamps:true});
   

mongoose.models = {}
export default mongoose.model("User", UserSchema);