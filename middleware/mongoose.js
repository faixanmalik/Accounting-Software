import mongoose from "mongoose";

const connectDb = handler => async (req,res)=>{
    if (mongoose.connections[0].readyState){
        return handler(req,res)
    }
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI),{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
    return handler(req,res);
}

export default connectDb;