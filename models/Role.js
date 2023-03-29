const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    roleName:{type: String},
    roleDesc:{type: String }

  },{timestamps:true});
   
mongoose.models = {}
export default mongoose.model("Role", RoleSchema);