const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    customerName:{type: String, required: true},
    email:{type: String, required: true},
    phoneNo:{type: Number, required: true},
    terms:{type: String, required: true},
    billingAddress: {type: String, required: true},
    product: {type: String, required: true},
    desc: {type: String, required: true},
    invoiceDate: {type: Date, required: true},
    invoiceNo: {type: Number, required: true},
    qty: {type: Number, required: true},
    rate: {type: Number, required: true},
    totalAmount: {type: Number, required: true},
    dueDate: {type: Date, required: true},
    terms: {type: String, required: true},
    attachment: {type: Buffer}
    

  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Invoice", InvoiceSchema);