const mongoose = require('mongoose');

const BankReceiptSchema = new mongoose.Schema({
    receiptFrom:{type: String},
    bankBranch:{type: String},
    paymentTo:{type: String},
    amount:{type: Number},
    date:{type: Date},
    journalNo:{type: String, unique: true},
    desc:{type: String},
    bankAccountNo:{type: Number},
    account:{type: String},
    type:{type: String},
    debit:{type: Number},
    credit:{type: Number}

},{timestamps:true});

mongoose.models={}
export default mongoose.model("BankReceipt", BankReceiptSchema);