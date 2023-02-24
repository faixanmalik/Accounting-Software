const mongoose = require('mongoose');

const CashPaymentSchema = new mongoose.Schema({
    receivedIn:{type: String},
    cashInHand:{type: String},
    receivedFrom:{type: String},
    amount:{type: Number},
    date:{type: Date},
    refNo:{type: Number, unique: true},
    details:{type: String},
    balance:{type: Number},
},{timestamps:true});

mongoose.models={}
export default mongoose.model("CashPayment", CashPaymentSchema);