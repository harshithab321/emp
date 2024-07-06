require("dotenv").config()
const express = require('express')
const formidable = require('express-formidable')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
let verifyToken = require('./middleware/authentication');
const nodemailer=require('nodemailer')
const crypto=require('crypto')
const sendEmail = require("./emailsend");
require('./config/database').connect()
const { requestPasswordReset,resetPassword}=require('./middleware/authservice')
const Token = require("./model/tokenschema");
// const sendEmail=require('./emailsend')
const resetPasswordController = require('./controllers/controlauth');

const router = require("express").Router();



const app=express()
const PORT=process.env.PORT



const registration=require('./model/user');
const login_table=require('./model/login');
const products=require('./model/products');
const forgot_password = require("./model/forgot_password");
const tokens=require('./model/tokenschema')


app.post('/register',formidable(),async function(req,res){
    let{firstName,lastName,email,password}=req.fields
    // console.log(req.fields)
    // console.log(user_table)
    if(!(firstName && lastName && email && password)){
        res.status(400).send("provide all the inputs")
    }
    else{
        if(await registration.findOne({email})){
            res.send("user already exist")
            
        }
        else{
            let enc_password=await bcrypt.hash(password,10)

            let user=await registration.create({
                 firstName:firstName,
                 lastName:lastName,
                 email:email,
                 password:enc_password
            })
            let token=jwt.sign({user_id:user._id,email},
                process.env.TOKEN,
                {expiresIn:'5h'})
                user.token=token
                res.json(user)
        }
    }
    
})


app.post('/login', formidable(), async function (req, res){
    let { email, password} = req.fields
   // console.log(req.fields)
   
    if (! (email && password)){
        res.status(400).send('Provide all the inputs')
    }
    else{
        let user = await registration.findOne({email})

        if (user && (await bcrypt.compare(password, user.password)))
        {
            let enc_password=await bcrypt.hash(password,10)

            let user=await login_table.create({
               
                email:email,
                password:enc_password
           })
            let token = jwt.sign({ user_id:user._id, email},
                process.env.TOKEN,
                 { expiresIn: "5h" });

                 
            user.token = token

            res.json(user)
        }
        else{
            res.status(403).send('Incorrect username or password!!')
        }
    }
})

app.get('/profile',verifyToken,function(req,res){
    res.send('hello welcome to profile page')
})

app.post('/forgot_password', formidable(), requestPasswordReset);

app.post('/reset_password', formidable(), async (req, res) => {
    
      const { userId, token, password } = req.fields;
      console.log(req.fields)
  
      // Call the resetPassword function passing the required parameters
      await resetPassword(userId, token, password);
  
   
  });







app.listen(PORT, ()=> console.log(`Project is running at ${PORT} port`))

