require('dotenv').config()

const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')

// const encrypt = require('mongoose-encryption')
// const hash = require('md5')

// const bcrypt = require('bcrypt')
// const saltRounds = 10;

const session = require('express-session')
const passport = require('passport')
const mongooseSession = require('passport-local-mongoose')
const { Strategy } = require('passport-local')



const app = express()

app.use(express.static("public"))
app.set('view engine' , 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended :true}))

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : true,
    saveUninitialized : false
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect('mongodb://127.0.0.1/testdb')
.then(()=>{
    console.log("connection is successful");
})
.catch((err)=>{
    console.log(err);
})

const userSchema = new mongoose.Schema({
    email : String,
    password : String,
    secret : String
})

userSchema.plugin(mongooseSession)

// const secret = process.env.SECRET
// userSchema.plugin(encrypt ,{secret :secret , encryptedFields :["password"]}) (FOR ENCRYPTING THE PASSWORD IN DATABSE)

const users = new mongoose.model('users' , userSchema)

passport.use(users.createStrategy())
passport.serializeUser(users.serializeUser())
passport.deserializeUser(users.deserializeUser())

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
    res.render('submit')
})

app.get('/secrets' ,(req,res)=>{
    if(req.isAuthenticated()){
        res.render('secrets')
    }else{
        alert("Unauthenticated User , Please Login")
        res.redirect('/login')

    }
})

app.get('/logout' ,(req,res)=>{
    res.render('login')
})


app.post('/register' , (req,res)=>{
    users.register({username : req.body.username} , req.body.password , (err , user)=>{
        if(err){
            console.log(err);
            alert("There is some issue Please try again")
            res.redirect('/register')
        }else{
            passport.authenticate('local')(req,res,()=>{
                res.redirect('/secrets')
            })
        }
    })
  
 })


app.post('/login' , (req,res)=>{

        
})


 app.post('/submit' , (req,res)=>{
        const newSecret = new users({
            secret : req.body.secret
        })
        async function secret(){
            try {
                const result = await newSecret.save()
                res.render("secrets")
            } catch (error) {
                console.log(error);
            }
        }
        secret()
    })
   

  


app.listen(7080 , ()=>{
    console.log('server is running');
})







// bcrypt.hash(req.body.password , saltRounds ,(err , hash)=>{
//    
// })
