const mongoose = require('mongoose');

const BankAccountSchema = new mongoose.Schema({

    bankBranch:{type: String, required: true},
    accountNo:{type: Number, required: true},
    accountType:{type: String, required: true},
    accountDesc:{type: String, required: true},
    accountTitle:{type: String, required: true},
    chartsOfAccount: {type: String, required: true},
    borrowingLimit: {type: Number, required: true},

  },{timestamps:true});

mongoose.models={}
export default mongoose.model("BankAccount", BankAccountSchema);