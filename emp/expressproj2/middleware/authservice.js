const JWT = require("jsonwebtoken");
const User = require("../model/registration");

const sendEmail = require("../emailsend");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const tokens=require('../model/tokenschema');
const users= require("../model/user");
const registration = require("../model/registration");
const clientURL=process.env.CLIENT_URL



async function resetPassword(userId, token, password) {
   
    
   
    let passwordResetToken = await users.findOne( userId);
    console.log(passwordResetToken)

    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
    const hash = await bcrypt.hash(password, 10);
    await users.updateOne(
      { _id: users._id },
      { $set: { password: hash } },
      { new: true }
    );
    const user = await users.findById(userId);
    sendEmail(
      user.email,
      "Password Reset Successfully",
      {
        name: user.name,
      },
      "./template/resetPassword.handlebars"
    );
    await passwordResetToken.deleteOne();
    return true;
  };


  const email = 'harshitha.b225@gmail.com';
 const requestPasswordReset = async (req, res) => {

    try {
        
      
        const user = await  users.findOne({ email });
         
        console.log(user)
        if (!user) {
          throw new Error('User does not exist');
        }
    
        let token = await tokens.findOne({ userId: user._id });
       console.log(token)
        if (token) {
          await token.deleteOne();
        }
    
        let resetToken = crypto.randomBytes(32).toString('hex');
        const hash = await bcrypt.hash(resetToken, Number(bcrypt));
    
        await new  tokens({
          userId: user._id,
          token: hash,
          createdAt: Date.now(),
        }).save();
    
        const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
        await sendEmail(
          user.email,
          'Password Reset Request',
          { name: user.name, link: link },
          './template/requestResetPassword.handlebars'
        );
  
        res.status(200).json({ message: 'Password reset link sent successfully.' });
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    }
  

module.exports={resetPassword,requestPasswordReset}