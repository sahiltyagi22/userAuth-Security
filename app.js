const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')


const app = express()

app.use(express.static("public"))
app.set('view engine' , 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended :true}))


mongoose.connect('mongodb://127.0.0.1/test')
.then(()=>{
    console.log("connection is successful");
})
.catch((err)=>{
    console.log(err);
})

app.get('/' ,(req,res)=>{
    res.render('home')
})

app.get('/register' ,(req,res)=>{
    res.render('register')
})

app.get('/login' ,(req,res)=>{
    res.render('login')
})

app.get('/submit' ,(req,res)=>{
    res.render('sub,it')
})

app.get('/logout' ,(req,res)=>{
    res.render('logout')
})









app.listen(7070 , ()=>{
    console.log('server is running');
})



