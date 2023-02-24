const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    code:{type: String, required: true},
    name:{type: String, required: true},

    purchaseStatus:{ type: String },
    costPrice:{type: Number, required: true},
    purchaseAccount: {type: String, required: true},
    purchaseTaxRate: {type: String, required: true},
    purchaseDesc: {type: String, required: true},

    salesStatus:{type: String },
    salesPrice:{type: Number, required: true},
    salesAccount: {type: String, required: true},
    salesTaxRate: {type: String, required: true},
    salesDesc: {type: String, required: true},


  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Product", ProductSchema);