import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const db = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('connected to mongodb ✔');
    })
    .catch((err)=>{
        console.log('Error to connecting mongodb' , err);
    })

}

export default db