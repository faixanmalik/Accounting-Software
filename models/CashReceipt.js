const mongoose = require('mongoose');

const CashReceiptSchema = new mongoose.Schema({
    receivedIn:{type: String},
    receivedFrom:{type: String},
    amount:{type: Number},
    date:{type: Date},
    cashReceiptNo:{type: Number, unique: true},
    details:{type: String},
},{timestamps:true});

mongoose.models={}
export default mongoose.model("CashReceipt", CashReceiptSchema);