const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({

    name:{type: String, required: true},
    type:{type: String, required: true},
    email:{type: String, required: true},
    phoneNo:{type: Number, required: true},
    country:{type: String, required: true},
    streetAddress: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: Number, required: true},
    taxRigNo: {type: Number, required: true},
    paymentMethod: {type: String, required: true},
    terms: {type: String, required: true},
    openingBalance: {type: Number, required: true},
    date: {type: Date, required: true},
    taxRigNo: {type: Number, required: true}
    

  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Contact", ContactSchema);