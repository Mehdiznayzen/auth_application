const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// functioon for handle errors
const handleErrors = (err) => {
    let errors = { username : '', email : '', password : '' }
    
    // Validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    console.log(errors);
    return errors;
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'Mehdi Znayzen secret', {
        expiresIn : maxAge
    })
}

const homeController = (req, res, next) => {
    res.render('home')
}

const smoothieController = async (req, res, next) => {
    res.render('smoothie')
}

const signupController = async (req, res, next) => {
    res.render('signup')
}

const loginController = async (req, res, next) => {
    res.render('login')
}

const signupPostController = async (req, res, next) => {
    const { username, email, password } = req.body
    try {
        const newUser = {
            username: username,
            email: email,
            password: password
        }
        await userModel.create(newUser)
        const token = createToken(newUser._id)
        res.cookie('jwt', token, { htt })
        return res.json({ newUser, status : true})
    } catch (error) {
        const errors = handleErrors(error)
        return res.json({ status : false, errors})
    }
}

const loginPostController = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const checkEmail = await userModel.findOne({ email })
        if(!checkEmail){
            return res.json({ status : false, msg : 'The username or password is not valid !!' })
        }
        const isPasswordValid = await bcrypt.compare(password, checkEmail.password)
        if(!isPasswordValid){
            return res.json({ status : false, msg : 'The username or password is not valid !!' })
        }

        // Create a cookie
        const token = createToken(checkEmail._id)
        res.cookie('jwt', token, { httpOnly : true, maxAge : maxAge * 1000 })
        
        return res.json({ status : true, user : checkEmail }) 
    } catch (error) {
        return res.status(400).json({})
    }
}

const logoutController = (req, res, next) => {
    res.cookie('jwt', '', { maxAge : 1 })
    res.redirect('/login')
}

module.exports = {
    homeController,
    smoothieController,
    signupController,
    loginController,
    signupPostController,
    loginPostController,
    logoutController
}