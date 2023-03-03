const mongoose = require('mongoose');

const BankPaymentSchema = new mongoose.Schema({
    paymentFrom:{type: String},
    paymentTo:{type: String},
    amount:{type: Number},
    date:{type: Date},
    journalNo:{type: Number, unique: true},
    desc:{type: String},
    bankBranch:{type: String},
    bankAccountNo:{type: Number},
    account:{type: String},
    type:{type: String},
    debit:{type: Number},
    credit:{type: Number}

},{timestamps:true});

mongoose.models={}
export default mongoose.model("BankPayment", BankPaymentSchema);