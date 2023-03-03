const mongoose = require('mongoose');

const CashPaymentSchema = new mongoose.Schema({
    paymentFrom:{type: String},
    paymentTo:{type: String},
    amount:{type: Number},
    date:{type: Date},
    journalNo:{type: String},
    desc:{type: String},
    account:{type: String},
    type:{type: String},
    debit:{type: Number},
    credit:{type: Number}
},{timestamps:true});

mongoose.models={}
export default mongoose.model("CashPayment", CashPaymentSchema);