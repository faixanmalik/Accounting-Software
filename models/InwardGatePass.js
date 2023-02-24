const mongoose = require('mongoose');

const InwardGatePassSchema = new mongoose.Schema({
    transactionType:{type: String, required: true},
    igpDate:{type: Date, required: true},
    deliveryChallanNo:{type: Number, required: true, unique: true},
    venderName:{type: String, required: true},
    poNumber: {type: Number, required: true},
    poDate: {type: Date, required: true},
    VehicleNo: {type: String, required: true},
    driverName: {type: String, required: true},
    remarks: {type: String, required: true},
    item: {type: String, required: true},
    poQty: {type: Number, required: true},
    receivedQty: {type: Number, required: true}
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("InwardGatePass", InwardGatePassSchema);