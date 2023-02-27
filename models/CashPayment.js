const mongoose = require('mongoose');

const CashPaymentSchema = new mongoose.Schema({
    paymentFrom:{type: String},
    paymentTo:{type: String},
    amount:{type: Number},
    date:{type: Date},
    cashPaymentNo:{type: Number, unique: true},
    details:{type: String},
    account:{type: String}
},{timestamps:true});

mongoose.models={}
export default mongoose.model("CashPayment", CashPaymentSchema);