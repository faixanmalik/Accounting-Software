const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    businessName:{type: String, required: true},
    country:{type: String, required: true},
    industry:{type: String, required: true},
    month:{type: String, required: true},
    day:{type: Number, required: true},
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Business", BusinessSchema);