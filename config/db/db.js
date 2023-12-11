import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
/*
async function connectDB(){
     const url = 'mongodb://localhost:27017/project'
   
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
}*/

async function connectDB(){
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

db.once("open", () => {
    console.log("MongoDB connected successfully!");
});
}

export default connectDB;