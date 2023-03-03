const mongoose = require('mongoose');

const CashReceiptSchema = new mongoose.Schema({
    receivedIn:{type: String},
    receivedFrom:{type: String},
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
export default mongoose.model("CashReceipt", CashReceiptSchema);