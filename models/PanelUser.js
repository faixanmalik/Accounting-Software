const mongoose = require('mongoose');

const PanelUserSchema = new mongoose.Schema({
    name:{type: String},
    userId:{type: Number },
    role:{type: String},
    password:{type: String, default: 123456789}

  },{timestamps:true});
   
mongoose.models = {}
export default mongoose.model("PanelUser", PanelUserSchema);