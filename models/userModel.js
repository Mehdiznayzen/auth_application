const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'PLease enter an usename !!'],
        unique : true,
    },
    email : {
        type : String,
        required: [true, 'PLease enter an email !!'],
        validate : [validator.isEmail, 'Please enter a valid email !!'],
    },
    password : {
        type : String,
        required: [true, 'PLease enter a password !!'],
        minlength : [6, 'The password should be greater than 6 caracters!!']
    }
})

// fire a function after doc saved to db
userSchema.post('save', function(doc, next){
    console.log('new user was created & saved', doc)
    next()
})

// fire a function before doc saved to db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// static method to login method
userSchema.statics.login = async(email, password) => {
    const user = await this.findOne({ email :email })
    if(user){
        const isPasswordValid = await bcrypt.compare(password, checkEmail.password)
        if(isPasswordValid){
            return user
        }
        throw Error('Incorrect email!!')
    }
    throw Error('Incorrect email!!')
}

module.exports = mongoose.model('users', userSchema)