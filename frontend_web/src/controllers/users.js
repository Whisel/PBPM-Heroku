const User = require('../models/users.js')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//this registers new users into the database
const register = (req, res, next) => {
    bycrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            res.json({
                error: err
            })
        }
    })

    let user = new User ({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bycrypt.hash(req.body.email)
    })
    user.save().then(user =>{
        res.json({
            message: 'User Added Successfully!'
        })
    }).catch(error => {
        res.json({
            message: 'An error has occured!'
        })
    })
}

//this logs in users to the website
const login = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({$or: [{email: email}]}).then(user =>  {
        if(user){
            bycrypt.compare(password, user.password, function(err, result) {
                if(err) {
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'secretValue', {expiresIn: '24h'})
                    res.json({
                        message: 'Login Successful!',
                        token
                    })
                }else{
                    res.json({
                        message: 'Password does not match.'
                    })
                }
            })
        }else{
            res.json({
                message: 'No user found.'
            })
        }
    })
}


module.exports = {
    register, login
}