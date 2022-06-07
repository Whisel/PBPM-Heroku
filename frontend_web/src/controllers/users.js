import User, { findOne } from '../models/users.js'
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

//this registers new users into the database
const register = (req, res, next) => {
    hash(req.body.password, 10, function(err, hashedPass){
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
        password: hashedPass
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

    findOne({$or: [{email: email}]}).then(user =>  {
        if(user){
            compare(password, user.password, function(err, result) {
                if(err) {
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = sign({name: user.name}, 'secretValue', {expiresIn: '24h'})
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


export default {
    register, login
}