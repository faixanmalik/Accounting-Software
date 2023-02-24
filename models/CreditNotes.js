const mongoose = require('mongoose');

const CreditNoteSchema = new mongoose.Schema({
    customerName:{type: String, required: true},
    email:{type: String, required: true},
    billingAddress: {type: String, required: true},
    creditNoteDate: {type: Date, required: true},
    creditNoteNo: {type: Number, required: true},
    product: {type: String, required: true},
    desc: {type: String, required: true},
    qty: {type: Number, required: true},
    rate: {type: Number, required: true},
    totalAmount: {type: Number, required: true},
    attachment: {type: Buffer}
    

  },{timestamps:true});

mongoose.models={}
export default mongoose.model("CreditNote", CreditNoteSchema);