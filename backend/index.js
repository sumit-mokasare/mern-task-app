import express, { urlencoded } from 'express'
import dotenv, { config } from 'dotenv'
import cors from 'cors'
import db from './db/index.js'
import TaskRouter from './routes/task.routes.js'

const app  = express()
const Port = process.env.PORT || 8000

dotenv.config()
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// connect to mongodb 
db();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods:['POST' ,'GET' , 'DELETE' ,'OPTIONS'],
    allowedHeaders:['Content-type' , 'athorization']
}))

// router 

app.get('/',(req , res)=>{
    res.send('hellow js')
})

app.use('/api/v1/tasks' , TaskRouter)

app.listen(Port , ()=>{
    console.log(`Server is runing on port:- ${Port}`);
})