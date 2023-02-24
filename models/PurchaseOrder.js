const mongoose = require('mongoose');

const PurchaseOrderSchema = new mongoose.Schema({
    contact:{type: String, required: true},
    date:{type: Date, required: true},
    deliveryDate:{type: Date, required: true},
    orderNo:{type: Number, required: true, unique: true},
    reference:{ type: String },
    currency: {type: String, required: true},
    amountsAre:{type: String, required: true},
    item: {type: String, required: true},
    desc: {type: String, required: true},
    qty:{type: Number, required: true},
    unitPrice:{type: Number, required: true},
    discount:{type: Number},
    account: {type: String, required: true},
    taxRate:{type: String, required: true},
    amount:{type: Number, required: true}

  },{timestamps:true});

mongoose.models={}
export default mongoose.model("PurchaseOrder", PurchaseOrderSchema);