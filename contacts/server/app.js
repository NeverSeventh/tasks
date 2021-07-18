const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const db = require('./db');
const userRouter = require('./routes/userRouter');
const authUser = require('./middlewares/auth');
const contactsRouter = require('./routes/contactsRouter');
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(logger('dev'));

app.use(authUser);

app.use('/',(req, res, next)  => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use('/users',userRouter);
app.use('/contacts',contactsRouter);

app.get('/',(req,res)=> {
    res.send('hello world')
})



app.listen(6970,()=>console.log('server started'));