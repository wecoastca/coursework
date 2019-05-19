var  express = require('express');
const router = express.Router();
const User = require('../models/users');
const Joi = require('joi')

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  FIO: Joi.string().required(),
  tel: Joi.number().integer().default(11),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
})

module.exports.loginPage  = (req, res) => {
    res.render('login');
    res.redirect('/');
  }

module.exports.authorization = (req,res) =>{

	const candidate = User.findOne(
	{
		email: req.body.email,
		password: req.body.password 
	}
	);

	if (candidate) 
	{
		res.redirect('/');
	}
	else {

		req.redirect('/auth/login');
	}
};


module.exports.registerPage = function(req,res){

	res.render('register');
};

module.exports.registration = async (req, res, next) => {

    try {
      const result = Joi.validate(req.body, userSchema)
      if (result.error) {
        req.flash('error', 'Data entered is not valid. Please try again.')
        res.redirect('/auth/register')
        return
      }
 
      const user = await User.findOne({ 'email': result.value.email })
      if (user) {
        req.flash('error', 'Email is already in use.')
        res.redirect('/auth/register')
        return
      }
 
      const hash = await User.hashPassword(result.value.password)
 
      delete result.value.confirmationPassword
      result.value.password = hash
 
      const newUser = await new User(req.body)
      console.log(req.body)
      await newUser.save()
      req.flash('success', 'Registration successfully, go ahead and login.')
      res.redirect('/auth/login')
 
    } catch(error) {
      next(error)
    }
  };

/*async (req, res, next) => {
    try {
      const result = Joi.validate(req.body, userSchema)
      if (result.error) {
        req.flash('error', 'Data entered is not valid. Please try again.')
        res.redirect('/user/register')
        return
      }
 
      const user = await User.findOne({ 'email': result.value.email })
      if (user) {
        req.flash('error', 'Email is already in use.')
        res.redirect('/user/register')
        return
      }
 
      const hash = await User.hashPassword(result.value.password)
 
      delete result.value.confirmationPassword
      result.value.password = hash
 
      const newUser = await new User(req.body)
      await newUser.save()
 		console.log(req.body);
      req.flash('success', 'Registration successfully, go ahead and login.')
      res.redirect('/user/login')
 
    } catch(error) {
      next(error)
    }
  };*/