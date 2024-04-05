import express from 'express'
import {changeEmail, checkUserName, isSignedIn, login, logout, register} from '../controllers/auth.js'
const router = express.Router()

router.post('/check-username', checkUserName)
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/change-email', isSignedIn, changeEmail)

export default router
