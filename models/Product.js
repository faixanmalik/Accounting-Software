const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    code:{type: String, required: true},
    name:{type: String},

    purchaseStatus:{ type: String },
    costPrice:{type: Number},
    purchaseAccount: {type: String},
    purchaseTaxRate: {type: String},
    purchaseDesc: {type: String},

    salesStatus:{type: String },
    salesPrice:{type: Number},
    salesAccount: {type: String},
    salesTaxRate: {type: String},
    salesDesc: {type: String},


  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Product", ProductSchema);