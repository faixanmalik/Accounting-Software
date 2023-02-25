const mongoose = require('mongoose');

const BankReceiptSchema = new mongoose.Schema({
    receiptFrom:{type: String},
    bankBranch:{type: String},
    paymentTo:{type: String},
    amount:{type: Number},
    date:{type: Date},
    bankReceiptNo:{type: Number, unique: true},
    details:{type: String},
    bankAccountNo:{type: Number},

},{timestamps:true});

mongoose.models={}
export default mongoose.model("BankReceipt", BankReceiptSchema);