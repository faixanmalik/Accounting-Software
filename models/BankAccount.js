const mongoose = require('mongoose');

const BankAccountSchema = new mongoose.Schema({

    bankBranch:{type: String},
    accountNo:{type: Number},
    accountType:{type: String},
    accountDesc:{type: String},
    accountTitle:{type: String},
    chartsOfAccount: {type: String},
    borrowingLimit: {type: Number},

  },{timestamps:true});

mongoose.models={}
export default mongoose.model("BankAccount", BankAccountSchema);