const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({

    name:{type: String},
    type:{type: String},
    email:{type: String},
    phoneNo:{type: Number},
    country:{type: String},
    streetAddress: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: Number},
    taxRigNo: {type: Number},
    paymentMethod: {type: String},
    terms: {type: String},
    openingBalance: {type: Number},
    date: {type: Date}
    

  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Contact", ContactSchema);