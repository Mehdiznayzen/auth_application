const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    // check the token exists & is verified
    if(token){
        jwt.verify(token, 'Mehdi Znayzen secret', (err) => {
            if(err){
                console.log(err.message)
                res.redirect('/login')
            }else{
                next()
            }
        })
    }else {
        res.redirect('/login')
    }
}

module.exports = {
    requireAuth
}