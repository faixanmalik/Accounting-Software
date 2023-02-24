const mongoose = require('mongoose');

const FinancialYearSchema = new mongoose.Schema({
    yearName:{type: String, required: true},
    startDate:{type: Date, required: true},
    endDate: {type: Date, required: true },
    status: {type: String, required: true }
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("FinancialYear", FinancialYearSchema);