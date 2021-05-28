const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const { MONGO_USER, MONGO_PASSWORD,MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
let RedisStore = require('connect-redis')(session)

let redisClient = redis.createClient({
    host:REDIS_URL,
    port: REDIS_PORT
})




const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();


mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/node-docker?authSource=admin`,{useUnifiedTopology:true,useNewUrlParser:true},()=>{
    console.log('Sucessfully connected to the db');
})

app.get('/',(req,res)=>{
    res.send('<h1>Hello there!!!</h1>')
})

app.enable("trust proxy")
app.use(session({
    store: new RedisStore({client:redisClient}),
    secret: SESSION_SECRET,
    cookie:{
        secure:false,
        resave:false,
        saveUninitialized:false,
        httpOnly:true,
        maxAge:30000
    }
}))
app.use(express.json())
app.use('/posts',postRouter);
app.use('/users',userRouter);


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('The server has started')
})