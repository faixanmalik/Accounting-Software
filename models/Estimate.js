const mongoose = require('mongoose');


const EstimateSchema = new mongoose.Schema({
    customerName:{type: String, required: true},
    email:{type: String, required: true},
    estimateDate: {type: Date, required: true},
    expirationDate: {type: Date, required: true},
    estimateNo: {type: Number, required: true},
    product: {type: String, required: true},
    qty: {type: Number, required: true},
    rate: {type: Number, required: true},
    billingAddress:{type: String, required: true},
    desc: {type: String, required: true},
    totalAmount: {type: Number, required: true},
    attachment: {type: Buffer}
    

  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Estimate", EstimateSchema);