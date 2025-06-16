import express, { urlencoded } from 'express'
import dotenv, { config } from 'dotenv'
import cors from 'cors'

const app  = express()
const Port = process.env.PORT || 8000

dotenv.config()
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors({
    origin:'http://localhost:5173/',
    credentials:true,
    methods:['POST' ,'GET' , 'DELETE' ,'OPTIONS'],
    allowedHeaders:['Content-type' , 'athorization']
}))


app.get('/',(req , res)=>{
    res.send('hellow js')
})

app.listen(Port , ()=>{
    console.log(`Server is runing on port:- ${Port}`);
})