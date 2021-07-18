const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const db = require('./db');
const userRouter = require('./routes/userRouter');
const authUser = require('./middlewares/auth');

app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(logger('dev'));

app.use(authUser);

app.use('/users',userRouter);

app.get('/',(req,res)=> {
    res.send('hello world')
})



app.listen(6970,()=>console.log('server started'));