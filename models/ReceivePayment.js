const mongoose = require('mongoose');


const ReceivePaymentSchema = new mongoose.Schema({
    customerName:{type: String, required: true},
    email:{type: String, required: true},
    memo:{type: String, required: true},
    phoneNo:{type: Number, required: true},
    referenceNo: {type: Number, required: true},
    paymentReceived: {type: Number, required: true},
    paymentDate: {type: Date, required: true},
    attachment: {type: Buffer}
    

  },{timestamps:true});

mongoose.models={}
export default mongoose.model("ReceivePayment", ReceivePaymentSchema);