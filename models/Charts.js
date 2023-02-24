const mongoose = require('mongoose');

const ChartSchema = new mongoose.Schema({
    accountCode:{type: Number, required: true, unique: true},
    accountName:{type: String, required: true},
    account:{type: String, required: true},
    balance: {type: Number, required: true},
    asof: {type: Date, required: true },
    desc:{type: String, required: true},
    subAccount:{type: String, required: true}
    
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Chart", ChartSchema);