const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const { requireAuth } = require('../middleware/authMiddleware')

const { 
    homeController, 
    smoothieController, 
    signupController, 
    signupPostController,
    loginController,
    loginPostController,
    logoutController
} = require('../controller/controller')

router.get('/' , homeController)
router.get('/smoothie', requireAuth , smoothieController)
router.get('/signup', signupController)
router.post('/signup', signupPostController)
router.get('/login', loginController)
router.post('/login', loginPostController)
router.get('/logout', logoutController)

module.exports = {
    router
}