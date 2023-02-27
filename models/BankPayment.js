const mongoose = require('mongoose');

const BankPaymentSchema = new mongoose.Schema({
    paymentFrom:{type: String},
    paymentTo:{type: String},
    amount:{type: Number},
    date:{type: Date},
    bankPaymentNo:{type: Number, unique: true},
    details:{type: String},
    bankBranch:{type: String},
    bankAccountNo:{type: Number},
    account:{type: String}

},{timestamps:true});

mongoose.models={}
export default mongoose.model("BankPayment", BankPaymentSchema);